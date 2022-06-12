const res = require("express/lib/response");
const Doctor = require("../models/doctor");
// required fs and path for removing existing avatar
const fs=require('fs');
const path=require('path');

module.exports.SignUp_doctor = function (req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('doctors/profile');
    }
    return res.render('doctors_signup', {
        title: "Medicare-doctor-signup"
    })
}

// Access the profile specific to doctor
module.exports.profile = function (req, res) {

    console.log(req.params.id);
    // console.log(req.session.id);
    Doctor.findById(req.params.id, function (err, doctor) {
        
        // console.log(doctor);
        return res.render('doctors_profile', {
            title: "doctor-profile",
            profile_doctor: doctor
        })
    });
}

// get the signUp data
module.exports.create = function (req, res) {
    // check password and confirm_password
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    // check duplicate doctors
    Doctor.findOne({ email: req.body.email }, function (err, doctor) {
        if (err) {
            console.log('error in finding use in signingup')
            return;
        }
        if (!doctor) {
            Doctor.create(req.body, function (err, doctor) {
                if (err) {
                    console.log('error in creating while signing up');
                    return;
                }
                return res.redirect('/Users/SignIn');
            });
        } else {
            return res.redirect('back');
        }
    });
}

// signIn
module.exports.createSession = function (req, res) {
    // req.flash('success','Logged in Successfully');
    return res.redirect('/');
}

// Signout
module.exports.destroySession = function (req, res) {
    req.logout();
    console.log("logOut successFully")
    return res.redirect('/');
}
 
// finding the doctor

// finding all doctors
module.exports.find_doctor=async function(req,res){
        
   try {
    let doctors=await Doctor.find({});

    return res.render('find_doctor',{
        title:"Medicare:Doctors",
        doctors_list:doctors  
    });
  }
 
    catch (error) {
       console.log(error);
   }
    
}

// Using Name
module.exports.find_doctorByName=function(req,res){

    // console.log(req.body.name);
    Doctor.find({name:req.body.name},function(err,doctors){
        if(err)
        {
            console.log("Error in fetching doctors from db");
            return;
        }
        return res.render('find_doctor',{
            title:"Medicare:Doctors",
            doctors_list:doctors  
        });
    })
}

// Using Location
module.exports.find_doctorByLocation=function(req,res){

    // console.log(req.body);
    Doctor.find({locations:req.body.location},function(err,doctors){
        if(err)
        {
            console.log("Error in fetching doctors from db");
            return;
        }
        return res.render('find_doctor',{
            title:"Medicare:Doctors",
            doctors_list:doctors  
        });
    })
    

}
// Using Location
module.exports.find_doctorByService=function(req,res){

    // console.log(req.body);
    
    Doctor.find({services:req.body.service},function(err,doctors){
        if(err)
        {
            console.log("Error in fetching doctors from db");
            return;
        }
        return res.render('find_doctor',{
            title:"Medicare:Doctors",
            doctors_list:doctors  
        });
    })
}

// search Bar
module.exports.search=async function(req,res){
    const doctors=await Doctor.find({$text:{$search:req.query.docname}});
    res.render('find_doctor',{
            title:"Medicare:Doctors",
            doctors_list:doctors 
    })
}

// update the Info  doctor's profile

module.exports.update=async function(req,res){
    // console.log(req.user);
    // console.log(req.body);
    if(req.user.id==req.params.id)
    {

        try{
            let doctor=await Doctor.findById(req.params.id);
            Doctor.uploadedAvatar(req,res,function(err)
            {
                  if(err)
                  {
                      console.log("error in multer",err);
                    
                  }
                  doctor.name=req.body.name;
            doctor.email=req.body.email;
            doctor.phone=req.body.phone;
            doctor.locations=req.body.locations;
            doctor.qualifications=req.body.qualifications;
            doctor.services=req.body.services;
            doctor.gender=req.body.gender;
            doctor.experience=req.body.experience;
            if(req.file)
            {
                // if(doctor.avatar)
                // {
                //     fs.unlinkSync(path.join(__dirname,'..',doctor.avatar));
                // }
                //saving the uploaded file into the db doctor; 
                doctor.avatar=Doctor.avatarPath+'/'+req.file.filename;
            }
            doctor.save()

                //   console.log(req.file);

            });
            // console.log(doctor);
            return res.redirect('back');

        }
        catch(error)
        {
            console.log(error)
            return res.redirect('back');
        }
    }
    else{
        console.log("Unathorised User");
        return res.redirect('/');
    }
}

