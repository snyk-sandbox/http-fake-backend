'use strict';

const name = 'messages';
const path = '/api/' + name;

const json = require('../../json-templates/' + name);

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: path,
        handler: function (request, reply) {
            return reply(json).type('text/plain');
        }
    });

    next();
};


exports.register.attributes = {
    name: name,
    path: path
};
