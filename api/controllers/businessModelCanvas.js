'use strict';

var util = require('util');

module.exports = {
  canvasFind
};

function canvasFind(req, res) {

  var canvas =[{ 'id': '4711', 'name': 'TestCanvas'}];

  res.json(canvas);
}
