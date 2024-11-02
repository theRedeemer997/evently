require('dotenv').config();
const nodejsmailer = require('nodemailer');

const transporter = nodejsmailer.createTransport({
    secure: true,
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: process.env.MYMAIL,
        pass: process.env.MYPASS,
    },
});

const sendMail = async (to, subject, msg) => {
    try {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            to: to, // list of receivers
            subject: subject, // Subject line
            html: msg, // html body
        });

        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.log('🚀 ~ sendMail ~ error:', error.message);
    }
};

module.exports = sendMail;
