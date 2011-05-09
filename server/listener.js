var zmq = require('zeromq');

function create_listener (options) {
    var socket = new zmq.createSocket(options.type);

    socket.bind(options.address, function check_bound (err) {
        if (err) throw err;
    });
}

module.exports = {
    'create': create_listener
};
