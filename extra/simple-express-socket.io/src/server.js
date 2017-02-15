const express = require('express')
const app = express()

app.use(express.static('public'))

const PORT = process.env.PORT || 3000
const server = app.listen(PORT, function () {
  console.log(`Express app successfully listening on port ${PORT}!`)
})

const io = require('socket.io').listen(server)

io.on('connection', function (socket) {
  console.log(`${socket.id} connected to the server!`)
  socket.emit('serverHi')
})