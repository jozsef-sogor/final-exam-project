import { PrismaClient } from '@prisma/client';
import { jest } from '@jest/globals';
import bcryptjs from 'bcryptjs';
import milestoneController from '../src/controllers/milestoneController';

let prisma, client, admin, project;

describe('MilestoneController', () => {
  beforeAll(async () => {
    prisma = new PrismaClient({ datasources: { db: { url: process.env.DB_URL } } });

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash('password123', salt);

    // Create client
    client = await prisma.user.create({
      data: {
        password: hashedPassword,
        email: 'client-for-milestone@example.com',
        name: 'John Doe',
        role: 'client',
      }
    });

    // Create admin
    admin = await prisma.user.create({
      data: {
        password: hashedPassword,
        email: 'admin-for-milestone@example.com',
        name: 'John Doe',
        role: 'admin',
      }
    });

    // Create a project
    project = await prisma.project.create({
        data: {
        title: 'Test Project',
        description: 'This is a test project',
        address: '123 Test Street',
        designerId: admin.id,
        clientId: client.id,
        }
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('getMilestones', () => {
    it('should return milestones for a project', async () => {
      // Mock request and response objects
      const req = { params: { projectId: '1' } };
      const res = { json: jest.fn() };

      // Create a milestone for testing
      const milestone = await prisma.milestone.create({
        data: {
          text: 'Test Milestone',
          projectId: project.id,
        },
      });

      // Call the controller function
      await milestoneController.getMilestones(req, res);

      // Check if the response is as expected
      expect(res.json).toHaveBeenCalledWith([expect.objectContaining({ text: 'Test Milestone' })]);

      // Clean up the created milestone
      await prisma.milestone.delete({ where: { id: milestone.id } });
    });
  });

  describe('createMilestone', () => {
    it('should create a new milestone', async () => {
      // Mock request and response objects
      const req = { params: { projectId: project.id }, body: { text: 'New Milestone' } };
      const res = { json: jest.fn() };

      // Call the controller function
      await milestoneController.createMilestone(req, res);

      // Check if the response is as expected
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ text: 'New Milestone' }));

      // Clean up the created milestone
      await prisma.milestone.deleteMany({ where: { text: 'New Milestone' } });
    });
  });
});
