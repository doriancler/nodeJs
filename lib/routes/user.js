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

        request.payload.password = Encrypt.sha1(request.payload.password);

        return await userService.create(request.payload);
    }
};