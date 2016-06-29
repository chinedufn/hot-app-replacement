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
    script.type = 'text/javascript'
    script.text = newScript
    document.body.appendChild(script)
    newScript = ''
    initNewStream()
  })
  stream.write('hello')
}
