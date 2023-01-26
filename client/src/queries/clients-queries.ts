import {gql} from "@apollo/client";

const GET_CLIENTS = gql`
  query {
    clients {
      name
      id
      name
      phone
      email
    }
  }
`;

export {GET_CLIENTS};
