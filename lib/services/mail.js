'use strict';

const { Service } = require('@hapipal/schmervice');
const Encrypt = require("@doriancler1/iut-encrypt");
const nodemailer = require("nodemailer");

module.exports = class MailService extends Service {

    async sendMail(mailOptions) {
        const nodemailer = require('nodemailer');


        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'gus.krajcik77@ethereal.email', // generated ethereal user
                pass: 'DaQmqA2dMwbAzSxTfw' // generated ethereal password
            }
        });
        const info = await transporter.sendMail({
            from: '"test" <test@example.com>', // sender address
            to: mailOptions, // list of receivers
            subject: 'Inscription', // Subject line
            text: 'Bonjour, \n Vous vous êtes bien inscrit. \n\n Cordialement' // plain text body
        });
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
};
