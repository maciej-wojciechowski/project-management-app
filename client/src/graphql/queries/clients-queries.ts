import {graphql} from "@/gql";

const GET_PAGINATED_CLIENTS = graphql(`
  query paginatedClients($page: Int!, $perPage: Int!) {
    paginatedClients(page: $page, perPage: $perPage) {
      pageInfo {
        totalItems
      }
      clients {
        id
        name
        email
        phone
        email
      }
    }
  }
`);

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

const GET_CLIENTS_IDS_FOR_SELECT = graphql(`
  query getClientsIds {
    clients {
      name
      id
      name
    }
  }
`);

export {GET_CLIENTS, GET_CLIENTS_IDS_FOR_SELECT, GET_PAGINATED_CLIENTS};
