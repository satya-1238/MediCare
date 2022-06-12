const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/public/uploads/avatars');
console.log(AVATAR_PATH);
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
    qualifications:{
        type:String,
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
        default:'doctor',
        required:true
   },
   avatar:{
       type:String  //store file's address
   }
},{
    timestamps:true

});

doctorSchema.index(
    {
        name:"text",
        locations:"text",
        services:"text",
    }
    
    );
 
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(req.params.id);
        console.log(__dirname);
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
       console.log(path);
    },
    filename: function (req, file, cb) {
        console.log(file.fieldname + '-' + Date.now()+'-'+req.params.id);
      cb(null, file.fieldname + '-' + Date.now()+'-'+req.params.id);
    }
  })
// static fns
doctorSchema.statics.uploadedAvatar=multer({storage:storage}).single('avatar');
doctorSchema.statics.avatarPath=AVATAR_PATH;
const Doctor=mongoose.model('Doctor',doctorSchema);
module.exports=Doctor;
