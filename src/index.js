const express = require('express')
const { join } = require('path')
const socketIO = require('socket.io')

const app = express()

app.set('port', process.env.PORT || 3000)

app.use(express.static(join(__dirname,'public')))

const server = app.listen(app.get('port'), () => console.log('Server on port', app.get('port') ))

const io = socketIO(server)

io.on('connection', socket =>{
    socket.on('msg', data => io.sockets.emit('msg', data))
    socket.on('typing', data => socket.broadcast.emit('typing',data))
})