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
  discription: string()
    .min(8, "discription must be at least 8 characters long")
    .required("discription is required"),
  price: number()
    .positive('the price must be positive value')
    .required('you must add price'),
  previousPrice: number()
    .positive('the price must be positive value')
    .required('you must add price'),
  count: number()
    .positive('the count must be positive value')
    .required('you must add count'),
  images: array()
    .min(1, "you must add atleast one image")
});