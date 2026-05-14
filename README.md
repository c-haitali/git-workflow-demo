# Sprint 3 Demo API

A Node.js/Express task-management API for listing, fetching, and creating sprint tasks.

## Project Structure

```text
sprint3-git-workflow-demo/
├── README.md
├── package.json
├── src/
│   ├── app.js
│   ├── routes/
│   │   ├── index.js
│   │   └── tasks.js
│   └── services/
│       └── taskService.js
└── tests/
    └── app.test.js
```

## Setup

Move into the project directory:

```bash
cd "Sprint3-git-workflow-demo"
```

Install dependencies:

```bash
npm install
```

## Run the Application

```bash
npm start
```

The application will be available at:

```text
http://127.0.0.1:3000
```

Interactive API documentation (Swagger UI):

```text
http://127.0.0.1:3000/docs
```

Raw OpenAPI specification:

```text
http://127.0.0.1:3000/openapi.json
```

## Available APIs

### 1. Get API Info

```http
GET /
```

### 2. Get All Tasks

```http
GET /api/tasks
```

Optional query parameter:

```http
GET /api/tasks?status=todo
```

### 3. Get a Single Task

```http
GET /api/tasks/1
```

### 4. Create a Task

```http
POST /api/tasks
Content-Type: application/json
```

Example request body:

```json
{
  "title": "Prepare sprint demo deck",
  "owner": "Priya",
  "status": "todo",
  "priority": "high"
}
```

## Example cURL Commands

```bash
curl http://127.0.0.1:3000/
curl http://127.0.0.1:3000/openapi.json
curl http://127.0.0.1:3000/api/tasks
curl http://127.0.0.1:3000/api/tasks/1
curl -X POST http://127.0.0.1:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Prepare sprint demo deck","owner":"Chaitali","status":"todo","priority":"high"}'
```

## Run Tests

```bash
npm test
```

## Notes

- Allowed `status` values: `todo`, `in-progress`, `done`
- Allowed `priority` values: `low`, `medium`, `high`
- Data is stored in memory for demo purposes
- `/docs` uses Swagger UI from a CDN, so your browser needs internet access for the interactive page to render
