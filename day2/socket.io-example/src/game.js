console.log('im game!')
const kbd = require('@dasilvacontin/keyboard')
const randomColor = require('randomcolor')
document.addEventListener('keydown', function (event) {
    event.preventDefault()
})

const socket = io()
const myPlayer = { x: 100, y: 100, color: randomColor() }
let myPlayerId = null

// hash playerId => playerData
let players = {}

function logic () {
    if (kbd.isKeyDown(kbd.LEFT_ARROW)) {
        myPlayer.x--
    } else if (kbd.isKeyDown(kbd.RIGHT_ARROW)) {
        myPlayer.x++
    }
    socket.emit('move', myPlayer)
}

const canvas = document.createElement('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
document.body.appendChild(canvas)

const ctx = canvas.getContext('2d')

function render () {
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

    for (let playerId in players) {
        const { color, x, y } = players[playerId]
        ctx.fillStyle = color
        ctx.fillRect(x, y, 50, 50)
        if (playerId === myPlayerId) {
            ctx.strokeRect(x, y, 50, 50)
        }
    }
}

function gameloop () {
    requestAnimationFrame(gameloop)
    logic()
    render()
}

socket.on('connect', function () {
    socket.on('world:init', function (serverPlayers, myId) {
        myPlayerId = myId
        myPlayer.id = myId
        players = serverPlayers
        players[myId] = myPlayer
    })

    socket.on('playerMoved', function (player) {
        players[player.id] = player
    })

    socket.on('playerDisconnected', function (playerId) {
        delete players[playerId]
    })
})

requestAnimationFrame(gameloop)