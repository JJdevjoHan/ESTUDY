# Contributing to EStudy

## Branching

- `main` holds stable, working code only. Do not push to it directly.
- New features: `feature/<issue>-<short-name>` (e.g. `feature/12-diagnostic-test`)
- Fixes: `fix/<issue>-<short-name>` (e.g. `fix/27-trend-graph-crash`)

## Workflow

1. Pick or create an issue on the task board.
2. Create a branch from `main` using the naming above.
3. Make small, focused commits with descriptive messages (e.g. `Add diagnostic test scoring logic`).
4. Open a pull request linking the issue.
5. Get at least **one peer review** before merging.
6. Merge into `main` once approved and checks pass.

## Rules

- `main` is protected where supported (require pull request and review).
- Never commit real secrets. Use `.env` locally and keep `.env.example` updated with variable names only.
- Do not mark a task **Done** without review and verification evidence (screenshot, test output, or reviewer sign-off).
- Add or update tests in `tests/` for new behavior.
