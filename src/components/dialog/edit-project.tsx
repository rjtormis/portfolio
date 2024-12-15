import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { ProjectData } from "@/app/actions/project";
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/multi-select";
import { Textarea } from "@/components/ui/textarea";
import { newProjectFormSchema } from "@/schema/schema";
import { frameworksList } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function EditProject({
  project,
  setSelectedProject,
}: {
  project: ProjectData;
  setSelectedProject: Dispatch<SetStateAction<ProjectData | null>>;
}) {
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>(project.techstack);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const initialValues = {
    id: project.id,
    name: project.name,
    description: project.description,
    short_description: project.short_description,
    techstack: selectedFrameworks,
    github: project.github,
    live: project.live,
  };

  const router = useRouter();
  const handleEdit = async (
    state: typeof initialValues,
    action: FormikHelpers<typeof initialValues>
  ) => {
    setIsSubmitting(true);
    try {
      const data = await fetch(`/api/dashboard/projects/${project.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });

      if (data.ok) {
        toast.success(`Project ${state.name} edited successfully.`, {
          description: "Project has been edited successfully.",
        });
        setSelectedProject(null);
        setOpen(false);
        action.resetForm();
        setIsSubmitting(false);
        router.refresh();
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error("Project has not been updated successfully.", {
          description: `Error: ${e.message}. Please try again.`,
        });
      }
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Pencil className="" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit Project</DialogTitle>
        <DialogDescription>Edit the existing project.</DialogDescription>
        <Formik
          initialValues={initialValues}
          onSubmit={handleEdit}
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
                      Short Description
                      {meta.touched && meta.error ? (
                        <span className="text-red-500 ml-1">{meta.error}</span>
                      ) : null}
                    </Label>
                    <Input id="short_description" {...field} />
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

            {/* <Field name="images">
            {({ field, meta }: FieldProps) => (
              <div className="space-y-1">
                <div className="space-y-1">
                  <Label htmlFor="images">
                    Images
                    {meta.touched && meta.error ? (
                      <span className="text-red-500 ml-1">{meta.error}</span>
                    ) : null}
                  </Label>
                  <div {...getRootProps()} className="border p-3 rounded-lg hover:cursor-pointer">
                    <Input {...field} {...getInputProps()} id="images" />

                    <div>
                      <Upload className="mx-auto my-1" />
                      <p className="text-center">
                        {isDragActive
                          ? "Drop the files here ..."
                          : "Drag 'n' drop some files here, or click to select files"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Field> */}

            {/* {files.length > 0 ? (
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
          ) : null} */}
            <div className="ml-auto my-4">
              <Button type="submit" disabled={isSubmitting ? true : false}>
                {isSubmitting ? "Editing..." : "Edit project"}
              </Button>
            </div>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default EditProject;
