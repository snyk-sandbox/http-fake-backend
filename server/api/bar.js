'use strict';

const SetupEndpoint = require('./setup/setup.js');

module.exports = SetupEndpoint({
    name: 'bar',
    urls: [
        {
            params: '/read',
            templateFile: '/json-templates/bar.json',
            method: 'GET'
        },
        {
            params: '/update/{id}',
            templateFile: '/json-templates/success.json',
            method: 'POST'
        },
        {
            params: '/delete/{id}',
            templateFile: '/json-templates/success.json',
            method: 'DELETE'
        }
    ]
});
