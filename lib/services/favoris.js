'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class FavorisService extends Service {

    create(favoris) {
        const { Favoris } = this.server.models();

        return Favoris.query().insertAndFetch(favoris);
    }

};
