
const mongoose=require('mongoose');
const Doctor=require('./doctor');
const Patient=require('./patient');
const Appointment=require('./appointment');
const treatmentSchema=new mongoose.Schema({
     doctor:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'Doctor'
     },
     patient:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'Patient'
     },
     disease:{
         type:String
     },
     appointments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Appointment'
    }],
    weight:{
        type:Number,
    },
    bloodPressure:{
        type:Number,
    },
    temperature:{
        type:Number,
    },
    pulseRate:{
        type:Number
    },
    RespirationRate:{
        type:Number
    },
    startDate:{
                type:String,
    },
    lastDate:{
                type:String,
    },
    lastupdate:{
        type:String
    },
},{
    timestamps:true
});


const Treatment=mongoose.model('treatment',treatmentSchema);
module.exports=Treatment;