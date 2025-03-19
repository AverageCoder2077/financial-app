import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SecurityDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  ticker: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  dateAdded: string;
}