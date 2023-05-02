const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('');


function sendEmail(email, password){
    const msg = {
        to: email,
        from: 'hecrafalac@hotmail.com',
        subject: 'Temporal password request',
        text: `You requested to signin in IBM Certifications Dashboard, here is your temporal password: ${password}`
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
