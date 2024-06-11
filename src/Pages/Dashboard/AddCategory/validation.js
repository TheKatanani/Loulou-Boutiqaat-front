import {
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
  background: string()
    .min(1, "you must add a background for the category")
});