const mongoose=require('mongoose');

const doctorSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    services:{
        type:String
    },
    locations:{
        type:String
    },
    gender:{
        type:String
    },
    experience:{
        type:String     
    },
    phone:{
        type:String
    },
    user_type:{
        type:String,
        required:true
   }
},{
    timestamps:true

});


const Doctor=mongoose.model('Doctor',doctorSchema);
module.exports=Doctor;
