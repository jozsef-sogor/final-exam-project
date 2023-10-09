import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ datasources: { db: { url: process.env.DB_URL } } });


const authController = {
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      let user = await prisma.user.findUnique({
        where: {
          email: email,
        }
      });

      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const isMatch = await bcryptjs.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const payload = {
        user: {
          id: user.id,
          role: user.role,
        }
      };

      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      res.status(500).json({ msg: 'Server Error' });
    }
  },

  register: async (req, res) => {
    const { name, email, password, isAdmin } = req.body;

    try {
      let user = await prisma.user.findUnique({
        where: {
          email
        }
      });

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: isAdmin ? 'admin' : 'client',
        }
      });

      const payload = {
        user: {
          id: user.id,
          role: user.role,
        }
      };

      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server Error' });
    }
  },
};

export default authController;

