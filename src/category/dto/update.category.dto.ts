import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class updateCategoryDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @IsOptional()
  name: string;
  @IsString()
  @IsOptional()
  image: string;
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
