const  mongoose = require('mongoose');
const multer=require('multer');


const  fileSchema = new mongoose.Schema({
	from: {
        type:String,
    },
    to: {
        type:String,
    },
    senderName:{
        type:String,
    },
    recieverName:{
       type:String,
    },
    message: {
        type:String,
    },
    fileName: {
        type:String,
    },
    originalName: {
        type:String,
    },
    entryDate: {
        type:String,
    },
},{
    timestamps:true
})

function sanitizeFile(file, cb) {
    let fileExts = ['png', 'jpg', 'jpeg', 'gif', 'pdf']
    let isAllowedExt = fileExts.includes(file.originalname.split('.')[1].toLowerCase());

    if(isAllowedExt){
        return cb(null ,true) 
    }
    else{
       cb('Error: File type not allowed!')
    }
}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        // console.log(req.user);
      var photoname =file.originalname + '-' + Date.now()+'-'+req.user.id;
      cb(null, photoname);
    }
})

fileSchema.statics.upload = multer({ storage: storage ,
    fileFilter: function (req, file, cb) {
    sanitizeFile(file, cb);   
    }
}).array('myFiles')


const Filecollection=mongoose.model('filecollection',fileSchema);
module.exports=Filecollection;