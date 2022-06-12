
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

//update patient's profile
module.exports.update=async function(req,res){
    // console.log(req.user);
    // console.log(req.body);
    if(req.user.id==req.params.id)
    {
        console.log("update");
        try{
            let patient=await Patient.findById(req.params.id);
            Patient.uploadedAvatar(req,res,function(err)
            {
                  if(err)
                  {
                      console.log("error in multer",err);
                    
                  }
                  patient.name=req.body.name;
                  patient.email=req.body.email;
                  patient.phone=req.body.phone;
                  patient.address=req.body.address;
                  patient.gender=req.body.gender;
                  patient.weight=req.body.patient;
                  patient.temperature=req.body.temperature;
                  patient.bloodpressure=req.body.bloodpressure;
                  if(req.file)
                  {
                      // if(doctor.avatar)
                      // {
                      //     fs.unlinkSync(path.join(__dirname,'..',doctor.avatar));
                      // }
                      //saving the uploaded file into the db doctor; 
                      
                      patient.avatar=Patient.avatarPath+'/'+req.file.filename;
                  }
                patient.save()
            });
            // console.log(patient);
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




