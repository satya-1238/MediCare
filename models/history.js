const mongoose=require('mongoose');


const historySchema=new mongoose.Schema({
    from:{
       type:String,
    },
    to:{
       type:String,
    },
    content:{
       type:String,
    },
    datetime:{
        type:String,
    }
},{
    timestamps:true
})

const History=mongoose.model('History',historySchema);
module.exports=History;