# Instructions Directory

This directory contains file-type and context-specific instructions for agents.

## File Structure

```
instructions/
├── README.md (this file)
├── typescript.instructions.md
├── python.instructions.md
├── documentation.instructions.md
└── [more as needed]
```

## How to Create File-Specific Instructions

Each file uses YAML frontmatter with an `applyTo` pattern:

```markdown
---
name: TypeScript Guidelines
description: "Apply to TypeScript files for consistent type safety and formatting"
applyTo: "**/*.ts"
---

# TypeScript Coding Standards
...
```

## Common `applyTo` Patterns

- `**/*.ts` — All TypeScript files
- `src/**/*.js` — JavaScript in src directory
- `**/*.md` — Markdown documentation
- `docs/**` — All docs directory files
- `test/**` — Test files

## When to Use Instructions vs Agents

- **Instructions**: Formatting, style, naming conventions for specific file types
- **Agents**: Complex workflows, multi-file changes, architectural decisions

## Example Instruction Files

See the examples below for reference:

- **typescript.instructions.md** — For `.ts` and `.tsx` files
- **documentation.instructions.md** — For `.md` documentation files
