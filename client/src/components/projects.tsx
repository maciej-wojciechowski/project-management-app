import {GET_PAGINATED_PROJECTS} from "@/graphql/queries/project-queries";
import {getProjectStatusLabel} from "@/helpers/project-helpers";
import {useQuery} from "@apollo/client";
import {Button, Card, Spin, Typography} from "antd";
import Link from "next/link";
import React, {useState} from "react";
import ProjectsModal from "./projects-modal";

type Props = {};

const DEFAULT_PER_PAGE = 3;

const Projects = ({}: Props) => {
  const {data, fetchMore, networkStatus} = useQuery(GET_PAGINATED_PROJECTS, {
    variables: {page: 1, perPage: DEFAULT_PER_PAGE},
    notifyOnNetworkStatusChange: true,
  });
  const mappedData = {
    projects: data?.paginatedProjects?.projects ?? [],
    page: data?.paginatedProjects?.pageInfo.page,
    hasNextPage: data?.paginatedProjects?.pageInfo.hasNextPage ?? false,
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <Typography.Title level={4}>Projects</Typography.Title>
      <Button className="mb-5 mt-2" onClick={() => setIsModalOpen(true)}>
        Add Project
      </Button>
      <Spin spinning={networkStatus === 1}>
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
        {mappedData.hasNextPage && (
          <Spin spinning={networkStatus === 3}>
            <div className="my-3 min-h-10 text-center">
              <Button
                type="link"
                onClick={() =>
                  mappedData.page &&
                  fetchMore({
                    variables: {
                      page: ++mappedData.page,
                      perPage: DEFAULT_PER_PAGE,
                    },
                  })
                }
              >
                Load more...
              </Button>
            </div>
          </Spin>
        )}
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
