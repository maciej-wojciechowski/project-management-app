import {GET_PROJECT, GET_PROJECTS} from "@/graphql/queries/project-queries";
import {GetProjectQuery} from "@/gql/graphql";
import client from "apollo-client";
import {GetServerSideProps} from "next";
import {useRouter} from "next/router";
import React from "react";
import {Button, Card, Spin} from "antd";
import ClientInfo from "@/components/client-info";
import Link from "next/link";
import {useMutation} from "@apollo/client";
import {DELETE_PROJECT} from "@/graphql/mutations/project-mutations";

type Props = {
  projectData: GetProjectQuery["project"];
};

const ProjectPage = ({projectData}: Props) => {
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
          <span>Status: {projectData.status}</span>
          <p>
            <span>Description: </span>
            {projectData.description}
          </p>
          {projectId}
          <ClientInfo clientData={projectData.client} />
        </>
      )}
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
  });

  return {
    props: {projectData: data.project},
  };
};
