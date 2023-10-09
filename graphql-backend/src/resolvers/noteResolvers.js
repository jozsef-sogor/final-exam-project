
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ datasources: { db: { url: process.env.DB_URL } } });

const noteResolvers = {
  Query: {
    notes: async (_, { projectId }) => {
      try {
        const notes = await prisma.note.findMany({
          where: {
            projectId: parseInt(projectId)
          }
        });

        return notes;
      } catch (err) {
        throw new Error('Could not fetch notes');
      }
    }
  },
  Mutation: {
    createNote: async (_, { text, projectId }) => {
      try {
        const note = await prisma.note.create({
          data: {
            text,
            userId: 1, // Assuming there's a user with ID 1, change this according to your logic
            projectId: parseInt(projectId)
          }
        });

        return note;
      } catch (err) {
        throw new Error('Could not create note');
      }
    }
  }
};

export default noteResolvers;
