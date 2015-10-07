var _ = require('lodash');

_.mixin({
  //Returns the sum of all numbers in the passed in array(s).
  flatSum: function(arrays) {
    return _.sum(_.flatten(arguments));
  },
})

module.exports = _;