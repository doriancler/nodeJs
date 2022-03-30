'use strict';

const { Service } = require('@hapipal/schmervice');
const nodemailer = require('nodemailer');


module.exports = class MailService extends Service {

    async sendMail(mailOptions) {

        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: 'gus.krajcik77@ethereal.email',
                pass: 'DaQmqA2dMwbAzSxTfw'
            }
        });
        const info = await transporter.sendMail({
            from: '"vosFilms" <ne-pas-redondre@vosfilms.com>',
            to: mailOptions,
            subject: 'Inscription',
            text: 'Bonjour, \n Vous vous êtes bien inscrit. \n\n Cordialement'
        });
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    async sendMailToAddFilm(mailOptions, nomFilm) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: 'gus.krajcik77@ethereal.email',
                pass: 'DaQmqA2dMwbAzSxTfw'
            }
        });
        for (let i = 0; i < mailOptions.length; i++) {
            const info = await transporter.sendMail({
                from: '"vosFilms" <ne-pas-repondre@vosfilms.com>',
                to: mailOptions[i].mail,
                subject: 'Nouveau film : ' + nomFilm,
                text: 'Bonjour, \n Venez découvrir le nouveau film et le mettre dans vos favoris. \n\n Cordialement'
            });
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        }
    }
    async sendMailToUpdateFilm(mailOptions, nomFilm) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: 'gus.krajcik77@ethereal.email',
                pass: 'DaQmqA2dMwbAzSxTfw'
            }
        });
        for (let i = 0; i < mailOptions.length; i++) {
            const info = await transporter.sendMail({
                from: '"vosFilms" <ne-pas-repondre@vosfilms.com>',
                to: mailOptions[i].mail,
                subject: 'Modification film : ' + nomFilm,
                text: 'Bonjour, \n Venez découvrir les nouvelles modification du film. \n\n Cordialement'
            });
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        }
    }
};
