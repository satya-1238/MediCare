const express=require('express');
const router=express.Router();

const DoctorController=require('../controllers/doctors_controller');
router.get('/sign-up',DoctorController.SignUp_doctor);
router.post('/create',DoctorController.create);
router.post('/createSession',DoctorController.createSession);
router.get('/profile',DoctorController.profile);
router.get('/sign-out',DoctorController.destroySession);


module.exports=router;