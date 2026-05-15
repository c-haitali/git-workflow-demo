const request = require('supertest');
const { createApp } = require('../src/app');
const { resetTasks } = require('../src/services/taskService');

let app;

beforeEach(() => {
  resetTasks();
  app = createApp();
});

test('health check returns ok', async () => {
  const res = await request(app).get('/api/health');
  expect(res.status).toBe(200);
  expect(res.body).toEqual({ status: 'ok' });
});

test('root route documents available apis', async () => {
  const res = await request(app).get('/');
  expect(res.status).toBe(200);
  expect(res.body).toEqual({
    message: 'Sprint 3 demo task API',
    apis: [
      'GET /api/health',
      'GET /api/tasks',
      'GET /api/tasks/<task_id>',
      'POST /api/tasks',
    ],
    docs: '/docs',
    openapi: '/openapi.json',
  });
});

test('openapi spec is available', async () => {
  const res = await request(app).get('/openapi.json');
  expect(res.status).toBe(200);
  expect(res.body.openapi).toBe('3.0.3');
  expect(res.body.paths).toHaveProperty('/api/tasks');
});

test('docs page is available', async () => {
  const res = await request(app).get('/docs');
  expect(res.status).toBe(200);
  expect(res.text).toContain('swagger-ui');
});

test('get tasks returns seed data', async () => {
  const res = await request(app).get('/api/tasks');
  expect(res.status).toBe(200);
  expect(res.body.count).toBeGreaterThanOrEqual(3);
  expect(res.body.items[0].title).toBe('Design login flow');
});

test('get single task returns expected record', async () => {
  const res = await request(app).get('/api/tasks/2');
  expect(res.status).toBe(200);
  expect(res.body.owner).toBe('Rohan');
});

test('create task adds new task', async () => {
  const res = await request(app)
    .post('/api/tasks')
    .send({ title: 'Prepare sprint demo deck', owner: 'Chaitali', status: 'todo', priority: 'high' });
  expect(res.status).toBe(201);
  expect(res.body.title).toBe('Prepare sprint demo deck');
});


test('create task rejects invalid payload', async () => {
  const res = await request(app)
    .post('/api/tasks')
    .send({ title: 'Incomplete payload', owner: 'Chaitali', status: 'blocked' });
  expect(res.status).toBe(400);
  expect(res.body).toHaveProperty('error');
});
