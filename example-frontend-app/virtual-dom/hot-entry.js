var LoopdagoApp = require('./app.js')

var hotReloadState = window.__hmr_state__
var AppObject = LoopdagoApp(hotReloadState || {}, stateListener)

var AppElement = AppObject.element
var kill = AppObject.kill

var appRoot = document.querySelector('#content')

if (window.__hmr_kill__) {
  window.__hmr_kill__()
}

window.__hmr_kill__ = kill
appRoot.insertBefore(AppElement, appRoot.children[0])

// Only if we used server side rendering
// TODO: Find a home for this
if (appRoot.children[1]) {
  appRoot.removeChild(appRoot.children[1])
}

function stateListener (state) {
  window.__hmr_state__ = state
}
