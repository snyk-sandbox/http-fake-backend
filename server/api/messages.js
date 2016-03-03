'use strict';

const SetupEndpoint = require('./setup/setup.js');

module.exports = SetupEndpoint({
    name: 'messages',
    urls: [
        {
            params: '',
            templateFile: 'messages.json',
            method: 'GET'
        }
    ]/*,
    statusCode: 505*/
});
