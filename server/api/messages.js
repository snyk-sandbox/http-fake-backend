'use strict';

const path = '/api/messages';

const json = [
    {
      "id": 1,
      "title": "Produktverwaltung",
      "details": "Artikel Autoradio Blaupunkt Heidelberg 220 BT 1-DIN NEU konnte nicht online gestellt werden Donec sed odio dui. Donec sed odio dui.",
      "type": "error",
      "date": "23.01.2016"
    },
    {
      "id": 2,
      "title": "eBay Bewertung",
      "details": "m.schlegel bewertet „Original Volkswagen Dachbox…“",
      "type": "rating",
      "date": "23.01.2016"
    },
    {
      "id": 3,
      "title": "Google AdWords",
      "details": "Freischaltung erfolgreich abgeschlossen Condimentum Magna Cras Purus",
      "type": "success",
      "date": "23.01.2016"
    },
    {
      "id": 4,
      "title": "eBay Bewertung",
      "details": "m.schlegel bewertet „Original Volkswagen Dachbox…“",
      "type": "question",
      "date": "23.01.2016"
    },
    {
      "id": 5,
      "title": "Produktverwaltung",
      "details": "Artikel Autoradio Blaupunkt Heidelberg 220 BT 1-DIN NEU konnte nicht online gestellt werden Donec sed odio dui. Donec sed odio dui.",
      "type": "error",
      "date": "23.01.2016"
    },
    {
      "id": 6,
      "title": "eBay Bewertung",
      "details": "m.schlegel bewertet „Original Volkswagen Dachbox…“",
      "type": "rating",
      "date": "23.01.2016"
    },
    {
      "id": 7,
      "title": "Google AdWords",
      "details": "Freischaltung erfolgreich abgeschlossen Condimentum Magna Cras Purus",
      "type": "success",
      "date": "23.01.2016"
    },
    {
      "id": 8,
      "title": "eBay Bewertung",
      "details": "m.schlegel bewertet „Original Volkswagen Dachbox…“",
      "type": "question",
      "date": "23.01.2016"
    }
  ];

const getJson = function (request, reply) {

    return reply(json);
};

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: path,
        config: {
            pre: [{
                method: getJson,
                assign: 'getJson'
            }],
            handler: function (request, reply) {

                return reply(request.pre.getJson).type('text/plain');
            }
        }
    });


    next();
};


exports.register.attributes = {
    name: 'messages',
    path: path
};
