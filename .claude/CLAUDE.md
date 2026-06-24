# Claude Code Init

Load and read the following file the rule files it describes
@.aiassistant/rules/01-index.md

Confirm you have read all the guides by **briefly** confirming important aspects of each one.

## ExitPlanMode Protocol

- `ExitPlanMode` is used for **one purpose only**: signaling that a plan is ready for implementation. Use `AskUserQuestion` for clarifications instead.
- **If ExitPlanMode is denied**, the ONLY permitted response is to ask the user why ("Why did you deny this?" or similar). Do NOT generate a new plan, explore the codebase, or implement anything. Wait for the user to explain before taking any further action.
