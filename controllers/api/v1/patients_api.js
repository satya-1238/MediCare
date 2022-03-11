const Patient=require('../../../models/patient');
const jwt=require('jsonwebtoken');


// Sign In and create the session for User
module.exports.createSession=async function(req,res){


    // console.log(req.query);
        Patient.findOne({email:req.query.email},function(err,patient)
        {
            // console.log(patient);
            
            if(!patient || patient.password!=req.query.password)
            {
                return res.json(422,{
                    message:"Invalid username or password"
                });
            }
            return res.json(200,{
                message:"Sign in Successfully",
                data:{
                    token:jwt.sign(patient.toJSON(),"IRTLzb90q9ux7xJS8LU40FGBTYwLdu8f",{expiresIn:'100000000000000'})
    
                }
            })
        })

}