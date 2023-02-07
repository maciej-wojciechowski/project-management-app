import {graphql} from "@/gql";

const DELETE_CLIENT = graphql(`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id) {
      id
      name
      email
      phone
    }
  }
`);

export {DELETE_CLIENT};
