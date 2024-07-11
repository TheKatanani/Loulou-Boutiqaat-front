"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.selectOrdersStatus = exports.selectOrders = exports.setStatusIdle = exports.resetState = exports.removeOrder = exports.updateOrder = exports.addOrder = exports.setOrders = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _Actions = require("../../Actions");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var ordersSlice = (0, _toolkit.createSlice)({
  name: 'order',
  initialState: {
    orders: [],
    error: [],
    status: ''
  },
  reducers: {
    resetState: function resetState(state) {
      state.orders = [];
      state.error = [];
      state.status = '';
    },
    setStatusIdle: function setStatusIdle(state) {
      state.status = _Actions.STATUS.IDLE;
    }
  },
  extraReducers: function extraReducers(builder) {
    builder // setOrders
    .addCase(setOrders.pending, function (state) {
      state.status = _Actions.STATUS.LOADING;
    }).addCase(setOrders.fulfilled, function (state, action) {
      state.status = _Actions.STATUS.SUCCEEDED;
      state.orders = action.payload;
    }).addCase(setOrders.rejected, function (state, action) {
      state.status = _Actions.STATUS.FAILED;
      state.error = action.error;
    }) //  addToOrders
    .addCase(addOrder.pending, function (state) {
      state.status = _Actions.STATUS.LOADING;
      state.error = null;
    }).addCase(addOrder.fulfilled, function (state, action) {
      state.status = _Actions.STATUS.SUCCEEDED;
      state.orders = [].concat(_toConsumableArray(state.orders), [action.payload]);
    }).addCase(addOrder.rejected, function (state, action) {
      state.status = _Actions.STATUS.FAILED;
      state.error = action.error;
    }) // removeOrder
    .addCase(removeOrder.pending, function (state) {
      state.status = _Actions.STATUS.LOADING;
      state.error = null;
    }).addCase(removeOrder.fulfilled, function (state, action) {
      state.status = _Actions.STATUS.SUCCEEDED;
      state.orders = state.orders.filter(function (order) {
        return order.id != action.payload;
      });
    }).addCase(removeOrder.rejected, function (state, action) {
      state.status = _Actions.STATUS.FAILED;
      state.error = action.payload;
    }) // updateOrder
    .addCase(updateOrder.pending, function (state) {
      state.status = _Actions.STATUS.LOADING;
      state.error = null;
    }).addCase(updateOrder.fulfilled, function (state, action) {
      state.status = _Actions.STATUS.SUCCEEDED;
      state.orders = state.orders.map(function (order) {
        return order.id == action.payload.id ? _objectSpread({}, order, {}, action.payload) : order;
      });
    }).addCase(updateOrder.rejected, function (state, action) {
      state.status = _Actions.STATUS.FAILED;
      state.error = action.payload;
    });
  }
});
var setOrders = (0, _toolkit.createAsyncThunk)("order/setOrders", function _callee(_ref) {
  var axiosPrivate, response;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          axiosPrivate = _ref.axiosPrivate;
          _context.next = 3;
          return regeneratorRuntime.awrap(axiosPrivate.get("/order"));

        case 3:
          response = _context.sent;
          return _context.abrupt("return", response.data);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.setOrders = setOrders;
var addOrder = (0, _toolkit.createAsyncThunk)("order/addOrder", function _callee2(_ref2) {
  var order, axiosPrivate, response;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          order = _ref2.order, axiosPrivate = _ref2.axiosPrivate;
          _context2.next = 3;
          return regeneratorRuntime.awrap(axiosPrivate.post("/order", order));

        case 3:
          response = _context2.sent;
          return _context2.abrupt("return", response.data);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.addOrder = addOrder;
var updateOrder = (0, _toolkit.createAsyncThunk)("order/updateOrder", function _callee3(_ref3) {
  var orderId, data, axiosPrivate, response;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          orderId = _ref3.orderId, data = _ref3.data, axiosPrivate = _ref3.axiosPrivate;
          _context3.next = 3;
          return regeneratorRuntime.awrap(axiosPrivate.put("/order/".concat(orderId), data));

        case 3:
          response = _context3.sent;
          return _context3.abrupt("return", response.data);

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
});
exports.updateOrder = updateOrder;
var removeOrder = (0, _toolkit.createAsyncThunk)("order/removeOrder", function _callee4(_ref4) {
  var orderId, axiosPrivate, response;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          orderId = _ref4.orderId, axiosPrivate = _ref4.axiosPrivate;
          _context4.next = 3;
          return regeneratorRuntime.awrap(axiosPrivate["delete"]("/order/".concat(orderId)));

        case 3:
          response = _context4.sent;
          return _context4.abrupt("return", response.data);

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
});
exports.removeOrder = removeOrder;
var _ordersSlice$actions = ordersSlice.actions,
    resetState = _ordersSlice$actions.resetState,
    setStatusIdle = _ordersSlice$actions.setStatusIdle;
exports.setStatusIdle = setStatusIdle;
exports.resetState = resetState;

var selectOrders = function selectOrders(state) {
  return state.order.orders;
};

exports.selectOrders = selectOrders;

var selectOrdersStatus = function selectOrdersStatus(state) {
  return state.order.status;
};

exports.selectOrdersStatus = selectOrdersStatus;
var _default = ordersSlice.reducer;
exports["default"] = _default;