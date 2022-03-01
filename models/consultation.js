const mongoose=require("mongoose");

const consultSchema=new mongoose.Schema(
{
    time:{
        type:String
    },
    members:['user1','user2'],
    messages:[{
        sender:{
            type:String,
        },
        text:{
            type:String,
        },
        messagetime:{
             type:String,
        }
    }]
},
{timestamps:true}
);

const consult=mongoose.model('consult',consultSchema);
module.exports=consult;