# tow96-logger

![License: BSD-3-Clause](https://img.shields.io/github/license/Tow96-boilerplate/npm-logger)

Simple logger that uses winston that I utilize in most of my Typescript/javascript
 programs.

If for some reason you want to utilize it, it can be added via npm with the command.

> npm install tow96-logger

This library can writes the logs to a *logs* folder automatically if the user wants to disable
this functionality in order to save space, then set the following evironment variable to true:

> DISABLE_LOGGING


The logs are written the same folder where the *node_modules* is located. Which should be the root 
folder. 

If you want change the *logs* folder location, it can be changed using the environment variable:

> LOGGER_FOLDER

Also, the logs by default writes to a file named YYYYMMDD.log, if instead the user wants to concentrate
all logs into a single file, set the following evironment variable to true:

> SINGLE_LOGS


Finally, the logs are also written to the console if the NODE_ENV is anything different to production.

This library was created by utilizing [this](https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c) guide