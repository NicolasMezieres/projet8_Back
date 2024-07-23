import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class insertCategoryDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  image: string;
}
