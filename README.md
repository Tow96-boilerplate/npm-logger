# tow96-logger

![License: BSD-3-Clause](https://img.shields.io/github/license/Tow96-boilerplate/npm-logger)

Simple logger that uses winston that I utilize in most of my Typescript/javascript
 programs.

If for some reason you want to utilize it, it can be added via npm with the command.

> npm install tow96-logger

This library writes the logs to a *logs* folder in the same folder where the 
*node_modules* is located. If you want change the *logs* folder location, it can be 
changed using the environment variable:

> LOGGER_FOLDER

This library was created by utilizing [this](https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c) guide