"use strict";

var app = require("express")();
var swaggerTools = require("swagger-tools");
var YAML = require("yamljs");
var auth = require("./api/helpers/auth");
var swaggerConfig = YAML.load("./api/swagger/swagger.yaml");

swaggerTools.initializeMiddleware(swaggerConfig, function(middleware) {
  //Serves the Swagger UI on /docs

  console.log("Initializing security middleware...")
  app.use(middleware.swaggerUi());
  app.use(
    middleware.swaggerSecurity({
      //manage token function in the 'auth' module
      Bearer: auth.verifyToken
    })
  );
  app.use(middleware.swaggerMetadata()); // needs to go after swaggerSecurity, otherwise using 'Authorization' header from swagger api_key doesn't authenticate properly

  var routerConfig = {
    controllers: "./api/controllers",
    useStubs: false
  };

  app.use(middleware.swaggerRouter(routerConfig));
  app.listen(10510, function() {
    console.log("Started server on port 10510");
  });
});