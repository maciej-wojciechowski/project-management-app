import {GET_PROJECT} from "@/graphql/queries/project-queries";
import {GetProjectQuery} from "@/gql/graphql";
import client from "apollo-client";
import {GetServerSideProps} from "next";
import {useRouter} from "next/router";
import React from "react";
import {Card} from "antd";
import ClientInfo from "@/components/client-info";

type Props = {
  projectData: GetProjectQuery["project"];
};

const ProjectPage = ({projectData}: Props) => {
  if (!projectData) {
    return null;
  }
  console.log({projectData});
  const router = useRouter();
  const {projectId} = router.query;
  return (
    <Card title={projectData.name}>
      <span>Status: {projectData.status}</span>
      <p>
        <span>Description: </span>
        {projectData.description}
      </p>
      {projectId}
      <ClientInfo clientData={projectData.client} />
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
