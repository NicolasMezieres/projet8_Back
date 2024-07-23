import { IsNotEmpty, IsUUID } from 'class-validator';

export class removeToCart {
  @IsUUID()
  @IsNotEmpty()
  idCart: string;

  @IsUUID()
  @IsNotEmpty()
  idProduct: string;
}
