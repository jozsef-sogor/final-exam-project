import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

console.log("################ RUNNING DB PINGING ################")

async function checkDbConnection() {
  for (let i = 0; i < 70; i++) {
    try {
      await prisma.$connect();
      console.log('Database connected!');
      await prisma.$disconnect();
      process.exit(0);
    } catch (error) {
      console.error('Error connecting to database:', error.message);
    }

    console.log(`Retrying in 5 seconds... (${i + 1}/10)`);
    await new Promise(resolve => setTimeout(resolve, 5000));
  }

  console.error('Exceeded maximum attempts. Exiting...');
  process.exit(1);
}

checkDbConnection();
