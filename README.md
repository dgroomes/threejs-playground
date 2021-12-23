# threejs-playground

NOT YET IMPLEMENTED

📚 Learning and experimenting with three.js.

> JavaScript 3D library
> 
> The aim of the project is to create an easy to use, lightweight, cross-browser, general purpose 3D library. The
> current builds only include a WebGL renderer but WebGPU (experimental), SVG and CSS3D renderers are also available in
> the examples.
> 
> -- <cite>https://github.com/mrdoob/three.js</cite>

## Instructions

Follow these instructions to build and run the project.

* Install dependencies:
  * `npm install`
* Build the the project continuously and serve the web content:
  * `npm run start`
  * The browser will open automatically and show the final product!

## Design

This project uses three.js to make an animation inspired by pixel art.

The animation can be hosted in GitHub Pages. The process is not automated. Build the project, then copy the contents of
`dist/` into `docs/` and then commit and push the changes. The final result should be published by GitHub to the
repository's GitHub Pages page at <https://pages.github.com/dgroomes/threejs-playground>.

## TODO

* DONE Bundle the JavaScript/TypeScript and serve the files with Webpack
* DONE Hello world three.js
* DONE Make a grid of squares/blocks in three.js
* IN PROGRESS Publish to GitHub Pages
* Add a pre-defined shader

## Reference

* [GitHub repo: three.js](https://github.com/mrdoob/three.js)
* [three.js: "Getting Started"](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene)
* [webpack TypeScript guide](https://webpack.js.org/guides/typescript/)
