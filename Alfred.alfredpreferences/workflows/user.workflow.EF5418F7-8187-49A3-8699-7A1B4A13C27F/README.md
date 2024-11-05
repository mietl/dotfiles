# alfredworkflow-npm-search

Alfred workflow to search for npm package using Skypack API.

![Alfred npm Search screenshot](screenshots/screenshot.png)



## Prerequisites

- The [deno](https://deno.land) runtime should have been installed



## How to use

1. Open Alfred App
2. Type `npm`
3. Pass a package name as the argument
    - Example: `npm react`
4. Wait for results
5. Then:
    - `Return` to open on npm website
    - `cmd + c` to copy a link.



## Project-type parameter

1. Use `--[project-type]` to search for packages that belong to a project type
    - Example: `npm material --react`

Available project types are

    1. angular
    2. ember
    3. lit-html
    4. preact
    5. react
    6. svelte
    7. vue

![Alfred npm Search screenshot](screenshots/screenshot-project-type.png)



# License

MIT License

Copyright (c) 2021 Naveen Bharathi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
