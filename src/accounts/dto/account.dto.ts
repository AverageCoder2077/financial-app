import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class HoldingDto {
  @ApiProperty()
  @IsString()
  ticker: string;

  @ApiProperty()
  @IsNumber()
  units: number;

  @ApiProperty()
  @IsNumber()
  unitPrice: number;
}

export class AccountDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  number: string;

  @ApiProperty()
  @IsString()
  repId: string;

  @ApiProperty({ type: [HoldingDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HoldingDto)
  holdings: HoldingDto[];

  @ApiProperty()
  @IsString()
  custodian: string;
}