# AI-Assisted Git Workflow

This guide walks through how a developer named Aarav adds a Delete Task API feature using an AI-assisted Git workflow, and how reviewer Priya reviews and merges it — all from the terminal.

---

# Developer Side — Aarav

## Step 1: Clone the Project

Aarav starts by cloning the repository to his local machine.

```bash
git clone <repo-url>
cd repo-name
```

---

## Step 2: Create a CLAUDE.md File

Before doing anything else, Aarav creates a `CLAUDE.md` file in the root directory. This file tells Claude how to behave in this project — commit format, code conventions, and any project-specific rules.

Add the following content to `CLAUDE.md`:

```markdown
## Commit Format

All commits must use the conventional commit format:

<type>: <short description>

Types: feat, fix, docs, chore, refactor, test

Examples:
- feat: add pagination to GET /api/tasks
- fix: return 404 when task_id is negative
- test: add edge case coverage for createTask
- refactor: extract status validation into helper
- docs: update OpenAPI spec for health endpoint
- chore: bump express to 5.x

## Code Guidelines

- Always validate request parameters before processing
- Return appropriate HTTP status codes (400 for bad input, 404 for not found)
- Keep route handlers thin — move logic into service files
- Match parameter names consistently across routes and OpenAPI spec
```

---

## Step 3: Use Claude to Implement the Feature

Rather than writing the code from scratch, Aarav asks Claude to implement the Delete Task API.

Arav Open Claude CLI in project directory and ask this:

```bash
Add a DELETE /api/tasks/:taskId endpoint. It should remove the task by ID, return 404 if the task does not exist, and return 400 for invalid IDs. Add the route in routes/tasks.js and the logic in services/taskService.js. Also update the OpenAPI spec.
```

Claude reads the existing codebase, follows the patterns already in place, and generates the changes across the relevant files.

---

## Step 4: AI-Assisted Code Review Before Commit

Before committing, Aarav asks Claude to review what was just generated.

```bash
git diff --staged | claude review
```

Claude checks:
- API naming conventions
- Error handling
- Validation issues
- Security concerns
- Missing edge cases

---

## Step 5: Generating a Conventional Commit

Now Aarav asks Claude to generate a proper commit message based on the staged changes.

```bash
claude commit
```

Claude suggests:

```
feat: add DELETE /api/tasks/:taskId endpoint
```

Aarav approves the commit.

---

## Step 6: Create a Feature Branch and Push

Aarav moves the changes to a feature branch and pushes it.

```bash
git checkout -b feat/delete-task-api
git push -u origin feat/delete-task-api
```

---

## Step 7: Create a Pull Request from the Terminal

Without opening GitHub in a browser, Aarav creates the PR directly from the CLI.

```bash
gh pr create --base main --fill
```

The PR is now ready for review.

---

# Reviewer Side — Priya

Priya is responsible for reviewing all backend API changes.

---

## Step 8: Checkout the PR

Priya checks out the PR locally.

```bash
gh pr checkout 1
```

---

## Step 9: AI-Assisted PR Review

Instead of reading through every line manually, Priya pipes the PR diff into Claude.

```bash
gh pr diff 1 | claude review
```

Claude generates a structured review covering:
- Validation checks
- Security risks
- Code quality
- Test coverage
- API consistency

Claude identifies:

> "OpenAPI parameter name mismatch detected."

---

## Step 10: Post a Review Comment

Priya posts the issue directly from the terminal.

```bash
gh pr review --comment -b "Fix OpenAPI parameter mismatch in tasks API"
```

The PR goes back to Aarav.

---

# Developer Resolving Review Comments

## Step 11: Read the Review Feedback

Aarav fetches all review comments.

```bash
gh pr view 1 --json comments,reviews
```

He identifies the issue raised by Priya.

---

## Step 12: Fix the Issue Using Claude

Aarav asks Claude to fix the mismatch.

```bash
Fix the OpenAPI parameter name mismatch in the tasks API — align the spec parameter name with the route parameter name
```

Then he stages and reviews the fix.

```bash
git add .
git diff --staged | claude review
```

Claude confirms:

> "Review is clean."

---

## Step 13: Commit and Push the Fix

```bash
claude commit
git push
```

---

## Step 14: Reply to the Reviewer

Aarav lets Priya know the fix is in.

```bash
gh pr review --comment -b "@priya issue fixed"
```

---

# Final Review and Merge

## Step 15: Reviewer Approves the PR

Priya does one final AI-assisted review.

```bash
gh pr diff 1 | claude review
```

Everything looks good. She approves and merges from the terminal.

```bash
gh pr review --approve
gh pr merge --squash
```

---

