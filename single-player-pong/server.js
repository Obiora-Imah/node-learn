
const http = require('http')
const io =  require('socket.io')

const apiServer = require('./app')
const socketIO = require('./sockets')

const httpServer = http.createServer(apiServer);
const ioServer = io(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})
  

const PORT = 3000

httpServer.listen(PORT)
console.log(`Server listening on port ${PORT}`)
socketIO.listen(ioServer)