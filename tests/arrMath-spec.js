var arrMath = require('../lib/arrMath.js');

var arrays = [
  [1,2,3,4,5],
  [0],
  [-7,-5,2,-10]
];

describe('arrMath', function() {

    describe('sum', function() {

      it("Should return the sum of any passed in array", function() {

        expect(arrMath.sum(arrays[0])).toEqual(15);
        expect(arrMath.sum(arrays[1])).toEqual(0);
        expect(arrMath.sum(arrays[2])).toEqual(-20);

      });

      it("Should return the sum of multiple arrays", function() {
        expect(arrMath.sum(arrays[0],arrays[1],arrays[2])).toEqual(-5);
      });

      it("Should return the sum of nested arrays", function() {
        expect(arrMath.sum([arrays,[[1,[2]],2]])).toEqual(0);
      });

    });

});
