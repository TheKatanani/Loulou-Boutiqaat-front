"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validationSchema = void 0;

var _yup = require("yup");

var validationSchema = (0, _yup.object)().shape({
  name: (0, _yup.string)().min(6, "Name should be more than 6 characters long").max(20).required("Name is required"),
  description: (0, _yup.string)().min(8, "description must be at least 8 characters long").required("description is required"),
  background: (0, _yup.string)().min(1, "you must add a background for the category")
});
exports.validationSchema = validationSchema;