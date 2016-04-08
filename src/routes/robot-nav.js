'use strict';

const
	Joi = require('joi'),
	navigateRobots = require('../lib/navigation').navigateRobots;

module.exports = (prefix) => ({
	method: 'POST',
	path: `${prefix}/robot`,
	config: {
		description:
			'Calculate zero or more robots location in a rectangle area ' +
			'based on the area size and the robots position, heading and move actions.',
		validate: {
			payload: Joi.object().keys({
				width: Joi.number().integer().min(1).description('Width of the fight area'),
				height: Joi.number().integer().min(1).description('Height of the fight area'),
				robots: Joi.array().max(1024).items(
					Joi.object().keys({
						x: Joi.number().integer().min(0).description('Robot start position x coordinate'),
						y: Joi.number().integer().min(0).description('Robot start position y coordinate'),
						heading: Joi.string().regex(/^(N|E|S|W)$/).description('Robot start heading (North, East, South or West)'),
						actions: Joi.string().regex(/^(M|R|L)*$/).max(1024).description('Robot actions (Move, Left or Right)')
					})
				).description('List of robots')
			})
		},
		handler: (req, reply) => {
			const data = req.payload;
			reply(navigateRobots(data.width, data.height, data.robots));
		}
	}
});
