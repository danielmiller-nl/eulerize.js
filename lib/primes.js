var _ = _ || require('lodash');

_.mixin({
	primesTo: function (highBound, lowBound, seedList) {
		lowBound = lowBound || 0;
		
		var primeList = _.range(2, highBound);
		
		for (var i = 2;i <= Math.sqrt(highBound);i++) {
			for (var j = i - 2;j <= highBound;j+=i) {
				primeList[j+i] = -1;
			}
		}
		
		console.log(_filter(primeList, _.partial(_.gt, 0)));
		// var primeList = _.sortBy(seedList) || [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
		// var lowBoundIndex = _.listBelow(primeList, lowBound).length - 1;
		
		// if (highBound < _.last(primeList)) {
		// 	return _.listBelow(primeList, highBound);
		// }
		// else {
		// 	while (_.last(primeList) + 1 <= highBound) {
		// 		primeList.push(_.last(primeList) + 2);
		// 	}
		// 	[49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101]
		// 	49, 53, 55, 59, 61, 65, 67, 71, 73, 77, 79, 83, 85, 89, 91, 95, 97, 101
		// }
	}
});