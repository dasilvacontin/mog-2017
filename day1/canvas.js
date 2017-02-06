const canvas = document.createElement('canvas')
document.body.appendChild(canvas)
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx = canvas.getContext('2d')

const PURPLE = '#ff00ff'
const CYAN = '#00ffff'

const RIGHT_ARROW = 39
const LEFT_ARROW = 37
const UP_ARROW = 38
const DOWN_ARROW = 40

/*
ctx.fillStyle = PURPLE
ctx.fillRect(0, 0, canvas.width, canvas.height)

ctx.fillStyle = CYAN
ctx.fillRect(100, 100, 50, 50)
*/

/*
document.addEventListener('mousemove', (event) => {
    ctx.fillRect(event.pageX - 25, event.pageY - 25, 50, 50)
})
*/

const player = {
    x: 100,
    y: 100,
    vx: 0,
    vy: 0,
    color: CYAN
}

function logic (delta) {
    player.x += player.vx
    player.y += player.vy
}

function render (delta) {
    // render bg
    ctx.fillStyle = PURPLE
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // render player
    ctx.fillStyle = player.color
    ctx.fillRect(player.x, player.y, 50, 50)

    // wavy
    ctx.style = 'yellow'
    ctx.fillRect(
        0, 0,
        canvas.width * Math.sin(Date.now() / 1000000000000000), 10
    )
}

let lastFrame = Date.now()
function mainLoop () {
    const now = Date.now()
    const delta = now - lastFrame
    lastFrame = now

    logic(delta)
    render(delta)
    requestAnimationFrame(mainLoop)
}
mainLoop()

document.addEventListener('keydown', (event) => {
    event.preventDefault()
    switch (event.keyCode) {
        case UP_ARROW: player.vy--; break;
        case DOWN_ARROW: player.vy++; break;
        case LEFT_ARROW: player.vx--; break;
        case RIGHT_ARROW: player.vx++; break;
    }
})