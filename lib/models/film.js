'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Film extends Model {

    static get tableName() {

        return 'film';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            titre: Joi.string().min(4).example('superman').description('titre du film'),
            description: Joi.string().min(3).example('superman contre batman').description('description du film'),
            dateDeSortie: Joi.date().example('2016-03-23').description('date de sortie du film'),
            realisateur: Joi.string().min(4).example('Zack Snyder').description('realisateur du film')
        });
    }



};