"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.setUser = exports.handleLogin = exports.setLogOut = exports.setLogIn = exports.saveForLater = exports.SelectIsAuthenticated = exports.selectToken = exports.selectUser = void 0;

var _toolkit = require("@reduxjs/toolkit");

var authSlice = (0, _toolkit.createSlice)({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    token: null,
    status: '',
    user: {} // {
    //     "id": "",
    //     "name": "",
    //     "password": "",
    //     "gender": "",
    //     "phone": "",
    //     "barthDay": "", 
    //     "role":""
    // }

  },
  reducers: {
    setLogIn: function setLogIn(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      localStorage.setItem("token", JSON.stringify(action.payload.token));
    },
    setLogOut: function setLogOut(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.user = {};
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    setUser: function setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    }
  }
});

var selectUser = function selectUser(state) {
  return state.auth.user;
};

exports.selectUser = selectUser;

var selectToken = function selectToken(state) {
  return state.auth.token;
};

exports.selectToken = selectToken;

var SelectIsAuthenticated = function SelectIsAuthenticated(state) {
  return state.auth.isAuthenticated;
};

exports.SelectIsAuthenticated = SelectIsAuthenticated;
var _authSlice$actions = authSlice.actions,
  saveForLater = _authSlice$actions.saveForLater,
  setLogIn = _authSlice$actions.setLogIn,
  setLogOut = _authSlice$actions.setLogOut,
  handleLogin = _authSlice$actions.handleLogin,
  setUser = _authSlice$actions.setUser;
exports.setUser = setUser;
exports.handleLogin = handleLogin;
exports.setLogOut = setLogOut;
exports.setLogIn = setLogIn;
exports.saveForLater = saveForLater;
var _default = authSlice.reducer;
exports["default"] = _default;