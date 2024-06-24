import { Test } from '@nestjs/testing';
import { HealthCheckController } from './health-check.controller';
import { HttpStatus, INestApplication } from '@nestjs/common';
import supertest from 'supertest';

describe('HealthCheckController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [HealthCheckController],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api/health-check should return server running message', async () => {
    const response = await supertest(app.getHttpServer()).get(
      '/api/health-check',
    );

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toEqual({
      statusCode: HttpStatus.OK,
      message: 'The server is running',
    });
  });
});
