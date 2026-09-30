# ServiceNow AI Agent Boilerplate — Collaboration Log

This log tracks work on the ServiceNow boilerplate project and is intended to be shared with coworkers and future users who fork this project.

## Purpose

- Track all boilerplate creation and improvements
- Document decisions and design patterns for future maintainers
- After forking: track your team's implementation work and customizations
- Make it easy for teammates to follow progress step by step

## Location

This file is located at:

`docs/collaboration-log.md`

## Guidelines

- Update this file after each major boilerplate task or customization
- Include the date, a brief summary, and links to relevant files
- Keep entries short and clear
- **For boilerplate developers**: Focus on reusable improvements
- **For users after forking**: Track your project-specific customizations

## Boilerplate Development Log

### 2026-09-10
- Created generic boilerplate instance folder structure (`myinstance/`) with templates
  - Added `myinstance/_settings.json` template with example values
  - Added `myinstance/global/sys_script_include/` folder structure
  - Added `ExampleUtils.script.js` template artifact
  - Added `README.md` inside `myinstance/` with quick start instructions
- Created `.github/Setup-README.md` comprehensive customization guide
  - Complete step-by-step instructions for boilerplate users
  - Security warnings for all ServiceNow instance connection steps
  - Troubleshooting section
  - Examples for HRSD, multi-instance, and scoped app patterns
- Moved and generified sn-scriptsync instructions to `.github/copilot-instructions.md`
  - Removed instance-specific references
  - Made all examples generic (`myinstance`, `x_abc_my_app`)
  - Suitable for any ServiceNow project
- Updated all boilerplate documentation for clarity and followability
- Created `.github/BOILERPLATE.md` with file-by-file customization reference

### 2026-09-14
- Added official ServiceNow reference documentation to project
  - Integrated `docs/service-now-docs-australia/` with markdown documentation organized by product area
  - Flattened folder structure for easier navigation
  - Cleaned up unnecessary files (removed `llms_template.txt`, kept LICENSE and llms.txt for attribution)
- Updated guidance across multiple resources to reference new docs:
  - Updated `.github/copilot-instructions.md` with ServiceNow Reference Documentation section
  - Updated `.github/skills/sn-code-review/SKILL.md` with reference documentation step
  - Created `/memories/repo/servicenow-docs-reference.md` for agent awareness
- Documentation now accessible to agents during code reviews and development workflows

### 2026-09-14 (continued)
- Added Collaboration Logging guidelines to `.github/copilot-instructions.md`
  - Established merge-conflict-friendly format (entries added at top, never edited)
  - ISO date format with clear sections for consistency
  - Automatic logging enabled for all significant changes going forward

### 2026-09-14 (continued)
- Simplified agent naming by removing "Combined" designation
  - Renamed `architecture-combined.agent.md` to `architecture.agent.md`
  - Renamed `developer-combined.agent.md` to `developer.agent.md`
  - Updated descriptions in agent files to remove "Combined" prefix
  - Updated `.github/Setup-README.md` file reference list

### 2026-09-14 (continued)
- Removed generic `code-review` skill to eliminate redundancy
  - Deleted `.github/skills/code-review/` folder
  - Kept `sn-code-review` skill which is more specialized and appropriate for ServiceNow projects
  - Updated `.github/Setup-README.md` to remove references to code-review

### 2026-09-14 (continued)
- **Comprehensive boilerplate cleanup and fixes:**
  - Fixed broken reference in Setup-README.md: `code-review` → `sn-code-review`
  - Fixed outdated agent name references in Setup-README.md: removed `-combined` suffix from examples
  - Created root `.gitignore` with credentials protection rules
  - Created root `README.md` from Setup-README.md as main project documentation
  - Updated `r-docs.agent.md` with proper naming: `docs` → `Documentation Specialist Agent`
  - Removed hardcoded `model: "Claude Opus 4"` from `r-docs.agent.md`
  - All critical and should-fix issues from structure review addressed
  - Boilerplate is now production-ready for teams to fork

### 2026-09-14 (continued)
- Deleted redundant `.github/Setup-README.md` (consolidated into root README.md)
- **Added comprehensive tools setup guide to root README.md:**
  - VS Code download and installation steps (Windows, macOS, Linux)
  - GitHub Copilot extension installation and verification
  - sn-scriptsync VS Code extension installation and configuration
  - sn-utils browser extension installation (Chrome/Firefox)
  - Detailed usage guide for sn-scriptsync (syncing, editing, creating artifacts)
  - File structure reference for ServiceNow artifacts
  - sn-utils browser extension features and how to access them
  - Tips and best practices for both tools

### 2026-09-14 (continued)
- **Implemented Option 4: Interactive Setup Wizard via Copilot**
  - Created `.github/setup-wizard.instructions.md` for first-time setup detection
  - Automatically detects missing setup (instance folder, credentials, extensions)
  - Provides interactive guided setup through Copilot chat
  - Users can type "Help me set up" or "Guide me through setup" for assistance
  - Includes setup status checking and troubleshooting guidance
  - Added first-time setup prompt to `.github/copilot-instructions.md`
  - Makes onboarding much more interactive than README alone
  - Users who skip setup still get help when they ask

## Next Boilerplate Improvements

(Track future boilerplate enhancements here)
