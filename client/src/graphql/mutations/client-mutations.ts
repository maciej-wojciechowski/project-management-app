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

const ADD_CLIENT = graphql(`
  mutation addClient($name: String!, $email: String!, $phone: String!) {
    addClient(name: $name, email: $email, phone: $phone) {
      id
      name
      email
      phone
    }
  }
`);

export {DELETE_CLIENT, ADD_CLIENT};
