var _ = require('../lib/arrMath.js');
var assert = require('assert');

var arrays = [
  [1,2,3,4,5],
  [0],
  [-7,-5,2,-10]
];

describe('arrMath', function() {

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

});
