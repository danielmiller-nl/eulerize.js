//Run node getProblem.js from the eulerize.js folder to get a log of any problem you specify

var request = require("request");
var prompt = require('prompt');
var he = require('he');

prompt.start({'message':'What Project Euler problem would you like?'});

prompt.get('Problem #:', function (err, result) {
  if (err) { console.log(err); }
  request("https://projecteuler.net/problem="+result['Problem #:'], function(error, response, body) {
    console.log(response.request.href);
    extractProblemContent(body,function(problemContent){
      console.log(problemContent);
    });
  });
});

var extractProblemContent = function(body,next){
  var initialExtraction = body.match(/role\="problem"\>([\S\s]+)(?=\<\/div\>\<br)/);
  var problemWithoutHTMLEntities = he.decode(initialExtraction[1]);
  
  var htmlTagsReplacer = function(match){
    if(match.match(/\<sup\>/)){
      return "^";
    } else if (match.match(/\<sub\>/)){
      return "_";
    } else {
      return "";
    }
  };

  var problemWithoutHTMLTags = problemWithoutHTMLEntities.replace(/\<[^\>]*>/g,htmlTagsReplacer);
  next(problemWithoutHTMLTags);
};
 
