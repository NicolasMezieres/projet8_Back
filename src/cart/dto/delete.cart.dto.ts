import { IsNotEmpty, IsUUID } from 'class-validator';

export class deleteCartDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
