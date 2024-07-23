import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AdminGuard, JwtGuard } from 'src/auth/guards';
import { updateAdminDto } from './dto';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AdminGuard)
  @Get('/search')
  searchUser(@Query() query: any) {
    return this.userService.searchUser(
      query.search
    );
  }

  @UseGuards(AdminGuard)
  @Patch('/ban')
  updateUser(@Body() dto: updateAdminDto) {
    return this.userService.banUser(dto);
  }
  //todo if i'm not late page profil (update/delete)
}
