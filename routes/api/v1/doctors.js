const express=require('express');
const router=express.Router();
const doctorApi=require("../../../controllers/api/v1/doctors_api");

router.get('/',doctorApi.index);
router.get('/createSession',doctorApi.createSession);
module.exports=router;