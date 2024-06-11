"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validationSchema = void 0;

var _yup = require("yup");

var validationSchema = (0, _yup.object)().shape({
  name: (0, _yup.string)().min(6, "Name should be more than 6 characters long").max(20).required("Name is required"),
  description: (0, _yup.string)().min(8, "description must be at least 8 characters long").required("description is required"),
  price: (0, _yup.number)().positive('the price must be positive value').required('you must add price'),
  prevPrice: (0, _yup.number)().positive('the price must be positive value').required('you must add price'),
  count: (0, _yup.number)().positive('the count must be positive value').required('you must add count'),
  images: (0, _yup.array)().min(1, "you must add atleast one image")
});
exports.validationSchema = validationSchema;