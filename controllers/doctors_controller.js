const res = require("express/lib/response");
const Doctor = require("../models/doctor");


module.exports.SignUp_doctor=function(req,res){
    return res.render('doctors_signup',{
        title:"Medicare-doctor-signup"
    })
}

// Access the profile specific to doctor
module.exports.profile=function(req,res){
    
    if(req.cookies.doctor_id){
        Doctor.findById(req.cookies.doctor_id,function(err,doctor){
            if(doctor)
            {
                return res.render('doctors_profile',{
                    title:"doctor-profile",
                    doctor:doctor
                })
            }
            else{
                return res.redirect('/users/SignIn');
            }
        });
    }else
    {
        return res.redirect('/users/SignIn');
    }
}

// get the signUp data
module.exports.create=function(req,res)
{
    // check password and confirm_password
    if(req.body.password!=req.body.confirm_password)
    {
        return res.redirect('back');
    }

    // check duplicate doctors
    Doctor.findOne({email:req.body.email},function(err,doctor){
        if(err)
        {
            console.log('error in finding use in signingup')
        return;
        }
        if(!doctor)
        {
            Doctor.create(req.body,function(err,doctor){
                if(err)
                {
                    console.log('error in creating while signing up');
                    return;
                }
                return res.redirect('/Users/SignIn');
            });
        }else{
            return res.redirect('back');
        }   
    });
}

// create the session for doctors
module.exports.createSession=function(req,res)
{   
    // check Doctor have an account or not
    Doctor.findOne({email:req.body.email},function(err,doctor){
        if(err)
        {
            console.log("Acccount Not found");
            return;
        }
        if(doctor){
            if(doctor.password!=req.body.password)
            {
                return res.redirect('back');
            }
            res.cookie('doctor_id',doctor.id);
            return res.redirect('/doctors/profile');
        }
        else{
                return res.redirect('back');
        }
    });
}


module.exports.destroySession=function(req,res){
    req.logout();
    console.log("logOut successFully")
    return res.redirect('/');
}



