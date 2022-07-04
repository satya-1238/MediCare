//create a routes
const express=require('express'); 
const router=express.Router(); 
const paymentController=require("../controllers/appointment_controller");
router.get('/checkout',paymentController.checkout);
router.post('/pay-verify',paymentController.paymentVerify);
module.exports=router;