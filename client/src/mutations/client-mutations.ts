import {gql} from "@apollo/client";

const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    id
    name
    email
    phone
  }
`;

export {DELETE_CLIENT};
