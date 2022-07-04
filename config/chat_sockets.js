const formatMessage = require("../assets/js/chatMessage");
const OnlineUser = require("../models/onlineUser");
const Chat = require("../models/chatMessage");
/// server site
module.exports.chatSockets = function (socketServer) {
  let io = require("socket.io")(socketServer, {
    cors: {
      origin: "http://localhost:8000",
      methods: ["GET", "POST"],
      credentials:true,
    },
  });

  io.sockets.on("connection", function (socket) {
    console.log("new connection received", socket.id);
    socket.on("chatMessage", (data) => {
      console.log("Inside Chat Message");
      var formatteddata = formatMessage(data);
      Chat.create({
        from: formatteddata.from,
        to: formatteddata.to,
        senderEmail: formatteddata.senderEmail,
        recieverEmail: formatteddata.recieverEmail,
        message: formatteddata.message,
        date: formatteddata.date,
        time: formatteddata.time,
      },function(err,res)
      {
         if(err)
         {
            console.log('error',err);
            return;
         }
         socket.emit('message',formatteddata);
      });
      OnlineUser.findOne({ email: data.recieverEmail }, (err, res) => {
        //checks if the recipient of the message is online
        if (err) throw err;
        console.log('res in order to emit to reciver',res);
        if (res != null)
        {
          socket.to(data.chatroom).emit('message',formatteddata);
        }
        //if the recipient is found online, the message is emmitted to him/he
      });
    });

    socket.on("userDetails", (data) => {
      //checks if a new user has logged in and recieves the established chat details
      console.log(data);
      console.log("Inside userdetails fn");
      //   console.log(data);
        socket.join(data.chatroom);
        OnlineUser.create({
          name: data.from,
          email: data.senderEmail,
          ID: socket.id,
        });
        console.log(data.senderEmail,data.recieverEmail);
        const query1={
            "senderEmail":{"$in":[data.senderEmail,data.recieverEmail]},
            "recieverEmail":{"$in":[data.senderEmail,data.recieverEmail]}
        }
        const query2={
            projection: {_id:0}
        }
        Chat.find(query1,query2,function(err,chat)
        {
            if(err)
            {
                console.log('error',err);
                return;
            }
            
            // console.log(chat);
            socket.emit('output',chat); //emits the entire chat history to client
        });
        

    });

    // for disconnecting
    var userID = socket.id;
    socket.on("disconnect", () => {
      var myquery = { ID: userID };
      OnlineUser.deleteOne(myquery, function (err, res) {
        //if a user has disconnected, he/she is removed from the online users' collection
        if (err) throw err;
        console.log(res);
        console.log("User " + userID + "went offline...");
      });
    });
  });
};
