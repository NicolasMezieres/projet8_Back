import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtGuard } from 'src/auth/guards';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { buyCartDto, deleteCartDto, insertCartDto, updateCartDto } from './dto';

@UseGuards(JwtGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('/all')
  getAllCart(@GetUser() user: User) {
    return this.cartService.getAllCart(user);
  }

  @Post('/new')
  insertCart(@Body() dto: insertCartDto, @GetUser() user: User) {
    return this.cartService.insertCart(dto, user);
  }

  @Patch('/update')
  updateCart(@Body() dto: updateCartDto, @GetUser() user: User) {
    return this.cartService.updateCart(dto, user);
  }

  @Delete('/delete')
  deleteCart(@Body() dto: deleteCartDto, @GetUser() user: User) {
    return this.cartService.deleteCart(dto, user);
  }

  @Patch('/buy')
  buyCart(@Body() dto: buyCartDto, @GetUser() user: User) {
    return this.cartService.buyCart(dto, user);
  }
}
