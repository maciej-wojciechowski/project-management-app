/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Client = {
  __typename?: 'Client';
  email: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
  phone: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addClient: Maybe<Client>;
  addProject: Maybe<Project>;
  deleteClient: Maybe<Client>;
  deleteProject: Maybe<Project>;
  updateProject: Maybe<Project>;
};


export type MutationAddClientArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
};


export type MutationAddProjectArgs = {
  clientId: Scalars['ID'];
  description: Scalars['String'];
  name: Scalars['String'];
  status?: InputMaybe<ProjectStatus>;
};


export type MutationDeleteClientArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateProjectArgs = {
  description: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  name: InputMaybe<Scalars['String']>;
  status: InputMaybe<ProjectStatusUpdate>;
};

export type Project = {
  __typename?: 'Project';
  client: Maybe<Client>;
  description: Maybe<Scalars['String']>;
  id: Maybe<Scalars['ID']>;
  name: Maybe<Scalars['String']>;
  status: Maybe<Scalars['String']>;
};

export enum ProjectStatus {
  Completed = 'completed',
  New = 'new',
  Progress = 'progress'
}

export enum ProjectStatusUpdate {
  Completed = 'completed',
  New = 'new',
  Progress = 'progress'
}

export type RootQueryType = {
  __typename?: 'RootQueryType';
  client: Maybe<Client>;
  clients: Maybe<Array<Maybe<Client>>>;
  project: Maybe<Project>;
  projects: Maybe<Array<Maybe<Project>>>;
};


export type RootQueryTypeClientArgs = {
  id: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeProjectArgs = {
  id: InputMaybe<Scalars['ID']>;
};

export type DeleteClientMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteClientMutation = { __typename?: 'Mutation', deleteClient: { __typename?: 'Client', id: string, name: string, email: string | null, phone: string | null } | null };

export type GetClientsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetClientsQuery = { __typename?: 'RootQueryType', clients: Array<{ __typename?: 'Client', name: string, id: string, phone: string | null, email: string | null } | null> | null };


export const DeleteClientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteClient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteClient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}}]} as unknown as DocumentNode<DeleteClientMutation, DeleteClientMutationVariables>;
export const GetClientsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getClients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<GetClientsQuery, GetClientsQueryVariables>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Client = {
  __typename?: 'Client';
  email: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
  phone: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addClient: Maybe<Client>;
  addProject: Maybe<Project>;
  deleteClient: Maybe<Client>;
  deleteProject: Maybe<Project>;
  updateProject: Maybe<Project>;
};


export type MutationAddClientArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
};


export type MutationAddProjectArgs = {
  clientId: Scalars['ID'];
  description: Scalars['String'];
  name: Scalars['String'];
  status?: InputMaybe<ProjectStatus>;
};


export type MutationDeleteClientArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateProjectArgs = {
  description: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  name: InputMaybe<Scalars['String']>;
  status: InputMaybe<ProjectStatusUpdate>;
};

export type Project = {
  __typename?: 'Project';
  client: Maybe<Client>;
  description: Maybe<Scalars['String']>;
  id: Maybe<Scalars['ID']>;
  name: Maybe<Scalars['String']>;
  status: Maybe<Scalars['String']>;
};

export enum ProjectStatus {
  Completed = 'completed',
  New = 'new',
  Progress = 'progress'
}

export enum ProjectStatusUpdate {
  Completed = 'completed',
  New = 'new',
  Progress = 'progress'
}

export type RootQueryType = {
  __typename?: 'RootQueryType';
  client: Maybe<Client>;
  clients: Maybe<Array<Maybe<Client>>>;
  project: Maybe<Project>;
  projects: Maybe<Array<Maybe<Project>>>;
};


export type RootQueryTypeClientArgs = {
  id: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeProjectArgs = {
  id: InputMaybe<Scalars['ID']>;
};