import {GET_PROJECTS} from "@/graphql/queries/project-queries";
import {useQuery} from "@apollo/client";
import {Button, Card, Typography} from "antd";
import React from "react";

type Props = {};

export default function Projects({}: Props) {
  const {data} = useQuery(GET_PROJECTS);
  const projects = data?.projects;

  if (!projects?.length) {
    return null;
  }
  return (
    <div>
      <Typography.Title level={4}>Projects</Typography.Title>
      <div className="grid grid-cols-3 gap-3">
        {projects.map(project => (
          <Card title={project?.name} extra={<Button>More</Button>}>
            <p>{project?.status}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
