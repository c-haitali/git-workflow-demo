const express = require('express');
const { registerRoutes } = require('./routes');

const OPENAPI_SPEC = {
  openapi: '3.0.3',
  info: {
    title: 'Sprint 3 Demo Task API',
    version: '1.0.0',
    description: 'Simple task-management APIs for a sprint demo project.',
  },
  servers: [{ url: 'http://127.0.0.1:3000' }],
  tags: [
    { name: 'Tasks', description: 'Operations for sprint tasks' },
    { name: 'System', description: 'Health and system endpoints' },
  ],
  paths: {
    '/api/tasks': {
      get: {
        tags: ['Tasks'],
        summary: 'List all tasks',
        parameters: [
          {
            name: 'status',
            in: 'query',
            required: false,
            schema: { type: 'string', enum: ['todo', 'in-progress', 'done'] },
            description: 'Optional task status filter',
          },
        ],
        responses: {
          200: {
            description: 'A list of tasks',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    count: { type: 'integer' },
                    items: { type: 'array', items: { $ref: '#/components/schemas/Task' } },
                  },
                },
              },
            },
          },
          400: {
            description: 'Invalid status filter',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } },
            },
          },
        },
      },
      post: {
        tags: ['Tasks'],
        summary: 'Create a task',
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/CreateTaskRequest' } },
          },
        },
        responses: {
          201: {
            description: 'Created task',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Task' } },
            },
          },
          400: {
            description: 'Validation error',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } },
            },
          },
        },
      },
    },
    '/api/tasks/{task_id}': {
      get: {
        tags: ['Tasks'],
        summary: 'Get a task by id',
        parameters: [
          { name: 'task_id', in: 'path', required: true, schema: { type: 'integer' } },
        ],
        responses: {
          200: {
            description: 'Task details',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Task' } },
            },
          },
          404: {
            description: 'Task not found',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } },
            },
          },
        },
      },
      delete: {
        tags: ['Tasks'],
        summary: 'Delete a task by id',
        parameters: [
          { name: 'task_id', in: 'path', required: true, schema: { type: 'integer' } },
        ],
        responses: {
          204: { description: 'Task deleted' },
          404: {
            description: 'Task not found',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } },
            },
          },
        },
      },
    },
    '/api/health': {
      get: {
        tags: ['System'],
        summary: 'Health check',
        responses: {
          200: {
            description: 'Service is healthy',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { status: { type: 'string', example: 'ok' } },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Task: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          title: { type: 'string', example: 'Prepare sprint demo deck' },
          owner: { type: 'string', example: 'Chaitali' },
          status: { type: 'string', enum: ['todo', 'in-progress', 'done'] },
          priority: { type: 'string', enum: ['low', 'medium', 'high'] },
        },
        required: ['id', 'title', 'owner', 'status', 'priority'],
      },
      CreateTaskRequest: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          owner: { type: 'string' },
          status: { type: 'string', enum: ['todo', 'in-progress', 'done'] },
          priority: { type: 'string', enum: ['low', 'medium', 'high'] },
        },
        required: ['title', 'owner', 'status', 'priority'],
      },
      ErrorResponse: {
        type: 'object',
        properties: { error: { type: 'string' } },
        required: ['error'],
      },
    },
  },
};

const SWAGGER_UI_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Sprint 3 Demo API Docs</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css">
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
    <script>
      window.onload = function () {
        window.ui = SwaggerUIBundle({
          url: "/openapi.json",
          dom_id: "#swagger-ui",
          presets: [SwaggerUIBundle.presets.apis],
        });
      };
    </script>
  </body>
</html>`;

function createApp() {
  const app = express();
  app.use(express.json());

  registerRoutes(app);

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.get('/', (req, res) => {
    res.json({
      message: 'Sprint 3 demo task API',
      apis: [
        'GET /api/health',
        'GET /api/tasks',
        'GET /api/tasks/<task_id>',
        'POST /api/tasks',
        'DELETE /api/tasks/<task_id>',
      ],
      docs: '/docs',
      openapi: '/openapi.json',
    });
  });

  app.get('/openapi.json', (req, res) => {
    res.json(OPENAPI_SPEC);
  });

  app.get('/docs', (req, res) => {
    res.send(SWAGGER_UI_HTML);
  });

  return app;
}

const app = createApp();

if (require.main === module) {
  app.listen(3000, '127.0.0.1', () => {
    console.log('Server running at http://127.0.0.1:3000');
  });
}

module.exports = { createApp, app };
