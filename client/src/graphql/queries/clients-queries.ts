import {graphql} from "@/gql";

const GET_CLIENTS = graphql(`
  query getClients {
    clients {
      name
      id
      name
      phone
      email
    }
  }
`);

export {GET_CLIENTS};
