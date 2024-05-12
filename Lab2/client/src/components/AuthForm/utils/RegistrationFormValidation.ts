import * as Yup from "yup";

export const registrationFormValidation = Yup.object({
  email: Yup.string().email("Invalid email").required("Required field"),
  password: Yup.string()
    .min(8, "Must be at least 8 characters long")
    .max(32, "Must be more than 32 characters long")
    .required("Required field"),
  confirmPassword: Yup.string()
    .required("Required field")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});
