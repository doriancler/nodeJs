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
    getListUser(id) {
        const { Favoris } = this.server.models();

        return Favoris.query().select('user.*').innerJoin('user', 'favoris.id', 'user.id').where('favoris.idFilm', id);

    }
};
