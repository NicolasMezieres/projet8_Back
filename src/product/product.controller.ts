import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { AdminGuard, JwtGuard } from 'src/auth/guards';
import { insertProductDto, updateProductDto } from './dto';
import { deleteProductDto } from './dto/delete.product';

@UseGuards(JwtGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/all')
  getAllProduct(@Query() query: any) {
    return this.productService.getAlllProduct(query.search);
  }

  @UseGuards(AdminGuard)
  @Post('/create')
  insertProduct(@Body() dto: insertProductDto) {
    return this.productService.insertProduct(dto);
  }

  @UseGuards(AdminGuard)
  @Patch('/update')
  updateProduct(@Body() dto: updateProductDto) {
    return this.productService.updateProduct(dto);
  }

  @UseGuards(AdminGuard)
  @Delete('/delete/:id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
  @Get('/search/:search')
  globalSearch(@Param('search') search: string, @Query() query: any){

   return this.productService.globalSearch(search, query)
  }
}
