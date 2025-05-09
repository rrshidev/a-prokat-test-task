import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateCarDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
