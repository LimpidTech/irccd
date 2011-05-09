var prefer = require('prefer'),

    defaults = {};

function get_settings (callback) {
    var settings = {},
        configurator;

    function get_encryption_settings (err, encryption) {
        if (err) throw err;

        settings['encryption'] = encryption;

        callback(settings);
    }

    function get_listener_settings (err, listeners) {
        if (err) throw err;

        settings['listeners'] = listeners;

        configurator.get(get_encryption_settings, 'encryption', {});
    }

    function get_client_settings (err, clients) {
        if (err) throw err;

        settings['clients'] = clients;

        configurator.get(get_listener_settings, 'listeners');
    };

    prefer.load('irccd.json', {}, function get_configurator (err, _configurator)
    {
        configurator = _configurator;

        configurator.get(get_client_settings, 'clients');
    });
}

module.exports = {
    'get': get_settings
};
