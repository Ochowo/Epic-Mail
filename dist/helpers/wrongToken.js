'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var wrongToken = function wrongToken(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  _jsonwebtoken2.default.verify(token, process.env.SECRET, function (err) {
    if (err) {
      return res.status(401).json({
        status: 401,
        error: 'Failed to authenticate user token.'
      });
    }
    return next();
  });
};
exports.default = wrongToken;