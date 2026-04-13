# AGENTS.md

## Purpose

Shared operating context for future sessions and agents working in this repository.

## Hard Rules

- If there is uncertainty in implementation choice, stop and ask the user before proceeding.
- Prefer official and current documentation for technical decisions (Expo docs, React Native docs, API contract).
- Do not restore Expo starter/demo code.
- Keep architecture simple and production-like.

## Stack

- Expo SDK 54
- React Native + Expo Router
- TypeScript
- React Query for server state
- MobX for UI state
- Manrope font via `@expo-google-fonts/manrope` + `expo-font`

## Data/API

- Base URL: `https://k8s.mectest.ru/test-app`
- Auth: `Authorization: Bearer <UUID>`
- Feed: `GET /posts` with cursor pagination (`cursor`, `nextCursor`, `hasMore`)
- Tier filter: `tier=free|paid`
- Error simulation: `simulate_error=true`

## Current Implementation Map

- App shell: `src/app/_layout.tsx`
- Feed screen: `src/app/index.tsx`
- Post detail screen: `src/app/post/[id].tsx`
- Feed card: `src/features/feed/components/post-card.tsx`
- Feed icons: `src/features/feed/components/feed-icons.tsx`
- Query hook: `src/features/feed/hooks/use-feed-query.ts`
- API request: `src/features/feed/api/fetch-posts-page.ts`
- Post detail API/hooks:
  - `src/features/post-detail/api/fetch-post-detail.ts`
  - `src/features/post-detail/api/fetch-post-comments.ts`
  - `src/features/post-detail/hooks/use-post-detail-query.ts`
  - `src/features/post-detail/hooks/use-post-comments-query.ts`
- UI store: `src/features/feed/store/feed-ui-store.ts`
- API client: `src/lib/api-client.ts`
- Tokens: `src/shared/theme/tokens.ts`

## Working Agreements With User

- Temporary hardcoded API token is acceptable for now.
- Visual fidelity is important; design is being implemented in phases.

## Commands

- Install: `npm install`
- Start: `npx expo start`
- Lint: `npm run lint`
- Types: `npx tsc --noEmit`

## Definition Of Done (per phase)

- Lint passes.
- Type check passes.
- No regression in feed loading, pagination, refresh, and error handling.
