// Mongoose models
import Project from "../models/Project";
import Client from "../models/Client";

import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLInt,
  GraphQLBoolean,
} from "graphql";

/**
 * helpers
 */
const withPagination = (
  model: GraphQLObjectType,
  name: string,
  dataName: string
) =>
  new GraphQLObjectType({
    name,
    fields: () => ({
      [dataName]: {
        type: GraphQLNonNull(new GraphQLList(GraphQLNonNull(model))),
      },
      pageInfo: {type: GraphQLNonNull(paginationInfoType)},
    }),
  });

/**
 * Types
 */

const paginationInfoType = new GraphQLObjectType({
  name: "PaginationInfo",
  fields: () => ({
    page: {type: GraphQLNonNull(GraphQLInt)},
    totalPages: {type: GraphQLNonNull(GraphQLInt)},
    totalItems: {type: GraphQLNonNull(GraphQLInt)},
    hasPrevPage: {type: GraphQLNonNull(GraphQLBoolean)},
    hasNextPage: {type: GraphQLNonNull(GraphQLBoolean)},
  }),
});

//ProjectType
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: {type: GraphQLNonNull(GraphQLID)},
    name: {type: GraphQLNonNull(GraphQLString)},
    description: {type: GraphQLNonNull(GraphQLString)},
    status: {type: GraphQLNonNull(GraphQLString)},
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
  }),
});

//ClientType
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: {type: GraphQLNonNull(GraphQLID)},
    name: {type: GraphQLNonNull(GraphQLString)},
    email: {type: GraphQLNonNull(GraphQLString)},
    phone: {type: GraphQLString},
  }),
});

const ProjectStatusType = new GraphQLEnumType({
  name: "ProjectStatus",
  values: {
    new: {value: "new"},
    progress: {value: "progress"},
    completed: {value: "completed"},
  },
});

const ClientsWithPagination = withPagination(
  ClientType,
  "ClientsPaginated",
  "clients"
);
const ProjectsWithPagination = withPagination(
  ProjectType,
  "ProjectsPaginated",
  "projects"
);

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    projects: {
      type: new GraphQLList(GraphQLNonNull(ProjectType)),
      resolve(parent, args) {
        return Project.find();
      },
    },
    paginatedProjects: {
      type: ProjectsWithPagination,
      args: {
        page: {type: GraphQLNonNull(GraphQLInt)},
        perPage: {type: GraphQLNonNull(GraphQLInt)},
      },
      async resolve(parent, {page, perPage}) {
        const {
          totalDocs,
          totalPages,
          docs,
          hasNextPage,
          hasPrevPage,
          page: currentPage,
        } = await Project.paginate({}, {page, limit: perPage});
        return {
          projects: docs,
          pageInfo: {
            totalPages,
            page: currentPage,
            hasNextPage,
            hasPrevPage,
            totalItems: totalDocs,
          },
        };
      },
    },
    project: {
      type: ProjectType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },
    clients: {
      type: new GraphQLList(GraphQLNonNull(ClientType)),
      resolve(parent, args) {
        return Client.find();
      },
    },
    paginatedClients: {
      type: GraphQLNonNull(ClientsWithPagination),
      args: {
        page: {type: GraphQLNonNull(GraphQLInt)},
        perPage: {type: GraphQLNonNull(GraphQLInt)},
      },
      async resolve(parent, {page, perPage}) {
        const {
          totalDocs,
          totalPages,
          docs,
          hasNextPage,
          hasPrevPage,
          page: currentPage,
        } = await Client.paginate({}, {page, limit: perPage});
        return {
          clients: docs,
          pageInfo: {
            totalPages,
            page: currentPage,
            hasNextPage,
            hasPrevPage,
            totalItems: totalDocs,
          },
        };
      },
    },
    client: {
      type: ClientType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return Client.findById(args.id);
      },
    },
  },
});

// Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // add client
    addClient: {
      type: ClientType,
      args: {
        name: {type: GraphQLNonNull(GraphQLString)},
        email: {type: GraphQLNonNull(GraphQLString)},
        phone: {type: GraphQLNonNull(GraphQLString)},
      },
      resolve(parent, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });

        return client.save();
      },
    },
    // delete client
    deleteClient: {
      type: ClientType,
      args: {
        id: {type: GraphQLNonNull(GraphQLID)},
      },
      resolve(parent, args) {
        return Client.findByIdAndRemove(args.id);
      },
    },
    // Add a project
    addProject: {
      type: ProjectType,
      args: {
        name: {type: GraphQLNonNull(GraphQLString)},
        description: {type: GraphQLNonNull(GraphQLString)},
        status: {
          type: ProjectStatusType,
          defaultValue: "Not Started",
        },
        clientId: {type: GraphQLID},
      },
      resolve(parent, args) {
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });
        return project.save();
      },
    },
    // delete project
    deleteProject: {
      type: ProjectType,
      args: {
        id: {type: GraphQLNonNull(GraphQLID)},
      },
      resolve(parent, args) {
        return Project.findByIdAndRemove(args.id);
      },
    },
    // update project
    updateProject: {
      type: ProjectType,
      args: {
        id: {type: GraphQLNonNull(GraphQLID)},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {
          type: ProjectStatusType,
        },
        clientId: {type: GraphQLID},
      },
      resolve(parent, args) {
        const NonNullArgs = {...args};
        Object.entries(args).forEach(([key, val]) => {
          if (val === null) {
            delete NonNullArgs[key];
          }
        });

        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              ...NonNullArgs,
            },
          },
          {new: true}
        );
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation,
});
