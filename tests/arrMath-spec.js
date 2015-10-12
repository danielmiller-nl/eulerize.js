var _ = require('../lib/arrMath.js');
var assert = require('assert');

var arrays = [
	[1,2,3,4,5],
	[0],
	[-7,-5,2,-10]
];

describe('arrMath', function () {

	describe('flatSum', function() {
		it("Should return the sum of any passed in array", function() {
			assert.equal(_.flatSum(arrays[0]), 15);
			assert.equal(_.flatSum(arrays[1]), 0);
			assert.equal(_.flatSum(arrays[2]), -20);
		});

		it("Should return the sum of multiple arrays", function() {
			assert.equal(_.flatSum(arrays[0],arrays[1],arrays[2]), -5);
		});

		it("Should return the sum of nested arrays", function() {
			assert.equal(_.flatSum([arrays,[[1,[2]],2]]), 0);
		});
	});

	describe('toInt', function () {
		it("Should convert an array of digits to a single int", function () {
			assert.equal(_.toInt([1, 2, 3, 4]), 1234);
			assert.equal(_.toInt([1, 0, 3, 0]), 1030);
			assert.equal(_.toInt([1, 0, 0]), 100);
			assert.equal(_.toInt([5]), 5);
		});
		
		it("Should convert an array of ints with different numbers of digits to a single int", function () {
			assert.equal(_.toInt([10, 11, 12]), 101112);
			assert.equal(_.toInt([10, 0, 120]), 100120);
			assert.equal(_.toInt([1, 100, 1, 0, 99]), 11001099);
		});
	});

	describe('toFunc', function () {
		it("Should return a function", function () {
			assert.equal(typeof _.toFunc('return a;', 'a'), 'function');
		});

		it("Should have the intended behaviour", function () {
			assert.equal(_.toFunc('return 2*a+2*b;', 'a', 'b')(3,4), 14);
		});

		it("Should work with single argument functions", function () {
			assert.equal(_.toFunc('return str.length;', 'str')('hello world'), 11);
		});

		it("Should work with multi argument functions", function () {
			assert.equal(
				_.toFunc('return str.length + arr.length + a*b;', 'str', 'arr', 'a', 'b')('hello', [1,1,1], 2, 2.5),
				13
			);
		});
	});

	describe('returnIf', function () {
		it("Should return the val applied to the first returnVal corresponding to a true predicate", function () {
			var val = 12;
			var predicates = ['return val % 7 === 0;', 'return val % 5 === 0;', 'return val % 6 === 0;', 'return val % 2 === 0;'];
			var returnValues = [
				function (val) {return '7 divides ' + val + '!'},
				function (val) {return '5 divides ' + val + '!'},
				function (val) {return '6 divides ' + val + '!'},
				function (val) {return '2 divides ' + val + '!'}
			];
			assert.equal(_.returnIf(val, predicates, returnValues), '6 divides 12!');
		});

		it("Should work if return values are objects", function () {
			var vals = ['apple', 'orange'];
			var predicates = ['return val.length == 4;', 'return val.length == 5;', 'return val.length == 6;'];
			var returnValues = [
				{apple: '"apple" has 4 letters', orange:'"orange" has 4 letters'},
				{apple: '"apple" has 5 letters', orange:'"orange" has 5 letters'},
				{apple: '"apple" has 6 letters', orange:'"orange" has 6 letters'},
			];
			assert.equal(_.returnIf(vals[0], predicates, returnValues), '"apple" has 5 letters');
			assert.equal(_.returnIf(vals[1], predicates, returnValues), '"orange" has 6 letters');
		});

		it("Should work if return values are arrays", function () {
			var vals = [1, 2];
			var predicates = ['return val == 2;', 'return val == 3;', 'return val == 1;'];
			var returnValues = [
				['x', 'x', 'two'],
				['x', 'x', 'x'],
				['x', 'one', 'x'],
			];
			assert.equal(_.returnIf(vals[0], predicates, returnValues), 'one');
			assert.equal(_.returnIf(vals[1], predicates, returnValues), 'two');
		});

		it("Should work if return values are null", function () {
			var vals = [1, 2];
			var predicates = ['return val == 2;', 'return val == 3;', 'return val == 1;'];
			var returnValues = [
				null,
				['x', 'x', 'x'],
				['x', 'one', 'x'],
			];
			assert.equal(_.returnIf(vals[0], predicates, returnValues), 'one');
			assert.equal(_.returnIf(vals[1], predicates, returnValues), null);
		});

		it("Should work if return values are boolean", function () {
			var vals = [1, 2];
			var predicates = ['return val == 2;', 'return val == 3;', 'return val == 1;'];
			var returnValues = [
				true,
				['x', 'x', 'x'],
				false,
			];
			assert.equal(_.returnIf(vals[0], predicates, returnValues), false);
			assert.equal(_.returnIf(vals[1], predicates, returnValues), true);
		});

		it("Should work if return values are strings or nums", function () {
			var vals = [1, 2];
			var predicates = ['return val == 2;', 'return val == 3;', 'return val == 1;'];
			var returnValues = [
				200,
				['x', 'x', 'x'],
				'100',
			];
			assert.equal(_.returnIf(vals[0], predicates, returnValues), '100');
			assert.equal(_.returnIf(vals[1], predicates, returnValues), 200);
		});

		it("Should work if return values are undefined", function () {
			var vals = [1, 2];
			var predicates = ['return val == 2;', 'return val == 3;', 'return val == 1;'];
			var returnValues = [
				200,
				['x', 'x', 'x'],
				undefined
			];
			assert.equal(_.returnIf(vals[0], predicates, returnValues), 1);
			assert.equal(_.returnIf(vals[1], predicates, returnValues), 200);
		});
		// Needs more complete testing
	});
	
	describe('lengthsSoFar', function () {
		it("Should return a mapping...", function () {
			assert.deepEqual(_.lengthsSoFar([1, 2, 3]), [1, 2, 3]);
			assert.deepEqual(_.lengthsSoFar([22, 33, 44]), [2, 4, 6]);
			assert.deepEqual(_.lengthsSoFar([101, 0, 101]), [3, 4, 7]);
			assert.deepEqual(_.lengthsSoFar([11, 1, 111, 1]), [2, 3, 6, 7]);
		});
	});
	
	describe('pow10', function () {
		it("Should return 10 raised to the power of the argument", function () {
			assert.equal(_.pow10(-1), 0.1);
			assert.equal(_.pow10(0), 1);
			assert.equal(_.pow10(1), 10);
			assert.equal(_.pow10(2), 100);
		});
	});
	
	describe('digits', function () {
		it("Should return the number of digits in an int", function () {
			assert.equal(_.digits(1), 1);
			assert.equal(_.digits(22), 2);
			assert.equal(_.digits(505), 3);
			assert.equal(_.digits(1035301), 7);
		});
	});
	
	describe('intDiv', function () {
		it("Should return the number of times intB divides into intA", function () {
			assert.equal(_.intDiv(10,3), 3);
			assert.equal(_.intDiv(1002, 200), 5);
			assert.equal(_.intDiv(54, 17), 3);
			assert.equal(_.intDiv(1000, 10), 100);
			assert.equal(_.intDiv(143, 13), 11);
			assert.equal(_.intDiv(12, 13), 0);
			assert.equal(_.intDiv(2, 4), 0);
		});
	});
});