import { Module } from '@nestjs/common';
import { AdvisorsController } from './advisors.controller';
import { DataProcessingService } from '../data-processing/data-processing.service'; // Import the service
import { DataProcessingModule } from '../data-processing/data-processing.module';

@Module({
  controllers: [AdvisorsController],
  providers: [DataProcessingService],
  imports: [DataProcessingModule]
})
export class AdvisorsModule {}