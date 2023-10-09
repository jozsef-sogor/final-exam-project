import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ datasources: { db: { url: process.env.DB_URL } } });

const projectController = {
  getProjects: async (req, res, next) => {
    try {
      const projects = await prisma.project.findMany();
      res.json(projects);
    } catch (err) {
      next(err);
    }
  },

  getProject: async (req, res, next) => {
    const { id } = req.params;

    try {
      const project = await prisma.project.findUnique({
        where: {
          id: parseInt(id)
        }
      });

      if (!project) {
        return res.status(404).json({ msg: 'Project not found' });
      }

      res.json(project);
    } catch (err) {
      next(err);
    }
  },

  createProject: async (req, res, next) => {
    const { title, description, address, clientId } = req.body;

    try {
      const project = await prisma.project.create({
        data: {
          title,
          description,
          address,
          clientId: parseInt(clientId)
        }
      });

      res.json(project);
    } catch (err) {
      next(err);
    }
  },

  updateProject: async (req, res, next) => {
    const { id } = req.params;
    const { title, description, address } = req.body;

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

      res.json(updatedProject);
    } catch (err) {
      next(err);
    }
  },

  deleteProject: async (req, res, next) => {
    const { id } = req.params;

    try {
      const deletedProject = await prisma.project.delete({
        where: {
          id: parseInt(id)
        }
      });

      res.json(deletedProject);
    } catch (err) {
      next(err);
    }
  }
};

export default projectController;

