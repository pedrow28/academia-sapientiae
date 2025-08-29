import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // cria usuário
  const user = await prisma.user.create({
    data: { email: "pedro@example.com", password: "123456" },
  });
  console.log("Novo usuário:", user);

  // cria progresso
  const prog = await prisma.characterProgress.create({
    data: {
      userId: user.id,
      character: { PES: 10, skills: { lógica: 1 } },
      streak: 1,
      lastActivityAt: new Date(),
    },
  });
  console.log("Progresso:", prog);

  // consulta
  const consult = await prisma.user.findMany({
    include: { progress: true },
  });
  console.log("Consulta:", consult);
}

main().finally(() => prisma.$disconnect());
