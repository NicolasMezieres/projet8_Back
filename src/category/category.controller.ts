import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { AdminGuard, JwtGuard } from 'src/auth/guards';
import { deleteCategoryDto, insertCategoryDto, updateCategoryDto } from './dto';

@UseGuards(JwtGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/all')
  getAllCategory() {
    return this.categoryService.getAllCategory();
  }
  @UseGuards(AdminGuard)
  @Get('/search/:name')
  searchCategory(@Param('name') name: string) {
    return this.categoryService.searchCategory(name);
  }
  @UseGuards(AdminGuard)
  @Post('/new')
  insertCategory(@Body() dto: insertCategoryDto) {
    return this.categoryService.insertCategory(dto);
  }

  @UseGuards(AdminGuard)
  @Patch('/update')
  updateCategory(@Body() dto: updateCategoryDto) {
    return this.categoryService.updateCategory(dto);
  }

  @UseGuards(AdminGuard)
  @Delete('/delete/:id')
  deleteCategoryDto(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }
}
