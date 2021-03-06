const { response } = require('express')
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uiidV4 } = require('uuid')

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    //res.redirect(`/${uiidV4()}`)
    res.redirect('my-room-test')
})

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room })
})

// socket connection
io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId)
        socket.to(roomId).broadcast.emit('user-connected', userId)

        socket.on('disconnect', () => {
            socket.to(roomId).broadcast.emit('user-disconnected', userId)
        })
    })
})
const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`App listening on port ${PORT}`))

