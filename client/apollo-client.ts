import {ApolloClient, InMemoryCache} from "@apollo/client";

const cache = new InMemoryCache({
  addTypename: false,
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        paginatedProjects: {
          keyArgs: false,
          merge(existing = {projects: []}, incoming) {
            if (!incoming?.projects) {
              return existing;
            }
            return {
              ...incoming,
              projects: [...existing.projects, ...incoming.projects],
            };
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache,
});

export default client;
