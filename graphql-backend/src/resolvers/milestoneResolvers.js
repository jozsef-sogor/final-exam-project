
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ datasources: { db: { url: process.env.DB_URL } } });

const milestoneResolvers = {
  Query: {
    milestones: async (_, { projectId }) => {
      try {
        const milestones = await prisma.milestone.findMany({
          where: {
            projectId: parseInt(projectId)
          }
        });

        return milestones;
      } catch (err) {
        throw new Error('Could not fetch milestones');
      }
    }
  },
  Mutation: {
    createMilestone: async (_, { text, projectId }) => {
      try {
        const milestone = await prisma.milestone.create({
          data: {
            text,
            projectId: parseInt(projectId)
          }
        });

        return milestone;
      } catch (err) {
        throw new Error('Could not create milestone');
      }
    }
  }
};

export default milestoneResolvers;
