// http://socket.io/get-started/chat/
const express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

/*
// middleware
app.use(function (req, res, next) {
    console.log(arguments)
    next()
})
*/

app.use(express.static('public'))

function hiHandler (number) {
    console.log(arguments)
    const socket = this
    console.log(`user sent hi, and number ${number}`)
    console.log(socket.id)
    /*
        socket.emit('')
        socket.broadcast()
        io.sockets.emit()
    */
}

io.on('connection', function (socket) {
  console.log('a user connected')

  socket.on('hi', hiHandler)
})

http.listen(3000, function(){
  console.log('listening on *:3000');
});