import { Controller, Get, Version, UseGuards } from '@nestjs/common';
import { DataProcessingService } from './data-processing.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@Controller({
  path: 'stats',
  version: '1',
})
@ApiTags('stats')
@UseGuards(AuthGuard)
@ApiBearerAuth('JWT')
export class DataProcessingController {
  constructor(private readonly dataProcessingService: DataProcessingService) {}

  @Get('total-account-value')
  @ApiOperation({ summary: 'Get the total value of all accounts' })
  @ApiResponse({ status: 200, description: 'Total account value', type: Number })
  getTotalAccountValue() {
    return { totalValue: this.dataProcessingService.getTotalAccountValue() };
  }

  @Get('top-securities')
  @ApiOperation({ summary: 'Get a list of the top securities by total value' })
  @ApiResponse({ status: 200, description: 'Top securities', 
  schema: {
    type: 'object',
    properties: {
      ticker: {type: 'string'},
      totalValue: {type: 'number'},
    },
  },
  examples: { // Provide multiple examples
    success: {
      summary: 'Successful response',
      value: { ticker: "GOOGL",
      totalValue: 50000 },
    },
    error: {
      summary: 'Error response',
      value: { message: 'Data not found', code: 404 },
    },
  }, isArray: true })
  getTopSecurities() {
    return this.dataProcessingService.getTopSecurities();
  }

  @Get('custodian-distribution')
  @ApiOperation({ summary: 'Get the asset distribution across different custodians, broken down by advisor' })
  @ApiResponse({ status: 200, description: 'Custodian asset distribution', type: Object })
  getCustodianAssetDistribution() {
    return this.dataProcessingService.getCustodianAssetDistribution();
  }
}