import { Module } from '@nestjs/common';
import { SecuritiesController } from './securities.controller';
import { DataProcessingService } from '../data-processing/data-processing.service';
import { DataProcessingModule } from '../data-processing/data-processing.module';

@Module({
  controllers: [SecuritiesController],
  providers: [DataProcessingService],
  imports: [DataProcessingModule],
})
export class SecuritiesModule {}