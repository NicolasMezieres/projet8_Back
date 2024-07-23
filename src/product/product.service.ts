import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { insertProductDto } from './dto/insert.product.dto';
import { updateProductDto } from './dto';
import { deleteProductDto } from './dto/delete.product';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getAlllProduct(query: any) {
    const products = await this.prisma.product.findMany({
      where: {
        isVisible: true,
        OR: [
          { title: { contains: query } },
          { idCategory: { contains: query } },
          { price: { gte: Number(query) ? Number(query) : 0 } },
          {
            price: {
              lte: Number(query) ? Number(query) : 100000,
            },
          },
        ],
      },
      select: {
        id: true,
        title: true,
        image: true,
        description: true,
        idCategory: true,
        quantity: true,
        price: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    });
    products.map((Element) => {
      Element.image = `http://localhost:3000/image/view/${Element.image}`;
    });
    return products;
  }

  async insertProduct(dto: insertProductDto) {
    const existingProduct = await this.prisma.product.findUnique({
      where: {
        title: dto.title,
      },
    });
    if (existingProduct) {
      throw new ForbiddenException('Title aleardy taken');
    }
    const existingCategory = await this.prisma.category.findUnique({
      where: {
        id: dto.idCategory,
      },
    });
    if (!existingCategory || !existingCategory.id) {
      throw new ForbiddenException('Need an existing category');
    }

    return (
      await this.prisma.product.create({
        data: {
          ...dto,
        },
      }),
      { message: 'Success product create!' }
    );
  }
  async updateProduct(dto: updateProductDto) {
    if (dto.idCategory) {
      const existingCategory = await this.prisma.category.findUnique({
        where: {
          id: dto.idCategory,
        },
      });
      if (!existingCategory || !existingCategory.id) {
        throw new ForbiddenException('Category not exist!');
      }
    }
    if (dto.title) {
      const existingTitle = await this.prisma.product.findUnique({
        where: {
          title: dto.title,
        },
      });
      if (existingTitle && existingTitle.id !== dto.id) {
        console.log(existingTitle, dto.id);
        throw new ForbiddenException('Title already taken');
      }
    }
    const existingProduct = await this.prisma.product.findUnique({
      where: {
        id: dto.id,
      },
    });
    console.log(existingProduct);
    console.log(dto.title);

    if (!existingProduct || !existingProduct.id) {
      throw new NotFoundException('Product not found');
    }
    return (
      await this.prisma.product.update({
        where: {
          id: existingProduct.id,
        },
        data: {
          ...dto,
        },
      }),
      { message: 'Update succesfully!' }
    );
  }
  async deleteProduct(id: string) {
    await this.prisma.cartHasProduct.deleteMany({
      where: {
        id: id,
      },
    });
    const product = await this.prisma.product.delete({
      where: {
        id: id,
      },
    });
    if (!product || !product.id) {
      throw new NotFoundException('Inexisting Product');
    }
    return { message: 'Delete product' };
  }
  async globalSearch(search: string, query: any) {
    const products = await this.prisma.product.findMany({
      where: {
        OR: [
          { title: { contains: search } },
          { category: { name: query.category } },
        ],
      },
      select: {
        id: true,
        title: true,
        image: true,
        description: true,
        idCategory: true,
        quantity: true,
        price: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    });
    products.map((Element) => {
      Element.image = `http://localhost:3000/image/view/${Element.image}`;
    });
    return products;
  }
}
