var sequences = require('../lib/sequences.js');

describe('sequences', function() {

    describe('fibonacci', function() {

      it("Should return the fibonacci sequence to n", function() {
        expect(sequences.fibonacci(5)).toEqual([1,2,3,5,8]);
      });

      it("Should return every nth term in the fibonacci sequence, up to n", function() {
        expect(sequences.fibonacci(6,2)).toEqual([2,5,13]);
        expect(sequences.fibonacci(7,3)).toEqual([3,13]);
      });

      it("Should return the fibonacci terms from start to end", function() {
        expect(sequences.fibonacci(9,1,5)).toEqual([8,13,21,34,45]);
      });

    });

});