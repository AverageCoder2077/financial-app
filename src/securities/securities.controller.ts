import { Controller, Get, Version, UseGuards } from '@nestjs/common';
import { DataProcessingService } from '../data-processing/data-processing.service';
import { SecurityDto } from './dto/security.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@Controller({
  path: 'securities',
  version: '1',
})
@ApiTags('securities')
@UseGuards(AuthGuard)
@ApiBearerAuth('JWT')
export class SecuritiesController {
  constructor(private readonly dataProcessingService: DataProcessingService) {}

  @Get()
  @ApiOperation({ summary: 'Get all securities' })
  @ApiResponse({ status: 200, description: 'List of securities', type: SecurityDto, isArray: true })
  async findAll(): Promise<SecurityDto[]> {
    return this.dataProcessingService.getSecurities();
  }
}