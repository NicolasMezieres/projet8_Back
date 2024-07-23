import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class insertProductDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @MinLength(3)
  title: string;

  @IsNotEmpty()
  @MaxLength(255)
  @MinLength(3)
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsUUID()
  idCategory: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(100000)
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10000000)
  price: number;

  @IsNotEmpty()
  @IsString()
  image: string;
}
