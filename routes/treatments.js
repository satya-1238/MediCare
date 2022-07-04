const express=require('express');
const router=express.Router();
const passport=require('passport');
let path = require('path');
router.use(express.static(path.join(__dirname,'../../public')));
router.use(express.static(path.join(__dirname,'../../public/uploads')));

const treatmentController=require('../controllers/treatment_controller');
// get reports
router.get('/reports/:id',treatmentController.reports);
// upload reports
router.use('/uploadmultiple',treatmentController.uploadmultiple);
router.get('/ByMe/:id',treatmentController.treatmentByDoctor);
// get treatment details
router.get('/My/:id',treatmentController.treatmentOfPatient);
// get treatment details
router.get('/detail/:id',treatmentController.treatmentDetail);
// delete the treatment
router.get('/treatmentdelete/:id',treatmentController.treatmentDelete);
//for updating patients weight,temp,bp; 
router.post('/update/:id',treatmentController.update);
// report download
router.get('/download/:id',treatmentController.download);
//reports delete
router.get('/delete/:id',treatmentController.delete);
// update treatment
router.post('/lastupdate/:id',treatmentController.LastUpdate);
// keep hidden notes
router.post('/notes/:id',treatmentController.notes);

module.exports=router;