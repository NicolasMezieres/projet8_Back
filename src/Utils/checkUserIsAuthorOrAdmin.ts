import { PrismaClient, User } from '@prisma/client';
import { Role } from './const';
import { ForbiddenException } from '@nestjs/common';

const prisma = new PrismaClient();
export async function checkUserIsAuthorOrAdmin(
  user: User,
  entityUserId: string,
) {
  const userRole = await prisma.role.findUnique({
    where: {
      id: user.idRole,
    },
  });
  if (user.id !== entityUserId && userRole.nameRole !== Role.ADMIN) {
    throw new ForbiddenException(
      'Admin role or author authentication is needed',
    );
  }
}
