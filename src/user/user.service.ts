import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { updateAdminDto } from './dto';
import { isBoolean, isNumber } from 'class-validator';

const select = {
  firstname: true,
  lastname: true,
  email: true,
  age: true,
  isActive: true,
};

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async searchUser(search: any) {
    const user = await this.prisma.user.findMany({
      where: {
        OR: [
          { firstname: { contains: search } },
          { lastname: { contains: search } },
          { email: { contains: search } },
          { age: isNumber(Number(search)) ? Number(search) : undefined },
          {
            isActive:
              search === 'true' ? true : search === 'false' ? false : undefined,
          },
        ],
      },
      select: select,
      orderBy: {
        created_at: 'desc',
      },
    });
    return user;
  }
  async banUser(dto: updateAdminDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        id: dto.id,
      },
    });
    if (!existingUser || !existingUser.id) {
      throw new ForbiddenException('Not found');
    }
    await this.prisma.user.update({
      where: {
        id: dto.id,
      },
      data: {
        isActive: dto.isActive,
      },
    });
    return 'update effectued';
  }
}
