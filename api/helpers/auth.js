"use strict";

var sharedSecret = "shh";
var issuer = "my-awesome-website.com";

//Here we setup the security checks for the endpoints
//that need it (in our case, only /protected). This
//function will be called every time a request to a protected
//endpoint is received

console.log( "Loading auth module...");

exports.verifyToken = function(req, authOrSecDef, token, callback) {
  //these are the scopes/roles defined for the current endpoint

  console.log( "Verify token...");

  function sendError() {
    return req.res.status(403).json({ message: "Error: Access Denied" });
  }

  //validate the 'Authorization' header. it should have the following format:
  //'Bearer tokenString'
  if (token && token.indexOf("Bearer ") == 0) {
    var tokenString = token.split(" ")[1];

    
    //if there is no error, just return null in the callback
    return callback(null);
  } else {
    //return the error in the callback if the Authorization header doesn't have the correct format
    return callback(sendError());
  }
};
