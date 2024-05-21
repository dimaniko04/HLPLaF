import * as Yup from "yup";

export const checkoutFormValidation = Yup.object({
  address: Yup.string().required("Required field"),
  lastName: Yup.string().required("Required field"),
  firstName: Yup.string().required("Required field"),
});
