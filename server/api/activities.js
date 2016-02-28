'use strict';


const path = '/api/activities';

const json = require('../../json-templates/activities');

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
    name: 'activities',
    path: path
};
