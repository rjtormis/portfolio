import NotFound from "@/app/not-found";
import SpecificProject from "./specific-project";
import { fetchSpecificProject } from "@/app/actions/project";

export default async function page(props: { params: Promise<{ projectId: string }> }) {
  const params = await props.params;
  const project = await fetchSpecificProject(params.projectId);
  if (project !== null) {
    return (
      <div className="flex flex-col my-10">
        <SpecificProject data={project} />
      </div>
    );
  } else {
    return <NotFound />;
  }
}
