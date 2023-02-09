import {graphql} from "@/gql";

const GET_PROJECTS = graphql(`
  query getProjects {
    projects {
      id
      name
      status
    }
  }
`);

export {GET_PROJECTS};
