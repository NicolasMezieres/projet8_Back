import { IsInt, IsNotEmpty, IsPositive, IsUUID } from 'class-validator';

export class addToCartDto {
  @IsUUID()
  @IsNotEmpty()
  idCart: string;

  @IsUUID()
  @IsNotEmpty()
  idProduct: string;

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  quantity: number;
}
