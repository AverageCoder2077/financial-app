import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Version,
    Get,
    Request,
    UseGuards,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { Public } from './decorators/public.decorator';
  import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
  import { AuthGuard } from './auth.guard';
  
  
  @Controller({
    path: 'auth',
    version: '1',
  })
  @ApiTags('Authentication') 
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ApiOperation({ summary: 'Login user and get JWT token' })
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          username: { type: 'string', example: 'testuser' },
          password: { type: 'string', example: 'password' },
        },
        required: ['username', 'password'],
      },
    })
    @ApiResponse({
      status: 200,
      description: 'Successfully logged in',
      schema: {
        type: 'object',
        properties: {
          access_token: { type: 'string', example: 'eyJhbGciOiJIUzI1Ni...' },
        },
      },
    })
    @ApiResponse({ status: 401, description: 'Invalid credentials' })
    async signIn(@Body() signInDto: Record<string, any>) {
      return this.authService.signIn(signInDto.username, signInDto.password);
    }
  
    @UseGuards(AuthGuard)
    @Get('profile')
    @ApiOperation({ summary: 'Get user profile (requires JWT)' })
    @ApiBearerAuth('JWT') // Indicate that this route requires JWT authentication
    @ApiResponse({ status: 200, description: 'User profile information' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    getProfile(@Request() req) {
      return req.user;
    }
  }