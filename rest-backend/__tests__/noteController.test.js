import { PrismaClient } from '@prisma/client';
import { jest } from '@jest/globals';
import bcryptjs from 'bcryptjs';
import noteController from '../src/controllers/noteController';

let prisma, client, admin, project;

describe('NoteController', () => {
  beforeAll(async () => {
    prisma = new PrismaClient({ datasources: { db: { url: process.env.DB_URL } } });

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash('password123', salt);

    // Create client
    client = await prisma.user.create({
      data: {
        password: hashedPassword,
        email: 'client-for-project@example.com',
        name: 'John Doe',
        role: 'client',
      }
    });

    // Create admin
    admin = await prisma.user.create({
      data: {
        password: hashedPassword,
        email: 'admin-for-project@example.com',
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

  describe('getNotes', () => {
    it('should return notes for a project', async () => {
      // Mock request and response objects
      const req = { params: { projectId: project.id } };
      const res = { json: jest.fn() };

      // Create a note for testing
      const note = await prisma.note.create({
        data: {
          text: 'Test Note',
          userId: admin.id,
          projectId: project.id,
        },
      });

      // Call the controller function
      await noteController.getNotes(req, res);

      // Check if the response is as expected
      expect(res.json).toHaveBeenCalledWith([expect.objectContaining({ text: 'Test Note' })]);

      // Clean up the created note
      await prisma.note.delete({ where: { id: note.id } });
    });
  });

  describe('createNote', () => {
    it('should create a new note', async () => {
      // Mock request and response objects
      const req = { params: { projectId: project.id }, body: { text: 'New Note' }, user: admin };
      const res = { json: jest.fn() };

      // Call the controller function
      await noteController.createNote(req, res);

      // Check if the response is as expected
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ text: 'New Note' }));

      // Clean up the created note
      await prisma.note.deleteMany({ where: { text: 'New Note' } });
    });
  });
});
