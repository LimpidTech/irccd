var irc = require('irc'),
    os = require('os');

var default_options = {
    'hostname': 'irc.freenode.net',
    'port': 6667,
    'use_ssl': false,

    'channels': [ '#LimpidTech' ],
    'nickname': ['irccd', '_irccd'],

    'real_name': 'IRCCD User',
    'user_name': process.env.USER || 'irccd',
    'user_host': os.hostname(),

    'auto_rejoin': false,
    'auto_connect': true,

    'retry_count': null,
    'retry_delay': 2000,

    'debug': false
};

function create_client (options) {
    var client = new irc.Client(
        options.hostname || default_options.hostname,
        options.nickname || default_options.nickname,

        {
            'port': options.port || default_options.port,

            'realName': options.real_name || default_options.real_name,
            'userName': options.user_name || default_options.user_name,

            'debug': options.debug || default_options.debug,
            'showErrors': options.debug || default_options.debug,

            'autoRejoin': options.auto_rejoin || default_options.auto_rejoin,
            'autoConnect': options.auto_connect || default_options.auto_connect,

            'channels': options.channels || default_options.channels,

            'retryCount': options.retry_count || default_options.retry_count,
            'retryDelay': options.retry_delay || default_options.retry_delay,

            'secure': options.use_ssl || default_options.use_ssl
        }
    );

    return client;
};

module.exports = {
    'create': create_client
};
