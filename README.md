# YEPS index

YEPS Static index.html file serving

[![NPM](https://nodei.co/npm/yeps-index.png)](https://npmjs.org/package/yeps-index)

[![npm version](https://badge.fury.io/js/yeps-index.svg)](https://badge.fury.io/js/yeps-index)
[![Build Status](https://travis-ci.org/evheniy/yeps-index.svg?branch=master)](https://travis-ci.org/evheniy/yeps-index)
[![Coverage Status](https://coveralls.io/repos/github/evheniy/yeps-index/badge.svg?branch=master)](https://coveralls.io/github/evheniy/yeps-index?branch=master)
[![Linux Build](https://img.shields.io/travis/evheniy/yeps-index/master.svg?label=linux)](https://travis-ci.org/evheniy/)
[![Windows Build](https://img.shields.io/appveyor/ci/evheniy/yeps-index/master.svg?label=windows)](https://ci.appveyor.com/project/evheniy/yeps-index)

[![Dependency Status](https://david-dm.org/evheniy/yeps-index.svg)](https://david-dm.org/evheniy/yeps-index)
[![devDependency Status](https://david-dm.org/evheniy/yeps-index/dev-status.svg)](https://david-dm.org/evheniy/yeps-index#info=devDependencies)
[![NSP Status](https://img.shields.io/badge/NSP%20status-no%20vulnerabilities-green.svg)](https://travis-ci.org/evheniy/yeps-index)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/evheniy/yeps-index/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/evheniy/yeps-index.svg)](https://github.com/evheniy/yeps-index/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/evheniy/yeps-index.svg)](https://github.com/evheniy/yeps-index/network)
[![GitHub issues](https://img.shields.io/github/issues/evheniy/yeps-index.svg)](https://github.com/evheniy/yeps-index/issues)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/evheniy/yeps-index.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=%5Bobject%20Object%5D)


## How to install

```shell
npm i -S yeps-index debug
```

## How to use

```js
const App = require('yeps');
    
const index = require('yeps-index');
    
const error = require('yeps-error');
const logger = require('yeps-logger');
const server = require('yeps-server');
    
const { resolve } = require('path');
    
const app = new App();
    
app.all([
  error(),
  logger(),
  index({
    root: resolve(__dirname, 'dist'),
  }),
]);
    
server.createHttpServer(app);
```

Or with **options**:
    
```js
app.all([
  error(),
  logger(),
  serve({
    root: resolve(__dirname, 'dist'),
    index: 'index.html',
    url: '/',
  }),
]);
```
    
Url **"/index.html"** will be redirected to **"/"** with 301 http code.
    
#### [YEPS documentation](http://yeps.info/)
