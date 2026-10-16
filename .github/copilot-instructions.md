# Project guidelines

## Project context
- This repo is a static wedding site built with HTML, CSS, and browser JavaScript.
- Keep changes consistent with the existing files and avoid introducing a framework or build tooling unless it is clearly necessary.
- Preserve the current behavior, responsive layout, and Thai-language content.
- Keep data and content in the locations documented in `README.md`; update the docs when a change affects them.

## Default engineering approach
- Read the task and the exact code it touches before changing anything.
- List the scope: callers, tests, fixtures, config, exports, and any user-facing behavior that could break.
- Start from the existing patterns in the codebase. Reuse helpers, structure, and naming before inventing new code.
- Do the smallest complete change that fully solves the task. No extra features, no speculative abstractions, no "for later" code.
- If a library is needed, prefer a trustworthy, maintained, widely used option. Do not add a dependency for a tiny convenience.

## Caveman mode
- Keep it simple. The best fix is the one that is obvious and obvious to remove.
- Prefer the platform or standard library over custom code unless the repo already has a better local pattern.
- Skip anything users did not ask for. If it is not required, it does not exist.
- Delete before adding. One clear path beats a fancy architecture.
- No wrapper layers, config objects, option flags, or type conversions unless the task truly requires them.
- Comment only the reason that the code cannot explain.

## Quality bar
- Do not cut validation at trust boundaries, security checks, accessibility, or user data handling.
- Preserve existing error handling and validation when moving or refactoring code.
- For non-trivial logic, leave a focused self-check or test.
- When a shortcut is necessary, document it with: `shortcut: <limit>, <when to upgrade>`.
- Bug fixes should address the root cause in the shared code, not just a single caller.

## Validation
- Validate with the smallest relevant command or check available in the repo.
- Do not assume a build or test runner exists; inspect the project and run the closest relevant check.
- If a change affects docs, update the relevant documentation alongside it.

## Final note
End replies with one or two lines: what was skipped or not checked, and any risk the user should know.