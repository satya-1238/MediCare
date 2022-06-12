const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/public/uploads/avatars');

const patientSchema=new mongoose.Schema(
{
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
    appointments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Appointment'
    }],
    user_type:{
         type:String,
         default:'patient',
         required:true
    },
    address:{
        type:String,
    },
    gender:{
        type:String
    },
    phone:{
        type:String
    },
    avatar:{
         type:String  //store files address
    },
}, {
    timestamps:true
});
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(req.params.id);
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+'-'+req.params.id);
    }
  })
  patientSchema.statics.uploadedAvatar=multer({storage:storage}).single('avatar');
  patientSchema.statics.avatarPath=AVATAR_PATH;
const Patient=mongoose.model('Patient',patientSchema);
module.exports=Patient;