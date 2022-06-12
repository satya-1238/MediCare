const mongoose=require('mongoose');

const onlineUserSchema=mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    ID:{
        type:String,
    }
})

const OnlineUser=mongoose.model('onlineUser',onlineUserSchema);
module.exports=OnlineUser;