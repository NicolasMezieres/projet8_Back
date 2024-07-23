import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommandService {
  constructor(private prisma: PrismaService) {}
  async getAllCommand(user: User) {
    return await this.prisma.command.findMany({
      where: {
        idUser: user.id,
      },
      orderBy: {
        updated_at: 'desc',
      },
    });
  }
  async getAllCommandAdmin() {
    return await this.prisma.command.findMany({
      orderBy: {
        updated_at: 'desc',
      },
    });
  }
}
