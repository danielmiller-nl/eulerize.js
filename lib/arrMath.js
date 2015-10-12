var _ = require('lodash');

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
	returnIf: function (value, predicates, returnValues, default_) {
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
	}
});

// _.mixin({
// 	toArray: function(integer, array) {
// 		return _.isUndefined(array)
// 			?
// 	}
// });

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
	}
});

module.exports = _;