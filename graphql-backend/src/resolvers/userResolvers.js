
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ datasources: { db: { url: process.env.DB_URL } } });

const userResolvers = {
  Query: {
    users: async () => {
      try {
        const users = await prisma.user.findMany();
        return users;
      } catch (err) {
        throw new Error('Could not fetch users');
      }
    },
    user: async (_, { id }) => {
      try {
        const user = await prisma.user.findUnique({
          where: {
            id: parseInt(id)
          }
        });

        if (!user) {
          throw new Error('User not found');
        }

        return user;
      } catch (err) {
        throw new Error('Could not fetch user');
      }
    }
  },
  Mutation: {
    createUser: async (_, { name, email, password, phoneNumber, role }) => {
      try {
        const user = await prisma.user.create({
          data: {
            name,
            email,
            password,
            phoneNumber,
            role
          }
        });

        return user;
      } catch (err) {
        throw new Error('Could not create user');
      }
    },
    updateUser: async (_, { id, name, email, phoneNumber }) => {
      try {
        const updatedUser = await prisma.user.update({
          where: {
            id: parseInt(id)
          },
          data: {
            name,
            email,
            phoneNumber
          }
        });

        return updatedUser;
      } catch (err) {
        throw new Error('Could not update user');
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        const deletedUser = await prisma.user.delete({
          where: {
            id: parseInt(id)
          }
        });

        return deletedUser;
      } catch (err) {
        throw new Error('Could not delete user');
      }
    }
  }
};

export default userResolvers;
