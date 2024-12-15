"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { Form, Formik } from "formik";
import { Input } from "../ui/input";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ProjectData } from "@/app/actions/project";

interface DeleteProjectProps {
  ids: string[];
  setSelectedProject: Dispatch<SetStateAction<ProjectData | null>>;
}
function DeleteProject({ ids, setSelectedProject }: DeleteProjectProps) {
  const [inputConfirmation, setInputConfirmation] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const initialValues = {
    ids: ids,
  };

  const handleDeleteProjects = async (state: typeof initialValues) => {
    setLoading(true);
    try {
      const data = await fetch("/api/dashboard/projects", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(state),
      });

      if (data.ok) {
        toast.success(
          `${ids.length >= 1 ? "Projects deleted successfully." : "Project deleted successfully."}`,
          {
            description: `The selected ${
              ids.length >= 1 ? "projects" : "project"
            } have been deleted successfully.`,
          }
        );
        setSelectedProject(null);
        setOpen(false);
        setLoading(false);
        setInputConfirmation("");
        router.refresh();
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error(
          `${
            ids.length >= 1
              ? "Projects was not deleted successfully."
              : "Project was not deleted successfully."
          }`,
          {
            description: `Error: ${e.message}. Please try again.`,
          }
        );
      } else {
        toast.error(
          `${
            ids.length >= 1
              ? "Projects was not deleted successfully."
              : "Project was not deleted successfully."
          }`,
          {
            description: "An unexpected error occurred. Please try again.",
          }
        );
      }
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={ids.length < 1 ? true : false} variant="destructive">
          <Trash2 className="mr-1" /> Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Delete Project</DialogTitle>
        <DialogDescription>
          Are you sure that you want to delete{" "}
          {ids.length > 1 ? "multiple project" : "this project"}? This action cannot be undone.
        </DialogDescription>
        <Formik onSubmit={handleDeleteProjects} initialValues={initialValues}>
          <Form>
            <Input
              placeholder="Type confirm to delete the project/s"
              onChange={(e) => setInputConfirmation(e.target.value)}
            />
            <div className="flex">
              <Button
                className="my-4 ml-auto"
                variant="destructive"
                type="submit"
                disabled={inputConfirmation != "confirm" || loading}
              >
                {" "}
                Delete {ids.length > 1 ? "Projects" : "Project"}
              </Button>
            </div>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteProject;
