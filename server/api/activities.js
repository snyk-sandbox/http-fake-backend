'use strict';

const path = '/api/activities';

const json = {
    paidOrders: {
        currentValue: 5,
        currentYear: {
            year: 2016,
            value: 212
        }
    },
    pendingDelivery: 11,
    pendingPickups: 3,
    payments: {
        total: 15,
        overdue: 1
    },
    openReturns: 4,
    customerInquiries: 2,
    articles: {
        online: 471,
        total: 1257
    },
    revenue: {
        calenderWeek: 3,
        weeklyValue: 3235.79,
        year: 2016,
        yearlyValue: 6891.91
    },
    activityIndex: 88
};

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
    name: 'activities',
    path: path
};
