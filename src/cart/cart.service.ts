import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { buyCartDto, deleteCartDto, insertCartDto, updateCartDto } from './dto';
import { User } from '@prisma/client';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}
//test 
  async getAllCart(user: User) {
    const allCart = await this.prisma.cart.findMany({
      where: {
        userId: user.id,
        isVisible: true,
      },
      select: {
        id: true,
        name: true,
        cartHasProduct: {
          select: {
            id: true,
            quantity: true,
            product: {
              select: {
                id: true,
                title: true,
                image: true,
                description: true,
                quantity: true,
                price: true,
                category: true,
              },
            },
          },
        },
      },
    });
    const test = allCart.map(async (element) => {
      element.cartHasProduct.map(async (Element) => {
        Element.product.image = `http://localhost:3000/image/view/${Element.product.image}`;
        if (Element.product.quantity === 0) {
          await this.prisma.cartHasProduct.delete({
            where: {
              id: Element.id,
            },
          });
          return {
            message: `${Element.product.title} is retired of your cart because he is Out Stock`,
          };
        } else if (Element.quantity > Element.product.quantity) {
          return await this.prisma.cartHasProduct.update({
            where: {
              id: Element.id,
            },
            data: {
              quantity: Element.product.quantity,
            },
          });
        } else {
          return allCart;
        }
      });
      return element;
    });
    return allCart;
  }

  async insertCart(dto: insertCartDto, user: User) {
    return await this.prisma.cart.create({
      data: {
        name: dto.name,
        userId: user.id,
      },
    });
  }

  async updateCart(dto: updateCartDto, user: User) {
    const existingCart = await this.prisma.cart.findUnique({
      where: {
        id: dto.id,
        isVisible: true,
      },
    });
    if (!existingCart || !existingCart.id) {
      throw new NotFoundException();
    } else if (existingCart.userId !== user.id) {
      throw new ForbiddenException('You need to be author this cart');
    }
    return await this.prisma.cart.update({
      where: {
        id: existingCart.id,
      },
      data: {
        ...existingCart,
        name: dto.name,
      },
    });
  }

  async deleteCart(dto: deleteCartDto, user: User) {
    const existingCart = await this.prisma.cart.findUnique({
      where: {
        id: dto.id,
        isVisible: true,
      },
    });
    if (!existingCart || !existingCart.id) {
      throw new NotFoundException('Not found');
    } else if (existingCart.userId !== user.id) {
      throw new ForbiddenException('You need to be author this cart');
    }
    return await this.prisma.cart.delete({
      where: {
        id: dto.id,
        isVisible: true,
      },
    });
  }

  async buyCart(dto: buyCartDto, user: User) {
    const existingCart = await this.prisma.cart.findUnique({
      where: {
        id: dto.id,
        isVisible: true,
      },
      select: {
        userId: true,
        id: true,
        cartHasProduct: {
          select: {
            quantity: true,
            product: {
              select: {
                id: true,
                price: true,
                quantity: true,
              },
            },
          },
        },
      },
    });
    if (!existingCart || !existingCart.id) {
      throw new NotFoundException('Not found');
    } else if (existingCart.userId !== user.id) {
      throw new ForbiddenException('You need to be author this cart');
    }
    let total = 0;
    existingCart.cartHasProduct.map(async (Element) => {
      if (Element.product.quantity >= Element.quantity) {
        total += Element.product.price * Element.quantity;
      } else {
        await this.prisma.cartHasProduct.update({
          where: {
            id: dto.id,
          },
          data: {
            quantity: Element.product.quantity,
          },
        });

        throw new ForbiddenException(
          'the quantity of one or more products has been modified',
        );
      }
    });
    existingCart.cartHasProduct.map(async (element) => {
      await this.prisma.product.update({
        where: {
          id: element.product.id,
        },
        data: {
          quantity: element.product.quantity - element.quantity,
        },
      });
    });
    // à tester vv
    existingCart.cartHasProduct.map((Element) => {
      delete Element.product.quantity;
    });
    // ici ^^
    await this.prisma.command.create({
      data: {
        idPanier: dto.id,
        isValidate: true,
        validationDate: new Date(),
        container: existingCart.cartHasProduct,
        totalPrice: total,
        idUser: user.id,
      },
    });
    await this.prisma.cartHasProduct.deleteMany({
      where: {
        idCart: existingCart.id,
      },
    });
    return await this.prisma.cart.update({
      where: {
        id: dto.id,
      },
      data: {
        isVisible: false,
      },
    });
  }
}
