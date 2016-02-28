'use strict';

const requireDir = require('require-dir');
const apiDir = requireDir('../api');


const getEndpoints = function (request, reply) {
    let returnvalue = [];

    Object.keys(apiDir).forEach(function(key) {
        returnvalue.push(apiDir[key].register.attributes);
    });

    return reply(returnvalue);
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
