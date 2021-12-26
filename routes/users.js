const express=require('express');
const router=express.Router();

const usersController=require('../controllers/users_controller');
router.get('/profile',usersController.profile);

// for exporting to outer files
module.exports=router;