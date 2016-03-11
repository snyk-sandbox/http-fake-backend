'use strict';

const SetupEndpoint = require('./setup/setup.js');

module.exports = SetupEndpoint({
    name: 'bar',
    urls: [
        {
            params: '/read',
            requests: [{
                method: 'GET',
                response: '/json-templates/bar.json'
            }]
        },
        {
            params: '/update/{id}',
            requests: [{
                method: 'PUT',
                response: {
                    success: true
                }
            },
            {
                method: 'PATCH',
                response: {
                    success: true
                }
            }]
        },
        {
            params: '/delete/{id}',
            requests: [{
                method: 'DELETE',
                response: {
                    success: true
                }
            }]
        }
    ]
});
