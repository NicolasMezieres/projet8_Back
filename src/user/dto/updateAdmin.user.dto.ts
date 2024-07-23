import { IsBoolean, IsNotEmpty, IsUUID } from 'class-validator';

export class updateAdminDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
