'use strict';

const Joi = require('joi');



module.exports = {
    method: 'post',
    path: '/user/login',
    options: {
        auth: false,
        tags: ['api'],
        validate: {
            payload: Joi.object({
                mail: Joi.string().min(8).example('john.doe@gmail.com').description('Lastname of the user'),
                password: Joi.string().min(8).example('azerty123').description('Lastname of the user')
            })
        }
    },
    handler: async (request, h) => {

        const { userService } = request.services();

        const Encrypt = require('@doriancler1/iut-encrypt');

        const log = await userService.login(request.payload.mail);

        if (Encrypt.compareSha1(request.payload.password, log['password'])) {
            const Jwt = require('@hapi/jwt');

            const token = Jwt.token.generate(
                {
                    aud: 'urn:audience:iut',
                    iss: 'urn:issuer:iut',
                    firstName: log.firstName,
                    lastName: log.lastName,
                    mail: log.mail,
                    scope: log.role
                },
                {
                    key: 'random_string', // La clé qui est définit dans lib/auth/strategies/jwt.js
                    algorithm: 'HS512'
                },
                {
                    ttlSec: 14400 // 4 hours
                }
            );
            return token;
        }

        return h.response().code(401);

    }
};