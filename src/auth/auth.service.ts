import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { signinDto, signupDto } from './dto';
import * as argon from 'argon2';
import { EmailService } from 'src/email/email.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Role } from 'src/Utils/const';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async insertUser(dto: signupDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (existingUser) {
      throw new ForbiddenException('Email already taken');
    }
    const hash = await argon.hash(dto.password);
    const token = await argon.hash(dto.email);
    const newToken = token.replaceAll('/', '');
    const userRole = await this.prisma.role.findUnique({
      where: {
        nameRole: Role.USER,
      },
    });
    const user = await this.prisma.user.create({
      data: {
        ...dto,
        password: hash,
        token: newToken,
        idRole: userRole.id,
      },
    });
    await this.prisma.cart.create({
      data: {
        userId: user.id,
        name: 'My first cart',
      },
    });
    await this.emailService.sendUserConfirmation(user, newToken);
    delete user.password;
    delete user.token;
    delete user.idRole;
    delete user.isActive;
    return {
      message: 'Succesfully register, Check your mail or valid your account!',
    };
  }

  async signin(dto: signinDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        AND: [
          {
            email: dto.email,
          },
          { isActive: true },
        ],
      },
      select: {
        id: true,
        password: true,
        role: true,
      },
    });
    if (!existingUser || !existingUser.id) {
      throw new ForbiddenException('Invalid Credentials!');
    }
    const isValidPassword = await argon.verify(
      existingUser.password,
      dto.password,
    );
    if (!isValidPassword) {
      throw new ForbiddenException('Invalid Credentials!');
    }
    return await this.signToken(existingUser.id, existingUser.role.nameRole);
  }

  async signToken(
    idUser: string,
    nameRole: string,
  ): Promise<{ access_token: string; message: string }> {
    const payload = {
      sub: idUser,
      role: nameRole,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '30d',
      secret: secret,
    });
    return {
      access_token: token,
      message: 'Signin successfully!',
    };
  }
}
