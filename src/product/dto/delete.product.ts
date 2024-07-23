import { IsNotEmpty, IsUUID } from 'class-validator';

export class deleteProductDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
