// Load environment variables for Prisma
if (!process.env.DATABASE_URL && typeof process !== "undefined") {
  try {
    require("dotenv").config();
  } catch (e) {
    // dotenv might not be loaded
  }
}

