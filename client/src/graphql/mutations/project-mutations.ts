import {graphql} from "@/gql";

const ADD_PROJECT = graphql(`
  mutation addProject(
    $name: String!
    $description: String!
    $status: ProjectStatus
    $clientId: ID!
  ) {
    addProject(
      name: $name
      description: $description
      status: $status
      clientId: $clientId
    ) {
      id
      name
      description
      status
      client {
        id
        name
        email
      }
    }
  }
`);

const DELETE_PROJECT = graphql(`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
      name
    }
  }
`);

export {ADD_PROJECT, DELETE_PROJECT};
