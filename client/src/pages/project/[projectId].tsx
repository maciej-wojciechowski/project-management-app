import {GET_PROJECT, GET_PROJECTS} from "@/graphql/queries/project-queries";
import {GetProjectQuery} from "@/gql/graphql";
import client from "apollo-client";
import {GetServerSideProps} from "next";
import {useRouter} from "next/router";
import React, {useState} from "react";
import {Button, Card} from "antd";
import ClientInfo from "@/components/client-info";
import Link from "next/link";
import {useMutation} from "@apollo/client";
import {DELETE_PROJECT} from "@/graphql/mutations/project-mutations";
import ProjectsModal from "@/components/projects-modal";
import {getProjectStatusLabel} from "@/helpers/project-helpers";

export type ProjectType = GetProjectQuery["project"];

type Props = {
  projectData: ProjectType;
};

const ProjectPage = ({projectData}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    refetchQueries: [GET_PROJECTS],
    onCompleted: () => {
      router.push("/");
    },
  });
  const {projectId} = router.query;

  const onDelete = () => {
    if (!projectData) {
      return;
    }
    deleteProject({variables: {id: projectData.id}});
  };
  return (
    <Card
      title={projectData?.name ?? "..."}
      extra={
        <>
          <Button
            className="mr-3"
            disabled={!projectData}
            onClick={() => setIsModalOpen(true)}
          >
            Update
          </Button>
          <Button className="mr-3" disabled={!projectData} onClick={onDelete}>
            Delete
          </Button>
          <Link href="/">
            <Button>Back</Button>
          </Link>
        </>
      }
    >
      {!projectData ? (
        <span className="flex justify-center">No data...</span>
      ) : (
        <>
          <span>Status: {getProjectStatusLabel(projectData.status)}</span>
          <p>
            <span>Description: </span>
            {projectData.description}
          </p>
          {projectId}
          <ClientInfo clientData={projectData.client} />
        </>
      )}
      <ProjectsModal
        project={projectData}
        open={isModalOpen}
        type="update"
        onClose={() => setIsModalOpen(false)}
      />
    </Card>
  );
};

export default ProjectPage;

export const getServerSideProps: GetServerSideProps = async context => {
  const projectId = context.params?.projectId;
  const {data} = await client.query({
    query: GET_PROJECT,
    variables: {
      id: projectId as string,
    },
    fetchPolicy: "no-cache",
  });

  return {
    props: {projectData: data.project},
  };
};
