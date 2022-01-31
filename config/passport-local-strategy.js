
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Doctor = require('../models/doctor');
const Patient = require('../models/patient');



// Local Stragety for doctors
passport.use('doctor-local', new LocalStrategy({
    usernameField: 'email',
    passreqTocallback: true
},

    function (email, password, done) {
        // console.log(email);
        Doctor.findOne({ email: email }, function (err, doctor) {
            if (err) {
                console.log("error", err);
                return done(err);
            }
            if (!doctor || doctor.password != password) {
                console.log('Invalid Username/Password');
                return done(null, false);
            }
            return done(null, doctor);
        });
    }
));

// Local Strategy for Patients
passport.use('patient-local', new LocalStrategy({
    usernameField: 'email',
    passreqTocallback: true
},

    function (email, password, done) {
        // console.log(email);
        Patient.findOne({ email: email }, function (err, patient) {
            if (err) {
                console.log("error", err);
                return done(err);
            }
            if (!patient || patient.password != password) {
                console.log('Invalid Username/Password');
                return done(null, false);
            }
            return done(null, patient);
        });
    }
));

// serialize the user to decide which key kept in cookie.
passport.serializeUser(function (user, done) {
    // console.log(user.id);
    // console.log("Serialiser");
    done(null, user.id);
});

// desrealize the user from cookie
passport.deserializeUser(function (id, done) {
    // console.log(id);
    Doctor.findById(id, function (err, doctor) {
        if (err) {
            console.log("error in finding doctor in passport");
            return done(err);
        }
        // console.log(doctor);
        // if doctor find
        if (doctor)
            return done(null, doctor);
        else  //else check patient
        {
            Patient.findById(id, function (err, patient) {
                if (err) {
                    console.log("Error in finding patient");
                    return done(err);
                }
                return done(null, patient);
            })
        }
    });

});


// check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
    // if the user is signed in, then pass on the request to the next function(controller's action)
    // console.log(req);
    if (req.isAuthenticated()) {
        // console.log("check authentication");
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/SignIn');
}

passport.setAuthenticatedUser = function (req, res, next) {

    // console.log(req.user.id);
    if (req.isAuthenticated()) {

        if (req.user.user_type == 'doctor')
            res.locals.doctor = req.user;
        else
            res.locals.patient = req.user;

    }
    next();
}


module.exports = passport;


