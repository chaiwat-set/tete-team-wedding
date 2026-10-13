# Project Guidelines

## Prefer trustworthy libraries for complex functionality

Before writing complicated or non-trivial functionality, first look for an available, trustworthy third-party library that already solves the problem. Check the project's existing dependencies and, if needed, research established options. Evaluate whether a candidate is actively maintained, widely used, compatible with this browser-based site, appropriately licensed, and proportionate in size and complexity.

Prefer a suitable existing dependency over custom code. Do not add a library for a simple task or adopt one without checking its suitability. If no trustworthy, compatible option is a good fit, implement the smallest clear solution and explain why a library was not appropriate. Avoid introducing unnecessary dependencies or loading new libraries from an unverified CDN.

## Project conventions

- This is a static website built with HTML, CSS, and browser JavaScript. Keep changes consistent with the existing files and avoid introducing a framework or build tooling without a clear need.
- Preserve the site's existing behavior, responsive layout, and Thai-language content when making changes.
- Keep data and content in the locations documented in `README.md`; update the documentation when a change affects those instructions.
- Validate changes using the relevant checks available in the project. Do not assume a build or test command exists; check the repository first.
