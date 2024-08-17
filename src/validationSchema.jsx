import { object, ref, string } from 'yup';
import { phoneNumberRegex } from './Regex';
export const validationSchema = object().shape({
  name:
    string()
      .min(6, "يجب أن يكون الاسم أكثر من 6 أحرف")
      .max(20)
      .required("الاسم مطلوب"),
  password:
    string()
      .min(8, "يجب أن تكون كلمة المرور 8 أحرف على الأقل")
      // .matches(passwordRegexMedium, "يجب أن تحتوي كلمة المرور على حرف صغير واحد وحرف كبير واحد ورمز خاص واحد")
      .required("كلمة المرور مطلوبة"),
  confirmPassword: string()
    .oneOf([ref('password'), null], "كلمتا المرور يجب أن تتطابق")
    .required('تأكيد كلمة المرور مطلوب'),
  phone:
    string()
      .matches(phoneNumberRegex, "رقم الهاتف غير صالح، الصيغة الصحيحة هي '00-000-00-00'")
      .required("رقم الهاتف مطلوب"), 
});
export const validationSchemaUpdateAdmain = object().shape({
  name:
    string()
      .min(6, "يجب أن يكون الاسم أكثر من 6 أحرف")
      .max(20)
      .required("الاسم مطلوب"), 
  phone:
    string()
      .matches(phoneNumberRegex, "رقم الهاتف غير صالح، الصيغة الصحيحة هي '00-000-00-00'")
      .required("رقم الهاتف مطلوب"), 
});
export const validationSchemaLogIn = object().shape({
  password:
    string()
      .min(8, "يجب أن تكون كلمة المرور 8 أحرف على الأقل")
      .required("كلمة المرور مطلوبة"),
  phone:
    string()
      .matches(phoneNumberRegex, "رقم الهاتف غير صالح، الصيغة الصحيحة هي '00-000-00-00' أو '123456789'")
      .required("رقم الهاتف مطلوب") 
});
export const validationSchemaOTP = object().shape({ 
  phone:
    string()
      .matches(phoneNumberRegex, "رقم الهاتف غير صالح، الصيغة الصحيحة هي '00-000-00-00' أو '123456789'")
      .required("رقم الهاتف مطلوب") 
});
