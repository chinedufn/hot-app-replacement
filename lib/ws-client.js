var ws = require('websocket-stream')

var stream

var newScript = ''
initNewStream()

function initNewStream () {
  stream = ws('ws://localhost:9999')
  stream.on('data', function (chunk) {
    newScript += chunk.toString()
  })
  stream.on('end', function () {
    var script = document.createElement('script')
    script.setAttribute('data-hot-app', true)
    script.type = 'text/javascript'
    script.text = newScript

    attach(script)

    newScript = ''
    initNewStream()
  })
  stream.write('hello')
}
function attach (node) {
  const prevNode = document.querySelector('[data-hot-app="true"]')
  if (prevNode) prevNode.parentNode.replaceChild(node, prevNode)
  else document.body.appendChild(node)
}
