# load-script-or-css

> Load a script or stylesheet in the browser asynchronously, returning a Promise

## Usage
```js
const {loadCss, loadScript} = require('load-script-or-css')

// Load one Stylesheet
await loadCss('http://unpkg.com/bootstrap/dist/css/bootstrap.min.css')

// Load one script
await loadScript('http://unpkg.com/bootstrap/dist/js/bootstrap.min.js')

// load a stylesheet and a script
await Promise.all([
  loadCss('http://unpkg.com/bootstrap/dist/css/bootstrap.min.css'),
  loadScript('http://unpkg.com/bootstrap/dist/js/bootstrap.min.js')
])

// load a stylesheet and a script, but don’t fail if one
await Promise.all([
  loadCss('http://unpkg.com/bootstrap/dist/css/bootstrap.min.css').dontThrow(),
  loadScript('http://unpkg.com/bootstrap/dist/js/bootstrap.min.js').dontThrow()
])
```
