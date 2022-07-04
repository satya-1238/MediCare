const Appointment = require("../models/appointment");

// here's patient consult   with doctor
module.exports.consult = async function (req, res) {
  // console.log(req.user);
   const appointment=await Appointment.findById(req.params.id)
   .populate({path:'patient'})
   .populate({path:'doctor'})
  //  console.log(appointment);
    return res.render("DocPatChat", {
      title: "consultation",
      appointment:appointment,
      user:req.user,
    });
  }

module.exports.meeting=async function(req,res)
{
   return res.render('video_chat',{
      title:'New Meeting',
   })
}