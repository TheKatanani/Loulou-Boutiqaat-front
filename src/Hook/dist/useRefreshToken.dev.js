"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("../api/axios"));

var _reactRedux = require("react-redux");

var _auth = require("../redux/reducers/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var useRefreshToken = function useRefreshToken() {
  // setAuth
  var dispatch = (0, _reactRedux.useDispatch)();

  var refresh = function refresh() {
    var res;
    return regeneratorRuntime.async(function refresh$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(_axios["default"].get('/refresh', {
              withCredentials: true
            }));

          case 3:
            res = _context.sent;
            dispatch((0, _auth.setLogIn)(res.data.accessToken)); //update the current token

            return _context.abrupt("return", res.data.accessToken);

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 8]]);
  };

  return refresh;
};

var _default = useRefreshToken;
exports["default"] = _default;