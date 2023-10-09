import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ datasources: { db: { url: process.env.DB_URL } } });

const milestoneController = {
  getMilestones: async (req, res, next) => {
    const { projectId } = req.params;

    try {
      const milestones = await prisma.milestone.findMany({
        where: {
          projectId: parseInt(projectId)
        }
      });

      res.json(milestones);
    } catch (err) {
      next(err);
    }
  },

  createMilestone: async (req, res, next) => {
    const { projectId } = req.params;
    const { text } = req.body;

    try {
      const milestone = await prisma.milestone.create({
        data: {
          text,
          projectId: parseInt(projectId)
        }
      });

      res.json(milestone);
    } catch (err) {
      next(err);
    }
  }
};

export default milestoneController;

