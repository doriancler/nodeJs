'use strict';

module.exports = {

    async up(knex) {
        await knex.schema.dropTableIfExists('film');
        await knex.schema.createTable('film', (table) => {

            table.increments('id').primary();
            table.string('titre').notNull();
            table.string('description').notNull();
            table.date('dateDeSortie').notNull();
            table.string('realisateur').notNull();
            table.dateTime('createdAt').notNull().defaultTo(knex.fn.now());
            table.dateTime('updatedAt').notNull().defaultTo(knex.fn.now());
        });
    },

    async down(knex) {

        await knex.schema.dropTableIfExists('film');
    }
};
