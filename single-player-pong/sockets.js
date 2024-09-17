
let playersCount = 0
const listen = (io) => {
    
    const socketNamespace = io.of('/pong')
    socketNamespace.on('connection', (socket) => {
        const roomNumber = Math.floor(playersCount / 2)
        const room = `room-${roomNumber}`
        console.log('Room number is ', roomNumber);
        
        console.log('Player connected as ', socket.id)
        socket.on('ready', () => {
            console.log('Player is ready')
            socket.join(room)
            playersCount += 1
            if(playersCount % 2 === 0) {
            //   socket.emit('player', 1)
                socketNamespace.in(room).emit('start', socket.id)
            }
        });
        socket.on('disconnect', (reason) => {
            console.log(`Player ${socket.id} disconnected  because of ${reason}`)
            if(reason  === 'io server disconnect') {
                socket.connect()
            }
            socket.leave(room)
        })

        socket.on('paddleMove', (data) => {
            socket.to(room).emit('paddleMove', data)
        })
        socket.on('ballMove', (data) => {
            socket.to(room).emit('ballMove', data)
        })
    });
}

module.exports = {
    listen
}