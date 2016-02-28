'use strict';

const path = '/api/messages';

const json = require('../../json-templates/messages');

const getJson = function (request, reply) {

    return reply(json);
};

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: path,
        config: {
            pre: [{
                method: getJson,
                assign: 'getJson'
            }],
            handler: function (request, reply) {

                return reply(request.pre.getJson).type('text/plain');
            }
        }
    });


    next();
};


exports.register.attributes = {
    name: 'messages',
    path: path
};
