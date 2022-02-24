const express=require('express');
const router=express.Router();
const passport=require('passport');
const DoctorController=require('../controllers/doctors_controller');


router.get('/sign-up',DoctorController.SignUp_doctor);
router.post('/create',DoctorController.create);
// use passport as a middleware to authenticate
router.post('/createSession',passport.authenticate(
    'doctor-local',
    {failureRedirect:'/users/SignIn'},
),
DoctorController.createSession);
router.get('/profile/:id',passport.checkAuthentication,DoctorController.profile);
router.post('/update/:id',passport.checkAuthentication,DoctorController.update);
router.get('/sign-out',DoctorController.destroySession);

// Finding doctors
router.get('/find_doctor',DoctorController.find_doctor);
router.get('/search',DoctorController.search);
router.post('/find_doctorByName',DoctorController.find_doctorByName);
router.post('/find_doctorByLocation',DoctorController.find_doctorByLocation);
router.post('/find_doctorByService',DoctorController.find_doctorByService);

// signin with google
router.get('/auth/google',passport.authenticate('doctor-google',{scope:['profile','email']
}));
router.get('/auth/google/callback',passport.authenticate('doctor-google',
{failureRedirect:'/users/signIn'}),DoctorController.createSession);

module.exports=router
