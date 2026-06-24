# Claude Code Init

Load and read the following file the rule files it describes
@.aiassistant/rules/01-index.md

Confirm you have read all the guides by **briefly** confirming important aspects of each one.

## JetBrains Sandbox — `:claude` npm Script Convention

JetBrains IntelliJ sandboxes Claude Code into an internal Node.js version that may be incompatible with the project's own Node version. To work around this, npm scripts ending with `:claude` hardcode the path to a compatible Node binary.

**Rule**: At the start of every session, run and report `node --version` so you (and the user) know which Node runtime is active.

**Rule**: When you need to run an npm script, always check for a `:claude`-suffixed variant first and use it instead (e.g. `npm run test:claude` instead of `npm run test`, `npm run watch:claude` instead of `npm run watch`). Scripts without
the `:claude` suffix **might** fail due to incompatibilities with the sandboxed Node runtime.

## ExitPlanMode Protocol

- `ExitPlanMode` is used for **one purpose only**: signaling that a plan is ready for implementation. Use `AskUserQuestion` for clarifications instead.
- **If ExitPlanMode is denied**, the ONLY permitted response is to ask the user why ("Why did you deny this?" or similar). Do NOT generate a new plan, explore the codebase, or implement anything. Wait for the user to explain before taking any further action.
