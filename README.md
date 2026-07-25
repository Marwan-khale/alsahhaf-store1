# alsahhaf-store — Base Project Scaffold

هذا هيكل المشروع الأساسي فقط، وفقًا للوثائق المعتمدة (Project Structure & Naming
Conventions, Frontend Architecture). لا يحتوي على أي صفحات متجر، أو Firebase
logic، أو Business Logic — فقط البنية والإعداد الأساسي.

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS · shadcn/ui · Zustand ·
TanStack Query · React Hook Form · Zod · Firebase SDK · Framer Motion ·
Lucide React · ESLint + Prettier

## Setup

هذه البيئة لا تملك اتصال إنترنت، لذا لم يتم تشغيل `npm install`. عند تحميل
المشروع محليًا:

```bash
npm install
cp .env.example .env.local   # ثم عبّي قيم Firebase الحقيقية
npm run dev
```

### shadcn/ui

`components.json` معدّ مسبقًا بنفس الـ alias (`@/*`). لإضافة أول مكوّن:

```bash
npx shadcn@latest add button
```

## Folder Structure

```
app/            Pages, layouts, loading/error/not-found UI — no business logic
components/ui/  Reusable, generic UI primitives (shadcn/ui components land here)
features/       Each feature owns its components/hooks/services/types/validation/state/helpers
services/       Application services (Firebase-agnostic business operations)
repositories/   Firebase communication layer only
hooks/          Global reusable React hooks
lib/            Cross-cutting utilities (cn helper, query client)
providers/      App-wide provider wiring
store/          Zustand global state
types/          Shared TypeScript models
utils/          Shared helper functions
constants/      Centralized constant values
config/         Site/SEO/navigation/theme configuration
styles/         Non-global stylesheets (reserved)
public/         Static assets
firebase/       Firebase SDK initialization only
middleware/     Custom middleware modules
docs/           Project documentation
tests/          unit/ integration/ e2e/
```

Every folder currently contains only its structural placeholders — no store
pages, Firebase logic, or business logic has been added, per the current
phase scope.
