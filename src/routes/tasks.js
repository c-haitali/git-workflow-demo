const { Router } = require('express');
const { listTasks, getTask, createTask, deleteTask } = require('../services/taskService');

const router = Router();

const ALLOWED_STATUSES = new Set(['todo', 'in-progress', 'done']);
const ALLOWED_PRIORITIES = new Set(['low', 'medium', 'high']);

router.get('/api/tasks', (req, res) => {
  const { status } = req.query;
  if (status && !ALLOWED_STATUSES.has(status)) {
    return res.status(400).json({ error: 'Invalid status filter' });
  }
  const items = listTasks(status);
  res.json({ items, count: items.length });
});

router.get('/api/tasks/:taskId', (req, res) => {
  const taskId = parseInt(req.params.taskId, 10);
  const task = getTask(taskId);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

router.post('/api/tasks', (req, res) => {
  const payload = req.body || {};
  const missingFields = ['title', 'owner', 'status', 'priority'].filter(f => !payload[f]);
  if (missingFields.length) {
    return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
  }
  if (!ALLOWED_STATUSES.has(payload.status)) {
    return res.status(400).json({ error: 'Status must be todo, in-progress, or done' });
  }
  if (!ALLOWED_PRIORITIES.has(payload.priority)) {
    return res.status(400).json({ error: 'Priority must be low, medium, or high' });
  }
  const task = createTask(payload);
  res.status(201).json(task);
});

router.delete('/api/tasks/:taskId', (req, res) => {
  const taskId = parseInt(req.params.taskId, 10);
  if (!deleteTask(taskId)) return res.status(404).json({ error: 'Task not found' });
  res.status(204).send();
});

module.exports = router;
