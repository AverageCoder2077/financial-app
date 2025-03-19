import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdvisorsModule } from './advisors/advisors.module';
import { AccountsModule } from './accounts/accounts.module';
import { SecuritiesModule } from './securities/securities.module';
import { DataProcessingModule } from './data-processing/data-processing.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AdvisorsModule,
    AccountsModule,
    SecuritiesModule,
    DataProcessingModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}