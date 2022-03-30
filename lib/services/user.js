'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class UserService extends Service {

    create(user) {

        const { User } = this.server.models();

        return User.query().insertAndFetch(user);
    }
    delete(user) {
        const { User } = this.server.models();

        return User.query().deleteById(user.id);
    }
    update(user) {

        const { User } = this.server.models();
        return User.query().findById(user.id).patch({
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password,
            mail: user.mail,
            username: user.username
        });
    }
    login(mail) {
        const { User } = this.server.models();
        return User.query().findOne('mail', mail);
    }
    findAll() {
        const { User } = this.server.models();
        return User.query();
    }
};
