import * as Yup from "yup";

export const loginFormValidation = Yup.object({
  email: Yup.string().email("Invalid email").required("Required field"),
  password: Yup.string().required("Required field"),
});
