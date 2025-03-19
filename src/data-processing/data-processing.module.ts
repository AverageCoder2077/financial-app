import { Module } from '@nestjs/common';
import { DataProcessingService } from './data-processing.service';
import { DataProcessingController } from './data-processing.controller';

@Module({
  controllers: [DataProcessingController],
  providers: [DataProcessingService],
  exports: [DataProcessingService], 
})
export class DataProcessingModule {}