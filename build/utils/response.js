"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Response = /*#__PURE__*/function () {
  function Response() {
    (0, _classCallCheck2["default"])(this, Response);
    this.statusCode = null;
    this.type = null;
    this.data = null;
    this.message = null;
  }

  (0, _createClass2["default"])(Response, [{
    key: "setSuccess",
    value: function setSuccess(statusCode, message, data) {
      console.log(statusCode, message, data, 'data');
      this.statusCode = statusCode;
      this.message = message;
      this.data = data;
      this.type = 'success';
    }
  }, {
    key: "setError",
    value: function setError(statusCode, message) {
      this.statusCode = statusCode;
      this.message = message;
      this.type = 'error';
    }
  }, {
    key: "send",
    value: function send(res) {
      var result = {
        status: this.type,
        message: this.message,
        data: this.data
      };

      if (this.type === 'success') {
        return res.status(this.statusCode).json(result);
      }

      return res.status(this.statusCode).json({
        status: this.type,
        message: this.message
      });
    }
  }]);
  return Response;
}();

exports["default"] = Response;