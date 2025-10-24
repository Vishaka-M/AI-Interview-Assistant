# Backend API Documentation

Base URL: `http://localhost:5000/api`

## Health
- `GET /` (Base, not under `/api`): Returns a plain message indicating the server is running.

## Interviews
Route prefix: `/api/interviews`

### Create Interview
- Method: `POST`
- Path: `/api/interviews`
- Body (JSON):
  - `candidateName` (string, required)
  - `role` (string, required)
  - `language` (string, required)
- Response: `201 Created`
  - Body: Created `Interview` document

Example:
```bash
curl -X POST "http://localhost:5000/api/interviews" \
  -H "Content-Type: application/json" \
  -d '{
    "candidateName": "Varun",
    "role": "Software Intern",
    "language": "en"
  }'
```

### Get Interview
- Method: `GET`
- Path: `/api/interviews/:id`
- Params:
  - `id` (MongoDB ObjectId)
- Responses:
  - `200 OK` with Interview document
  - `404 Not Found` if not found

Example:
```bash
curl "http://localhost:5000/api/interviews/66f123abcde0123456789abc"
```

### End Interview
- Method: `PATCH`
- Path: `/api/interviews/:id/end`
- Note: Route exists, but controller implementation not found in repo snapshot.
- Expected behavior: Mark interview as ended/closed (TBD).

```bash
curl -X PATCH "http://localhost:5000/api/interviews/66f123abcde0123456789abc/end"
```

## Data Model

### Interview
Fields:
- `candidateName`: string, required
- `role`: string, required
- `language`: string, required
- `createdAt`: date, default now

```json
{
  "_id": "66f123abcde0123456789abc",
  "candidateName": "Varun",
  "role": "Software Intern",
  "language": "en",
  "createdAt": "2025-10-24T10:00:00.000Z"
}
```
