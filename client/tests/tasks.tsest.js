import request from 'supertest';
import app from '../server.js';
import { describe, it, expect, beforeAll } from '@jest/globals';

describe('Task CRUD Tests', () => {
  let authToken;

  // Login before running tests
  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    authToken = res.body.data.token;
  });

  // Test create task
  it('should create a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Test Task',
        description: 'Test Description',
        status: 'pending'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.task.title).toBe('Test Task');
  });

  // Test get tasks
  it('should fetch all tasks', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data.tasks)).toBe(true);
  });
});
