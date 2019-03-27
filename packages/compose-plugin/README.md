# Maleo Compose Plugin

Compose Plugin is to make your maleo plugins config easier to read.

## Installation
**NPM**
```bash
$ npm install --save @airy/maleo-compose-plugin
```
**Yarn**
```bash
$ yarn add @airy/maleo-compose-plugin
```

## How To Use

### Basic Usage
Add the plugins you use to your `maleo.config.js`

Wrap the plugins under compose plugin function.
For example:
```javascript
// maleo.config.js
const cssPlugin = require('@airy/maleo-css-plugin');
const typescriptPlugin = require('@airy/maleo-typescript-plugin');
// add this
const compose = require('@airy/maleo-compose-plugin');

module.exports = compose([
  [typescriptPlugin, { /* typescript plugin option */ }],
  [cssPlugin, { /* css plugin option */ }],
  ], 
  { 
    /* your config for maleo */ 
    webpack(config, context, next) {
      // your custom webpack config
      return next()
    } 
  }
);
```
