import { object, string } from 'yup';
export const validationSchema = object().shape({
  name: string()
    .min(6, "يجب أن يكون الاسم أكثر من 6 أحرف")
    .max(20)
    .required("الاسم مطلوب"),
  description: string()
    .min(8, "يجب أن يكون الوصف على الأقل 8 أحرف")
    .required("الوصف مطلوب"),
  background: string()
    .min(1, "يجب إضافة خلفية للتصنيف")
});
