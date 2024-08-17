"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validationSchema = void 0;

var _yup = require("yup");

var validationSchema = (0, _yup.object)().shape({
  name: (0, _yup.string)().min(6, "يجب أن يكون الاسم أكثر من 6 أحرف").max(40).required("الاسم مطلوب"),
  description: (0, _yup.string)().min(8, "يجب أن يكون الوصف على الأقل 8 أحرف").required("الوصف مطلوب"),
  price: (0, _yup.number)().positive('السعر يجب أن يكون قيمة موجبة').required('يجب إضافة سعر'),
  prevPrice: (0, _yup.number)().min(0, 'السعر يجب أن يكون قيمة موجبة أو صفر'),
  images: (0, _yup.array)().min(1, "يجب إضافة صورة واحدة على الأقل")
});
exports.validationSchema = validationSchema;