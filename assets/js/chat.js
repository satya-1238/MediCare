// client site
class Chat{
    constructor(chatBoxId,userEmail)
    {
             this.chatBox= $(`#${chatBoxId}`);
             this.userEmail=userEmail;
            //  send the connection request
             this.socket=io.connect('http://localhost:5000');
             if(this.userEmail){
                 this.connectionHandler();
             }
    }
    connectionHandler(){
        let self=this;
        this.socket.on('connect',function()
        {
            console.log('connection established by sockets...');
            self.socket.emit('join_room',{
                user_email:self.userEmail,
                chatroom:'med'
            });

            self.socket.on('user_joined',function(data)
            {
                console.log(' a user joined',data);
            })

        });
        // send a message on clicking btn
        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();
            console.log(msg);
            if (msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom:'med'
                });
            }
        });

        self.socket.on('receive_message', function(data){
            // console.log('message received', data.message);
             console.log(data);

        let newMessage = $('<li>');

            let messageType = 'other-message';

            if (data.user_email == self.userEmail){
                messageType = 'self-message';
            }

            newMessage.append($('<span>', {
                'html': data.message
            }));

            newMessage.append($('<sub>', {
                'html': data.user_email
            }));

            newMessage.addClass(messageType);
            $('#messages-list').append(newMessage);
        })
    }
}