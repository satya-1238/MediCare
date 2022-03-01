const mongoose=require("mongoose");

const messageSchema=new mongoose.Schema(
{
    consultationId:{
        type:String
    },
    sender:{
        type:String,
    },
    content:{
       type:String,
    }
},
{timestamps:true}
);

const message=mongoose.model('message',messageSchema);
module.exports=message;