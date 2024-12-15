"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import { FormikNewProject } from "@/interfaces/formik";
import { Plus } from "lucide-react";
import { newProjectFormSchema } from "@/schema/schema";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { MultiSelect } from "../multi-select";

import { useRouter } from "next/navigation";
import { frameworksList } from "@/lib/utils";
import FileUpload from "../file-upload";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function NewProjectDialog({ userId }: { userId: string }) {
  const [files, setFiles] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);
  const router = useRouter();

  const initialValues: FormikNewProject = {
    name: "",
    description: "",
    techstack: [],
    short_description: "",
    github: "",
    status: "active",
    live: "",
    images: [],
    createdById: userId,
  };

  const handleNewNewProjectSubmit = async (
    values: typeof initialValues,
    actions: FormikHelpers<typeof initialValues>
  ) => {
    setIsSubmitting(true);
    try {
      actions.setFieldValue("techstack", selectedFrameworks);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("short_description", values.short_description);
      formData.append("description", values.description);
      formData.append("github", values.github);
      formData.append("live", values.live);
      values.techstack.map((t) => {
        formData.append("techstack", t);
      });
      values.images.map((i) => {
        formData.append("images", i);
      });

      const data = await fetch("/api/dashboard/projects", {
        method: "POST",
        body: formData,
      });
      if (data.ok) {
        setFiles([]);
        toast.success("Project created", {
          description: `Project ${values.name} created successfully.`,
        });
        setOpen(false);
        setIsSubmitting(false);
        setSelectedFrameworks([]);
        router.refresh();
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error("Project was not created", {
          description: `Error: ${e.message}. Please try again.`,
        });
      } else {
        toast.error("Project was not created", {
          description: "An unexpected error occurred. Please try again.",
        });
      }
      setIsSubmitting(false);
    }
  };

  const handleRemoveFile = (file: string) => {
    URL.revokeObjectURL(file);
    const filteredFiles = files.filter((f) => f !== file);
    setFiles(filteredFiles);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-1" /> New
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>New Project</DialogTitle>
        <DialogDescription>Create a new project to showcase your work.</DialogDescription>
        <Formik
          initialValues={initialValues}
          onSubmit={handleNewNewProjectSubmit}
          validationSchema={newProjectFormSchema}
        >
          <Form className="flex flex-col gap-2">
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
                    <Input id="name" type="string" {...field} />
                  </div>
                </div>
              )}
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field name="github">
                {({ field, meta }: FieldProps) => (
                  <div className="space-y-1">
                    <div className="space-y-1">
                      <Label htmlFor="github">
                        Github
                        {meta.touched && meta.error ? (
                          <span className="text-red-500 ml-1">{meta.error}</span>
                        ) : null}
                      </Label>
                      <Input id="github" type="string" {...field} />
                    </div>
                  </div>
                )}
              </Field>

              <Field name="live">
                {({ field, meta }: FieldProps) => (
                  <div className="space-y-1">
                    <div className="space-y-1">
                      <Label htmlFor="live">
                        Live website / link
                        {meta.touched && meta.error ? (
                          <span className="text-red-500 ml-1">{meta.error}</span>
                        ) : null}
                      </Label>
                      <Input id="live" type="string" {...field} />
                    </div>
                  </div>
                )}
              </Field>
            </div>

            <Field name="status">
              {({ meta, form }: FieldProps) => (
                <div className="space-y-1">
                  <div className="space-y-1">
                    <Label htmlFor="status">
                      Status
                      {meta.touched && meta.error ? (
                        <span className="text-red-500 ml-1">{meta.error}</span>
                      ) : null}
                    </Label>
                    <Select
                      defaultValue="active"
                      onValueChange={(e) => form.setFieldValue("status", e)}
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </Field>

            <Field name="techstack">
              {({ meta, form }: FieldProps) => {
                return (
                  <div className="space-y-1">
                    <div className="space-y-1">
                      <Label htmlFor="techstack">
                        Techstack
                        {meta.touched && meta.error ? (
                          <span className="text-red-500 ml-1">{meta.error}</span>
                        ) : null}
                      </Label>
                      <MultiSelect
                        name="techstack"
                        options={frameworksList}
                        onValueChange={(e) => {
                          form.setFieldValue("techstack", e);
                          setSelectedFrameworks(e);
                        }}
                        defaultValue={selectedFrameworks}
                        placeholder="Select frameworks"
                        variant="inverted"
                        animation={2}
                        maxCount={3}
                      />
                    </div>
                  </div>
                );
              }}
            </Field>

            <Field name="short_description">
              {({ field, meta }: FieldProps) => (
                <div className="space-y-1">
                  <div className="space-y-1">
                    <Label htmlFor="short_description">
                      Short description
                      {meta.touched && meta.error ? (
                        <span className="text-red-500 ml-1">{meta.error}</span>
                      ) : null}
                    </Label>
                    <Input id="short_description" type="string" {...field} />
                  </div>
                </div>
              )}
            </Field>

            <Field name="description">
              {({ field, meta }: FieldProps) => (
                <div className="space-y-1">
                  <div className="space-y-1">
                    <Label htmlFor="description">
                      Description
                      {meta.touched && meta.error ? (
                        <span className="text-red-500 ml-1">{meta.error}</span>
                      ) : null}
                    </Label>
                    <Textarea id="description" {...field} />
                  </div>
                </div>
              )}
            </Field>

            {files.length < 5 ? (
              <Field name="images">
                {({ meta, form }: FieldProps) => {
                  return (
                    <div className="space-y-1">
                      <div className="space-y-1">
                        <Label htmlFor="images">
                          Images
                          {meta.touched && meta.error ? (
                            <span className="text-red-500 ml-1">{meta.error}</span>
                          ) : null}
                        </Label>
                        <FileUpload setFiles={setFiles} form={form} />
                      </div>
                    </div>
                  );
                }}
              </Field>
            ) : null}

            {files.length > 0 ? (
              <div>
                <Label htmlFor="preview">Preview</Label>
                <div className="flex gap-2">
                  {files.map((file, index) => (
                    <div className="relative" key={index}>
                      <button
                        className="absolute right-1 text-xs"
                        onClick={() => handleRemoveFile(file)}
                      >
                        x
                      </button>
                      <Image
                        width={60}
                        height={60}
                        src={file}
                        alt="sample"
                        className=" rounded-xl"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            <div className="ml-auto my-4">
              <Button type="submit" disabled={isSubmitting || files.length !== 5}>
                {isSubmitting ? "Uploading..." : "Upload project"}
              </Button>
            </div>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default NewProjectDialog;
