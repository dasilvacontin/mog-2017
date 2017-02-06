const canvas = document.createElement('canvas')
document.body.appendChild(canvas)
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx = canvas.getContext('2d')

ctx.fillStyle = '#ff00ff'
ctx.fillRect(0, 0, canvas.width, canvas.height)

ctx.fillStyle = '#00ffff'
ctx.fillRect(100, 100, 50, 50)

document.addEventListener('mousemove', (event) => {
    ctx.fillRect(event.pageX - 25, event.pageY - 25, 50, 50)
})