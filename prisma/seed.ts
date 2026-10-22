import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@company.com";

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (!existingAdmin) {
    const hash = await bcrypt.hash("Admin123!", 10);

    await prisma.user.create({
      data: {
        email: adminEmail,
        fullName: "System Admin",
        username: "admin",
        passwordHash: hash,
        role: "ADMIN",
        status: "ACTIVE",
        isEmailVerified: true,
        isKycVerified: true
      }
    });
  }

  const taskCount = await prisma.task.count();

  if (taskCount === 0) {
    await prisma.task.createMany({
      data: [
        {
          title: "Profile Completion",
          description: "Complete your profile information",
          rewardAmount: 5,
          rewardCurrency: "USD",
          type: "VERIFICATION",
          status: "ACTIVE",
          maxPerUser: 1
        },
        {
          title: "Referral Action",
          description: "Invite a friend to join the platform",
          rewardAmount: 10,
          rewardCurrency: "USD",
          type: "REFERRAL",
          status: "ACTIVE",
          maxPerUser: 5
        },
        {
          title: "Survey",
          description: "Answer a short onboarding survey",
          rewardAmount: 8,
          rewardCurrency: "USD",
          type: "SURVEY",
          status: "ACTIVE",
          maxPerUser: 1
        }
      ]
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
