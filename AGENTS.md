# AGENTS.md

## Overview

This document provides guidelines for agentic coding agents operating in this repository.

---

## Build/Lint/Tests Commands

### Install Dependencies
```bash
npm install
```

### Build
```bash
npm run build
```

### Development Server
```bash
npm run dev
```

### Linting
```bash
npm run lint
```

### Running Tests

#### Run All Tests
```bash
npm test
```

#### Run a Single Test File
```bash
npm test -- path/to/test-file.test.js
npm test -- --testPathPattern="test-file"
```

#### Run Tests in Watch Mode
```bash
npm test -- --watch
```

#### Run Tests with Coverage
```bash
npm test -- --coverage
```

---

## Code Style Guidelines

### General Principles

- Keep files small and focused (under 300 lines when possible)
- Write self-documenting code with clear variable/function names
- Extract复用 logic into reusable utilities
- Avoid magic numbers - use named constants

### Imports

- Group imports in the following order:
  1. External libraries (React, Redux, etc.)
  2. Internal packages/modules
  3. Relative imports (local components/utils)
- Sort alphabetically within each group
- Use absolute imports when configured (e.g., `@components/Button`)

```javascript
// Good
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { formatDate } from '@/utils/date';
import Button from '@/components/Button';
import { UserCard } from './UserCard';

// Avoid
import React from 'react';
import Button from './Button';
import { useSelector } from 'react-redux';
import { formatDate } from '../utils/date';
```

### Formatting

- Use Prettier for code formatting (configured in `.prettierrc`)
- Run formatting before commits: `npm run format`
- Use 2 spaces for indentation
- Use single quotes for strings
- Add trailing commas where valid

### Types

- Use TypeScript for all new code
- Define explicit types for props, state, and function return values
- Avoid `any` - use `unknown` when type is truly uncertain

```typescript
// Good
interface UserProps {
  id: number;
  name: string;
  email: string;
  isActive?: boolean;
}

const UserCard: React.FC<UserProps> = ({ id, name, email, isActive = true }) => {
  return <div>{name}</div>;
};

// Avoid
const UserCard = (props: any) => {
  return <div>{props.name}</div>;
};
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `UserProfile`, `Button` |
| Functions/variables | camelCase | `getUserData`, `isLoading` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT` |
| Files (components) | PascalCase | `UserProfile.tsx` |
| Files (utils/hooks) | camelCase | `useAuth.ts`, `formatDate.ts` |
| CSS classes | kebab-case | `.user-profile-card` |

### Error Handling

- Always use try-catch for async operations
- Provide meaningful error messages with context
- Handle errors at the appropriate level (don't catch just to log)

```typescript
// Good
async function fetchUser(id: string): Promise<User> {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw new Error(`User with id ${id} not found`);
    }
    throw new Error('Failed to fetch user');
  }
}

// Avoid
async function fetchUser(id: string): Promise<User> {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
```

### React Best Practices

- Use functional components with hooks
- Memoize expensive computations with `useMemo` and `useCallback`
- Keep component state minimal - derive state when possible
- Extract custom hooks for复用 logic

```typescript
// Good - derived state
const [users, setUsers] = useState<User[]>([]);
const activeUsers = users.filter(u => u.isActive);

// Bad - redundant derived state
const [users, setUsers] = useState<User[]>([]);
const [activeUsers, setActiveUsers] = useState<User[]>([]);
```

---

## Cursor Rules

> No Cursor rules found in `.cursor/rules/` or `.cursorrules`

---

## Copilot Instructions

> No Copilot instructions found in `.github/copilot-instructions.md`

---

## Additional Notes

- Always run lint and tests before submitting PRs
- Follow existing patterns in the codebase
- Ask for clarification when requirements are unclear
