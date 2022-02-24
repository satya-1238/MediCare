const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const Doctor=require('../models/doctor');
const Patient=require('../models/patient');

passport.use('doctor-google',new googleStrategy({
    clientID:"dakfmnffpaabe",
    clientSecret:"UWKEJPOLSD085",
    callbackURL:"/abd/find",

    },
    function(accessToken,refreshToken,profile,done){
        
          Doctor.findOne({
            email:profile.emails[0].value
        }).exec(function(err,doctor)
        {
            if(err)
            {
                console.log('error in google strategy-passport',err);
                return;
            }
            console.log(accessToken,refreshToken);
           
            if(doctor)
            {
                // if founnd set this as req.user
                return done(null,doctor);
            }else{
                // doctor not find in create
                Doctor.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,doctor){
                    if(err){
                    console.log('error in creating doctor google strategy-passport',err);
                return;
                    }
                    return done(null,doctor);
                })
            }
        })
    }

));
passport.use('patient-google',new googleStrategy({
    clientID:"dakfmnffpaabe",
    clientSecret:"UWKEJPOLSD085",
    callbackURL:"/abd/find",

    },
    function(accessToken,refreshToken,profile,done){
        
          Patient.findOne({
            email:profile.emails[0].value
        }).exec(function(err,patient)
        {
            if(err)
            {
                console.log('error in google strategy-passport',err);
                return;
            }
            console.log(accessToken,refreshToken);
            console.log("profile\n:");
            console.log(profile);
            if(patient)
            {
                // if founnd set this as req.user
                return done(null,patient);
            }else{
                // doctor not find in create
                Patient.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,patient){
                    if(err){
                    console.log('error in creating patient google strategy-passport',err);
                return;
                    }
                    return done(null,patient);
                })
            }
        })
    }

));
module.exports=passport;