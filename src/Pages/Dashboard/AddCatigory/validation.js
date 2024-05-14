import {
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
  background: string()
    .min(1, "you must add a background for the category")
});