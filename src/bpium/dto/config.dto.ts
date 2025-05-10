import { IsString, IsUrl } from 'class-validator';

export class BpiumConfigDto {
  @IsUrl()
  BP_DOMAIN: string;

  @IsString()
  BP_LOGIN: string;

  @IsString()
  BP_PASSWORD: string;

  @IsString()
  BP_CATALOG_ID: string;
}
