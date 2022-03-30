'use strict';

const Joi = require('joi');


module.exports = [
    {
        method: 'post',
        path: '/film',
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
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

            const {filmService, userService, mailService} = request.services();

            const users = await userService.findAll();

            await mailService.sendMailToAddFilm(users, request.payload.titre);
            return await filmService.createFilm(request.payload);
        }
    },
    {
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
    },
    {
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
            const users = await favorisService.getListUser(request.payload.id);

            await mailService.sendMailToUpdateFilm(users, request.payload.titre);
            return await filmService.update(request.payload);
        }
    }
];