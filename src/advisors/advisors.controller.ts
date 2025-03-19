import { Controller, Get, Version, UseGuards } from '@nestjs/common';
import { DataProcessingService } from '../data-processing/data-processing.service';
import { AdvisorDto } from './dto/advisor.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@Controller({
  path: 'advisors',
  version: '1',
})
@ApiTags('advisors')
@UseGuards(AuthGuard)
@ApiBearerAuth('JWT')
export class AdvisorsController {
  constructor(private readonly dataProcessingService: DataProcessingService) {}

  @Get()
  @ApiOperation({ summary: 'Get all advisors' })
  @ApiResponse({ status: 200, description: 'List of advisors', type: AdvisorDto, isArray: true })
  async findAll(): Promise<AdvisorDto[]> {
    return this.dataProcessingService.getAdvisors();
  }
}