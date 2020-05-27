# load-script-or-css

> Load a script or stylesheet in the browser asynchronously, returning a Promise

## Usage
```js
const {loadCss, loadScript} = require('load-script-or-css')

// Load one Stylesheet
await loadCss('https://unpkg.com/bootstrap/dist/css/bootstrap.min.css')

// Load one script
await loadScript('https://unpkg.com/bootstrap/dist/js/bootstrap.min.js')

// load a stylesheet and a script
await Promise.all([
  loadCss('https://unpkg.com/bootstrap/dist/css/bootstrap.min.css'),
  loadScript('https://unpkg.com/bootstrap/dist/js/bootstrap.min.js')
])

// load a stylesheet and a script, and don’t fail if either of them fails
await Promise.all([
  loadCss('https://unpkg.com/bootstrap/dist/css/bootstrap.min.css').dontThrow(),
  loadScript('https://unpkg.com/bootstrap/dist/js/bootstrap.min.js').dontThrow()
])
```
