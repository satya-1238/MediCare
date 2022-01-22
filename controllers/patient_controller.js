
const Patient=require('../models/patient');

module.exports.SignUp_patient=function(req,res){
    return res.render('patient_signup',{
        title:"Medicare-patient-signup"
    })
}
module.exports.profile=function(req,res){
    
    if(req.cookies.patient_id){
        Patient.findById(req.cookies.patient_id,function(err,patient){
            if(patient)
            {
                return res.render('patient_profile',{
                    title:"patient-profile",
                    patient:patient
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
    console.log("Trying to create");
    // console.log(req.body.password);
    // console.log(req.body.confirm_password);
    // check password and confirm_password
    if(req.body.password!=req.body.confirm_password)
    {
        // console.log("Not Matched");
        return res.redirect('back');
    }

    // check duplicate doctors
    Patient.findOne({email:req.body.email},function(err,patient){
        if(err)
        {
            console.log('error in finding use in signingup')
        return;
        }
        if(!patient)
        {
            Patient.create(req.body,function(err,patient){
                if(err)
                {
                    console.log('error in creating while signing up');
                    return;
                }
                console.log("Try to create");
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
    Patient.findOne({email:req.body.email},function(err,patient){
        if(err)
        {
            console.log("Acccount Not found");
            return;
        }
        if(patient){
            if(patient.password!=req.body.password)
            {
                return res.redirect('back');
            }
            res.cookie('patient_id',patient.id);
            return res.redirect('/patients/profile');
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



