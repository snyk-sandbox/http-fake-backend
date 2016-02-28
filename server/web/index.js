'use strict';

const activitiesAttributes = require('../api/activities').register.attributes;

const getEndpoints = function (request, reply) {

    return reply([activitiesAttributes]);
};

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/',
        config: {
            pre: [{
                method: getEndpoints,
                assign: 'getEndpoints'
            }],
            handler: function (request, reply) {

                return reply.view('index', {
                    title: 'Home',
                    endpoints: request.pre.getEndpoints
                });
            }
        }
    });

    next();
};


exports.register.attributes = {
    name: 'index',
    dependencies: 'visionary'
};
