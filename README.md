## Snake JS
![Screen shot of playing Snake JS](https://glenhughes.me/uploads/snake-js-2.png)

![Screen shot of game over](https://glenhughes.me/uploads/snake-js-1.png)

This is a basic example of how to build a Snake style game using pure JS and HTML5 canvas. This is just a demo and shouldn't be taken seriously. Please feel free to fork and or make PR's to make this better for fun!

## How to play
The game is very simple. Just use the directional keys (up, right, down and left) to navigate around the game area trying your best to eat the yellow fruit. Each time you eat a piece a fruit, you get 1 point!

## Local setup for dev
Install locally with GIT `git clone git@github.com:GlenHughes/snake-js`

Then go to that directory: `cd snake-js`

I use Yarn as my package manager, install [Yarn](https://yarnpkg.com/lang/en/docs/install/) and then type `yarn` within the cloned directory.

Then type `yarn dev` this assumes that port `8090` is free! Change this if you are already using it within the `webpack/webpack-dev.js`.

## To build for production
Type `yarn build` in the cloned directory! This will build a production version with no logs or dev related stuff and also a `gzipped` version in the (or create) a `/dist`.
