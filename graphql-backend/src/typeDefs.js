import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    phoneNumber: String
    role: String!
  }

  type Project {
    id: ID!
    title: String!
    description: String!
    address: String!
    milestones: [Milestone]!
    notes: [Notes]!
  }

  type Milestone {
    id: ID!
    text: String!
    project: Project!
  }

  type Notes {
    id: ID!
    text: String!
    user: User!
    project: Project!
  }

  type Query {
    users: [User]!
    user(id: ID!): User
    projects: [Project]!
    project(id: ID!): Project
    notes: [Notes]!
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!, phoneNumber: String, role: String!): User
    updateUser(id: ID!, name: String, email: String, phoneNumber: String): User
    deleteUser(id: ID!): User

    createProject(title: String!, description: String!, address: String!, clientId: ID!): Project
    updateProject(id: ID!, title: String, description: String, address: String): Project
    deleteProject(id: ID!): Project

    createMilestone(text: String!, projectId: ID!): Milestone
    deleteMilestone(id: ID!): Milestone

    createNote(text: String!, userId: ID!, projectId: ID!): Notes
    deleteNote(id: ID!): Notes
  }
`;

export default typeDefs;
