'use strict';

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {

            return reply.view('index', {
                title: 'Home'
            });
        }
    });

    next();
};


exports.register.attributes = {
    name: 'index',
    dependencies: 'visionary'
};
