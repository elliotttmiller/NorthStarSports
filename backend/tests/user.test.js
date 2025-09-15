import request from 'supertest';
import app from '../src/app.js';

describe('User API', () => {
  it('should reject invalid user data', async () => {
    const res = await request(app)
      .post('/api/v1/user/testuser')
      .send({ username: '', email: 'notanemail', balance: -10, depositHistory: [], betHistory: [] });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('should accept valid user data', async () => {
    const res = await request(app)
      .post('/api/v1/user/testuser')
      .send({ username: 'Test', email: 'test@email.com', balance: 100, depositHistory: [], betHistory: [] });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
