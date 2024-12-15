"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import { accountFormSchema } from "@/schema/schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function LoginPage() {
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const intialValues = {
    email: "",
    password: "",
  };

  const handleSubmitButton = async (
    state: typeof intialValues,
    actions: FormikHelpers<typeof intialValues>
  ) => {
    setLoading(true);
    if (isNewUser) {
      const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });

      if (data.ok) {
        actions.resetForm();
        toast.success("Success", {
          description: "Success in creating new account.Logging in.",
        });
        setTimeout(async () => {
          setLoading(false);
          await signIn("credentials", {
            email: state.email,
            password: state.password,

            callbackUrl: "/dashboard",
          });
        }, 1000);
      }
    } else {
      const res = await signIn("credentials", {
        email: state.email,
        password: state.password,

        redirect: false,
      });

      if (res?.ok) {
        router.push("/dashboard");
      } else {
        setLoading(false);

        toast.error("An error occured.", {
          description: "Invalid login credentials. Please try again.",
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <div className="flex justify-center">
        <Card className="">
          <CardHeader>
            <CardTitle className="text-center">
              {isNewUser ? "Create an account" : "Sign in"}
            </CardTitle>
            <CardDescription className="text-center">
              {isNewUser ? "Create an" : "Sign in to your existing"} account to view portfolio
              dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Formik
              initialValues={intialValues}
              onSubmit={handleSubmitButton}
              validationSchema={accountFormSchema}
            >
              <Form>
                <Field name="email">
                  {({ field, meta }: FieldProps) => (
                    <div className="space-y-1 mb-4">
                      <div className="space-y-1">
                        <Label htmlFor="email">
                          Email
                          {meta.touched && meta.error ? (
                            <span className="text-red-500 ml-1">{meta.error}</span>
                          ) : null}
                        </Label>
                        <Input id="email" type="string" {...field} />
                      </div>
                    </div>
                  )}
                </Field>

                <Field name="password">
                  {({ field, meta }: FieldProps) => (
                    <div className="space-y-1 mb-4">
                      <div className="space-y-1">
                        <Label htmlFor="password">
                          Password
                          {meta.touched && meta.error ? (
                            <span className="text-red-500 ml-1">{meta.error}</span>
                          ) : null}
                        </Label>
                        <Input id="password" type="password" {...field} />
                      </div>
                    </div>
                  )}
                </Field>
                <div className="flex">
                  <span
                    className="underline hover:cursor-pointer text-xs underline-offset-2"
                    onClick={() => setIsNewUser(!isNewUser)}
                  >
                    {isNewUser
                      ? "Already have an account? Sign in."
                      : "Don't have an account? Create one"}
                  </span>
                  <Button disabled={loading} className="ml-auto">
                    {isNewUser ? "Create account" : "Login"}
                  </Button>
                </div>
              </Form>
            </Formik>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;
