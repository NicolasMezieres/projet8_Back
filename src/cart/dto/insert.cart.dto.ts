import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class insertCartDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(1)
  name: string;
}
