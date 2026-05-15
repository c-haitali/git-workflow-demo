const SEED = [
  { id: 1, title: 'Design login flow', owner: 'Asha', status: 'in-progress', priority: 'high' },
  { id: 2, title: 'Build dashboard widgets', owner: 'Rohan', status: 'todo', priority: 'medium' },
  { id: 3, title: 'Write regression tests', owner: 'Meera', status: 'done', priority: 'high' },
];

let _tasks = SEED.map(t => ({ ...t }));

function resetTasks() {
  _tasks = SEED.map(t => ({ ...t }));
}

function listTasks(status) {
  const tasks = _tasks.map(t => ({ ...t }));
  return status ? tasks.filter(t => t.status === status) : tasks;
}

function getTask(taskId) {
  const task = _tasks.find(t => t.id === taskId);
  return task ? { ...task } : null;
}

function createTask(payload) {
  const nextId = _tasks.length > 0 ? Math.max(..._tasks.map(t => t.id)) + 1 : 1;
  const task = {
    id: nextId,
    title: payload.title.trim(),
    owner: payload.owner.trim(),
    status: payload.status,
    priority: payload.priority,
  };
  _tasks.push(task);
  return { ...task };
}

module.exports = { listTasks, getTask, createTask, resetTasks };
