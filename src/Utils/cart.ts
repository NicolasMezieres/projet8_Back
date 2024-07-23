import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export async function isExistingCart(idCart: string, user: User) {
  const existingCart = await prisma.cart.findUnique({
    where: {
      id: idCart,
      isVisible: true,
    },
  });
  if (!existingCart || !existingCart.id) {
    throw new NotFoundException('Not found cart');
  } else if (existingCart.userId !== user.id) {
    throw new ForbiddenException('You need to be author this cart');
  }
  return existingCart;
}

export async function isExistingProduct(idProduct: string) {
  const existingProduct = await prisma.product.findUnique({
    where: {
      id: idProduct,
    },
  });
  if (!existingProduct || !existingProduct.id) {
    throw new NotFoundException('Not found product');
  } else if (existingProduct.quantity === 0) {
    throw new ForbiddenException('Out stock');
  }
  return existingProduct;
}

export async function isExistingCartHasProduct(
  idCart: string,
  idProduct: string,
) {
  const existingCartHasProduct = await prisma.cartHasProduct.findFirst({
    where: {
      AND: [
        {
          idCart: idCart,
        },
        {
          idProduct: idProduct,
        },
      ],
    },
  });
  return existingCartHasProduct;
}
