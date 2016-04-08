'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 5000
});


server.register([require('vision'), require('inert'), {register: require('lout')}], err => {
    if (err){
        console.error(err);
    }

    server.route([
		require('./routes/robot-nav')('/api')
	]);

	server.start( error =>
		error
			? console.error(`Houston we have a problem: ${error}`)
			: console.log('Server started on %s ...', server.info.uri)
	);
});
