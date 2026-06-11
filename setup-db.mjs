import { execSync } from "child_process";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.DATABASE_URL;
console.log("Using DATABASE_URL:", dbUrl.substring(0, 50) + "...");

// Try using the direct URL for prisma operations
const env = { ...process.env, DATABASE_URL: dbUrl };

try {
  console.log("Running prisma db push...");
  execSync("npx prisma db push --skip-generate", { 
    stdio: "inherit",
    env 
  });
  console.log("✓ Database schema updated successfully!");
} catch (error) {
  console.error("Error:", error.message);
  process.exit(1);
}
