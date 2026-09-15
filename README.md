# To-Do List API

A minimal to-do list API with in-memory storage, built with Node.js and Express.

## Running it

### Locally (without Docker)

```bash
npm install
npm start
```

The server starts on `http://localhost:3000`.

### With Docker

```bash
docker build -t todo-api .
docker run -p 3000:3000 todo-api
```

The API is then available at `http://localhost:3000`.

## Endpoints

### `POST /tasks`
Adds a new task.

Request body:
```json
{ "title": "Buy groceries" }
```

Response (`201 Created`):
```json
{ "id": 1, "title": "Buy groceries", "done": false }
```

### `GET /tasks`
Lists all tasks.

Response (`200 OK`):
```json
[
  { "id": 1, "title": "Buy groceries", "done": false }
]
```

### `PATCH /tasks/:id/done`
Marks a task as done.

Response (`200 OK`):
```json
{ "id": 1, "title": "Buy groceries", "done": true }
```

Returns `404` if no task with that id exists.

## Example usage

```bash
curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"title":"Buy groceries"}'
curl http://localhost:3000/tasks
curl -X PATCH http://localhost:3000/tasks/1/done
```

## Reflection


Trickiest part: Getting used to the Docker development loop editing code doesn't update a running container, since images are snapshots. I had to rebuild and restart the container after every change before retesting.

Why I made these choices: In-memory storage since no database was required, and Express because it keeps routing simple and readable. I copy package.json before the source code in the Dockerfile so the npm install layer stays cached across rebuilds.

What I'd improve with another day: Add automated tests and run them in the CI workflow before the Docker build, add a /health endpoint with a Docker HEALTHCHECK, and swap the in-memory array for SQLite so data survives a restart
