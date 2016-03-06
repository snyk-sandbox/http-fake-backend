'use strict';

const SetupEndpoint = require('./setup/setup.js');

module.exports = SetupEndpoint({
    name: 'bar',
    urls: [
        {
            params: '/read',
            response: '/json-templates/bar.json',
            method: 'GET'
        },
        {
            params: '/update/{id}',
            response: {
                success: true
            },
            method: 'POST'
        },
        {
            params: '/delete/{id}',
            response: {
                success: true
            },
            method: 'DELETE'
        }
    ]
});
