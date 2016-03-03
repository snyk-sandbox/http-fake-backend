'use strict';

const SetupEndpoint = require('./setup/setup.js');

module.exports = SetupEndpoint({
    name: 'activities',
    urls: [
        {
            params: '',
            templateFile: 'activities.json',
            method: 'GET'
        }
    ]/*,
    statusCode: 505*/
});
