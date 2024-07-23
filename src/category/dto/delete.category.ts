import { IsNotEmpty, IsUUID } from 'class-validator';

export class deleteCategoryDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
