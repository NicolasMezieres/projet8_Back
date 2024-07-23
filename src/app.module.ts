import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import { ActivateModule } from './activate/activate.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { CartHasProductModule } from './cart-has-product/cart-has-product.module';
import { CategoryModule } from './category/category.module';
import { CommandModule } from './command/command.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EmailModule,
    ActivateModule,
    UserModule,
    ProductModule,
    CartModule,
    CartHasProductModule,
    CategoryModule,
    CommandModule,
    ImageModule,
  ],
})
export class AppModule {}
