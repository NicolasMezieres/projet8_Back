import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { deleteCategoryDto, insertCategoryDto, updateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getAllCategory() {
    const category = await this.prisma.category.findMany();
    category.map((Element) => {
      Element.image = `http://localhost:3000/image/view/${Element.image}`;
    });
    return category;
  }
  async searchCategory(name: string) {
    const category = await this.prisma.category.findMany({
      where: { name: { contains: name } },
    });
    category.map((Element) => {
      Element.image = `http://localhost:3000/image/view/${Element.image}`;
    });
    return category;
  }
  async insertCategory(dto: insertCategoryDto) {
    const existingNameCategory = await this.prisma.category.findUnique({
      where: {
        name: dto.name,
      },
    });
    if (existingNameCategory) {
      throw new ForbiddenException('Category name already taken');
    }
    await this.prisma.category.create({
      data: {
        name: dto.name,
        image: dto.image,
      },
    });
    return { message: 'Created successfully category' };
  }

  async updateCategory(dto: updateCategoryDto) {
    const existingNameCategory = await this.prisma.category.findUnique({
      where: {
        name: dto.name,
      },
    });
    if (existingNameCategory && existingNameCategory.id != dto.id) {
      throw new ForbiddenException('Category name already taken');
    }
    const existingCategory = await this.prisma.category.findUnique({
      where: {
        id: dto.id,
      },
    });
    if (!existingCategory || !existingCategory.id) {
      throw new NotFoundException('Not found');
    }
    await this.prisma.category.update({
      where: {
        id: existingCategory.id,
      },
      data: {
        ...dto,
      },
    });
    return { message: 'Updated successfully category' };
  }

  async deleteCategory(id: string) {
    const existingCategory = await this.prisma.category.findUnique({
      where: {
        id: id,
      },
    });
    if (!existingCategory || !existingCategory.id) {
      throw new NotFoundException('Not found category');
    }
    await this.prisma.cartHasProduct.deleteMany({
      where: {
        product: {
          category: {
            id: id,
          },
        },
      },
    });
    await this.prisma.product.deleteMany({
      where: {
        category: {
          id: id,
        },
      },
    });
    await this.prisma.category.delete({
      where: {
        id: existingCategory.id,
      },
    });
    return { message: 'Deleted successfully category!' };
  }
}
