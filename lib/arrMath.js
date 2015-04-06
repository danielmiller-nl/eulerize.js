var _ = require('underscore');

module.exports = {

  //Returns the sum of all numbers in the passed in array(s).
  sum: function(arrays){
    return _.reduce(_.flatten(arguments),function(sum,element){
      if(typeof element !== 'number'){
        console.error("Error: requires an array of numbers only");
      }
      return sum+element;
    });
  }

}