'use strict';

const Joi = require('joi');

module.exports = {
    method: 'patch',
    path: '/user',
    options: {
        auth: {
            scope: [ 'admin' ]
        },
        tags: ['api'],
        validate: {
            payload: Joi.object({
                id: Joi.number().integer().min(1).description('Id of the user'),
                firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
                password: Joi.string().min(8).example('azerty123').description('Lastname of the user'),
                mail: Joi.string().min(8).example('john.doe@gmail.com').description('Lastname of the user'),
                username: Joi.string().min(3).example('Doe123').description('Lastname of the user')
            })
        }
    },
    // eslint-disable-next-line require-await
    handler: async (request, h) => {
        const { userService } = request.services();

        return  userService.update(request.payload);
    }
};