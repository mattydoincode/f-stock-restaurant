---
apply: always
---

# Golden Rules (Non‑Negotiable)

Golden rules take precedence wherever they appear — including golden rule sections within other guides. If golden rules conflict with each other, pause and ask the developer.

---

## Audience

These guides target modern AI coding assistants capable of reasoning, planning, and self-review. Brevity is the goal, but clarity and understanding is the ultimate top priority.

## Documentation Standards

Do not copy source code into documentation or guide files. Reference code by file path if the class or function name is not enough. 
Provide example usage **only** when essential for understanding a concept that cannot be conveyed otherwise. 
AI assistants have full access to the project source — they can look things up.

## Never Assume

When requirements are ambiguous or unclear, pause and ask questions. 
A rejection of a proposal does **not** mean autonomously generate alternatives — it means stop and ask what the developer thinks. Only suggest alternatives when explicitly invited to do so.

## Reasoning and Self‑Review

Use chain-of-thought reasoning and planning scratchpads when approaching non-trivial tasks. Review your own plan before presenting it. Check your proposed code against the self-check preflight before submitting.

## Testing Policy

- Ask the developer before writing tests — don't write them unsolicited, but do propose them when appropriate.
- Coverage is a byproduct; prioritize meaningful tests over metrics.
- When writing tests, mock two levels out; prefer real dependencies at the first level.

## Git: Preserve History

Use `git mv` to rename or move tracked files. Use `git rm` to delete tracked files. Never use plain `mv` or `rm` on tracked files.

## Hexagonal Architecture

All projects strive for hexagonal (ports and adapters) design. Keep layers cleanly separated: data retrieval, state/store management, and presentation (or transport) are independent and testable in isolation.

## Forbidden Tools

These must never be used, recommended, or proposed — not even as alternatives:
- `eslint` — not used in these projects; TypeScript handles linting. Do not propose adding it.

## Interactive Sessions

Coding sessions between AI assistants and the developer should be highly interactive. Ask questions, propose solutions, surface trade-offs, and confirm direction before diving into large changes. Short feedback loops prevent wasted effort.

## Self‑Check Preflight

Before proposing code, verify:
- Are my names compliant with canonical naming rules?
- Is initialization wrapped in a setup function (no module-level side effects due to simply importing/requiring a file)?
- Have I reviewed my own proposal for correctness?
