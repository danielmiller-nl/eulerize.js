var _ = _ || require('underscore');

module.exports = {

  /*
  * Returns a finite sequence of numbers as an array.
  * Array is an array of initial terms of the sequence. Defaults to empty.
  * nextTerm is a function that calculates the next term to be pushed on to array
  *   - Takes four parameters:
  *     - array: all sequence values added to the array so far
  *     - n: the index of the term to be calculated
  *     - 
  */
  sequence: function(endN,startN,currentN,array,skip){

    var sequence = [];
    var n;

    if(startN.constructor === 'function'){
      switch(arguments.length){
        case 4:
          skip = array;
          array = currentN;
          currentN = startN;
          startN = 0;
          break;
        case 3:
          currentN = startN;
          startN = 0;
          if(array.constructor === "number") {
            skip = array;
            array = [];
          }
          skip = skip || 1; 
          break;
        case 2:
          currentN = startN;
          startN = 0;
          array = [];
          skip = 1;
          break;
      }
    }
    
    _.each(array,function(number,index){
      //console.log(array,number,index);
      if(index%skip == 0 && index>=startN){
        sequence.push(number);
      }
    });

    for(var i = startN;i<=endN;i++){
      n = currentN(array,i);
      array.push(n);
      if(n%skip == 0&&i>=startN){
        sequence.push(n);
      } 
    }

    return sequence;

  },

  /*
  Returns an array of every fibonacci number up to and including the nth fibonacci.
  
  Options can be an object with two properties:
    fromN: a number at which to start the sequence
    step: step indicates how many terms of the sequence should be skipped in between each addition to the array
    max: indicates a maximum value for the nth term of the sequence
    min: indicates a minimum value for the nth term of the sequence
  */
  fibonacci: function(endN,skip,startN){
    skip = skip || 1;
    startN = startN || 1;
    return module.exports.sequence(endN,startN,function(arr,i){return arr[i-1]+arr[i-2];},[1,2],skip);
  }

}