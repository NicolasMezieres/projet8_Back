import { PrismaClient } from '@prisma/client';
import { Role } from '../src/Utils/const';
import * as argon from 'argon2';
const prisma = new PrismaClient();
async function main() {
  const userRole = await prisma.role.create({
    data: { nameRole: Role.USER },
  });
  const adminRole = await prisma.role.create({
    data: { nameRole: Role.ADMIN },
  });
  const user1Password = await argon.hash('HelloDarknessMyOldFriend73');
  const user1 = await prisma.user.create({
    data: {
      email: 'test@gmail.com',
      password: user1Password,
      firstname: 'test',
      lastname: 'test',
      idRole: userRole.id,
      isActive: true,
      age: 18,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
