var SS = require('solid-state')
var extend = require('xtend')

var main = require('main-loop')
var vdom = require('virtual-dom')
var h = vdom.h

module.exports = App

function App (initialState, externalStateListener) {
  var AppState = new SS(extend({
    numBeavers: 0
  }, initialState))

  var loop = main(AppState.get(), render.bind(null, AppState), vdom)
  AppState.addListener(loop.update)

  var intervalId = setInterval(incrementBeavers.bind(null, AppState), 1000)

  var killExternalListener
  if (externalStateListener) {
    killExternalListener = AppState.addListener(externalStateListener)
  }

  // Expose a way to kill all perpetual async functions in your app
  // Otherwise they'll keep running when you replace the app
  function kill () {
    clearInterval(intervalId)
    if (typeof killExternalListener === Function) {
      killExternalListener
    }
  }

  return {
    kill: kill,
    element: loop.target
  }
}

function render (AppState) {
  var state = AppState.get()

  return h('div', {
    style: { color: 'red', fontSize: '36px' }
  }, state.numBeavers + ' in the beaver dam!')
}

function incrementBeavers (AppState) {
  var numBeavers = AppState.get().numBeavers
  AppState.set('numBeavers', ++numBeavers)
}
