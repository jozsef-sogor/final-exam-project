import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ datasources: { db: { url: process.env.DB_URL } } });

const userController = {
  getUsers: async (req, res) => {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server Error' });
    }
  },

  getUser: async (req, res) => {
    const { id } = req.params;

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: parseInt(id)
        }
      });

      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server Error' });
    }
  },

  updateUser: async (req, res) => {
    const { id } = req.params;
    const { name, phoneNumber, email } = req.body;

    try {
      const updatedUser = await prisma.user.update({
        where: {
          id: parseInt(id)
        },
        data: {
          name,
          phoneNumber,
          email
        }
      });

      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server Error' });
    }
  },

  updateContacts: async (req, res) => {
    const { id } = req.params;
    const { phoneNumber, email } = req.body;

    try {
      const updatedUser = await prisma.user.update({
        where: {
          id: parseInt(id)
        },
        data: {
          phoneNumber,
          email
        }
      });

      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server Error' });
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;

    try {
      const deletedUser = await prisma.user.delete({
        where: {
          id: parseInt(id)
        }
      });

      res.json(deletedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server Error' });
    }
  }
};

export default userController;

