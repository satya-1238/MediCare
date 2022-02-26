const req = require('express/lib/request');
const Appointment=require('../models/appointment');
const Doctor=require('../models/doctor');
const Patient=require('../models/patient');
const appointmentsMailer=require('../mailers/appointments_mailer');
const appointmentsWorker=require('../workers/appointment_worker');
const queue=require('../config/kue');


module.exports.create= async function(req,res){
    //    console.log(req.body);
    //    console.log(typeof(req.body.date));
       
       let appointment=  await Appointment.create({
           doctor:req.body.doctor,
           patient:req.body.patient,
           mode:req.body.mode,
           symptoms:req.body.symptoms,
           date:req.body.date
       })

    
       Doctor.findById(req.body.doctor,function(err,doctor)
       {
            //  console.log(doctor);
             doctor.appointments.push(appointment);
             doctor.save();
       
       Patient.findById(req.body.patient,async function(err,patient)
       {
        
           patient.appointments.push(appointment);
           patient.save();

        //    console.log(appointment);
        //    console.log(appointment.id);
           let appointment1 = await Appointment.findById(appointment.id)
           .populate({path:'doctor',select:'name email'})
           .populate({path:'patient',select:'name email'})
           .exec();

        //    console.log(appointment1);
           
           
            

        //   appointmentsMailer.newAppointment(appointment1);
          let job=queue.create('emails',appointment1).save(function(err)
          {
              if(err)
              {
                  Console.log('error in enqueuing queue',err);
              }
              console.log("job enqueued : ",job.id)

          })

    //    console.log(doctor);
    //    console.log(patient);
       return res.render('your_appointment',{
        title:"your_appointment",
        appointment:appointment,
        appointed_doctor:doctor,
    });

    });
    });
      

       
}
module.exports.show=function(req,res)
{

    // console.log(req.params.id);
    Doctor.findById(req.params.id, function (err, doctor) {
        // console.log("khan mila yrr");
        // console.log(doctor);
        return res.render('appointment', {
            title: "appointment",
            appointment_doctor: doctor
        })
    });
}

module.exports.my=async function(req,res)
{
    Doctor
    .findById(req.params.id)
    .populate({
        path:'appointments',
        populate:{
            path:'patient'
        }

    })
    .exec(function(err,doctor)
    {
        // console.log(doctor);
        return res.render('doctors_appointment', {
            title: "my-appointments",
            appointment_doctor: doctor,
            length:0,
        })
    });
}


module.exports.destroy=function(req,res)
{
    // console.log(req.params.id);
    Appointment.findById(req.params.id,function(err,appointment)
    {
       
            if(appointment==null)
            return res.redirect('back');
            //  console.log(appointment);
            let doctorId=appointment.doctor;
            let patientId=appointment.patient;
            // console.log(doctorId);
            // console.log(patientId);
            
            appointment.remove();
           
            let doctor = Doctor.findByIdAndUpdate(doctorId, { $pull: {appointments: req.params.id}});
    
            let patient = Patient.findByIdAndUpdate(patientId, { $pull: {appointments: req.params.id}});
         return res.redirect('back');
    });
}
module.exports.patient_appointment=function(req,res)
{
    Patient
    .findById(req.params.id)
    .populate({
        path:'appointments',
        populate:{
            path:'doctor'
        }

    })
    .exec(function(err,patient)
    {
        // console.log(doctor);
        return res.render('patient_appointment', {
            title: "my-appointments",
            appointment_patient: patient,
            length:0,
        })
    });
}

