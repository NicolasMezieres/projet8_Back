import { IsNotEmpty, IsUUID } from 'class-validator';

export class buyCartDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
