const mongoose=require('mongoose');
const Doctor=require('./doctor');
const Patient=require('./patient');
const appointmentSchema=new mongoose.Schema({
     doctor:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'Doctor'
     },
     patient:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'Patient'
     },
     symptoms:{
          type:String,

     },
     date:{
         type:String,
     },
    
     mode:{
         type:String,
         default:"online"
     },
     confirmed:{
         type:Boolean,
         default:false
     }
},{
    timestamps:true
});


const Appointment=mongoose.model('Appointment',appointmentSchema);
module.exports=Appointment;