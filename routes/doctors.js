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
router.get('/sign-out',DoctorController.destroySession);


module.exports=router
