'use strict';

const Lab = require('lab');
const Code = require('code');
const Config = require('../../../config');
const Hapi = require('hapi');
const SetupEndpoint = require('../../../server/api/setup/setup.js');

const Endpoint = SetupEndpoint({
    name: 'endpoint',
    urls: [
        {
            params: '',
            templateFile: 'bar.json',
            method: 'GET'
        },
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

const lab = exports.lab = Lab.script();
let request;
let server;

lab.beforeEach((done) => {

    const plugins = [Endpoint];
    server = new Hapi.Server();
    server.connection({ port: Config.get('/port/web') });
    server.register(plugins, (err) => {

        if (err) {
            return done(err);
        }

        done();
    });
});


lab.experiment('Setup endpoints', () => {

    lab.beforeEach((done) => {


        done();
    });


    lab.test('returns 404 for unknown route', (done) => {

        request = {
            method: 'POST',
            url: '/api/schnasel'
        };

        server.inject(request, (response) => {

            Code.expect(response.statusCode).to.equal(404);

            done();
        });
    });

    lab.test('post returns correct json', (done) => {

        request = {
            method: 'POST',
            url: '/api/endpoint/update/foo'
        };

        server.inject(request, (response) => {

            Code.expect(response.statusCode).to.equal(200);
            Code.expect(response.result).to.deep.equal({ success: true });

            done();
        });
    });

});
