'use strict';

const Joi = require('joi');


module.exports = {
    method: 'patch',
    path: '/film',
    options: {
        auth: {
            scope: [ 'admin' ]
        },
        tags: ['api'],
        validate: {
            payload: Joi.object({
                id: Joi.number().integer().min(1).description('Id du film'),
                titre: Joi.string().required().min(3).example('superman').description('Firstname of the user'),
                description: Joi.string().required().min(3).example('superman contre batman').description('Lastname of the user'),
                dateDeSortie: Joi.date().example('2016-03-23').description('Lastname of the user'),
                realisateur: Joi.string().min(4).example('Zack Snyder').description('Lastname of the user'),

            })
        }
    },
    handler: async (request, h) => {

        const { filmService, mailService, favorisService } = request.services();
        const users = await favorisService.getListUser();
        console.log(users);
        return await filmService.update(request.payload);
    }
};