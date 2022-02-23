const express=require('express');
const router=express.Router();
const passport=require('passport');
const appointmentApi=require("../../../controllers/api/v1/appointments_api");

router.delete('/:id',passport.authenticate('jwt',{session:false}),appointmentApi.destroy);
router.get('/',appointmentApi.total);
module.exports=router;