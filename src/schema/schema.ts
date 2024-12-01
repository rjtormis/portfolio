import * as yup from "yup";

export const contactFormSchema = yup.object().shape({
  name: yup.string().required("*"),
  email: yup.string().email("Please provide a valid email address.").required("*"),
  message: yup.string().min(4, "Message should be atleast 4 characters long").required("*"),
});
