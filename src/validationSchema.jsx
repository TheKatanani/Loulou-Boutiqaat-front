import { boolean, object, ref, string } from 'yup';
import { phoneNumberRegex } from './Regex';
export const validationSchema = object().shape({
  name:
    string()
      .min(6, "Name should be more than 6 characters long")
      .max(20)
      .required("Name is required"),
  password:
    string()
      .min(8, "Password must be at least 8 characters long")
      // .matches(passwordRegexMedium, "Password must contain at least 1 lowercase letter, 1 uppercase letter, and 1 special character")
      .required("Password is required"),
  confirmPassword: string()
    .oneOf([ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
  phone:
    string()
      .matches(phoneNumberRegex, "Invalid phone number the valid phone'00-000-00-00'")
      .required("Phone number is required"),
  agree:
    boolean()
      .oneOf([true], "You must agree to the terms and conditions")
      .required("You must agree to the terms and conditions"),
});
export const validationSchemaUpdateAdmain = object().shape({
  name:
    string()
      .min(6, "Name should be more than 6 characters long")
      .max(20)
      .required("Name is required"), 
  phone:
    string()
      .matches(phoneNumberRegex, "Invalid phone number the valid phone'00-000-00-00'")
      .required("Phone number is required"),
  agree:
    boolean()
      .oneOf([true], "You must agree to the terms and conditions")
      .required("You must agree to the terms and conditions"),
});
export const validationSchemaLogIn = object().shape({
  password:
    string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
  phone:
    string()
      .matches(phoneNumberRegex, "Invalid phone number the valid phone'00-000-00-00' or '123456789'")
      .required("Phone number is required") 
});
export const validationSchemaOTP = object().shape({ 
  phone:
    string()
      .matches(phoneNumberRegex, "Invalid phone number the valid phone'00-000-00-00' or '123456789'")
      .required("Phone number is required") 
});

