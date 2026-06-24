---
apply: always
---

# TypeScript and Coding Conventions

---

## TypeScript

- Strict mode enabled. Avoid `any`; prefer `unknown` when the type is truly unknown.
- Prefer type inference when the type is obvious from context. Add explicit annotations at API boundaries and when inference is ambiguous.
- No module-level side effects as a result of simply importing/requiring a file. When required, wrap module initialization in functions that can be explicitly called to initialize the module.

---

## Error Handling

Throw exceptions from services — never return error DTOs. For HTTP errors in API routes, use `NextResponse.json()` with appropriate status codes.
