import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CustodianDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  repId: string;
}

export class AdvisorDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ type: [CustodianDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CustodianDto)
  custodians: CustodianDto[];
}