const express=require('express');
const router=express.Router();
const passport=require('passport');
const DoctorController=require('../controllers/doctors_controller');
const ConsultController=require('../controllers/consultation_controller');

router.get('/consult/:id',ConsultController.consult);
router.get('/meeting',ConsultController.meeting);


module.exports=router;