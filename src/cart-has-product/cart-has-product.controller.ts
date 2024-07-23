import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CartHasProductService } from './cart-has-product.service';
import { addToCartDto, removeToCart } from './dto';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/auth/guards';

@UseGuards(JwtGuard)
@Controller('cartHasProduct')
export class CartHasProductController {
  constructor(private readonly cartHasProductService: CartHasProductService) {}

  @Post('/add')
  addToCart(@Body() dto: addToCartDto, @GetUser() user: User) {
    return this.cartHasProductService.addToCart(dto, user);
  }

  @Patch('/update')
  updateToCart(@Body() dto: addToCartDto, @GetUser() user: User) {
    return this.cartHasProductService.updateToCart(dto, user);
  }

  @Delete('/remove')
  removeToCart(@Body() dto: removeToCart, @GetUser() user: User) {
    return this.cartHasProductService.removeToCart(dto, user);
  }
}
