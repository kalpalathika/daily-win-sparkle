# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Daily Wins Tracker** application - a React-based web app that allows users to track their daily wins/achievements with a gamified experience including streaks, confetti celebrations, and motivational messages. Users can authenticate via Google OAuth or email/password and their wins are persisted in a Supabase database.

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: shadcn/ui components (Radix UI primitives)
- **Styling**: Tailwind CSS with custom CSS variables
- **Backend**: Supabase (authentication + database)
- **State Management**: React Query (@tanstack/react-query) for server state
- **Routing**: React Router DOM
- **Form Handling**: React Hook Form with Zod validation
- **Deployment**: Lovable platform integration

## Development Commands

### Core Development
```bash
npm run dev          # Start development server on port 8080
npm run build        # Production build
npm run build:dev    # Development build
npm run preview      # Preview production build locally
npm run lint         # Run ESLint for code quality
```

### Package Management
```bash
npm install          # Install dependencies
```

Note: This project uses npm (package-lock.json present) and also has bun.lockb, but npm is the primary package manager.

## Architecture Overview

### Application Structure
- **Single Page Application** with client-side routing
- **Authentication-first flow**: Unauthenticated users are redirected to `/auth`
- **Main functionality**: Win tracking with real-time updates via React Query

### Key Application Flow
1. **Authentication Check** (`src/hooks/useAuth.tsx`): Manages user session state
2. **Protected Route** (`src/pages/Index.tsx`): Main dashboard for authenticated users
3. **Win Management** (`src/hooks/useWins.tsx`): Handles CRUD operations for wins
4. **Celebration System** (`src/utils/confetti.ts`): Triggers confetti and motivational messages

### Directory Structure
```
src/
├── components/           # React components
│   ├── ui/              # shadcn/ui components (auto-generated)
│   ├── WinInput.tsx     # Win entry form
│   ├── WinHistory.tsx   # Display list of wins
│   └── MotivationalMessage.tsx
├── hooks/               # Custom React hooks
│   ├── useAuth.tsx      # Authentication state management
│   ├── useWins.tsx      # Win data management
│   └── useLocalStorage.ts
├── pages/               # Route components
│   ├── Index.tsx        # Main dashboard (protected)
│   ├── Auth.tsx         # Login/signup page
│   └── NotFound.tsx
├── integrations/
│   └── supabase/        # Supabase client and types
└── utils/               # Utility functions
```

### Database Schema (Supabase)
- **wins table**: Stores user wins with `user_id`, `text`, `date`, `created_at`
- **Authentication**: Managed by Supabase Auth (Google OAuth + email/password)

### State Management Pattern
- **Server State**: React Query for API calls and caching
- **Authentication State**: Context API (`useAuth`)
- **Local State**: React hooks for component-specific state

## Component Architecture

### Core Components
- **AuthProvider**: Wraps the app to provide authentication context
- **WinInput**: Form component for adding new wins (with confetti trigger)
- **WinHistory**: Displays wins list and streak calculation
- **MotivationalMessage**: Shows celebration messages after win submission

### UI Components
This project uses **shadcn/ui** components extensively. All UI components are in `src/components/ui/` and follow the shadcn/ui patterns:
- Components use `class-variance-authority` for style variants
- Tailwind CSS with CSS variables for theming
- Custom theme colors: `celebration`, `sunshine`, `sidebar` variants

## Development Patterns

### Authentication Pattern
```typescript
// Always check authentication state before rendering main content
const { user, loading } = useAuth();
if (!loading && !user) {
  return <Navigate to="/auth" replace />;
}
```

### Data Fetching Pattern
```typescript
// Use React Query for server state, custom hooks for data logic
const { wins, addWin, calculateStreak } = useWins();
```

### Error Handling
- Toast notifications for user-facing errors (`useToast` hook)
- Error boundaries not implemented - errors surface through toast system

## Configuration Notes

### Important Files
- **vite.config.ts**: Custom alias `@/` → `src/`, port 8080, lovable-tagger for development
- **components.json**: shadcn/ui configuration with path aliases
- **tailwind.config.ts**: Custom color system with CSS variables, gradients, animations
- **tsconfig.json**: Relaxed TypeScript settings (noImplicitAny: false)

### Environment
- **Supabase credentials**: Hardcoded in `src/integrations/supabase/client.ts`
- **Development port**: 8080 (configured in vite.config.ts)
- **Build modes**: Supports both development and production builds

## Testing

No test framework is currently configured in this project. The package.json does not include any test scripts or testing dependencies.

## Database Migrations

Supabase migrations are located in `supabase/migrations/` directory. The project uses Supabase CLI for database schema management.