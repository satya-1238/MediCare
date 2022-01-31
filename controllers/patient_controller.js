
const Patient=require('../models/patient');

module.exports.SignUp_patient=function(req,res){
    
    if(req.isAuthenticated())
    {
        return res.redirect('/patients/profile');
    }
    return res.render('patient_signup',{
        title:"Medicare-patient-signup"
    })
}
module.exports.profile=function(req,res){
     
    Patient.findById(req.params.id,function(err,patient){
        return res.render('patient_profile',{
            title:"Patient-profile",
           profile_patient:patient
        });
    });
}

// get the signUp data
module.exports.create=function(req,res)
{
    
    if(req.body.password!=req.body.confirm_password)
    {
        // console.log("Not Matched");
        return res.redirect('back');
    }

    // check duplicate patients
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
                
                User.create(req.body,function(err,user){
                    if(err)
                    {
                        console.log("error in save user_type");
                        return;
                    }
              });
                return res.redirect('/Users/SignIn');
            });
        }else{
            return res.redirect('back');
        }   
    });
}
module.exports.createSession=function(req,res){
    
    return res.redirect('/');
}

module.exports.destroySession=function(req,res){
    req.logout();
    console.log("logOut successFully")
    return res.redirect('/');
}



