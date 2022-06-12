// // client site

socket = io.connect("http://localhost:5000");
const chatForm=document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix:true
});
let senderEmail;
function storeDetails() {
  from = document.getElementById('from').value;
  to = document.getElementById('to').value;
  senderEmail = document.getElementById('senderEmail').value;
  recieverEmail = document.getElementById('recieverEmail').value;
  chatroom=document.getElementById('chatroom').value;
  element = document.querySelectorAll(".chat-messages");
  console.log(senderEmail,recieverEmail,from,to,chatroom);
  socket.emit("userDetails", {
            senderEmail,
            recieverEmail,
            from,
            to,
            chatroom,
          }); //emits details of established chat
}

chatForm.addEventListener('submit',(e)=>{
     e.preventDefault();
     console.log("chatform event Listener");
     const msg = e.target.elements.msg.value;
    //  console.log("Message:",msg);
     if (msg!=="") {
              socket.emit("chatMessage", {
                //emit chat message along with sender and reciever info
                msg,
                senderEmail,
                recieverEmail,
                from,
                to,
                chatroom,
              });
            }
            document.getElementById('msg').value="";
})
// socket.on('output',(data) =>{
//   console.log(data);
// });
socket.on('output',(data) => { //recieves the entire chat history upon logging in between two users and displays them
  console.log('output function');
  console.log('data');
  for(var i=0; i<data.length;i++) {
      outputMessage(data[i]);
      console.log(data[i]);
  }
  chatMessages.scrollTop=chatMessages.scrollHeight;
});

socket.on('message',(data) => { //recieves a message and displays it
          outputMessage(data);
      console.log('message recieved from server:');
      console.log(data);
  chatMessages.scrollTop=chatMessages.scrollHeight;
});

function outputMessage(message) {
  const newMessage = document.createElement('li');
  let messageType = 'other-message';
  console.log("messagesenderEmail:",message.senderEmail);
  console.log("senderEmail",senderEmail);
    if (message.senderEmail == senderEmail){
                messageType = 'self-message';
      }
  
  newMessage.innerHTML=`<p class="meta">${message.from}<span> ${message.time}, ${message.date}</span></p>
  <p class ="text">
      ${message.message}
  </p>`;
  newMessage.classList.add(messageType);
  document.querySelector('.chat-messages').appendChild(newMessage);
}

// // class Chat {
// //   constructor(chatBoxId, senderEmail, recieverEmail, from, to) {
//     // this.chatBox = $(`#${chatBoxId}`);
//     // this.senderEmail = senderEmail;
//     // this.recieverEmail = recieverEmail;
//     // this.from = from;
//     // this.to = to;

//     //  send the connection request
//     this.socket = io.connect("http://localhost:5000");
//     if (this.senderEmail) {
//       this.connectionHandler();
//     }
//   // }
//   // connectionHandler() {
//     let self = this;
//     console.log("inside connectionHandler");
//     this.socket.on("connect", function () {
//       self.socket.emit("userDetails", {
//         senderEmail: self.senderEmail,
//         recieverEmail: self.recieverEmail,
//         from: self.from,
//         to: self.to,
//       });
//     });
//     // send a message on clicking btn
//     $("#send-message").click(function () {
//       let msg = $("#chat-message-input").val();
//       // console.log(msg);
//       if (msg != "") {
//         self.socket.emit("chatMessage", {
//           //emit chat message along with sender and reciever info
//           message: msg,
//           senderEmail: self.senderEmail,
//           recieverEmail: self.recieverEmail,
//           from: self.from,
//           to: self.to,
//         });
//       }
//     });
//     self.socket.on("output", (data) => {
//       for (var i = 0; i < data.length; i++) {
//         recieve_message(data[i]);
//       }
//       $("#messages-list").scrollTop=$('footer').scrollHeight;
//     });

//     self.socket.on("message", (data) => {
//       recieve_message(data);
//       $("#messages-list").scrollTop=$('footer').height;
//     })

//     function recieve_message(data) {
//       let newMessage = $("<li>");
//       let messageType = "other-message";

//       if (data.senderEmail == self.senderEmail) {
//         messageType = "self-message";
//       }
//       newMessage.append(
//         $("<span>", {
//           html: data.message,
//         })
//       );
//       newMessage.append(
//         $("<sub>", {
//           html: data.from,
//         })
//       );
//       newMessage.append(
//         $("<sub>", {
//           html: data.date,
//         })
//       );
//       newMessage.addClass(messageType);
//       $("#messages-list").append(newMessage);
//     }
//   }
// // }
