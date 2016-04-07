'use strict';

const
	Joi = require('joi'),
	navigateRobots = require('../lib/navigation').navigateRobots;

module.exports = (prefix) => ({
	method: 'POST',
	path: `${prefix}/robot`,
	config: {
		validate: {
			payload: Joi.object().keys({
				width: Joi.number().integer().min(1),
				height: Joi.number().integer().min(1),
				robots: Joi.array().max(1024).items(
					Joi.object().keys({
						x: Joi.number().integer().min(0),
						y: Joi.number().integer().min(0),
						heading: Joi.string().regex(/N|E|S|W/),
						actions: Joi.string().max(1024)
					})
				)
			})
		},
		handler: (req, reply) => {
			const data = req.payload;
			reply(navigateRobots(data.width, data.height, data.robots));
		}
	}
});
