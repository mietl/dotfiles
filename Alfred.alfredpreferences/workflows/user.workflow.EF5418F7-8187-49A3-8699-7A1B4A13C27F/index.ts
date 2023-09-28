type TResult = {
  description: string;
  hasTypes: true;
  name: string;
}

type TResponse = {
  results: TResult[];
}

type TAlfredResultProps = {
  arg?: string;
  copy?: string;
  icon?: string;
  largetype?: string;
  subtitle?: string;
  title: string;
  valid?: boolean;
}

const getNpmPackageUrl = (npmPackage: string): string => (
  `https://www.npmjs.com/package/${npmPackage}`
);

const getSkyPackApiUrl = (query: string, projectType?: string): string => (
  `https://api.skypack.dev/v1/search?q=${query}${projectType
    ? `&projectType=${projectType}`
    : ''
  }`
);

const getGoogleSearchUrl = (query: string): string => (
  `https://www.google.com/search?q=${query}`
);

const projectTypeDocsUrl = `https://github.com/naveen-bharathi/alfredworkflow-npm-search#project-type-parameter`;

const getProjectType = (projectTypeArg?: string): (string | undefined) => {
  const projectTypes = [
    'angular',
    'ember',
    'lit-html',
    'preact',
    'react',
    'svelte',
    'vue',
  ];

  const projectType = projectTypeArg?.replace('--', '');

  return projectTypes?.includes(projectType || '')
    ? projectType
    : undefined;
};

const getAlfredResult = (props: TAlfredResultProps) => ({
  title: props.title,
  ...props?.subtitle && {
    subtitle: props?.subtitle,
  },
  ...props?.arg && {
    arg: props?.arg,
  },
  icon: {
    path: props?.icon || 'icons/npm-icon.png',
  },
  text: {
    copy: props?.copy || props?.arg || '',
    largetype: props?.largetype || props?.arg || '',
  },
  valid: props?.valid,
});

try {
  const args = Deno.args[0].split(' ');
  const projectTypeArg = args.find((arg) => (/--(\w)*/.test(arg)));
  const projectType = getProjectType(projectTypeArg);
  const query = args.find((arg) => !(/--(\w)*/.test(arg))) || '';

  if (query) {
    const res = await fetch(getSkyPackApiUrl(query, projectType));
    const body: TResponse = await res.json();

    const packages = {
      items: [
        ...((projectTypeArg && !projectType)
          ? [
            getAlfredResult({
              title: `"${projectTypeArg}" is not a valid project type`,
              subtitle: 'Show the list of valid project types',
              arg: projectTypeDocsUrl,
            }),
          ]
          : []),
        ...(body.results.length
          ? [
            ...body.results.map((item) => (
              getAlfredResult({
                title: item.name,
                subtitle: item.description,
                arg: getNpmPackageUrl(item.name),
                icon: item.hasTypes
                  ? 'icons/npm-ts-icon.png'
                  : 'icons/npm-js-icon.png',
              })
            )),
          ]
          : [
            getAlfredResult({
              title: `No packages found for "${query}"`,
              valid: false,
            }),
            getAlfredResult({
              title: `Search google instead for "npmjs ${query}"`,
              arg: getGoogleSearchUrl(`npmjs ${query}`),
              icon: 'icons/google.png'
            }),
          ]),
      ],
    };

    console.log(JSON.stringify(packages));
  } else {
    console.log(JSON.stringify({
      items: [
        getAlfredResult({
          title: 'Enter package name',
          subtitle: 'Enter the package name to search',
          valid: false,
        }),
      ],
    }));
  }
} catch (error) {
  console.log(
    JSON.stringify({
      items: [
        getAlfredResult({
          title: error.name,
          subtitle: error.message,
          copy: error.stack,
          valid: false,
        }),
      ],
    }),
  );
}
