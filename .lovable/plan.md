# Phase 10 — Wire Foundry to Lovable Cloud

Scope note: replaces the Java/Spring/EC2/Mongo/S3/Docker stack with the Lovable-native equivalents (Supabase Postgres, Supabase Auth, Supabase Storage, TanStack Start server functions). Same capabilities, actually runnable in this environment.

Because Foundry already has ~28 UI surfaces backed by placeholder data, converting all of them in one shot would be a huge, risky change. I'll ship it in **4 stages** and stop between each so you can review.

---

## Stage 1 — Foundation (this turn)

1. Enable Lovable Cloud.
2. Migration: create the core schema + RLS + grants.
   - `app_role` enum: `owner | admin | manager | developer | designer | viewer | guest`
   - `profiles` (id → auth.users, username, display_name, avatar_url, bio, timezone, created_at)
   - `user_roles` (user_id, role, workspace_id) + `has_role()` security-definer fn
   - Trigger: auto-create profile row on signup
   - `workspaces`, `workspace_members`
   - `projects`, `project_members`
   - Storage bucket: `avatars` (public), `attachments` (private)
3. Wire real auth: replace the mock `/login` and `/register` submits with `supabase.auth.signInWithPassword` / `signUp`, add Google OAuth via the Lovable broker, add `/reset-password` route, wire `/forgot-password`.
4. Managed `_authenticated/route.tsx` gate + move `dashboard`, `projects`, `settings`, `ai`, `team`, `discussions`, `notifications`, `activity`, `workspace` under it.
5. Root `onAuthStateChange` listener + sign-out hygiene in Topbar/Sidebar.
6. `useCurrentUser` / `useProfile` hooks driven by real session.

## Stage 2 — Workspaces, Projects, Members

- Server fns + TanStack Query for: list/create/update/delete workspaces & projects; invite/remove members; role assignment.
- Rewire `src/routes/workspace.tsx`, `projects.tsx`, `projects.$projectId.tsx`, `settings > Members/Roles/Workspace` to real data.
- Keep placeholder data as fallback only for empty states.

## Stage 3 — Tasks, Boards, Sprints, Docs, Comments

- Tables: `boards`, `sprints`, `epics`, `labels`, `tasks`, `subtasks`, `task_labels`, `documents`, `document_versions`, `comments`, `reactions`.
- Server fns for CRUD + reorder (Kanban drag → position column).
- Rewire Kanban, Backlog, Calendar, Roadmap, Docs workspace, Comments panel.
- File uploads (attachments, doc images) via Supabase Storage signed URLs.

## Stage 4 — Notifications, Activity, Discussions, Realtime, Settings polish

- Tables: `notifications`, `activities`, `discussions`, `discussion_replies`, `channels`, `messages`, `audit_logs`, `api_keys`, `ai_history`, `settings_prefs`.
- Realtime channels for notifications, comments, task moves, presence, chat.
- Wire NotificationCenter, ActivityDock, Discussions, Chat, Audit Logs, API Keys, User Preferences.
- AI history persistence for the AI Workspace (chat, generators). Actual LLM calls remain stubbed until you say otherwise.

---

## Explicitly out of scope

- Java Spring Boot code, Dockerfiles, docker-compose, GitHub Actions, EC2/S3/Nginx setup — none of that runs in this environment. (If you later want a Spring codebase as a portfolio artifact, that's a separate task and I'd scaffold it as downloadable files, not wire it up.)
- Real LLM calls (needs Lovable AI Gateway wire-up — happy to do it in a follow-up).
- The "AI Project Architect", "Insights Dashboard v2", and "Timeline Replay" flagship features — worth their own phase after the data layer is real.

---

## Technical notes

- Stack: TanStack Start server fns for app-internal reads/writes; `requireSupabaseAuth` middleware for user-scoped fns; `supabaseAdmin` only for privileged ops (role grants, admin API).
- Roles live in the separate `user_roles` table (never on `profiles`) with a `has_role(uuid, app_role)` SECURITY DEFINER fn — required to avoid recursive RLS.
- Every `public.*` table gets explicit `GRANT`s to `authenticated` + `service_role` in the same migration.
- Public routes (landing, `/login`, `/register`, `/forgot-password`, `/reset-password`, `/auth/callback`) stay at top level; everything else moves under `_authenticated/`.
- OAuth `redirect_uri` = `window.location.origin` (public route), which then routes to the intended app destination after session hydration.

---

**Proceeding will execute Stage 1 only.** Approve to start, or tell me which stage to reorder / drop.