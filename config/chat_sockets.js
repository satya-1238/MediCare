// server site
module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer,{
        cors: {    
            origin: "http://localhost:8000",    
            methods: ["GET", "POST"] 
    }});
    // recieve connection
    io.sockets.on('connection', function(socket){
        console.log('new connection received', socket.id);
        socket.on('disconnect', function(){
            console.log('socket disconnected!');
        });
        socket.on('join_room',function(data)
        {
            console.log('request for joining recieved',data);
            socket.join(data.chatroom);
            io.in(data.chatroom).emit('user_joined',data);
        });
        // reciev message form user and emit to other users in chat
        socket.on('send_message',function(data)
        {
            // console.log(data.message);
            io.in(data.chatroom).emit('receive_message',data);
        })
    });
}