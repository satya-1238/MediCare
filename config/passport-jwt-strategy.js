const passport=require('passport');
const JWTStrategy=require('passport-jwt').Strategy;
const ExtractJWT=require('passport-jwt').ExtractJwt;
const env=require('./environment');
const Doctor=require('../models/doctor');
const Patient=require('../models/patient');
let opts={
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
     secretOrKey :env.jwt_secret
}
passport.use(new JWTStrategy(opts,function(jwtPayLoad,done)
{
    Doctor.findById(jwtPayLoad._id, function (err, doctor) {
        if (err) {
            console.log("error in finding doctor in passport");
            return done(err);
        }
        // console.log(doctor);
        if (doctor)
            return done(null, doctor);
        else  //else check patient
        {
            Patient.findById(jwtPayLoad._id, function (err, patient) {
                 
                // console.log(patient);
                if (err) {
                    console.log("Error in finding patient");
                    return done(err);
                }
                if(patient)
                return done(null, patient);
                else
                return done(null,false);
            })
        }
    }); 
}));
module.exports=passport;