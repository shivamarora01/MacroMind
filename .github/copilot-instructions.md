# MacroMind AI Agent Instructions

## Project Overview
**MacroMind** is a Next.js macro tracking application that helps users monitor daily nutrition intake against personal goals. It uses MongoDB for persistence with a referencing (denormalization) approach across separate collections for macros, goals, and user data.

## Architecture

### Tech Stack
- **Frontend**: Next.js 16 with React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes with Node.js/Express-style handlers
- **Database**: MongoDB with Mongoose ODM
- **Auth**: JWT tokens stored in cookies
- **AI Integration**: OpenAI API (see `app/api/ai/nutrition/route.js`)

### Project Structure
```
app/api/          # Route handlers (goals, macros, login, register, AI endpoints)
app/macros/       # User-facing pages (today, month, goals, AI, progress)
lib/              # Shared utilities (DB connection, auth, error handling, wrappers)
models/           # Mongoose schemas (Macros, Goal, Register, Workout)
components/       # React components (MacroProgress.tsx, childish.jsx)
public/           # Static assets
middleware.js     # Auth middleware for protected routes
```

### Database Schema Patterns
- **Macros collection**: Stores daily food entries with aggregated totals and embedded `foods` array
  - Date format: `"YYYY-MM-DD"` (string, not Date object) for easy querying with regex
  - Includes computed fields: `calories`, `protein`, `carbs`, `fat`, `sugar`, `caffeine`
  - Each macro doc contains a `foods` array with individual food items
- **Goal collection**: Single document per user with macro targets (denormalized for simplicity)
- **Referencing approach**: Collections don't use Mongoose refs; relationships are maintained via IDs in request body/response

## Critical Developer Workflows

### Running the Application
```bash
npm run dev        # Start dev server (port 3000)
npm run build      # Compile Next.js
npm start          # Start production server
npm run lint       # Run ESLint
```

### Database Connection
- Handled by `lib/connectDB.js`: exports `connectDB()` async function
- Must be called at start of every route handler
- Uses MongoDB URI from `process.env.MONGODB_URI`
- Checks `mongoose.connection.readyState === 1` to avoid duplicate connections

### API Route Pattern
All route files follow this structure (see `app/api/macros/month/route.js`):
```javascript
export const GET = withErrorWrapper(
  verifyAuth(async (request) => {
    await connectDB();
    // route logic
    return Response.json(data);
  })
);
```

## Code Patterns & Conventions

### Error Handling Pattern
- Use `withErrorWrapper()` from `lib/withErrorWrapper.js` to wrap route handlers
- Throw custom `APIError` (from `lib/APIError.js`) with HTTP status code
- Wrapper catches errors and formats via `errorResponse()` utility
- Example: `throw new APIError("Not found", 404);`

### Authentication Pattern
- Use `verifyAuth()` wrapper around route handler (see `lib/verifyAuth.js`)
- Currently disabled (commented out) but structure is in place
- Token extracted from cookies, verified with JWT secret
- Decoded user attached to request object

### Wrapper Composition
Middleware wrappers stack: `withErrorWrapper(verifyAuth(async (request) => {...}))`
- Outer wrapper (error) catches all errors from inner handler
- Inner wrapper (auth) verifies token, then calls handler
- Wrappers are higher-order functions returning async functions

### Date Handling
- **Macros**: Store as `"YYYY-MM-DD"` strings (extracted via `.toISOString().slice(0, 10)`)
- **Query pattern**: Use regex `{ $regex: "^prefix" }` to find macros for a month
- **Food timestamps**: Store individual consumption times as ISO Date objects in `foods` array

### API Route File Naming
- Route handler files are always `route.js` or `route.ts` (in Next.js App Router)
- Path structure: `app/api/[feature]/[sub-feature]/route.js` maps to `/api/[feature]/[sub-feature]`
- Example: `app/api/macros/today/route.js` → `GET|POST /api/macros/today`

### Import Path Conventions
- Use relative paths from route file location (e.g., `../../../../lib/connectDB`)
- **Or** use path alias `@/` for files at workspace root (e.g., `@/lib/connectDB`)
- TypeScript config defines: `"@/*": ["./*"]`

## Integration Points

### Frontend → Backend Communication
- Fetch calls from React components to `/api/*` endpoints
- Pass `consumedAt` as ISO timestamp string
- All requests include `Content-Type: application/json`
- Example: `app/macros/goals/page.tsx` fetches `/api/goals`

### Macro Entry Flow
1. User submits food via form (name, calories, macros, `consumedAt`)
2. POST to `/api/macros/new`
3. Route extracts date from `consumedAt`, queries for existing day
4. If exists: appends to `foods` array and updates totals
5. If new: creates document with `foods: [foodItem]`

### Authentication Flow (Currently Disabled)
- Middleware redirects unauthenticated requests from protected routes to `/login`
- Protected routes defined in `middleware.js` config matcher
- JWT token stored in cookie after login

## Project-Specific Conventions

### Naming
- Component files: PascalCase (e.g., `MacroProgress.tsx`)
- Route files: always `route.js` or `route.ts`
- Model files: lowercase (e.g., `macros.ts`, `goals.ts`)
- Variables holding form state: singular noun matching field (e.g., `goals`, `message`)

### TypeScript Usage
- Models and components use TypeScript (`.ts`, `.tsx`)
- Route handlers and utilities use JavaScript (`.js`)
- Type definitions co-located in component files (see `page.tsx` types)

### Reusable Components
- Keep UI patterns DRY: see `NumberInput` component in `app/macros/goals/page.tsx`
- Pass state/setState via props for form control

### Error Response Format
- Handled by `lib/errorResponse.js`
- Returns JSON with error message and status code

## Known Limitations & Workarounds

### Aggregation Pattern
- Totals are **computed on write**: when a food is added, route handler updates `calories`, `protein`, etc.
- This avoids expensive aggregation queries but requires careful updates
- If updating/deleting foods, recalculate totals manually

### Auth Middleware
- Currently disabled in `verifyAuth.js` (token checks commented out)
- Middleware in `middleware.js` redirects to `/login` but token verification needs enablement

### AI Integration
- OpenAI API integrated in `app/api/ai/nutrition/route.js` (details TBD—check implementation)

## When Adding New Features

1. **Database operation**: Always call `await connectDB()` first
2. **Error handling**: Wrap route handlers with `withErrorWrapper()`
3. **Auth**: Add `verifyAuth()` wrapper if user-specific data
4. **Date queries**: Use `"YYYY-MM-DD"` string format with regex for month/day filtering
5. **Imports**: Prefer path aliases (`@/lib/...`) for cleaner paths
6. **Frontend fetch**: Include proper headers and error handling (see `app/macros/goals/page.tsx` pattern)
