import { betterAuth } from "better-auth";
import * as dotenv from "dotenv";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "./db";

dotenv.config();

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  trustedOrigins: [process.env.APP_URL],
});
