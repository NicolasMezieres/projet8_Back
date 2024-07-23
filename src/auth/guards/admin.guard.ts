import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Role } from 'src/Utils/const';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (user && user.role && user.role.nameRole === Role.ADMIN) {
      return true;
    } else {
      throw new UnauthorizedException('Unauthorized!');
    }
  }
}
