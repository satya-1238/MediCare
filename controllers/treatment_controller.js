
var fs = require('fs');
let path = require('path');
// var multer=require('../MiddleWares/multer');
const Doctor=require('../models/doctor');
const Patient=require('../models/patient');
const Treatment=require('../models/treatment');
const fileses=require('../models/fileSchema');
const History=require('../models/history');
const Notes=require('../models/hiddenNotes');
const multer = require('multer');

module.exports.treatmentByDoctor=async function(req,res)
{
      const treatments=await Treatment.find({doctor:req.params.id})
        .sort({'createdAt':-1})
        .populate({
            path:'patient'
        })
        // console.log(treatment.length);
    
        // console.log(treatment);
            return res.render('treatmentByDoctor',{
                title:"treatments",
                treatments:treatments,
                user:req.user
            })
}
module.exports.treatmentOfPatient=async function(req,res)
{
        const treatments=await Treatment.find({patient:req.params.id})
        .sort({'createdAt':-1})
        .populate({
            path:'doctor'
        })
        // console.log(treatment.length);
    
        // console.log(treatment);
            return res.render('treatmentByDoctor',{
                title:"treatments",
                treatments:treatments,
                user:req.user
            })
}

// treatment detail

module.exports.treatmentDetail=async function(req,res)
{
    const treatment=await Treatment.findById(req.params.id)
     .populate({path:'patient'})
     .populate({path:'doctor'})
    //  const history=await History.findById({from:req.user.email});
    // console.log(req.user);
    var history;
    var update=[];
    if(req.user.user_type==='patient')
      history=await History.find({from:req.user.email}).sort({"createdAt":-1});
    else{
      history=await History.find({from:req.user.email,to:treatment.patient.email}).sort({"createdAt":-1});
      update=await History.find({from:req.user.email,to:treatment.patient.email}).sort({"createdAt":-1}).limit(2);
     }
     var notes=[];
     notes=await Notes.find({treatment:req.params.id}).sort({"createdAt":-1});
     console.log(notes);


    //  console.log(history);
     return res.render('treatment_detail',{
             title:'treatment',
             treatment:treatment,
             user:req.user,
             history:history,
             update:update,
             notes:notes,
    });
}

module.exports.update=async function(req,res)
{
            
            let treatment=await Treatment.findById(req.params.id)
            .populate({path:'patient'});
            var today = new Date();
            var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const datetime=date+' '+time;
            var w=req.body.weight,t=req.body.temperature,b=req.body.bloodpressure,p=req.body.pulserate,r=req.body.respirationrate;
            if(!w)
            {
                w='notmeasured'
            }
            if(!t)
            {
                t='notmeasured'
            } if(!b)
            {
                b='notmeasured'
            } if(!p)
            {
                p='notmeasured'
            } if(!r)
            {
                r='notmeasured'
            }
            
            let history=History.create({
                from:treatment.patient.email,
                to:req.user.email,
                content: `Your weight:${w} temperature:${t} bloodpressure:${b} pulserate:${p} respirationrate:${r} as updated by Dr.${req.user.name} on ${date} at ${time}`,
                datetime:datetime
            })
            let history1=History.create({
                from:req.user.email,
                to:treatment.patient.email,
                content: `on ${date} at ${time},patient ${treatment.patient.name}'s weight:${w} temperature:${t} bloodpressure:${b} pulserate:${p} respirationrate:${r}`,
                datetime:datetime
            })

            // console.log(treatment);
            // console.log(history);
            treatment.weight=req.body.weight;
            treatment.temperature=req.body.temperature;
            treatment.bloodPressure=req.body.bloodpressure;
            treatment.pulseRate=req.body.pulserate;
            treatment.respirationRate=req.body.respirationrate;
            treatment.save();
            res.redirect('back');
}
module.exports.LastUpdate=async function(req,res)
{
           var today = new Date();
           var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
           var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
           const datetime=date+' '+time;
           let treatment=await Treatment.findById(req.params.id)
            .populate({path:'patient'});
            let history=History.create({
                from:treatment.patient.email,
                to:req.user.email,
                content: req.body.lastupdate,
                datetime:datetime
            })
            let history1=History.create({
                from:req.user.email,
                to:treatment.patient.email,
                content: req.body.lastupdate,
                datetime:datetime
            })
            res.redirect('back');
}
module.exports.notes=async function(req,res)
{
    console.log(req.body);
    var today = new Date();
            var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const datetime=date+' '+time;
    const notes=Notes.create({
        treatment:req.params.id,
        content:req.body.notes,
        datetime:datetime
    })
    res.redirect('back');

}
//for uploading files
module.exports.uploadmultiple = (req, res) => {

    console.log("In order to upload files...")
    fileses.upload(req,res, (err) => {
        if (err)
            res.send("format")
        else{
           const files = req.files
              if(files.length == 0) 
                res.send('false');
               else {
                //    console.log(req.body);
                    for(var i=0;i<files.length;i++) {

                    var obj = new Object();
                    obj.to = req.body.title;
                    obj.from = req.user.email;
                    obj.senderName=req.user.name;
                    obj.recieverName=req.body.recieverName;
                    obj.message = req.body.message;
                    obj.fileName = files[i].filename
                    obj.originalName = files[i].originalname;
                    obj.type = files[i].mimetype;
                    obj.entryDate = req.body.entryDate;

                        fileses.create(obj,function(error,res) {
                            if(error)
                            throw error;
                        })
                    }
                    res.send('true');
               }     
            }
    })
}
module.exports.reports=async function(req,res)
{
        const treatment=await Treatment.findById(req.params.id)
     .populate({path:'patient'})
     .populate({path:'doctor'})
    //  console.log(treatment);
     const files1= await fileses.find({from:treatment.patient.email,to:treatment.doctor.email}).sort({'createdAt':-1});
     const files2= await fileses.find({from:treatment.doctor.email,to:treatment.patient.email}).sort({'createdAt':-1});
     
    //  console.log(files);
     res.render('reports',{
         title:'reports',
         treatment:treatment,
         files1:files1,
         files2:files2,
         user:req.user
     })
}

module.exports.download=async function(req,res)
{
    const file=await fileses.findById(req.params.id);
    const path=__dirname+'/..'+'/public/uploads/'+file.fileName;
    // console.log(path);
    res.download(path);
}
module.exports.delete=async function(req,res)
{
    // console.log("in order to delete");
    const file=await fileses.findById(req.params.id);
    const path=__dirname+'/..'+'/public/uploads/'+file.fileName;
//    console.log(path);
    fs.unlinkSync(path);
    file.remove();
    res.redirect('back');
}