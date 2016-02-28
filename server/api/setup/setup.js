'use strict';

module.exports = function(name) {
    const path = '/api/' + name;

    const json = require('../../../json-templates/' + name);

    let exportEndpoint = {};

    exportEndpoint.register = function (server, options, next) {

        server.route({
            method: 'GET',
            path: path,
            handler: function (request, reply) {
                return reply(json).type('text/plain');
            }
        });

        next();
    };


    exportEndpoint.register.attributes = {
        name: name,
        path: path
    };

    return exportEndpoint;

};
