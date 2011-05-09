var settings = require('./settings'),
    IRCCDServer = require('./server');

function create_server (callback) {
    /**
     * Called after we've gotten our settings.
     */
    var post_retrieve_settings = (function post_retrieve_settings (settings)
    {
        var server = new IRCCDServer(settings);

        if (callback)
            callback(server);
    });

    settings.get(post_retrieve_settings);
}

module.exports = {
    'createServer': create_server
}

// Testing.
create_server();
