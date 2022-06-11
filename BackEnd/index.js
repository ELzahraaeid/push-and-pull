const express = require('express')
const app = express()
const http = require('http')

const server = http.createServer(app)
const {Server} = require('socket.io')

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
})

let onlineUsersForNewUser = []
io.on('connection', (socket)=>{
    
    
    socket.on('newUser', (userName)=> {
        const user = {username: userName, id: socket.id}
        socket.broadcast.emit('new-user', user)
        io.to(socket.id).emit('online-users', onlineUsersForNewUser)
        onlineUsersForNewUser.push(user)

    });
    socket.on('new-message', (payload) =>{
       
        io.to(payload.id).emit('new-message', {id:socket.id, message:payload.message})
           
    })
    socket.on('typing-state',(payload) =>{
        io.to(payload.id).emit('typing-state', payload.state? socket.id: 0)
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('delete-user', socket.id);
        onlineUsersForNewUser = onlineUsersForNewUser.filter((user => user.id !== socket.id))
    });
});


server.listen(5000, ()=> {
    console.log('listen on : 5000')
    
})