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
        console.log(idAccount);
        request.payload.idUser = idAccount;
        const { favorisService } = request.services();
        console.log(request.payload);
        return await favorisService.create(request.payload);
    }
};