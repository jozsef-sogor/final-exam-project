import { PrismaClient } from '@prisma/client';
import { jest } from '@jest/globals';
import bcryptjs from 'bcryptjs';
import authController from '../src/controllers/authController';

let prisma;

describe('AuthController', () => {
  beforeAll(async () => {
    // Connect to the database
    // await prisma.$connect({datasources: { db: { url: process.env.DB_URL }}});
    prisma = new PrismaClient({ datasources: { db: { url: process.env.DB_URL } } });

  });

  afterAll(async () => {
    // Disconnect from the database
    await prisma.$disconnect();
  });

  describe('login', () => {
    it('should log in a user and return a token', async () => {
      const req = { body: { "email": "test@example.com", "password": "password123" } };

      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash('password123', salt);

      const user = await prisma.user.create({
        data: {
          password: hashedPassword,
          email: 'test@example.com',
          name: 'John Doe',
          role: 'client',
        }
      });

      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await authController.login(req, res);

      const deleteUser = await prisma.user.delete({
        where: {
          email: 'test@example.com',
        },
      })

      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ token: expect.any(String) }));
    });
  });

  describe('register', () => {
    it('should register a new user and return a token', async () => {
      const req = { body: { "name": 'John Doe', "email": 'john@example.com', "password": 'password123', "isAdmin": "false" } };

      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await authController.register(req, res);

      const deleteUser = await prisma.user.delete({
        where: {
          email: 'john@example.com',
        },
      })

      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ token: expect.any(String) }));
    });
  });

  describe('AuthController Error Cases', () => {  
    describe('login', () => {
      it('should return error for invalid credentials', async () => {
        const req = { body: { "email": "invalid@example.com", "password": "wrongpassword" } };
  
        const res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis(),
        };
  
        await authController.login(req, res);
  
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ msg: 'Invalid credentials' });
      });
    });  
  });  
});
