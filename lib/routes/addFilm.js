'use strict';

const Joi = require('joi');


module.exports = {
    method: 'post',
    path: '/film',
    options: {
        auth: false,
        tags: ['api'],
        validate: {
            payload: Joi.object({
                titre: Joi.string().required().min(3).example('superman').description('Firstname of the user'),
                description: Joi.string().required().min(3).example('superman contre batman').description('Lastname of the user'),
                dateDeSortie: Joi.date().example('2016-03-23').description('Lastname of the user'),
                realisateur: Joi.string().min(4).example('Zack Snyder').description('Lastname of the user'),

            })
        }
    },
    handler: async (request, h) => {

        const { filmService } = request.services();
        console.log(request.payload);
        return await filmService.createFilm(request.payload);
    }
};