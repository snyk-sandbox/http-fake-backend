'use strict';

const SetupEndpoint = require('./setup/setup.js');

module.exports = SetupEndpoint({
    name: 'bar',
    urls: [
        {
            params: '/read',
            templateFile: 'bar.json',
            method: 'GET'
        },
        {
            params: '/update/{id}',
            templateFile: 'success.json',
            method: 'POST'
        },
        {
            params: '/delete/{id}',
            templateFile: 'success.json',
            method: 'DELETE'
        }
    ]
});
