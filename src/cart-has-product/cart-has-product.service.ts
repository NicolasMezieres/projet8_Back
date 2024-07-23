import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { addToCartDto, removeToCart } from './dto';
import { User } from '@prisma/client';
import {
  isExistingCart,
  isExistingCartHasProduct,
  isExistingProduct,
} from 'src/Utils/cart';

@Injectable()
export class CartHasProductService {
  constructor(private prisma: PrismaService) {}

  async addToCart(dto: addToCartDto, user: User) {
    const existingCart = await isExistingCart(dto.idCart, user);
    const existingProduct = await isExistingProduct(dto.idProduct);
    const existingCartHasProduct = await isExistingCartHasProduct(
      dto.idCart,
      dto.idProduct,
    );
    if (!existingCartHasProduct || !existingCartHasProduct.id) {
      return await this.prisma.cartHasProduct.create({
        data: {
          ...dto,
        },
      });
    } else if (
      existingProduct.quantity <
      dto.quantity + existingCartHasProduct.quantity
    ) {
      return await this.prisma.cartHasProduct.update({
        where: {
          id: existingCartHasProduct.id,
        },
        data: {
          quantity: existingProduct.quantity,
        },
      });
    } else {
      return await this.prisma.cartHasProduct.update({
        where: {
          id: existingCartHasProduct.id,
        },
        data: {
          quantity: existingCartHasProduct.quantity + dto.quantity,
        },
      });
    }
  }

  async updateToCart(dto: addToCartDto, user: User) {
    const existingCart = await isExistingCart(dto.idCart, user);
    const existingProduct = await isExistingProduct(dto.idProduct);
    const existingCartHasProduct = await isExistingCartHasProduct(
      dto.idCart,
      dto.idProduct,
    );
    if (!existingCartHasProduct || !existingCartHasProduct.id) {
      throw new NotFoundException('Not found');
    } else if (existingProduct.quantity < dto.quantity) {
      return await this.prisma.cartHasProduct.update({
        where: {
          id: existingCartHasProduct.id,
        },
        data: {
          quantity: existingProduct.quantity,
        },
      });
    } else {
      return await this.prisma.cartHasProduct.update({
        where: {
          id: existingCartHasProduct.id,
        },
        data: {
          quantity: dto.quantity,
        },
      });
    }
  }

  async removeToCart(dto: removeToCart, user: User) {
    const existingCart = await isExistingCart(dto.idCart, user);
    const existingProduct = await isExistingProduct(dto.idProduct);
    const existingCartHasProduct = await isExistingCartHasProduct(
      dto.idCart,
      dto.idProduct,
    );
    if (!existingCartHasProduct || !existingCartHasProduct.id) {
      throw new NotFoundException('Not found in your cart');
    }
    return (
      await this.prisma.cartHasProduct.delete({
        where: {
          id: existingCartHasProduct.id,
        },
      }),
      { message: 'product remove to your cart' }
    );
  }
}
