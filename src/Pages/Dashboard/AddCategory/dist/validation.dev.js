"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validationSchema = void 0;

var _yup = require("yup");

var validationSchema = (0, _yup.object)().shape({
  name: (0, _yup.string)().min(6, "يجب أن يكون الاسم أكثر من 6 أحرف").max(20).required("الاسم مطلوب"),
  description: (0, _yup.string)().min(8, "يجب أن يكون الوصف على الأقل 8 أحرف").required("الوصف مطلوب"),
  background: (0, _yup.string)().min(1, "يجب إضافة خلفية للتصنيف")
});
exports.validationSchema = validationSchema;