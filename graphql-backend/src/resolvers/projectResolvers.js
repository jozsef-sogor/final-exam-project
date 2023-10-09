
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ datasources: { db: { url: process.env.DB_URL } } });

const projectResolvers = {
  Query: {
    projects: async () => {
      try {
        const projects = await prisma.project.findMany();
        return projects;
      } catch (err) {
        throw new Error('Could not fetch projects');
      }
    },
    project: async (_, { id }) => {
      try {
        const project = await prisma.project.findUnique({
          where: {
            id: parseInt(id)
          }
        });

        if (!project) {
          throw new Error('Project not found');
        }

        return project;
      } catch (err) {
        throw new Error('Could not fetch project');
      }
    }
  },
  Mutation: {
    createProject: async (_, { title, description, address, clientId }) => {
      try {
        const project = await prisma.project.create({
          data: {
            title,
            description,
            address,
            clientId: parseInt(clientId)
          }
        });

        return project;
      } catch (err) {
        throw new Error('Could not create project');
      }
    },
    updateProject: async (_, { id, title, description, address }) => {
      try {
        const updatedProject = await prisma.project.update({
          where: {
            id: parseInt(id)
          },
          data: {
            title,
            description,
            address
          }
        });

        return updatedProject;
      } catch (err) {
        throw new Error('Could not update project');
      }
    },
    deleteProject: async (_, { id }) => {
      try {
        const deletedProject = await prisma.project.delete({
          where: {
            id: parseInt(id)
          }
        });

        return deletedProject;
      } catch (err) {
        throw new Error('Could not delete project');
      }
    }
  }
};

export default projectResolvers;
