'use strict';

const SetupEndpoint = require('./setup/setup.js');

module.exports = SetupEndpoint({
    name: 'bar',
    urls: [{
        params: '/read',
        requests: [{
            method: 'GET',
            response: '/json-templates/bar.json'
        }]
    }, {
        params: '/update/{id}',
        requests: [{
            method: ['PUT', 'PATCH'],
            response: {
                success: true
            }
        }, {
            method: 'DELETE',
            response: {
                deleted: true
            }
        }]
    }]
});
