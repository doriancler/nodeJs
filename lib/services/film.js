'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class FilmService extends Service {

    createFilm(film) {
        const { Film } = this.server.models();

        return Film.query().insertAndFetch(film);
    }
    update(film) {

        const { Film } = this.server.models();
        return Film.query().findById(film.id).patch({
            titre: film.titre,
            description: film.description,
            dateDeSortie: film.dateDeSortie,
            realisateur: film.realisateur,
        });
    }
};
