const express=require('express');
const router=express.Router();
const passport=require('passport');
const appointmentController=require('../controllers/appointment_controller');
router.get('/do/:id',passport.checkAuthentication,appointmentController.show);
router.post('/create',passport.checkAuthentication,appointmentController.create);
router.get('/my/:id',passport.checkAuthentication,appointmentController.my);
router.get('/patient_appointment/:id',passport.checkAuthentication,appointmentController.patient_appointment);
router.get('/cancel/:id',passport.checkAuthentication,appointmentController.destroy);
// router.post('/patientconfirm',appointmentController.confirm);

// for exporting to outer files
module.exports=router;