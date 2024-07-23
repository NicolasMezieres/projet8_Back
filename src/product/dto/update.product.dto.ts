import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class updateProductDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @MinLength(3)
  title: string;

  @IsOptional()
  @MaxLength(255)
  @MinLength(3)
  @IsString()
  description: string;

  @IsOptional()
  @IsUUID()
  idCategory: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100000)
  quantity: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100000)
  price: number;

  @IsOptional()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsUUID()
  id: string;
}
