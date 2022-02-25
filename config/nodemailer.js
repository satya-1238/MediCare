const nodemailer =require('nodemailer');
const ejs=require('ejs');
const path=require('path');

let transporter=nodemailer.createTransport(
    {
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
          user: 'abc@gmail.com',
          pass: '9991256'
        }
    });

    let renderTemplate=(data,relativePath)=>{
        let mailHTML;
        ejs.renderFile(
            path.join(__dirname,'../views/mailers',relativePath),
            data,
            function(err,template)
            {
                if(err)
                {
                    console.log('error in generating template',err);
                    return;
                }
                mailHTML=template;
            }
        );
        return mailHTML;
    }
    let renderTemplate1=(data,relativePath)=>{
        let mailHTML;
        ejs.renderFile(
            path.join(__dirname,'../views/mailers',relativePath),
            data,
            function(err,template)
            {
                if(err)
                {
                    console.log('error in generating template',err);
                    return;
                }
                mailHTML=template;
            }
        );
        return mailHTML;
    }


    module.exports={
        transporter:transporter,
    renderTemplate:renderTemplate,
    renderTemplate1:renderTemplate1
}