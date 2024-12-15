"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { accountFormSchema } from "@/schema/schema";
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import { toast } from "sonner";

type Settings = {
  id: string;
  email: string;
};
function Settings({ id, email }: Settings) {
  const [loading, setLoading] = useState<boolean>(false);
  const initialValues = {
    id: id,
    email: email,
    password: "",
  };
  const handleUpdateAccount = async (
    state: typeof initialValues,
    actions: FormikHelpers<typeof initialValues>
  ) => {
    setLoading(true);
    try {
      const data = await fetch(`/api/user/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(state),
      });

      if (data.ok) {
        toast.success("Password updated successfully.", {
          description: "Your password has been updated successfully.",
        });
        actions.resetForm();
        setLoading(false);
      }
    } catch (e: unknown) {
      setLoading(false);

      if (e instanceof Error) {
        toast.error("An error occured.", {
          description: "Failed to update your account. Please try again.",
        });
      }
    }
  };
  return (
    <div>
      {" "}
      <div>
        <h2 className=" font-bold text-3xl">Settings</h2>{" "}
        <span className="text-muted-foreground text-xs">Account settings.</span>
      </div>
      <div className="w-[50%]">
        <Formik
          initialValues={initialValues}
          onSubmit={handleUpdateAccount}
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
                    <Input id="email" placeholder={email} type="string" disabled {...field} />
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
              <Button disabled={loading} className="ml-auto">
                {loading ? "Updating..." : "Update"}
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Settings;
