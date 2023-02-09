/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  mutation deleteClient($id: ID!) {\n    deleteClient(id: $id) {\n      id\n      name\n      email\n      phone\n    }\n  }\n": types.DeleteClientDocument,
    "\n  mutation addClient($name: String!, $email: String!, $phone: String!) {\n    addClient(name: $name, email: $email, phone: $phone) {\n      id\n      name\n      email\n      phone\n    }\n  }\n": types.AddClientDocument,
    "\n  query getClients {\n    clients {\n      name\n      id\n      name\n      phone\n      email\n    }\n  }\n": types.GetClientsDocument,
    "\n  query getProjects {\n    projects {\n      id\n      name\n      status\n    }\n  }\n": types.GetProjectsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteClient($id: ID!) {\n    deleteClient(id: $id) {\n      id\n      name\n      email\n      phone\n    }\n  }\n"): (typeof documents)["\n  mutation deleteClient($id: ID!) {\n    deleteClient(id: $id) {\n      id\n      name\n      email\n      phone\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addClient($name: String!, $email: String!, $phone: String!) {\n    addClient(name: $name, email: $email, phone: $phone) {\n      id\n      name\n      email\n      phone\n    }\n  }\n"): (typeof documents)["\n  mutation addClient($name: String!, $email: String!, $phone: String!) {\n    addClient(name: $name, email: $email, phone: $phone) {\n      id\n      name\n      email\n      phone\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getClients {\n    clients {\n      name\n      id\n      name\n      phone\n      email\n    }\n  }\n"): (typeof documents)["\n  query getClients {\n    clients {\n      name\n      id\n      name\n      phone\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getProjects {\n    projects {\n      id\n      name\n      status\n    }\n  }\n"): (typeof documents)["\n  query getProjects {\n    projects {\n      id\n      name\n      status\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;