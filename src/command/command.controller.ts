import { Controller, Get, UseGuards } from '@nestjs/common';
import { CommandService } from './command.service';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { AdminGuard, JwtGuard } from 'src/auth/guards';

@UseGuards(JwtGuard)
@Controller('command')
export class CommandController {
  constructor(private readonly commandService: CommandService) {}
  @Get('/all')
  getAllCommand(@GetUser() user: User) {
    return this.commandService.getAllCommand;
  }
  @UseGuards(AdminGuard)
  @Get("/allAdmin")
  getAllCommandAdmin(){
    return this.commandService
  }
}
