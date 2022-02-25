const nodeMailer=require('../config/nodemailer');

module.exports.newAppointment=function(appointment,doctor,patient)
{
    
    let htmlString = nodeMailer.renderTemplate({appointment:appointment,doctor:doctor,patient:patient},'/appointments/newAppointment.ejs');
    nodeMailer.transporter.sendMail({
        from:'medicarehospitals0581@gmail.com',
        to:doctor.email,
        subject:"new appointment booked",
        html:htmlString
    },(err,info)=>
    {
         if(err)
         {
             console.log('error in sending mails',err);
             return;
         }
         console.log('email sent to doctor successfully');
         return;
    })
    let htmlString1 = nodeMailer.renderTemplate({appointment:appointment,doctor:doctor,patient:patient},'/appointments/mailtopatient.ejs');
    nodeMailer.transporter.sendMail({
        from:'medicarehospitals0581@gmail.com',
        to:patient.email,
        subject:"Your appointment booked successfully",
        html:htmlString1
    },(err,info)=>
    {
         if(err)
         {
             console.log('error in sending mails',err);
             return;
         }
         console.log('email sent to patient successfully');
         return;
    })
}
