# Architecture Audit Report — alsahhaf-store

**Scope:** `config/`, `constants/`, `firebase/`, `types/`, `features/*/validation/`, `repositories/`, `services/`, root config files.
**Method:** Static review of every implemented file against the approved master project documents (Blueprint, v1.0, v1.1, v1.2). No files were modified as part of this audit.

---

## Overall Health Score: **82 / 100 (GOOD, with fixable violations)**

The layering (types → constants → validation → repositories → services) is respected almost everywhere, and the two hardest architectural rules — "no business logic in repositories" and "no Firebase SDK usage in services" — hold up under inspection. The issues found are concentrated in three places: **client-side timestamps instead of server timestamps**, **a duplicated Firestore converter**, and **one missing npm dependency**. None require a redesign; all are isolated, mechanical fixes.

---

## 1. Architecture Violations

### ⚠️ WARNING — Client-side timestamps instead of Firebase Server Timestamp
**Rule violated:** `DATABASE ARCHITECTURE → TIMESTAMPS`: *"Every document must contain createdAt/updatedAt using Firebase Server Timestamp. Client timestamps are not trusted."*

**Found in:**
- `repositories/ProductRepository.ts` (`softDelete`/`restore`)
- `repositories/CategoryRepository.ts` (`softDelete`/`restore`)
- `repositories/BannerRepository.ts` (`softDelete`/`restore`)
- `repositories/CouponRepository.ts` (`softDelete`/`restore`)
- `services/CouponService.ts` (`expire`)

All five use `new Date().toISOString()` for `deletedAt`/`endDate` instead of Firestore's `serverTimestamp()`. This was a deliberate simplification at the time (to sidestep `FieldValue` vs. domain `Timestamp = string` typing friction), but it directly contradicts the documented rule.

