'use strict';

const Joi = require('joi');


module.exports = {
    method: 'delete',
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
        return await favorisService.delete(request.payload);
    }
};