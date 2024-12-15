import * as yup from "yup";

export const contactFormSchema = yup.object().shape({
  name: yup.string().required("*"),
  email: yup.string().email("Please provide a valid email address.").required("*"),
  message: yup.string().min(4, "Message should be atleast 4 characters long").required("*"),
});

export const newProjectFormSchema = yup.object().shape({
  name: yup.string().required("*"),
  description: yup.string().required("*"),
  short_description: yup.string().required("*"),
  github: yup.string().required("*"),
  live: yup.string().required("*"),
  techstack: yup
    .array()
    .of(yup.string().required("*"))
    .min(1, "At least one tech stack is required.")
    .required("*"),
});

export const accountFormSchema = yup.object().shape({
  name: yup.string().optional(),
  email: yup.string().required("*"),
  password: yup.string().required("*"),
});

export const newAccountFormSchema = yup.object().shape({
  email: yup.string().required("*"),
  name: yup.string().required("*"),
  password: yup.string().required("*"),
});
