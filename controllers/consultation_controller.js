const Doctor=require('../models/doctor');
const Patient=require('../models/patient');
const Consultation=require('../models/consultation');
const Appointment=require('../models/appointment');


module.exports.consultPatient=async function(req,res)
{
     // let doctor= await Doctor.findById(req.params.id);
     // console.log(req.params);
     // console.log(req.params.id);
     Doctor.findById(req.params.Doctorid, function (err, doctor) {
        
          if(err)
          {
               console.log('error',err);
               return;
          }
          // console.log(doctor);
          return res.render('DocPatChat',{
               title:'chat with doctor',
               appointmented_doctor:doctor,
          })
      });
     
    
}

module.exports.consultDoctor=async function(req,res)
{
     // console.log(req.params);
      Patient.findById(req.params.Patientid, function (err, patient) {
          if(err)
          {
               console.log('error',err);
               return;
          }
          // console.log(patient);
          return res.render('DocPatChat',{
               title:'chat with doctor',
               appointmented_patient:patient,
          })
      });
}
