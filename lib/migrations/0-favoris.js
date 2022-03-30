'use strict';

module.exports = {

    async up(knex) {
        await knex.schema.dropTableIfExists('favoris');
        await knex.schema.createTable('favoris', (table) => {
            table.integer('id');
            table.integer('idFilm');
            table.dateTime('createdAt').notNull().defaultTo(knex.fn.now());
            table.primary(['id', 'idFilm']);
        });
    },

    async down(knex) {

        await knex.schema.dropTableIfExists('favoris');
    }
};
