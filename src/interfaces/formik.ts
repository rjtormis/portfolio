export interface FormikContact {
  name: string;
  email: string;
  message: string;
}

export interface FormikNewProject {
  name: string;
  description: string;
  techstack: string[];
  createdById: string;
  github: string;
  live: string;
  images: File[];
  status: "active" | "maintenace" | "inactive";
  short_description: string;
}

export interface FormikDeleteProject {
  id: string;
  userId: string;
  name: string;
}

export interface FormikAccount {
  user: string;
  password: string;
}
