# Copilot Instructions for AI Agents

## Project Overview
- **React + Vite** SPA with Redux Toolkit for state management and React Router for navigation.
- Backend API endpoints are at `http://localhost:4000/api` (see `src/Api/axios.js` and slice files).
- Main app logic is in `src/App.jsx`, with authentication and task management as core features.

## Key Architectural Patterns
- **Redux Slices:**
  - `src/features/authSlice.js`: Handles authentication (login, register, logout, token storage).
  - `src/features/taskslice.jsx`: Handles CRUD for tasks (books), with async thunks for API calls.
  - Store setup in `src/App/store.jsx`.
- **API Integration:**
  - All API calls use Axios, with token-based auth via request interceptor (`src/Api/axios.js`).
  - Use `getAuthConfig(getState)` for manual header setup in slices.
- **Component Structure:**
  - `src/components/`: UI components (Navbar, Login, TaskForm, TaskTable).
  - `App.jsx`: Handles routing, state, and layout. Uses Redux state for auth and tasks.

## Developer Workflows
- **Start Dev Server:**
  - `npm run dev` (Vite, hot reload)
- **Build:**
  - `npm run build`
- **Lint:**
  - `npm run lint` (ESLint, config in `eslint.config.js`)
- **Preview Production Build:**
  - `npm run preview`

## Project-Specific Conventions
- **Token Storage:**
  - Auth token is stored in `localStorage` and Redux state. Always check both for auth.
- **Task Model:**
  - Tasks are called "books" in API, but UI uses "tasks". Fields: `_id`, `title`, `author`/`description`.
- **Error Handling:**
  - Errors are stored in Redux slice state (`error` field) and cleared via slice actions.
- **Protected Routes:**
  - Main dashboard route (`/`) is protected; redirects to `/login` if not authenticated.

## Integration Points
- **Backend:**
  - All CRUD operations for tasks and auth hit `http://localhost:4000/api/books` and `/auth`.
- **Redux:**
  - Use `useSelector` for state, `useDispatch` for actions. Async thunks for API calls.
- **React Router:**
  - Routes defined in `App.jsx`. Use `<Navigate>` for redirects.

## Examples
- To fetch tasks: `dispatch(fetchTasks())` (see `App.jsx` and `taskslice.jsx`).
- To login: `dispatch(loginUser(userData))` (see `Login.jsx` and `authSlice.js`).
- To add/update/delete tasks: Use exported thunks from `taskslice.jsx`.

## References
- Main app: `src/App.jsx`
- Redux store: `src/App/store.jsx`
- Slices: `src/features/authSlice.js`, `src/features/taskslice.jsx`
- API setup: `src/Api/axios.js`
- Components: `src/components/`

---

**Update this file if architectural changes are made.**
