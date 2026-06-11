import "./env";

let prismaClientInstance: any = null;

const prismaProxy = new Proxy(
  {},
  {
    get: (target: any, prop: string) => {
      if (prismaClientInstance) {
        return (prismaClientInstance as any)[prop];
      }

      // Lazy initialization
      if (typeof window === "undefined") {
        try {
          const { PrismaClient } = require("../generated/prisma");
          prismaClientInstance = new PrismaClient();
          return (prismaClientInstance as any)[prop];
        } catch (e) {
          console.warn("Prisma not initialized:", e);
          return undefined;
        }
      }

      return undefined;
    },
  }
) as any;

export default prismaProxy;
export const prisma = prismaProxy;
