require("dotenv").config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_APIKEY);


function sendEmail(email, password){
    const msg = {
        to: email,
        from: 'hecrafalac@hotmail.com',
        subject: `${password}`,
        text:
    `Hi,
    
Please use the following One Time Password (OTP) to access the IBM Certifications Dashboard: ${password}. 
Do not share this OTP with anyone. OTP is valid for 60 seconds.
    
Thank you!`
    };
    sgMail.send(msg)
        .then(() => {
            console.log('Email sent');
        })
        .catch((error) => {
            console.error(error);
        });
}

module.exports = sendEmail;
