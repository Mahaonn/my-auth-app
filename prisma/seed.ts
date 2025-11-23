import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      name: "test",
      email: "test@example.com",
      password: "12345t678",
    },
  });

  await prisma.user.create({
    data: {
      name: "Test",
      email: "fhdj@xf.hg",
      password: "12345t678",
    },
  });

  await prisma.user.create({
    data: {
      name: "TestUser2",
      email: "testuser2@example.com",
      password: "TestPassword2!123",
    },
  });

  await prisma.user.create({
    data: {
      name: "TestUser4",
      email: "testuser4@example.com",
      password: "TestPassword4!123",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
