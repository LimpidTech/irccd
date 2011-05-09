var client = require('./client'),
    listener = require('./listener'),

    Crypto = require('../encryption');

function IRCCDServer (settings) {
    this.settings = settings;

    this.clients = []; // IRC client connections
    this.listeners = []; // Listeners which IRCCD clients connect to.

    this.encryption = new Crypto(settings.encryption);

    /**
     * Create the listening sockets which will be used to communicate response
     * messages to our server.
     */
    for (listener_index in settings.listeners)
    {
        var listener_args = [settings.listeners[listener_index]],
            new_listener = listener.create.apply(this, listener_args);

        this.listeners.push(new_listener);
    }

    /**
     * Create our IRC clients. By default, these will autoconnect.
     */
    for (client_index in settings.clients) {
        var client_args = [settings.clients[client_index]],
            new_client = client.create.apply(this, client_args);

        this.clients.push(new_client);
    }
}

IRCCDServer.prototype = {};

module.exports = IRCCDServer;
