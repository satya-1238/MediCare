const Doctor=require('../../../models/doctor');

const jwt=require('jsonwebtoken');

// Sign In and create the session for User
module.exports.createSession=async function(req,res){
        
    console.log(req.query);
        Doctor.findOne({email:req.query.email},function(err,doctor)
        {
            console.log(doctor);
            
            if(!doctor || doctor.password!=req.query.password)
            {
                return res.json(422,{
                    message:"Invalid username or password"
                });
            }
            return res.json(200,{
                message:"Sign in Successfully",
                data:{
                    token:jwt.sign(doctor.toJSON(),'MediCare',{expiresIn:'100000'})
    
                }
            })
        })
}
module.exports.index=async function(req,res)
{
    try {
        let doctors=await Doctor.find({});
    
        return res.json(200,{
            message:"list of doctors",
            doctors:doctors
        })
      }
     
        catch (error) {
           console.log(error);
       }
}