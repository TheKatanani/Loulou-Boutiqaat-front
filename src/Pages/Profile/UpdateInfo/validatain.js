import { object, ref, string } from "yup";
import { phoneNumberRegex } from "../../../Regex";

export const validationName = object().shape({
  name:
    string()
      .min(6, "يجب أن يكون الاسم أكثر من 6 أحرف")
      .max(20)
      .required("الاسم مطلوب")
});
export const validationPassword = object().shape({ 
  password:
    string()
      .min(8, "يجب أن تكون كلمة المرور 8 أحرف على الأقل")
      .required("كلمة المرور مطلوبة"),
  confirmPassword: string()
    .oneOf([ref('password'), null], "كلمتا المرور يجب أن تتطابق")
    .required('تأكيد كلمة المرور مطلوب')
});
export const validationPhone = object().shape({ 
  phone:
    string()
      .matches(phoneNumberRegex, "رقم الهاتف غير صالح، الصيغة الصحيحة هي '00-000-00-00'")
      .required("رقم الهاتف مطلوب"), 
}); 