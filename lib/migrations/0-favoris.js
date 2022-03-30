'use strict';

module.exports = {

    async up(knex) {
        await knex.schema.dropTableIfExists('favoris');
        await knex.schema.createTable('favoris', (table) => {
            table.integer('id').references('id').inTable('user');
            table.integer('idFilm').references('id').inTable('film');
            table.dateTime('createdAt').notNull().defaultTo(knex.fn.now());
            table.foreign('id').references('id').inTable('user');
            table.foreign('idFilm').references('id').inTable('film');
            table.primary(['id', 'idFilm']);
        });
    },

    async down(knex) {

        await knex.schema.dropTableIfExists('favoris');
    }
};
