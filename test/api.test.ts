/* eslint-disable @typescript-eslint/no-loss-of-precision */
import mongoose from 'mongoose';
import app from '../src/app';
import {testServer} from './testServer';
// const app = 'http://localhost:3000';

describe('GET /api/v1', () => {
  beforeAll(async () => {
    if (!process.env.DB_URL) {
      throw new Error('DB_URL is not defined');
    }
    await mongoose.connect(process.env.DB_URL);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // test that server is running
  it('server root should return 200', async () => {
    await testServer(app);
  });
});
