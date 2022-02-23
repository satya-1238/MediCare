const Appointment=require('../../../models/appointment');
const Patient=require('../../../models/patient');
const Doctor=require('../../../models/doctor');

module.exports.total=async function(req,res)
{
    try {
        let appointments=await Appointment.find({});
    
        return res.json(200,{
            message:"list of appointments",
            appointments:appointments
        })
      }
     
        catch (error) {
           console.log(error);
       }
}
module.exports.destroy=function(req,res)
{
    // console.log(req.params.id);
    Appointment.findById(req.params.id,function(err,appointment)
    {
        
            // console.log(appointment);
            if(appointment==null)
            {
                return res.json(401,{
                message:"Internal Server Error",
                })
            }
            else if(appointment.patient==req.user.id)
            {
            //  console.log(appointment);
            let doctorId=appointment.doctor;
            let patientId=appointment.patient;
            // console.log(doctorId);
            // console.log(patientId);
            
            appointment.remove();
           
            let doctor = Doctor.findByIdAndUpdate(doctorId, { $pull: {appointments: req.params.id}});
            let patient = Patient.findByIdAndUpdate(patientId, { $pull: {appointments: req.params.id}});
            return res.json(200,{
                message:"appointment deleted successfully",
            });
        }
        else
        {
            return res.json(401,
                {
                message:"You can't delete",
                });
        }
    });
}
