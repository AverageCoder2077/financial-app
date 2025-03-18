import { Controller, Get, Version, UseGuards } from '@nestjs/common';
import { DataProcessingService } from '../data-processing/data-processing.service';
import { AccountDto } from './dto/account.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@Controller({
  path: 'accounts',
  version: '1',
})
@ApiTags('accounts')
@UseGuards(AuthGuard)
@ApiBearerAuth('JWT')
export class AccountsController {
  constructor(private readonly dataProcessingService: DataProcessingService) {}

  @Get()
  @ApiOperation({ summary: 'Get all accounts' })
  @ApiResponse({ status: 200, description: 'List of accounts', type: AccountDto, isArray: true })
  async findAll(): Promise<AccountDto[]> {
    return this.dataProcessingService.getAccounts();
  }
}