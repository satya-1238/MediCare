const express=require('express');
const router=express.Router();
const passport=require('passport');
const usersController=require('../controllers/users_controller');
router.get('/SignIn',usersController.SignIn);


// for exporting to outer files
module.exports=router;