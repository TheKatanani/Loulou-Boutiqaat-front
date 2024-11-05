"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validationPhone = exports.validationPassword = exports.validationName = void 0;

var _yup = require("yup");

var _Regex = require("../../../Regex");

var validationName = (0, _yup.object)().shape({
  name: (0, _yup.string)().min(6, "يجب أن يكون الاسم أكثر من 6 أحرف").max(20).required("الاسم مطلوب")
});
exports.validationName = validationName;
var validationPassword = (0, _yup.object)().shape({
  password: (0, _yup.string)().min(8, "يجب أن تكون كلمة المرور 8 أحرف على الأقل").required("كلمة المرور مطلوبة"),
  confirmPassword: (0, _yup.string)().oneOf([(0, _yup.ref)('password'), null], "كلمتا المرور يجب أن تتطابق").required('تأكيد كلمة المرور مطلوب')
});
exports.validationPassword = validationPassword;
var validationPhone = (0, _yup.object)().shape({
  phone: (0, _yup.string)().matches(_Regex.phoneNumberRegex, "رقم الهاتف غير صالح، الصيغة الصحيحة هي '00-000-00-00'").required("رقم الهاتف مطلوب")
});
exports.validationPhone = validationPhone;