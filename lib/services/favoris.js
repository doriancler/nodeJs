'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class FavorisService extends Service {

    create(favoris) {
        const { Favoris } = this.server.models();

        return Favoris.query().insertAndFetch(favoris);
    }
    delete(favoris) {
        const { Favoris } = this.server.models();

        return Favoris.query().delete().where('id', favoris.id).where('idFilm', favoris.idFilm);
    }
    getListUser() {
        const { Favoris } = this.server.models();

        return Favoris.query().innerJoin('user', 'favoris.id', 'user.id');

    }
};
