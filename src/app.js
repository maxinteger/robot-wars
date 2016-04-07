'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 5000
});


server.register([], err => {
    if (err){
        console.error(err);
    }

    server.route([
		require('./routes/robot-nav')('/api')
	]);

    if (!module.parent) {
        server.start( () =>
            console.log('Server started on %s ...', server.info.uri)
        );
    }
});

module.exports = server;
