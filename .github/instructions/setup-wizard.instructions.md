---
applyTo: "**"
description: "ServiceNow boilerplate first-use setup guidance"
---

# First-Use Setup Guidance

This instruction guides only Copilot agents that load this repository instruction. Other agents do not inherit it unless separately configured. It cannot launch Copilot Chat or display a prompt automatically when the workspace opens. Do not promise automatic startup onboarding.

## When to Offer Setup

When the workspace context is available, check for the example `myinstance/` folder and whether an instance `_settings.json` exists. If setup looks incomplete, briefly offer help at the start of the conversation, including when the user's first message is only a greeting. Don't interrupt an unrelated request; mention setup in one sentence and continue with the request.

Treat these as indicators, not proof that the project is unconfigured:

- `myinstance/` still exists: the example instance folder may not have been renamed.
- No `_settings.json` is visible: credentials may instead be configured in sn-scriptsync.
- A synced artifact exists: at least one artifact has been synced, but other setup may still be needed.

When asked to check setup, report only what is visible in the workspace and distinguish confirmed facts from items the user needs to verify. Do not claim to know whether an extension is installed, a connection works, or credentials are valid unless the user or an available tool confirms it.

Never read, print, request, or transmit credentials. Do not ask the user to paste passwords or tokens into chat or a terminal. Direct them to configure credentials locally using the approved method for their organization.

## Suggested Offer

Keep the offer lightweight and let the user choose:

> This looks like the ServiceNow boilerplate. Setup may still be needed. Want a guided setup check, or should we get straight to your task?

If they choose setup, ask one question at a time and use the repository's README for the full prerequisites and configuration steps. First confirm their instance folder name and whether they plan to configure sn-scriptsync. Do not rename folders, create credential files, install extensions, or connect to an instance without their direction and required approval.

## Setup Checklist

Walk through these items one at a time, skipping anything the user has already completed:

1. **Development environment:** VS Code and GitHub Copilot are available. Explain that Copilot access may require signing in and an eligible account or organization license.
2. **ServiceNow sync extension:** Install `sn-scriptsync` from the VS Code Extensions view if the user wants to sync ServiceNow artifacts. `sn-utils` is an optional browser extension, not required for local editing or VS Code sync.
3. **Instance folder:** Rename `myinstance/` to a meaningful instance folder name, such as `dev12345/`, when appropriate. The user can keep the example name temporarily. Preserve existing artifacts when renaming, and ask before making the change.
4. **Connection configuration:** Choose the organization's approved configuration method. The repository documents both a local `_settings.json` example and configuring sn-scriptsync through its VS Code panel. Never request secrets in chat. Do not create, read, or edit files containing credentials. Remind the user to confirm `.gitignore` excludes settings files before storing credentials locally.
5. **Scope folders and first sync:** Do not manually create ServiceNow scope folders. Per the repository guidance, sync at least one artifact from the intended scope first so sn-scriptsync establishes the folder structure.
6. **Approval and verification:** Before connecting or syncing, remind the user to get project/security approval and follow organizational policy. Have the user test the connection and perform any initial sync in the extension; do not initiate a sync without explicit direction.

## Example Conversation

Offer choices without blocking the user's other work:

> This looks like the ServiceNow boilerplate. Setup may still be needed. Would you like a guided setup check, or should we get straight to your task?

If they choose guided setup, ask one question at a time. For example:

> I see the example `myinstance/` folder. Have you chosen the instance folder name you want to use, or would you rather leave it as-is for now?

Then continue with the extension, approved connection method, and approval checks. Avoid assuming that a missing `_settings.json` means credentials are absent; sn-scriptsync may be configured in its VS Code panel. Never ask the user to paste a username, password, API token, or settings-file contents into chat.

If the user chooses to defer, continue with their request and do not keep repeating the offer in the same conversation.

## Setup Flow

Use the checklist above to guide setup. Refer to the root `README.md` for environment, extension, approval, and sync details, and `myinstance/README.md` for the example instance folder and settings format. Do not claim the setup is complete solely because files exist; ask the user to confirm extension sign-in, connection testing, and first sync.

## After Setup

When the user confirms setup is ready, suggest the next relevant action rather than listing everything every time:

- Pull an existing artifact from the approved instance and scope.
- Make a local change and verify it before syncing.
- Customize project-specific agent and skill guidance.
- Update the collaboration log after significant project changes.

Never edit `_map.json` files manually; sn-scriptsync maintains them.

## Common Requests

Users can ask for help at any time:

- “Help me set up” or “Guide me through setup” starts the checklist.
- “Check my setup status” reviews visible indicators and lists what still needs user confirmation.
- “What setup steps are missing?” gives only the remaining steps.
- “How do I configure sn-scriptsync?” points to the README's extension instructions.
- “Skip setup for now” defers onboarding; respect that choice.

For manual setup, direct the user to the root `README.md` and `myinstance/README.md`. If a connection or sync fails, ask for the non-secret error message and help troubleshoot without requesting credentials or tokens.