import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { DataProcessingService } from '../data-processing/data-processing.service';
import { DataProcessingModule } from '../data-processing/data-processing.module';

@Module({
  controllers: [AccountsController],
  providers: [DataProcessingService],
  imports: [DataProcessingModule],
})
export class AccountsModule {}