# Copilot Instructions

## Linting/ESLint findings (2026-03-30)

- ESLint is extremely strict: avoid unsafe assignments, unnecessary type conversions, and
  stringifying objects/arrays.
- TypeScript strict mode is enforced. Use explicit types and safe guards for all dynamic data.
- See `src/vocab.ts` for an example: even defensive type checks can still trigger lint errors if not
  explicit enough.
- Always check for and handle all possible types when processing unknown data (e.g., from JSON).
- If you see repeated lint errors, review the ESLint config and error output for required patterns.

- Surround all headings and lists with blank lines.
- Keep all lines ≤100 characters (including in lists and paragraphs).
- Do not use emphasis (e.g., `**text**`) as a heading.

## Commands

```bash
yarn dev        # start Vite dev server
yarn build      # type-check + build (tsc -b && vite build)
yarn lint       # run ESLint
yarn lint --fix # run ESLint with auto-fix
yarn preview    # preview the production build
```

No test framework is configured.

## Architecture

React 19 + TypeScript + Vite app. All application code lives in `src/`.

There is no router and no third-party state management — use React's built-in `useState`/`useContext`.

Styling is handled by Mantine components and theming. Do not use `src/index.css` or `src/App.css`.

## Git workflow

- **Never commit via git.** Leave commits to the user.
- After creating new files, always stage them with `git add`.
- After making any modifications, always run `prek run --all-files` to ensure code meets formatting
  standards.

## Conventions

### TypeScript

- Full strict mode: `strict`, `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly`,
  `noUncheckedSideEffectImports`
- Use `import type` for type-only imports (`verbatimModuleSyntax` is enabled and enforces this)
- `noEmit: true` — Vite handles bundling, not tsc
- **Always use `const foo = () => { ... }` arrow function style for all function declarations
  (including components and helpers). Do not use `function foo() { ... }` style.**

### Code style (enforced by ESLint + pre-commit hooks)

- Double quotes for all strings (enforced by ESLint)
- 100-character max line length (enforced by ESLint)
- 2-space indentation (enforced by .editorconfig)
- Function components with default exports
- ESLint config extends: @eslint/js, typescript-eslint, react-hooks, react-refresh (Vite), stylistic
- Pre-commit hooks run `yarn lint --fix` automatically on staged files

### CSS

- CSS custom properties for theming; light/dark via `@media (prefers-color-scheme: dark)`
- Modern nested CSS syntax (no preprocessor)
- Responsive breakpoint at `max-width: 1024px`
