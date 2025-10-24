## Data Models

### Interview (`backend/models/interview.js`)

Mongoose model representing an interview.

Schema fields:
- **candidateName**: String, required
- **role**: String, required
- **language**: String, required
- **createdAt**: Date, defaults to `Date.now`

Example document:
```json
{
  "_id": "665f2c...",
  "candidateName": "Varun",
  "role": "Software Intern",
  "language": "en",
  "createdAt": "2025-10-24T12:00:00.000Z"
}
```

Usage in controllers:
```js
import Interview from "../models/Interview.js";

const interview = new Interview(req.body);
const saved = await interview.save();

const found = await Interview.findById(req.params.id);
```
