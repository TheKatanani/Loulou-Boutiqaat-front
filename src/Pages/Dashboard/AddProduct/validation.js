import {
  array,
  number,
  object,
  string
} from 'yup';
export const validationSchema = object().shape({
  name: string()
    .min(6, "Name should be more than 6 characters long")
    .max(20)
    .required("Name is required"),
  description: string()
    .min(8, "description must be at least 8 characters long")
    .required("description is required"),
  price: number()
    .positive('the price must be positive value')
    .required('you must add price'),
  prevPrice: number()
    .positive('the price must be positive value')
    .required('you must add price'),
  count: number()
    .positive('the count must be positive value')
    .required('you must add count'),
  images: array()
    .min(1, "you must add atleast one image")
});