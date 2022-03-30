'use strict';

const Joi = require('joi');


module.exports = {
    method: 'post',
    path: '/film',
    options: {
        auth: {
            scope: [ 'admin' ]
        },
        tags: ['api'],
        validate: {
            payload: Joi.object({
                titre: Joi.string().required().min(3).example('superman').description('Titre du film'),
                description: Joi.string().required().min(3).example('superman contre batman').description('Description du film'),
                dateDeSortie: Joi.date().example('2016-03-23').description('date de sortie du film'),
                realisateur: Joi.string().min(4).example('Zack Snyder').description('Realisateur du film'),

            })
        }
    },
    handler: async (request, h) => {

        const { filmService, userService, mailService } = request.services();

        const users = await userService.findAll();
        await mailService.sendMailToAddFilm(users, request.payload.titre);
        return await filmService.createFilm(request.payload);
    }
};