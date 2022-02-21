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
    appointments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Appointment'
    }],
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
   },
   loc: {
    type: { type: String },
    coordinates: [Number],
}
},{
    timestamps:true

});

doctorSchema.index({ loc: '2dsphere' });
// doctorSchema.index(
//     {
//         // name:"text",
//         // locations:"text"
//     }
    
//     );
const Doctor=mongoose.model('Doctor',doctorSchema);
module.exports=Doctor;
