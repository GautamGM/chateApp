import * as yup from "yup";

export const userschema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(4, "Name must be at least 4 characters long"),
  
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  
    password: yup
    .string()
    .required("Please enter a password")
    .min(8, "Password must be at least 8 characters long")
    .matches(/(?=.*[a-z])/, "Password must contain at least one lowercase letter")
    .matches(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
    .matches(/(?=.*\d)/, "Password must contain at least one digit")
    .matches(/(?=.*[@$!%*?&])/, "Password must contain at least one special character (@$!%*?&)"),
});

