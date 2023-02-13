import {GET_PROJECTS} from "@/graphql/queries/project-queries";
import {useQuery} from "@apollo/client";
import {Button, Card, Typography} from "antd";
import Link from "next/link";
import React, {useState} from "react";
import ProjectsModal from "./projects-modal";

type Props = {};

const Projects = ({}: Props) => {
  const {data} = useQuery(GET_PROJECTS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = data?.projects;

  if (!projects?.length) {
    return null;
  }
  return (
    <div>
      <Typography.Title level={4}>Projects</Typography.Title>
      <Button className="mb-5 mt-2" onClick={() => setIsModalOpen(true)}>
        Add Project
      </Button>
      <div className="grid grid-cols-3 gap-3">
        {projects.map(project => (
          <Card
            title={project.name}
            extra={
              <Link href={`project/${project.id}`}>
                <Button>More</Button>
              </Link>
            }
          >
            <p>{project?.status}</p>
          </Card>
        ))}
      </div>
      <ProjectsModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Projects;
