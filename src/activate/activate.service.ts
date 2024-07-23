import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { isString } from 'class-validator';

@Injectable()
export class ActivateService {
  constructor(private prisma: PrismaService) {}

  async activateAccount(token: string, res: any) {
    if (!token || !isString(token)) {
      throw new BadRequestException('Need a valid token');
    }
    const user = await this.prisma.user.findFirst({
      where: {
        token: token,
      },
    });
    if (!user || !user.id) {
      throw new BadRequestException('Not a valid token');
    }

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        token: null,
        isActive: true,
      },
    });
    return ['Account activate', res.redirect('http://localhost:3001/sign')];
  }
}
