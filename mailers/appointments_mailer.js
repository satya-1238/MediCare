const nodeMailer=require('../config/nodemailer');

module.exports.newAppointment=function(appointment)
{
    // console.log(appointment);
    let htmlString = nodeMailer.renderTemplate({appointment:appointment},'/appointments/newAppointment.ejs');
    nodeMailer.transporter.sendMail({
        from:'medicarehospitals0581@gmail.com',
        to:appointment.doctor.email,
        subject:"new appointment booked",
        html:htmlString
    },(err,info)=>
    {
         if(err)
         {
             console.log('error in sending mails',err);
             return;
         }
        //  console.log('email sent to doctor successfully');
         return;
    })
    let htmlString1 = nodeMailer.renderTemplate({appointment:appointment},'/appointments/mailtopatient.ejs');
    nodeMailer.transporter.sendMail({
        from:'medicarehospitals0581@gmail.com',
        to:appointment.patient.email,
        subject:"Your appointment booked successfully",
        html:htmlString1
    },(err,info)=>
    {
         if(err)
         {
             console.log('error in sending mails',err);
             return;
         }
        //  console.log('email sent to patient successfully');
         return;
    })
}
