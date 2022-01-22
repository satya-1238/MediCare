const express=require('express');
const router=express.Router();


const PatientController=require('../controllers/patient_controller');
router.get('/sign-up',PatientController.SignUp_patient);
router.post('/create',PatientController.create);
router.post('/createSession',PatientController.createSession);
router.get('/profile',PatientController.profile);
router.get('/sign-out',PatientController.destroySession);
module.exports=router;