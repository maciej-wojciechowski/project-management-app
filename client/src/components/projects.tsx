import {
  GET_PAGINATED_PROJECTS,
  GET_PROJECTS,
} from "@/graphql/queries/project-queries";
import {getProjectStatusLabel} from "@/helpers/project-helpers";
import {useQuery} from "@apollo/client";
import {Button, Card, Spin, Typography} from "antd";
import Link from "next/link";
import React, {useState} from "react";
import ProjectsModal from "./projects-modal";

type Props = {};

const DEFAULT_PER_PAGE = 3;

const Projects = ({}: Props) => {
  const {data, loading, fetchMore} = useQuery(GET_PAGINATED_PROJECTS, {
    variables: {page: 1, perPage: DEFAULT_PER_PAGE},
    notifyOnNetworkStatusChange: true,
  });
  const mappedData = {
    projects: data?.paginatedProjects?.projects ?? [],
    page: data?.paginatedProjects?.pageInfo.page,
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Typography.Title level={4}>Projects</Typography.Title>
      <Button className="mb-5 mt-2" onClick={() => setIsModalOpen(true)}>
        Add Project
      </Button>
      <Spin spinning={loading}>
        <div className="grid grid-cols-3 gap-3">
          {mappedData.projects.map(project => (
            <Card
              key={project.id}
              title={project.name}
              extra={
                <Link href={`project/${project.id}`}>
                  <Button>More</Button>
                </Link>
              }
            >
              <p>{getProjectStatusLabel(project.status)}</p>
            </Card>
          ))}
        </div>
        <Button
          onClick={() =>
            mappedData.page &&
            fetchMore({
              variables: {page: ++mappedData.page, perPage: DEFAULT_PER_PAGE},
            })
          }
        >
          Load more...
        </Button>
      </Spin>
      <ProjectsModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type="add"
      />
    </div>
  );
};

export default Projects;
