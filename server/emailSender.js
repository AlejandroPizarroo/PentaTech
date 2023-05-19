require("dotenv").config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_APIKEY);


function sendEmail(email, password){
    const msg = {
        to: email,
        from: 'hecrafalac@hotmail.com',
        subject: 'Temporal password request',
        text: `You requested to sign in to the IBM Certifications Dashboard, here is your temporal password: ${password}`
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
