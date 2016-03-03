# SWO Fake API

> Fake API providing dummy data for the swo-frontend

## Install

```
npm install
```

## Default Address
The server runs at <http://localhost:8081/> providing a page with links to all existing API endpoints.

## Start server

There are the following two options.

### During development

```
npm run start:dev
```

This way the server uses `nodemon` to restart itself on changes. 
This way you dont have to restart the server in case you changed an endpoint. 


### Later (eg. for test in CI)

```
npm start
```

Just fires up the server via node.  
This one comes is without any magic (eg. `foreverjs`)

## Configuration

The app needs to have a config file named `.env` with the following content:

```dosini
# NODE_ENV
# Could be either `development` or `production`
NODE_ENV=development

# Port of the Server
SERVER_PORT=8081

# Port for running the tests
TEST_PORT=9090
```

## Configuring endpoints

Each endpoint need the following:

* a dummy JSON file in `/json-templates/`
	* This JSON will be returned by the endpoint.
* a server plugin in `/manifest.js`
* a configuration file in `/server/api/`

### Example configuration

`/server/api/login.js`:

```js
module.exports = SetupEndpoint({
    name: 'articleList',
    urls: [
        {
            params: '/{filter}/{offset}/{items}',
            templateFile: 'articleList.json',
            method: 'GET'
        },
        {
            params: '/post',
            templateFile: 'closemessage.json',
            method: 'POST'
        }
    ],
    statusCode: 505
});
```

The configuration object in Detail:

* `name: 'articleList'`  
	* Is used to set the endpoint (the first part of the url in case you use params)
* `urls` You need add least one url object
* `urls.method: 'GET'` is used to define the http method to which the endpoint will listen.
* `urls.params: '/{filter}/{offset}/{items}'`
	* Optional
	* The endpoint will need the amount of params within the URL if defined.
	* In this example a valid URL might be:
	  `http://localhost:8081/api/articleList/foo/bar/baz`
	  whereas:
	  `http://localhost:8081/api/articleList` will return a 404 error.
* `statusCode: 401`
	* Optional
	* The endpoint will return a http error with the given status code inplace of json template.


