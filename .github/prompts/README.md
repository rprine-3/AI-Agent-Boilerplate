# Prompts Directory

This directory contains single-focused, parameterized tasks that appear as slash commands.

## File Structure

```
prompts/
├── README.md (this file)
├── generate-docs.prompt.md
├── summarize-code.prompt.md
└── [more as needed]
```

## How to Create Prompts

Prompts are single-purpose commands with optional parameters:

```markdown
---
name: Generate Documentation
description: "Quickly generate documentation for code or modules"
parameters:
  - name: scope
    type: string
    description: "Module or file to document"
    required: true
  - name: style
    type: string
    description: "JSDoc, Markdown, or HTML"
    default: "Markdown"
---

# Generate Documentation

Generate clear documentation for: {{scope}}
Format: {{style}}

[Workflow steps...]
```

## Prompt vs Skill

- **Prompt**: Single task, quick execution, parameterized input
- **Skill**: Multi-step workflow, stateful, with bundled assets

## Examples

Create prompts for frequently repeated tasks:
- Generate boilerplate
- Format code snippets
- Create test templates
- Write commit messages
- Generate API documentation
