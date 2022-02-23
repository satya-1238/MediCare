const express=require('express');
const router=express.Router();
const patientApi=require("../../../controllers/api/v1/patients_api");

router.get('/createSession',patientApi.createSession);
module.exports=router;