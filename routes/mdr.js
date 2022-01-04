const express=require('express');
const router=express.Router();

// About section
const aboutController=require('../controllers/about_controller');
const servicesController=require('../controllers/services_controller');
const diseasesController=require('../controllers/diseases_controller');
router.get('/about',aboutController.about);
router.get('/services',servicesController.services);
router.get('/diseases',diseasesController.diseases);


module.exports=router;