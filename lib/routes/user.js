'use strict';

const Joi = require('joi');


module.exports = {
    method: 'post',
    path: '/user',
    options: {
        auth: false,
        tags: ['api'],
        validate: {
            payload: Joi.object({
                firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
                password: Joi.string().min(8).example('azerty123').description('Lastname of the user'),
                mail: Joi.string().min(8).example('john.doe@gmail.com').description('Lastname of the user'),
                username: Joi.string().min(3).example('Doe123').description('Lastname of the user'),
                role: Joi.string().min(3).example('admin').description('Lastname of the user')
            })
        }
    },
    handler: async (request, h) => {

        const { userService } = request.services();

        const Encrypt = require('@doriancler1/iut-encrypt');
        const nodemailer = require('nodemailer');

        request.payload.password = Encrypt.sha1(request.payload.password);

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
            to: request.payload.password, // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Hello world?' // plain text body
        });
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        return await userService.create(request.payload);
    }
};