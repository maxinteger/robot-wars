'use strict';

const
	pick = require('lodash/fp/pick'),
	map = require('lodash/fp/map'),
	flow = require('lodash/fp/flow'),
	clamp = require('lodash/fp/clamp'),
	reduce = require('lodash/fp/reduce'),
	extend = require('lodash/fp/extend'),
	findIndex = require('lodash/fp/findIndex');


const navigateRobots = (w, h, robots) =>
	reduce(navigateRobot(w, h), [], robots);


const navigateRobot = (w, h) => (doneList, robot) =>
	doneList.concat(reduce(robotAction(w, h, doneList), pick(['x', 'y', 'heading'], robot), robot.actions));


const robotAction = (w, h, doneList) => (robot, action) =>{
	switch (action){
		case 'M': const newRobot = flow(moveRobot, applyBorder(w, h))(robot);
			return containsByCoord(newRobot)(doneList) != -1 ? robot : newRobot;
		case 'L':
		case 'R': return turnRobot(robot, action);
		default: throw Error('Invalid action: ' + action);
	}
};

const moveRobot = (robot) => {
	const heading = robot.heading,
		x = robot.x,
		y = robot.y;

	switch(heading){
		case 'N': return {heading, x,      y: y+1};
		case 'E': return {heading, x: x+1, y     };
		case 'S': return {heading, x,      y: y-1};
		case 'W': return {heading, x: x-1, y     };
		default: throw Error('Invalid direction: ' + heading);
	}
};

const TURNS = {
	N: {L: 'W', R: 'E'},
	E: {L: 'N', R: 'S'},
	S: {L: 'E', R: 'W'},
	W: {L: 'S', R: 'N'}
};

const turnRobot = (robot, turn) => extend(robot, { heading: TURNS[robot.heading][turn] });


const applyBorder = (w, h) => (robot) =>
	extend(robot, {
		x: clamp(0, w, robot.x),
		y: clamp(0, h, robot.y)
	});

const containsByCoord = (pos) =>
	findIndex( (r) => r.x === pos.x && r.y == pos.y);

////////////////////////////////////////////////////

module.exports = { navigateRobots };
