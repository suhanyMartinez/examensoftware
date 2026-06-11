const { PrismaClient } = require('./app/generated/prisma');
const prisma = new PrismaClient();

async function main() {
  try {
    const users = await prisma.user.findMany();
    console.log('✅ Conexión exitosa a Supabase!');
    console.log(`Total de usuarios: ${users.length}`);
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
