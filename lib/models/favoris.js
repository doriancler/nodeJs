'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Favoris extends Model {

    static get tableName() {

        return 'favoris';
    }

    static get joiSchema() {

        return Joi.object({
            idUser: Joi.number().integer().description('id de l\'utilisateur'),
            idFilm: Joi.number().integer().example(1).description('id du film')
        });
    }
    $beforeInsert(queryContext) {
        this.createdAt = new Date();
    }
};