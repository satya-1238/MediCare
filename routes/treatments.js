const express=require('express');
const router=express.Router();
const passport=require('passport');
let path = require('path');
router.use(express.static(path.join(__dirname,'../../public')));
router.use(express.static(path.join(__dirname,'../../public/uploads')));

const treatmentController=require('../controllers/treatment_controller');
router.get('/reports/:id',treatmentController.reports);
router.use('/uploadmultiple',treatmentController.uploadmultiple);
router.get('/ByMe/:id',treatmentController.treatmentByDoctor);
router.get('/My/:id',treatmentController.treatmentOfPatient);
router.get('/detail/:id',treatmentController.treatmentDetail);
//for updating patients weight,temp,bp; 
router.post('/update/:id',treatmentController.update);
router.get('/download/:id',treatmentController.download);
router.get('/delete/:id',treatmentController.delete);
router.post('/lastupdate/:id',treatmentController.LastUpdate);
router.post('/notes/:id',treatmentController.notes);

module.exports=router;