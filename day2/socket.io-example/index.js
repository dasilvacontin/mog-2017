// http://socket.io/get-started/chat/
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendfile('index.html');
});

function hiHandler (number) {
    console.log(arguments)
    const socket = this
    console.log(`user sent hi, and number ${number}`)
    console.log(socket.id)
}

io.on('connection', function (socket) {
  console.log('a user connected')

  socket.on('hi', hiHandler)
})

http.listen(3000, function(){
  console.log('listening on *:3000');
});