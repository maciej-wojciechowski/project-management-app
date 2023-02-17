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
} from "graphql";

//ProjectType
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: {type: GraphQLNonNull(GraphQLID)},
    name: {type: GraphQLNonNull(GraphQLString)},
    description: {type: GraphQLNonNull(GraphQLString)},
    status: {type: GraphQLNonNull(GraphQLString)},
    client: {
      type: GraphQLNonNull(ClientType),
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

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    projects: {
      type: new GraphQLList(GraphQLNonNull(ProjectType)),
      resolve(parent, args) {
        return Project.find();
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
        clientId: {type: GraphQLNonNull(GraphQLID)},
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
          if (!val) {
            delete NonNullArgs.key;
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
