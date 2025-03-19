import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { AuthService } from '../src/auth/auth.service';
import { UsersService } from '../src/users/users.service';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let authService: AuthService;
  let usersService: UsersService;
  let accessToken: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    authService = moduleFixture.get<AuthService>(AuthService);
    usersService = moduleFixture.get<UsersService>(UsersService);

    const testUser = await usersService.findOne('testuser');
    if (testUser) {
      const tokenObject = await authService.signIn(testUser.username, 'password');
      accessToken = tokenObject.access_token;
    }
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/v1/auth/profile (GET) - Protected Route', () => {
    return request(app.getHttpServer())
      .get('/v1/auth/profile')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });

  it('/v1/advisors (GET) - Protected Route', () => {
    return request(app.getHttpServer())
      .get('/v1/advisors')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });

  it('/v1/accounts (GET) - Protected Route', () => {
    return request(app.getHttpServer())
      .get('/v1/accounts')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });

  it('/v1/securities (GET) - Protected Route', () => {
    return request(app.getHttpServer())
      .get('/v1/securities')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });

  it('/v1/stats/total-account-value (GET) - Protected Route', () => {
    return request(app.getHttpServer())
      .get('/v1/stats/total-account-value')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });

  it('/v1/stats/top-securities (GET) - Protected Route', () => {
    return request(app.getHttpServer())
      .get('/v1/stats/top-securities')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });

  it('/v1/stats/custodian-distribution (GET) - Protected Route', () => {
    return request(app.getHttpServer())
      .get('/v1/stats/custodian-distribution')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });

  it('/v1/auth/login (POST) - Public Route', () => {
    return request(app.getHttpServer())
      .post('/v1/auth/login')
      .send({ username: 'testuser', password: 'password' })
      .expect(200);
  });

  it('/v1/advisors (GET) - Unauthorized with invalid token', () => {
    return request(app.getHttpServer())
      .get('/v1/advisors')
      .set('Authorization', 'Bearer invalid_token')
      .expect(401);
  });

  it('/v1/accounts (GET) - Unauthorized with missing token', () => {
    return request(app.getHttpServer())
      .get('/v1/accounts')
      .expect(401);
  });

  it('/v1/stats/total-account-value (GET) - Unauthorized with expired token', async () => {
    const expiredToken = await authService.signIn('testuser', 'password', { expiresIn: '1ms' });
    await new Promise(resolve => setTimeout(resolve, 5));

    return request(app.getHttpServer())
      .get('/v1/stats/total-account-value')
      .set('Authorization', `Bearer ${expiredToken.access_token}`)
      .expect(401);
  });

  it('/v1/auth/login (POST) - Unauthorized with invalid credentials', () => {
    return request(app.getHttpServer())
      .post('/v1/auth/login')
      .send({ username: 'testuser', password: 'wrong_password' })
      .expect(401);
  });
});