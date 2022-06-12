const mongoose=require('mongoose');
const Treatment=require('../models/doctor')

const hiddenNotesSchema=new mongoose.Schema({
    treatment:{
        type:mongoose.Schema.Types.ObjectId,
         ref:'Treatment'
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

const HiddenNotes=mongoose.model('HiddenNotes',hiddenNotesSchema);
module.exports=HiddenNotes;