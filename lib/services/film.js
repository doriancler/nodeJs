'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class FilmService extends Service {

    createFilm(film) {
        const { Film } = this.server.models();

        return Film.query().insertAndFetch(film);
    }
    delete(film) {
        const { Film } = this.server.models();

        return Film.query().deleteById(film.id);
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
    login(mail) {
        const { Film } = this.server.models();
        return Film.query().findOne('mail', mail);
    }
};
