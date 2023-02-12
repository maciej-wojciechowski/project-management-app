import {GET_PROJECT} from "@/graphql/queries/project-queries";
import {GetProjectQuery} from "@/gql/graphql";
import client from "apollo-client";
import {GetServerSideProps} from "next";
import {useRouter} from "next/router";
import React from "react";

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
  return <div>ProjectPage {projectId}</div>;
};

export default ProjectPage;

export const getServerSideProps: GetServerSideProps = async context => {
  // for build time only fetch - getStaticProps
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
