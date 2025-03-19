import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true, // Makes JwtService available everywhere
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' }, // Adjust expiration time as needed
    }),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard, 
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}