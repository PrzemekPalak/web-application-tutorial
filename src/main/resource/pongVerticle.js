var vertx = require('vertx');

var container = require('vertx/container');
var logger = container.logger;

logger.info('Starting pong verticle');

var eb = vertx.eventBus;

var clientsRepository = function ($log) {
    var clients = [];
    var submitClient = function (client) {
        $log.info('client submited');
        clients.push(client);
    };

    var getClients = function () {
        return clients;
    };

    return{
        submitClient: submitClient,
        getClients: getClients
    }
}(logger);


var pongHandler = function(message, replier) {
    logger.info('pong');
    logger.info('I received a message ' + JSON.stringify(message));
    if (message.msg === 'ping') {

        logger.info('replaying pong');
        replier({msg: 'pong'});

    }
};

var clientListHandler = function(message, replier) {
    var res = {clientList: clientsRepository.getClients()};
    logger.info('Returning client list');
    replier(res);
};

eb.registerHandler('pong', pongHandler);

eb.registerHandler('clientList', clientListHandler);


logger.info('Pong verticle started');
