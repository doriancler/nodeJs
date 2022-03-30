'use strict';

const Joi = require('joi');
const Encrypt = require("@doriancler1/iut-encrypt");
const Jwt = require("@hapi/jwt");


module.exports = [
    {
        method: 'post',
        path: '/user',
        options: {
            auth: false,
            tags: ['api'],
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

            const {userService, mailService} = request.services();

            const Encrypt = require('@doriancler1/iut-encrypt');

            request.payload.password = Encrypt.sha1(request.payload.password);
            await mailService.sendMail(request.payload.mail);
            return await userService.create(request.payload);
        }
    },
    {
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
    },
    {
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

            if (Encrypt.compareSha1(request.payload.password, log.password)) {
                const Jwt = require('@hapi/jwt');

                const token = Jwt.token.generate(
                    {
                        aud: 'urn:audience:iut',
                        iss: 'urn:issuer:iut',
                        id: log.id,
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
    },
    {
        method: 'get',
        path: '/users',
        options: {
            auth: {
                scope: [ 'user', 'admin' ]
            },
            tags: ['api']
        },
        handler: async (request, h) => {
            const { User } = request.models();

            // Objection retourne des promeses, il ne faut pas oublier des les await.


            return User.query();
        }
    },
    {
        method: 'delete',
        path: '/user',
        options: {
            auth: {
                scope: [ 'admin' ]
            },
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    id: Joi.number().integer().min(1).description('Id of the user')
                })
            }
        },
        // eslint-disable-next-line require-await
        handler: async (request, h) => {
            const { userService } = request.services();

            return  userService.delete(request.payload);
        }
    }
];