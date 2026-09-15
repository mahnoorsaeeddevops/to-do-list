const express = require('express');
const app = express();
app.use(express.json());

// In-memory storage — an array of task objects.
// Each task: { id, title, done }
let tasks = [];
let nextId = 1;

// POST /tasks — add a new task
// Body: { "title": "Buy groceries" }
app.post('/tasks', (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'title is required and must be a non-empty string' });
  }

  const task = { id: nextId++, title: title.trim(), done: false };
  tasks.push(task);

  res.status(201).json(task);
});

// GET /tasks — list all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// PATCH /tasks/:id/done — mark a task as done
app.patch('/tasks/:id/done', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ error: `no task with id ${id}` });
  }

  task.done = true;
  res.json(task);
});



// DELETE /tasks/:id — remove a task
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `no task with id ${id}` });
  }

  tasks.splice(index, 1);
  res.status(204).send();
});


// Basic root route, mostly so a healthcheck / curl to "/" doesn't 404
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'todo-api' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`todo-api listening on port ${PORT}`);
});

module.exports = app;
