import { object, number, string, array } from 'yup';
export const validationSchema = object().shape({
  name: string()
    .min(6, "يجب أن يكون الاسم أكثر من 6 أحرف")
    .max(50,"يجب أن يكون الاسم الأكثر من 50 أحرف")
    .required("الاسم مطلوب"),
  description: string()
    .min(8, "يجب أن يكون الوصف على الأقل 8 أحرف")
    .required("الوصف مطلوب"),
  price: number()
    .positive('السعر يجب أن يكون قيمة موجبة')
    .required('يجب إضافة سعر'),
  prevPrice: number()
    .min(0, 'السعر يجب أن يكون قيمة موجبة أو صفر'),
  images: array()
    .min(1, "يجب إضافة صورة واحدة على الأقل")
});
