'use strict';

const Joi = require('joi');


module.exports = {
    method: 'post',
    path: '/favoris',
    options: {
        auth: {
            scope: [ 'user' ]
        },
        tags: ['api'],
        validate: {
            payload: Joi.object({
                idFilm: Joi.string().required().example(1).description('id du film')

            })
        }
    },
    handler: async (request, h) => {
        const idAccount = request.auth.credentials.id;
        request.payload.id = idAccount;
        const { favorisService } = request.services();
        try {
            return await favorisService.create(request.payload);
        } catch (err) {
            if (err instanceof Error) {
                return h.response({
                    statusCode: 400,
                    error: 'Le film est déjà dans vos favoris'
                }).code(400);
            }

        }
    }
};