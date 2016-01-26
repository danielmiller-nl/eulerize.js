var _ = _ || require('lodash');

_.mixin({
	flatSum: function (arrays) {
		return _.sum(_.flatten(arguments));
	},
	toInt: function (array) {
		var lengthsSoFar = _.lengthsSoFar(array);

		return _.sum(_.map(array, function (val, index) {
			return val * _.pow10(_.last(lengthsSoFar) - lengthsSoFar[index]);
		}));
	},
	lengthsSoFar: function (array, i) {
		return _.isUndefined(i)
		? this.lengthsSoFar(_.map(_.clone(array), function (v, i) {
			return i === 0 ? _.digits(v) : v;
		}), 1)
		: i < array.length
			? this.lengthsSoFar((array[i] = _.digits(array[i]) + array[i - 1]) && array, i+1)
			: array
		;
	}
});

_.mixin({
	toFunc: function (funcBody, args) {
		return new (Function.prototype.bind.apply(
			Function, _.toArray(arguments).concat(funcBody)
		));
	},
	switchFuncs: function (value, predicates, returnValues, default_) {
		var returnAs = function (val, returnVal) {
			switch (typeof returnVal) {
				case 'function':
					return returnVal(val);
				case 'object':
					return _.isNull(returnVal)
						? returnVal
						: returnVal[val]
					;
				case 'boolean':
					return returnVal;
				case 'undefined':
					return val;
				default:
					return returnVal;
			}
		}

		if (this.keys(predicates).length !== this.keys(returnValues).length) {
			throw Error;
		}
		var predicateFunctions = _.map(predicates, function (predicate) {
			return _.toFunc(predicate, 'val');
		});
		var i = _.findIndex(predicateFunctions, function (predicateFunction) {
			return predicateFunction(value);
		});
		return i > -1
			? returnAs(value, returnValues[i])
			: returnAs(value, default_)
		;
	},
	switchCases: function (value, predicates, returnValues) {
		if (this.keys(predicates).length !== this.keys(returnValues).length) {
			throw Error;
		}
		var i;
		if (_.all(predicates, _.isPlainObject) && (_.isPlainObject(value) || _.isString(value))) {
			i = _.findIndex(predicates, value);
			return i > -1 ? returnValues[i] : i;
		}
	}
});

_.mixin({
	intToArray: function(integer, array) {
		return integer < 10
			? array && [integer].concat(array) || [integer]
			: this.intToArray(
				(integer - (integer % 10)) / 10,
				array && [integer % 10].concat(array) || [integer % 10]
			)
		;
	},
	listBelow: function (array, max) {
		return _.filter(_.sortBy(array), _.partial(_.gt, max));
	}
});

_.mixin({
	pow10: function (n) {
		return Math.pow(10, n);
	},
	digits: function (n) {
		//TODO: understand this bitwise operator
		return _.add((Math.log10((n ^ (n >> 31)) - (n >> 31)) | 0), 1);
	},
	intDiv: function (intA, intB) {
		//TODO: understand this bitwise operator
		return ~~(intA / intB);
	},
	firstMultipleOfYAboveX: function (x, y) {
		//TODO: tests
		return x < y ? y : x + y - (x % y);
	}
});

// var x;
// for (var i = 2;i <= Math.sqrt(highBound);i++) {
// 	x = i == 2 ? 1 : 2;
// 	for (var j = i - 2;j <= highBound;j+=x*i) {
// 		primeList[j+x*i] = -1;
// 	}
// }

_.mixin({
	primesTo: function (highBound, lowBound, seedList) {
		lowBound = lowBound || 0;
		
		var primeList = _.range(2, highBound);
		
		var x;
		for (var i = 2;i <= Math.sqrt(highBound);i++) {
			while (primeList[i-2] === -1) {
				i++;
			}
			x = i == 2 ? 1 : 2;
			for (var j = i - 2;j <= highBound;j+=i*x) {
				primeList[j+x*i] = -1;
			}
		}
		
		return _.filter(primeList, _.partialRight(_.gt, 0));
	}
});

module.exports = _;