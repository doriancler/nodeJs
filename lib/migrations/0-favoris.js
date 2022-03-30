'use strict';

module.exports = {

    async up(knex) {
        await knex.schema.dropTableIfExists('favoris');
        await knex.schema.createTable('favoris', (table) => {
            table.increments('id');
            table.integer('idUser').references('id').inTable('user');
            table.integer('idFilm').references('id').inTable('film');
            table.dateTime('createdAt').notNull().defaultTo(knex.fn.now());
        });
    },

    async down(knex) {

        await knex.schema.dropTableIfExists('favoris');
    }
};
