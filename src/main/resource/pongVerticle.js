var vertx = require('vertx');

var container = require('vertx/container');
var logger = container.logger;

logger.info('Starting pong verticle');

var eb = vertx.eventBus;

var pongHandler = function(message, replier) {
    logger.info('pong');
    logger.info('I received a message ' + JSON.stringify(message));
    if(message.msg === 'ping' ){

        logger.info('replaying pong');
        replier({msg:'pong'});

    }
};

eb.registerHandler('pong', pongHandler);

logger.info('Pong verticle started');
