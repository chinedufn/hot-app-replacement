hot-app-replacement [![npm version](https://badge.fury.io/js/hot-app-replacement.svg)](http://badge.fury.io/js/hot-app-replacement) [![Build Status](https://travis-ci.org/chinedufn/hot-app-replacement.svg?branch=master)](https://travis-ci.org/chinedufn/hot-app-replacement)
===============

> Transfer state from old app to new app on save

Had this lying around. Inspired to module-ify it by @yoshuawuyts's [tweet](https://twitter.com/yoshuawuyts/status/747800325508169728). Code cleanup incoming...

![image](http://i.giphy.com/3o6gEfSFxmJhwzEXL2.gif)

No API or CLI yet. But you can:

```
node lib/hot-server.js && open http://localhost:9999
# Changes to demo folder will now hot reload in your browser :)
``````

## To Install

```
$ npm install -g hot-app-replacement
```

## Usage

## CLI

## API

## TODO:

- [ ] Add an API and CLI. Right now it's just a (working) example
- [ ] Add tests / refactor. Ripped this out of an old project
- [ ] Commenting, rationale, etc

## See Also

- [virtual-dom](https://github.com/Matt-Esch/virtual-dom)
- [choo](https://github.com/yoshuawuyts/choo)

## License

MIT
