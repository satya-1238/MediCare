
const express=require('express');
const router=express.Router();



const homeController=require('../controllers/home_controller');
console.log("Router Loaded");
router.get('/',homeController.home);

// use another routes
router.use('/users',require('./users'));







// for exporting to outer files
module.exports=router;