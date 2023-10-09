import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ datasources: { db: { url: process.env.DB_URL } } });

const noteController = {
  getNotes: async (req, res, next) => {
    const { projectId } = req.params;

    try {
      const notes = await prisma.note.findMany({
        where: {
          projectId: parseInt(projectId)
        }
      });

      res.json(notes);
    } catch (err) {
      next(err);
    }
  },

  createNote: async (req, res, next) => {
    const { projectId } = req.params;
    const { text } = req.body;
    const userId = req.user.id;

    try {
      const note = await prisma.note.create({
        data: {
          text,
          userId,
          projectId: parseInt(projectId)
        }
      });

      res.json(note);
    } catch (err) {
      next(err);
    }
  }
};

export default noteController;

