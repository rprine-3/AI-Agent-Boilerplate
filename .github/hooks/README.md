# Hooks Directory

This directory contains deterministic shell commands that enforce behavior at agent lifecycle events.

## File Structure

```
hooks/
├── README.md (this file)
├── pre-tool-use.json
├── post-tool-use.json
└── [more as needed]
```

## Lifecycle Events

Hooks can be triggered at these points:

- `PreToolUse` — Before any tool is executed
- `PostToolUse` — After a tool completes
- `OnError` — When a tool fails
- `PostCompletion` — After agent completes task

## Hook Structure

```json
{
  "event": "PreToolUse",
  "tools": ["run_in_terminal"],
  "condition": "command contains 'rm '",
  "action": "requireApproval",
  "message": "Confirm destructive operation?"
}
```

## When to Use Hooks

- Enforce deterministic behavior
- Block dangerous operations
- Auto-format code
- Require approval for specific actions
- Inject context or validation

## Hook Actions

- `block` — Prevent operation
- `requireApproval` — Ask user
- `log` — Record action
- `transform` — Modify command
- `inject` — Add context

## Examples

Useful hooks to create:

```json
{
  "event": "PreToolUse",
  "tools": ["run_in_terminal"],
  "condition": "command contains 'rm' OR command contains 'delete'",
  "action": "requireApproval",
  "message": "This is a destructive operation. Confirm deletion?"
}
```
