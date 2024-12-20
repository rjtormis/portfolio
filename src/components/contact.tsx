"use client";

import React, { useState } from "react";
import contact from "@/assets/contact.json";
import Lottie from "lottie-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import { contactFormSchema } from "@/schema/schema";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { FormikContact } from "@/interfaces/formik";

function Contact() {
  const [loading, setLoading] = useState<boolean>(false);
  const initialFormValues = {
    name: "",
    email: "",
    message: "",
  };
  const handleSubmit = async (state: FormikContact, actions: FormikHelpers<FormikContact>) => {
    setLoading(true);
    try {
      await fetch("api/dashboard/metrics/email", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
        { name: state.name, message: state.message, email: state.email },
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PK as string }
      );
      toast.success("Message sent successfully!", {
        description: "Your message has been sent successfully.",
      });
      setLoading(false);
      actions.resetForm();
    } catch (e: unknown) {
      setLoading(false);
      if (e instanceof Error) {
        toast.error("Message was not sent", {
          description: `Error: ${e.message}. Please try again.`,
        });
      } else {
        toast.error("Message was not sent", {
          description: "An unexpected error occurred. Please try again.",
        });
      }
    }
  };
  return (
    <div id="contact" className="scroll-mt-32 lg:text-justify my-10">
      <div className="my-2">
        <h1 className="text-4xl text-center lg:text-left lg:text-6xl">let&apos;s connect</h1>
        <p className="text-sm text-center lg:text-left text-muted-foreground my-2">
          Got a project or idea in mind? Share your thoughts, and let’s bring it to life!
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-lg ">
        <div className="flex flex-col ">
          <Formik
            initialValues={initialFormValues}
            validationSchema={contactFormSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Field name="name">
                {({ field, meta }: FieldProps) => (
                  <div className="space-y-1">
                    <div className="space-y-1">
                      <Label htmlFor="name">
                        Name
                        {meta.touched && meta.error ? (
                          <span className="text-red-500 ml-1">{meta.error}</span>
                        ) : null}
                      </Label>
                      <Input {...field} placeholder="Your name" className="my-2" />
                    </div>
                  </div>
                )}
              </Field>

              <Field name="email">
                {({ field, meta }: FieldProps) => (
                  <div className="space-y-1">
                    <div className="space-y-1">
                      <div className="flex flex-col my-2">
                        <Label htmlFor="Email">
                          Email
                          {meta.touched && meta.error && !meta.error.includes("Please") ? (
                            <span className="text-red-500 ml-1">{meta.error}</span>
                          ) : null}
                        </Label>
                        {meta.error && meta.error.includes("Please") ? (
                          <span className="text-red-500 text-xs">{meta.error}</span>
                        ) : null}
                      </div>
                      <Input {...field} name="email" placeholder="Your email" className="my-2" />
                    </div>
                  </div>
                )}
              </Field>

              <Field name="message">
                {({ field, meta }: FieldProps) => {
                  return (
                    <div className="space-y-1">
                      <div className="space-y-1">
                        <div className="flex flex-col my-2">
                          <Label htmlFor="message">
                            Message
                            {meta.touched && meta.error && !meta.error.includes("Message") ? (
                              <span className="text-red-500 ml-1">{meta.error}</span>
                            ) : null}
                          </Label>
                          {meta.error && meta.error.includes("Message") ? (
                            <span className="text-red-500 text-xs">{meta.error}</span>
                          ) : null}
                        </div>
                        <Textarea
                          {...field}
                          name="message"
                          placeholder="Your message"
                          className="my-2"
                        />
                      </div>
                    </div>
                  );
                }}
              </Field>
              <div className="my-4 flex justify-center lg:justify-end">
                <Button
                  type="submit"
                  disabled={loading}
                  className={loading ? "opacity-50 cursor-not-allowed" : ""}
                >
                  {loading ? "Sending message..." : "Send me a message"}
                </Button>
              </div>
            </Form>
          </Formik>
        </div>
        <Lottie animationData={contact} loop={true} className=" m-auto" />
      </div>
    </div>
  );
}

export default Contact;
