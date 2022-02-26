const queue=require('../config/kue');
const appointmentsMailer=require('../mailers/appointments_mailer');

// processor fun tells the worker whnever new task added in q worker process this fn
 queue.process('emails',function(job,done)
 {
    console.log('job is processing',job.data);
     appointmentsMailer.newAppointment(job.data);
     done();
 })