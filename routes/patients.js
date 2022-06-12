const express=require('express');
const router=express.Router();
const passport=require('passport');

const PatientController=require('../controllers/patient_controller');
router.get('/sign-up',PatientController.SignUp_patient);
router.post('/create',PatientController.create);
// use passport as a middleware to authenticate
router.post('/createSession',passport.authenticate(
    'patient-local',
    {failureRedirect:'/users/SignIn'},
),PatientController.createSession);

// sigin/Signup with google
router.get('/auth/google',passport.authenticate
(
    'patient-google',{scope:['profile','email']}
));
router.get('/auth/google/callback',passport.authenticate
(   'patient-google',
    {failureRedirect:'/users/signIn'}),
    PatientController.createSession
);
router.get('/profile/:id',passport.checkAuthentication,PatientController.profile);
router.post('/update/:id',passport.checkAuthentication,PatientController.update);
router.get('/sign-out',PatientController.destroySession);
module.exports=router;