**Recommended fix:** Use `serverTimestamp()` from `firebase/firestore` in these write paths. Since `UpdateData<T>` already permits `FieldValue` for any field (via Firestore's own typing), this requires no change to `types/common.ts` — only to the five call sites above.

---

### ⚠️ WARNING — No document consistently gets `createdAt`/`updatedAt` stamped by the data-access layer
`BaseRepository.create()` and `.update()` accept whatever the caller passes — they never stamp `createdAt`/`updatedAt` themselves. Combined with the finding above, there is currently **no single enforcement point** guaranteeing every write uses a server timestamp. Today this responsibility silently falls to whichever future caller (hook/component) constructs the data — which is exactly the kind of drift the "Server Authority" principle is meant to prevent.

**Recommended fix:** Consider having `BaseRepository.create()`/`.setById()` always inject `createdAt: serverTimestamp(), updatedAt: serverTimestamp()` and `.update()` always inject `updatedAt: serverTimestamp()`, removing the possibility of a caller forgetting to set them. This is a repository-layer (data-access) concern, not business logic, so it would not violate the "no business logic in repositories" rule.

---

### ⚠️ WARNING — `middleware/` folder is inert
`middleware/` exists per the documented structure, but Next.js only activates middleware from a **root-level** `middleware.ts`. No such file exists yet. This isn't wrong for the current phase (no middleware logic was requested), but it's worth flagging so it isn't mistaken for "already wired up."

**Recommended fix:** No action needed until a phase explicitly requires middleware (e.g., admin route protection). At that point, add a root `middleware.ts` that imports from `middleware/`.

---

## 2. Circular Dependencies

**Status: ✅ PASS**

Checked import direction across all layers:
- `types/` → imports only other `types/` files. No outward dependencies. ✅
- `constants/` → imports only other `constants/` files. ✅
- `features/*/validation/` → imports `zod`, `types/`, `constants/` only. Never imports `repositories/` or `services/`. ✅
- `repositories/` → imports `firebase/`, `types/`. Never imports `services/`. ✅
- `services/` → imports `repositories/`, `types/`, `constants/`. Never imports `firebase/*` directly (see §3). ✅

No cycles detected in any direction.

---

## 3. Direct Firebase SDK Usage Outside Repositories

**Status: ✅ PASS**

Grep across `services/`, `features/`, `config/` for `from "firebase/*"` returns zero real matches.

One false-positive worth noting: `services/AuthService.ts` contains the *string* `firebase/auth.ts` inside a documentation comment (explaining why the service doesn't call Firebase Auth directly). This is not an import and does not violate the rule, but it's a slightly risky thing to have in a file that gets grepped by automated checks — a future contributor skimming tool output could misread it.

**Recommended fix (cosmetic only):** Reword the comment to avoid the literal substring `firebase/auth` if the team wants grep-based CI checks to stay simple.

---

## 4. Services Accessing Firestore Directly

**Status: ✅ PASS**

All 11 services (`AuthService`, `ProductService`, `CategoryService`, `CartService`, `CheckoutService`, `OrderService`, `UserService`, `NotificationService`, `CouponService`, `BannerService`, `SettingsService`) exclusively call repository methods. None import `firebase/firestore`, `collection()`, `doc()`, `getDocs()`, etc.

`AuthService` correctly stops at the Firestore-profile boundary (`users`/`admins` documents) and does not attempt to wrap Firebase Authentication itself, since no repository exists for that — exactly as scoped in the Phase 5 instructions.

---

## 5. Business Logic Inside Repositories

**Status: ✅ PASS, with one borderline case noted**

Repositories contain no price/discount/total/permission computation, matching `SERVER AUTHORITY`. The borderline case:

- `OrderRepository` exposes no `delete()` at all, and `AuditLogRepository.update()` throws an explicit error. These are **data-integrity guards**, not business logic (no computation, just enforcing "never deleted" / "immutable" rules stated verbatim in the docs). This is judged appropriate for the repository layer, since the Repository Pattern principle says repositories should be the single place infrastructure-level rules live.
- `OrderService.updateStatus()` similarly blocks changes to `delivered` orders. This *is* in the service layer (correct location for business logic per `SERVICE LAYER` principle) and is directly traceable to the documented rule "Orders are immutable after delivery" — not invented.

No corrections needed here.

---

## 6. Wrong Imports

**Status: ⚠️ WARNING — one gap**

`eslint.config.mjs` imports `FlatCompat` from `@eslint/eslintrc`:

```
import { FlatCompat } from "@eslint/eslintrc";
```

**`@eslint/eslintrc` is not listed in `package.json`** (checked: only `eslint`, `eslint-config-next`, `eslint-config-prettier`, `prettier`, `prettier-plugin-tailwindcss` are present). `npm run lint` would fail with a module-not-found error once dependencies are installed.

**Recommended fix:** Add `"@eslint/eslintrc": "^3.0.0"` (or current major) to `devDependencies`.

All other imports across the project resolve to either external packages declared in `package.json` or internal `@/*`-aliased paths that exist on disk. No dangling imports found.

---

## 7. Duplicate Code

**Status: ⚠️ WARNING**

### 7a. Duplicated Firestore→domain Timestamp converter
`BaseRepository.ts` defines a private `createConverter<T>()` function that converts Firestore `Timestamp` instances to ISO strings on read. This exact logic is **re-implemented, not reused**, in two subcollection helpers:
- `CategoryRepository.ts` → `createSubCategoryConverter()`
- `OrderRepository.ts` → `createOrderItemConverter()`

Both are byte-for-byte the same conversion logic as `BaseRepository`'s converter, just re-typed for `SubCategory`/`OrderItem`.

**Recommended fix:** Export `createConverter<T>()` from `BaseRepository.ts` (or move it to a small shared `repositories/firestoreConverter.ts` helper) and import it in both subcollection helpers instead of redefining it.

### 7b. Collection path duplicated as a magic string
`CategoryRepository.subCategoriesRef()` hardcodes `"categories"` as a literal string, separate from the `"categories"` passed to `super()` in the constructor. Same pattern in `OrderRepository.itemsRef()` with `"orders"`. If a collection name ever changes, it now has to be updated in two places per repository.

**Recommended fix:** Expose the collection path from `BaseRepository` (e.g., a `protected readonly collectionPath: string` field saved in the constructor) and reference `this.collectionPath` in the subcollection helpers instead of re-typing the literal.

---

## 8. Missing Exports

**Status: ⚠️ WARNING — minor inconsistency, not a defect**

`features/*/validation/` folders each have an `index.ts` barrel export. `repositories/` and `services/` do not. This isn't required by any documented rule, but it's an inconsistency across the codebase: some layers offer a single import point, others require importing each class file directly.

**Recommended fix (optional):** Add `repositories/index.ts` and `services/index.ts` barrel files if the team wants a uniform import style. Not required for correctness.

---

## 9. TypeScript Typing Issues

**Status: ✅ PASS, with one note already resolved**

- `noUncheckedIndexedAccess: true` is enabled in `tsconfig.json`. Reviewed all array-indexing sites (`matches[0]` in `CheckoutService.findValidCoupon`) — correctly handled with `?? null`.
- No use of `any` anywhere in the audited scope (verified via grep).
- All Zod schemas are bound to their TypeScript source-of-truth via `satisfies z.ZodType<Pick<...>>`, which will catch drift between `types/` and validation schemas at compile time — this is a strong pattern, worth keeping.
- One previously-introduced typing bug (`SettingsService.updateSettings` unsafely casting a `Partial<Settings>` to a full `Settings` for `setGeneral`, which would have silently wiped the document via `setDoc` without merge) **was already caught and fixed during Phase 5** by adding `SettingsRepository.updateGeneral()`. No outstanding issue.

---

## 10. Files Placed in the Wrong Directory

**Status: ⚠️ WARNING**

`Page` (in `repositories/PageRepository.ts`) and `AuditLog` (in `repositories/AuditLogRepository.ts`) are defined as local interfaces **inside the repository files**, rather than in `types/`. Every other entity (`Product`, `Order`, `User`, etc.) lives in `types/`. This happened because Phase 3 explicitly scoped only 11 named type files, and `pages`/`auditLogs` weren't among them — but the `TYPES FOLDER` convention in the architecture doc implies all domain entities belong there.

**Recommended fix:** Move `Page`/`PageId` to `types/page.ts` and `AuditLog` to `types/audit-log.ts`, then import them into the respective repositories. Purely a file-location fix — no logic changes needed.

---

## 11. Naming Convention Violations

**Status: ⚠️ WARNING — several deviations from `FILE NAMING RULES`**

Comparing against the documented `FILE NAMING RULES` section directly:

| Rule (as documented) | Actual | Status |
|---|---|---|
| Types: PascalCase (`Product.ts`, `Order.ts`, `User.ts`) | `types/product.ts`, `types/order.ts`, `types/user.ts` (lowercase) | ❌ Deviates — **per explicit Phase 3 instruction**, which specified these exact lowercase filenames |
| Interfaces: prefix `I` (`IProduct`, `IOrder`, `ICategory`) | `Product`, `Order`, `Category` (no prefix) | ❌ Deviates — not covered by any explicit user override; this was a design choice made without an "I" prefix |
| Constants: camelCase | `order-status.ts`, `payment-methods.ts`, `feature-flags.ts` (kebab-case) | ❌ Deviates — **per explicit Phase 4 instruction**, which specified these exact filenames |
| Services/Repositories: PascalCase | `ProductService.ts`, `ProductRepository.ts`, etc. | ✅ Matches |
| Folders: lowercase | `features/products`, `features/checkout`, etc. | ✅ Matches |
| Firestore collections: plural, lowercase | `products`, `orders`, `categories`, `auditLogs`, etc. | ✅ Matches (documented schema itself uses camelCase `auditLogs`) |
| Enums: PascalCase (`OrderStatus`, `UserRole`) | Implemented as string-literal unions named `OrderStatus`, `UserRole`, `AdminRole`, `CouponType` (not TS `enum`) | ⚠️ Naming matches; the mechanism (union type vs. `enum` keyword) differs. This is generally considered better practice in modern TypeScript and is not flagged as an error. |

**Assessment:** The `types/` filename and `constants/` filename deviations were explicit, direct instructions from the project owner in Phases 3 and 4, and this audit does not second-guess those — they're noted here only so the discrepancy against the base architecture document is visible and traceable, not because they were unauthorized. The **missing `I` prefix on interfaces is the one deviation with no such override** and is the most actionable item in this section.

**Recommended fix:** If strict compliance is desired, either (a) rename all `types/` interfaces to their `I`-prefixed form (`IProduct`, `IOrder`, ...) — a mechanical, low-risk rename — or (b) formally amend the naming convention document to drop the `I`-prefix rule, since omitting Hungarian-style prefixes is the more common modern TypeScript convention. A decision either way should be made explicit rather than left as an implicit drift.

---

## 12. Potential Scalability Problems

**Status: ⚠️ WARNING — two items worth planning for**

1. **`BaseRepository.findWhere` supports only single-field equality filters.** Several real use cases will eventually need compound queries (e.g., "active AND featured products," "orders by user AND status," "coupons valid as of a given date"). Right now, any compound filtering has been implemented as one-off, hand-written `query(...)` calls (`AuditLogRepository.findByEntity`) rather than a general mechanism. As more filters are needed, this will either duplicate query-building code or require a more general `findWhere` that accepts multiple conditions.
   **Recommendation:** Consider evolving `findWhere` into a `findByFilters(filters: { field, op, value }[])` once a second or third compound-query need appears — not urgent now, but worth flagging before it's copy-pasted a fourth time.

2. **No pagination anywhere.** `findAll()` and `findWhere()` fetch entire collections/result sets unbounded. This is fine at current data volumes but will not scale once `products`, `orders`, or `auditLogs` grow — especially `auditLogs`, which is append-only and unbounded by nature.
   **Recommendation:** Add `limit()`/cursor-based pagination support to `BaseRepository` before any admin list view is built on top of it, particularly for `AuditLogRepository` and `OrderRepository`.

Neither of these is a defect in what exists today — both are natural next steps, flagged proactively per the request to check for scalability problems.

---

## Summary Table

| Category | Status |
|---|---|
| Architecture violations | ⚠️ WARNING (client timestamps, no enforced stamping, inert middleware) |
| Circular dependencies | ✅ PASS |
| Direct Firebase SDK usage outside repositories | ✅ PASS |
| Services accessing Firestore directly | ✅ PASS |
| Business logic inside repositories | ✅ PASS |
| Wrong imports | ⚠️ WARNING (missing `@eslint/eslintrc` dependency) |
| Duplicate code | ⚠️ WARNING (converter duplication, hardcoded collection paths) |
| Missing exports | ⚠️ WARNING (no barrel files for repositories/services — optional) |
| TypeScript typing issues | ✅ PASS |
| Files in wrong directory | ⚠️ WARNING (`Page`/`AuditLog` types live in repositories/, not types/) |
| Naming convention violations | ⚠️ WARNING (types/constants filenames per explicit instruction; missing `I`-prefix on interfaces) |
| Scalability problems | ⚠️ WARNING (single-field queries only; no pagination) |

**No `ERROR`-level findings** — nothing in the current codebase would cause incorrect data, a security hole, or a broken build *at the architecture level* (the missing `@eslint/eslintrc` package would break `npm run lint`, which is the closest thing to a hard error here). Every `WARNING` is a concrete, fixable, isolated change; none require restructuring what has already been built.
