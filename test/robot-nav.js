const
	test = require('tape'),
	navigateRobots = require('../src/lib/navigation').navigateRobots;


const testRobot = (x, y, heading, actions) => ({
	x, y, heading,
	actions: actions.split('')
});


test('empty robot list', (t) => {
	t.same(navigateRobots(5,5, []), [], 'should be result empty list');
	t.end();
});


test('robot without actions', (t) => {
	t.same(
		navigateRobots(5,5, [testRobot(1, 2, 'N', '')]),
		[{x:1, y:2, heading:'N'}],
		'should not move'
	);
	t.end();
});


test('robot with one move action', (t) => {
	t.same(
		navigateRobots(5,5, [testRobot(1, 2, 'N', 'M')]),
		[{x:1, y:3, heading:'N'}],
		'should move one grid point'
	);
	t.end();
});


test('robot with 4 turn action in a same direction', (t) => {
	t.same(
		navigateRobots(5,5, [testRobot(1, 2, 'N', 'LLLL')]),
		[{x:1, y:2, heading:'N'}],
		'on left should turn back the original direction'
	);
	t.same(
		navigateRobots(5,5, [testRobot(1, 2, 'N', 'RRRR')]),
		[{x:1, y:2, heading:'N'}],
		'on right should turn back the original direction'
	);
	t.end();
});


test('robots with move action', (t) => {
	t.same(
		navigateRobots(5,5, [testRobot(1, 2, 'N', 'MMMMMMMM')]),
		[{x:1, y:5, heading:'N'}],
		'should not cross the border on North'
	);
	t.same(
		navigateRobots(5,5, [testRobot(1, 2, 'E', 'MMMMMMMM')]),
		[{x:5, y:2, heading:'E'}],
		'should not cross the border on East'
	);
	t.same(
		navigateRobots(5,5, [testRobot(1, 2, 'S', 'MMMMMMMM')]),
		[{x:1, y:0, heading:'S'}],
		'should not cross the border on South'
	);
	t.same(
		navigateRobots(5,5, [testRobot(1, 2, 'W', 'MMMMMMMM')]),
		[{x:0, y:2, heading:'W'}],
		'should not cross the border on West'
	);
	t.end();
});


test('multiple robot', (t) => {
	t.same(
		navigateRobots(5,5, [
			testRobot(1, 2, 'N', 'LMLMLMLMM'),
			testRobot(3, 3, 'E', 'MMRMMRMRRM')
		]),
		[
			{x:1, y:3, heading:'N'},
			{x:5, y:1, heading:'E'}
		],
		'should can move on the same board'
	);

	t.same(
		navigateRobots(5,5, [
			testRobot(1, 1, 'N', 'MM'),
			testRobot(1, 5, 'S', 'MM')
		]),
		[
			{x:1, y:3, heading:'N'},
			{x:1, y:4, heading:'S'}
		],
		'should not step on the same grid point'
	);
	t.end();
});


test('Invalid input', (t) => {
	t.throws(
		() => navigateRobots(5,5, [testRobot(0,0, 'X', 'M') ]),
		/Invalid direction: X/,
		'should throw "Invalid direction" exception'
	);
	t.throws(
		() => navigateRobots(5,5, [testRobot(0,0, 'N', 'X') ]),
		/Invalid action: X/,
		'should throw "Invalid action" exception'
	);
	t.end();
});


