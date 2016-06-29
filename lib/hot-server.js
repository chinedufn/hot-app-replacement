var browserify = require('browserify')
var watchify = require('watchify')
var devnull = require('dev-null')

var http = require('http')
var fs = require('fs')
var path = require('path')

var websocket = require('websocket-stream')

var b = browserify({
  entries: [path.resolve(__dirname + '/../example-frontend-app/virtual-dom/hot-entry.js')],
  cache: {},
  packageCache: {},
  plugin: [watchify]
})

b.on('update', bundle)
bundle()

var w = browserify()
w.add(path.resolve(__dirname + '/ws-client.js'))
var mainStream

function bundle () {
  if (mainStream) {
    b.bundle().pipe(mainStream)
    mainStream = null
  } else {
    b.bundle().pipe(devnull())
  }
}

var server = http.createServer(function (request, reply) {
  if (request.url === '/ws') {
    w.bundle().pipe(reply)
  } else if (request.url === '/bundle') {
    b.bundle().pipe(reply)
  } else {
    var file = fs.readFileSync(path.resolve(__dirname + '/index.html'))
    reply.end(file)
  }
})

websocket.createServer({server: server}, sendNewBundle)
function sendNewBundle (stream) {
  mainStream = stream
}

server.listen(9999)
