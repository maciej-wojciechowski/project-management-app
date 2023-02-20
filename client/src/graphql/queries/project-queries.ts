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

const GET_PROJECT = graphql(`
  query getProject($id: ID!) {
    project(id: $id) {
      id
      name
      status
      description
      client {
        id
        name
        email
        phone
      }
    }
  }
`);

const GET_PAGINATED_PROJECTS = graphql(`
  query paginatedProjects($page: Int!, $perPage: Int!) {
    paginatedProjects(page: $page, perPage: $perPage) {
      pageInfo {
        page
        hasNextPage
        hasPrevPage
      }
    }
  }
`);

export {GET_PROJECTS, GET_PROJECT};
