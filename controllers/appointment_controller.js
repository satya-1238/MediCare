const req = require("express/lib/request");
const Treatment = require("../models/treatment");
const Appointment = require("../models/appointment");
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const History = require("../models/history");
const appointmentsMailer = require("../mailers/appointments_mailer");
const appointmentsWorker = require("../workers/appointment_worker");
const queue = require("../config/kue");
const Razorpay = require('razorpay');
const instance =new Razorpay({
  key_id: 'rzp_test_6OAYahwbspMKp4',
  key_secret:'IPLKPxGUuJqlXUsQdfgJiZDD'
});
module.exports.create = async function (req, res) {
      var d=req.body.date;
      const yy=d.substring(0,4);
      const mm=d.substring(5,7);
      const dd=d.substring(8,10);
      d=dd+'-'+mm+'-'+yy;
      req.body.date=d;
      console.log(d);
  let appointment = await Appointment.create({
    doctor: req.body.doctor,
    patient: req.body.patient,
    mode: req.body.mode,
    symptoms: req.body.symptoms,
    date: req.body.date,
  });
  Treatment.findOne(
    { doctor: req.body.doctor, patient: req.body.patient },
    async function (err, treatment1) {
      if (!treatment1) {
        let treatment = await Treatment.create({
          doctor: req.body.doctor,
          patient: req.body.patient,
          startDate: req.body.date,
          lastDate: req.body.date,
          disease: req.body.symptoms,
        });
        treatment.appointments.push(appointment);
        treatment.save();
      } else {
        treatment1.appointments.push(appointment);
        (treatment1.lastDate = req.body.date),
          (treatment1.disease = req.body.symptoms);
        treatment1.save();
      }
    }
  );

  Doctor.findById(req.body.doctor, function (err, doctor) {
   
    doctor.appointments.push(appointment);
    doctor.save();
    Patient.findById(req.body.patient, async function (err, patient) {
      patient.appointments.push(appointment);
      patient.save();
      var today = new Date();
      var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const datetime=date+' '+time;
       
      let history=History.create({
        from:patient.email,
        to:doctor.email,
        content: `Your booked an appointment on ${date} at ${time} with  Dr.${doctor.name}  for  ${d} having symptoms ${req.body.symptoms}`,
        datetime:datetime
    })
      let appointment1 = await Appointment.findById(appointment.id)
        .populate({ path: "doctor", select: "name email phone" })
        .populate({ path: "patient", select: "name email phone" })
        .exec();
      let job = queue.create("emails", appointment1).save(function (err) {
        if (err) {
          Console.log("error in enqueuing queue", err);
        }
        console.log("job enqueued : ", job.id);
      });
       return res.render("your_appointment", {
          title: "your_appointment",
          appointment: appointment,
          appointed_doctor: doctor,
         });
    });
  });
};

module.exports.checkout=async function(req,res)
{
  var options = {
    amount: 50000,
    currency: 'INR',
};
instance.orders.create(options, function (err, order) {
    if (err) {
        console.log(err);
    } else {
        console.log(order); 
        res.render('checkout', {
          title:'payment',
          amount: order.amount,
           order_id: order.id});
    }
});
}

module.exports.paymentVerify=async function(req,res)
{
    console.log("welcome in payment verification");
    body=req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
    var crypto = require("crypto");
    var expectedSignature = crypto.createHmac('sha256', 'IPLKPxGUuJqlXUsQdfgJiZDD')
                                    .update(body.toString())
                                    .digest('hex');
                                    console.log("sig"+req.body.razorpay_signature);
                                    console.log("sig"+expectedSignature);
    
    if(expectedSignature === req.body.razorpay_signature){
      console.log("Payment Success");
        return res.status(200).json({
            data: {
                  title: "appointment",
                  appointment: req.body.appointment_id,
            },
            message: "success"
        });
    }
    else{
      console.log("Payment Fail");
    }
}

module.exports.show = function (req, res) {
  // console.log(req.params.id);
  Doctor.findById(req.params.id, function (err, doctor) {
    
    return res.render("appointment", {
      title: "appointment",
      appointment_doctor: doctor,
    });
  });
};

module.exports.my = async function (req, res) {
  Doctor.findById(req.params.id)
    .populate({
      path: "appointments",
      populate: {
        path: "patient",
      },
    })
    .exec(function (err, doctor) {
      // console.log(doctor);
      return res.render("doctors_appointment", {
        title: "my-appointments",
        appointment_doctor: doctor,
        length: 0,
      });
    });
};

module.exports.destroy = function (req, res) {
  // console.log(req.params.id);
  Appointment.findById(req.params.id, function (err, appointment) {
    if (appointment == null) return res.redirect("back");
    //  console.log(appointment);
    let doctorId = appointment.doctor;
    let patientId = appointment.patient;
    // console.log(doctorId);
    // console.log(patientId);

    appointment.remove();

    let doctor = Doctor.findByIdAndUpdate(doctorId, {
      $pull: { appointments: req.params.id },
    });

    let patient = Patient.findByIdAndUpdate(patientId, {
      $pull: { appointments: req.params.id },
    });
    return res.redirect("back");
  });
};
module.exports.patient_appointment = function (req, res) {
  Patient.findById(req.params.id)
    .populate({
      path: "appointments",
      populate: {
        path: "doctor",
      },
    })
    .exec(function (err, patient) {
      // console.log(doctor);
      return res.render("patient_appointment", {
        title: "my-appointments",
        appointment_patient: patient,
        length: 0,
      });
    });
};
