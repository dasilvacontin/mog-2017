const socket = require('socket.io-client')()

socket.on('connect', function () {
  console.log('successfully connected to the server!')
})

socket.on('serverHi', function () {
  console.log('got hi from server!')
})