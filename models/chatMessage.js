const mongoose=require('mongoose');

const chatSchema=new mongoose.Schema({
    from:{
        type:String,
    },
    to:{
        type:String,
    },
    senderEmail:{
       type:String,
    },
    recieverEmail:{
        type:String,
    },
    message:{
        type:String,
    }
    ,date:{
        type:String,
    },
    time:{
        type:String,
    }
})

const ChatMessage=mongoose.model('chatMessage',chatSchema);
module.exports=ChatMessage;