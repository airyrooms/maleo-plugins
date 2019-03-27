# Maleo Plugins

### List of Plugins
- [@airy/maleo-css-plugin](https://github.com/airyrooms/maleo-plugins/tree/master/packages/css-plugin)
- [@airy/maleo-redux-plugin](https://github.com/airyrooms/maleo-plugins/tree/master/packages/redux-plugin)
- [@airy/maleo-typescript-plugin](https://github.com/airyrooms/maleo-plugins/tree/master/packages/typescript-plugin)
- [@airy/maleo-compose-plugin](https://github.com/airyrooms/maleo-plugins/tree/master/packages/compose-plugin)
- [more to come](https://github.com/airyrooms/maleo.js/issues/152)


---
# Contributing Guidelines

Hello 👋!

Maleo.js is an un-opinionated framework to enable Universal Rendering in JavaScript using React with no hassle.

We are here to build plugins that will solve the time consuming setups the features required in order for it to work with Maleo.

Feel free to contribute to this plugins project. We are grateful for your contributions and we are excited to welcome you abroad!

Happy contributing 🎉!

---

### Setting Up Maleo.js in Local Environment

**Clone Repo to Local Machine**

[Fork](https://help.github.com/articles/fork-a-repo/) this repository to your GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local machine from forked repo.

```bash
$ git clone https://github.com/<username>/maleo-plugins.git
$ cd maleo-plugins
```

Add Maleo.js repo as upstream to keep your fork up to date

```bash
$ git remote add upstream https://github.com/airyrooms/maleo-plugins
```

Make sure you are always up to date with our `master` branch.
```bash
$ git pull upstream master
```

**Setup**

Make sure you are using the same or higher version of [Node.js](https://nodejs.org/en/) from `.nvmrc` file. (more info about [nvm](https://github.com/creationix/nvm))

We are using [Yarn](https://yarnpkg.com/en/) as package manager

Install yarn as global dependency
```bash
$ npm install --global yarn
```
Should the install fails, use `sudo`

And then, install all the dependencies required by Maleo.js

```bash
$ yarn
```

---

***Before making any plugin, please check our [plugin list](https://github.com/airyrooms/maleo.js/issues/152), for plugins that you want to add.***


### Adding Plugin
> ⚠️ Before adding a plugin in this repository please create an issue to notice other that you are working on the plugin 

1. Create a new directory on `packages` folder
2. Add `package.json` to the directory with this content
```json
{
  "name": "@airy/maleo-<NAME>-plugin",
  "version": "0.0.1",
  "main": "lib/index.js",
  "license": "MIT",
  "files": [
    "lib"
  ],
  "scripts": {
    "build": "rm -rf lib && gulp",
    "watch": "rm -rf lib && gulp watch",
    "prepublish": "yarn build"
  },
  "peerDependencies": {
    "@airy/maleo": "latest"
  },
  "dependencies": {},
  "devDependencies": {
    "@airy/maleo-gulp-plugin": "latest"
  },
}
```
3. Make a `gulpfile.js` for Maleo's gulp plugin to read
```js
const gulpTaskRunner = require('@airy/maleo-gulp-plugin');

const distDir = '.';
const paths = {
  lib: 'src/*.js',
};

gulpTaskRunner(paths, distDir);
```
4. Create `src/index.js` file with the plugin code (You can run `yarn watch` during development to watch for the builds during development)
5. Add a `README.md` for the plugin documentation, what the plugin does, and how to use it on Maleo
6. Use `yarn commit` to commit your staged files
7. Submit a Pull Request


---
**NOTICE**

When your PR got merged into remote master branch, it will trigger [travis-ci](https://travis-ci.org/airyrooms/maleo.js) pipeline to publish your package to NPM. 
And your package are ready for the world to use! 🎉

---
