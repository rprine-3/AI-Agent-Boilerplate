---
description: GitHub Copilot instructions for ServiceNow development with sn-scriptsync
applyTo: "**"
---

# Accuracy, Scope, and Limitations

These are repository instructions for GitHub Copilot agents that load this workspace's guidance. They do not configure every AI agent, another vendor's assistant, or an agent that does not load these files.

- Prefer verified, working solutions over reassuring claims. State plainly when something is unavailable, untested, best-effort, or dependent on an extension, account, policy, or user setting.
- Distinguish implemented and validated behavior from recommendations or prompt instructions. Do not describe instructions as guarantees or enforcement mechanisms.
- When a solution will not work across all agents or environments, say which agents or environments it covers and identify the limitation before presenting it as a solution. Offer an enforceable alternative only when one is available and explain its requirements.
- Acknowledge mistakes directly and correct them without minimizing the impact.
- Whenever creating a new agent for this repository, include an `## Accuracy and Capability Limits` section in that agent's own instructions. Require it to distinguish verified facts from assumptions, avoid claiming unverified actions, state tool/environment dependencies and scope, disclose when it cannot do something, and favor accuracy over reassurance. Apply the same requirement whether using `.github/agents/agent-creator.agent.md` or authoring an agent file directly.

# First-Use Setup Help

Copilot cannot show a prompt automatically when this workspace opens. When a conversation starts with this workspace available, setup guidance may be offered if the example `myinstance/` folder or other setup indicators suggest configuration is incomplete. This is a chat-time offer, not a guaranteed startup prompt.

To start setup help at any time, say:

- "Help me set up"
- "Guide me through setup"
- "What do I need to do first?"

For detailed steps, see the root `README.md` and `myinstance/README.md`. Never paste credentials into Copilot Chat; configure them locally using your organization's approved method.

---

# ServiceNow Script Sync File Structure

> **Note**: This file provides guidelines for using the `sn-scriptsync` VS Code extension with GitHub Copilot.
> The sn-scriptsync extension syncs ServiceNow artifacts with local files for seamless development.

## Overview
This workspace uses the `sn-scriptsync` VS Code extension to sync ServiceNow artifacts with local files.

## Getting Started

1. Install the `sn-scriptsync` extension in VS Code
2. Create an instance folder (e.g., `dev12345` or `myinstance`)
3. Add a `_settings.json` file in the instance folder with your credentials
4. **Sync at least one artifact** from ServiceNow to establish the scope folders
5. Start creating or editing files - the extension handles the sync automatically

**⚠️ Important**: Do not manually create scope folders. Always sync at least one artifact from a scope first to ensure proper folder structure.

## File Structure Pattern
```
<instance_folder>/<scope>/<table_name>/<artifact_file>
```

### Structure Breakdown:
1. **Instance Folder**: The ServiceNow instance name (e.g., `dev12345`, `myinstance`)
2. **Scope**: Either `global` for global scope or the scope name (e.g., `x_abc_my_app`)
3. **Table Name**: The ServiceNow table where the artifact belongs (e.g., `sys_script_include`, `sys_script`, `sys_ws_operation`)
4. **Artifact File**: The actual script file with appropriate naming convention

## Examples

### Script Include (Scoped App)
```
myinstance/x_abc_my_app/sys_script_include/MyUtils.script.js
```

### Business Rule (Global Scope)
```
myinstance/global/sys_script/MyBusinessRule.script.js
```

### Scripted REST API Resource (Global Scope)
```
myinstance/global/sys_ws_operation/MyAPIEndpoint.script.js
```

### Service Portal Widget (Scoped App)
```
myinstance/x_abc_my_app/sp_widget/MyWidget/
  ├── template.html
  ├── client_script.js
  ├── css.scss
  ├── script.js
  ├── link.js
  ├── option_schema.json
  ├── demo_data.json
  └── _test_urls.txt
```

## Important: _map.json Files

### ⚠️ DO NOT MANUALLY EDIT _map.json FILES

The `_map.json` files are **automatically maintained** by the `sn-scriptsync` extension.

**What they contain:**
```json
{
  "ArtifactName": "sys_id_from_servicenow"
}
```

**How they work:**
- When you **create a new file** without a sys_id, the extension creates it in ServiceNow and updates `_map.json`
- When you **edit an existing file**, the extension uses the sys_id from `_map.json` to update the correct record
- When the extension **pulls from ServiceNow**, it updates `_map.json` with any new or changed sys_ids

**Example:**
```json
{
  "MyUtils": "abc123def456789012345678901234",
  "AnotherUtils": "def456789012345678901234567890",
  "ThirdUtils": "789012345678901234567890123456"
}
```

## Common Table Names

| Artifact Type | Table Name | Scope Support |
|--------------|------------|---------------|
| Script Include | `sys_script_include` | Global + Scoped |
| Business Rule | `sys_script` | Global + Scoped |
| Client Script | `sys_client_script` | Global + Scoped |
| UI Action | `sys_ui_action` | Global + Scoped |
| UI Script | `sys_ui_script` | Global + Scoped |
| UI Page | `sys_ui_page` | Global + Scoped |
| Scripted REST API | `sys_ws_operation` | Global + Scoped |
| Service Portal Widget | `sp_widget` | Scoped only |
| Fix Script | `sys_script_fix` | Global + Scoped |

## File Naming Conventions

### ⚠️ CRITICAL: Do NOT Create Separate Field Files for Configuration

**NEVER create separate files for configuration/metadata fields:**
- ❌ `MyBusinessRule.collection.js` (table name - this is a STRING reference)
- ❌ `MyBusinessRule.when.js` (when to run - this is a STRING choice)
- ❌ `MyBusinessRule.active.js` (active status - this is a BOOLEAN)
- ❌ `MyUIAction.table.js` (table reference - this is a STRING)
- ❌ `MyOperation.http_method.js` (HTTP method - this is a STRING)
- ❌ `MyScript.action_insert.js` (action flag - this is a BOOLEAN)

**These configuration fields belong in the creation payload ONLY**, not as separate files.

**✅ DO create files for actual script/code/content fields:**
1. **Script fields** (contain executable code):
   - `script` → `MyBusinessRule.script.js`
   - `operation_script` → `MyOperation.operation_script.js`
   - `client_script` → `MyWidget.client_script.js`
   - `server_script` → `MyWidget.server_script.js`
   - `processing_script` → `MyUIPage.processing_script.js`
   
2. **Template/HTML fields** (contain markup):
   - `template` → `MyWidget.template.html`
   - `html` → `MyUIPage.html`
   
3. **CSS fields** (contain styles):
   - `css` → `MyWidget.css.scss`
   
4. **Special files**:
   - `option_schema.json` (widget configuration schema)
   - `demo_data.json` (widget demo data)
   - `link.js` (widget link function)

**Rule of thumb:** If the field contains **code, markup, or styles** → create a file. If it's a **configuration value** (string, boolean, number, reference) → include in payload only.

## ServiceNow Coding Standards

### ⚠️ CRITICAL: Scoped Application API Restrictions

**In scoped applications (like Service Portal widgets), certain global APIs are NOT allowed:**

```javascript
// ❌ INCORRECT - NOT allowed in scoped apps
var now = new GlideDateTime();
now.setDisplayValue(gs.nowDateTime());  // ERROR: Function nowDateTime is not allowed in scope!

// ✅ CORRECT - Use GlideDateTime constructor directly
var now = new GlideDateTime();  // Automatically initializes to current time
data.currentDay = parseInt(now.getDayOfMonthLocalTime());
data.currentMonth = parseInt(now.getMonthLocalTime());
data.currentYear = parseInt(now.getYearLocalTime());
data.dayOfWeek = now.getDayOfWeekLocalTime();
```

**Key Rules:**
- ✅ `new GlideDateTime()` - Creates current date/time automatically
- ✅ Use `LocalTime` methods: `getDayOfMonthLocalTime()`, `getMonthLocalTime()`, `getYearLocalTime()`
- ❌ `gs.nowDateTime()` - NOT allowed in scoped applications
- ❌ `gs.now()` - NOT allowed in scoped applications
- ❌ Non-LocalTime methods may fail: `getDayOfMonth()`, `getMonth()`, `getYear()`

### Service Portal Widget Client Scripts

**Use Angular dependency injection, not IIFE patterns:**

```javascript
// ❌ WRONG - IIFE loses 'this' context, causes $apply issues
(function() {
  var c = this;
  setInterval(function() { c.$apply(); }, 1000);
})();

// ✅ CORRECT - Proper Angular controller with DI
api.controller = function($scope, $interval, $timeout) {
  var c = this;
  $interval(updateFn, 1000);  // Auto-handles digest cycle
};
```

**Available Angular services:** `$scope`, `$interval`, `$timeout`, `$http`, `$q`, `$location`, `spUtil`, `spModal`

### GlideRecord Best Practices
Always use `setValue()` and `getValue()` methods:

```javascript
// ✅ CORRECT
var grUser = new GlideRecord('sys_user');
if (grUser.get(userId)) {
    var userName = grUser.getValue('name');
    grUser.setValue('active', true);
    grUser.update();
}

// ❌ INCORRECT
var gr = new GlideRecord('sys_user');
if (gr.get(userId)) {
    var userName = gr.name;  // Direct property access
    gr.active = true;        // Direct property assignment
    gr.update();
}
```

### Variable Naming
Use semantic variable names with prefixes:
- `grUser` - GlideRecord for user
- `grIncident` - GlideRecord for incident
- `gaRecords` - GlideAggregate
- Not just `gr` or `ga`

## Workflow

1. **Edit files** in VS Code using the proper file structure
2. **Save** your changes
3. The extension **automatically syncs** to ServiceNow after a debounce period
4. The extension **updates _map.json** automatically
5. **Never manually edit** `_map.json` files

## Settings Files

Each instance folder should have a settings file:
- `_settings.json` (recommended format)
- `settings.json` (alternative format)

This is generated and updated by the sn-scriptsync Extension

**Security Note**: These files contain keys and should be added to `.gitignore`.

## ServiceNow Reference Documentation

Official ServiceNow platform documentation is available locally for reference:

- **Location:** `docs/service-now-docs-australia/markdown/`
- **Content:** Product documentation organized by service area (ITSM, HRSD, CSM, etc.)
- **Use for:** Validating platform APIs, understanding best practices, architecture patterns, scoped app restrictions
- **Source:** ServiceNow GitHub (updated monthly)

## Collaboration Logging

To maintain project history and help team members follow work progress, log significant changes to `docs/collaboration-log.md`.

**Required completion step:** Before the final response for any task that changes a feature, project structure, guidance, configuration, significant documentation, skills, or tooling, review the changes and update the collaboration log. This is the assistant's responsibility; do not wait for the user to request it or ask the user whether it should be logged. Pure Q&A, investigation with no repository changes, and trivial edits do not need an entry. If the log cannot be updated, state that clearly in the final response.

**When to log:**
- After completing implementation of a feature or story
- After modifying project structure, guidance, or configuration
- After adding significant documentation or skills
- After integrating new tools or resources

**How to log (merge-conflict-friendly format):**
1. Add entry at the **top** of the "Boilerplate Development Log" section (after the header, before existing entries)
2. Use ISO date format: `### YYYY-MM-DD`
3. Bullet points are simple and short (1-2 lines each)
4. Include affected files/folders as context
5. **NEVER edit existing entries** — only add new ones at the top

**Example entry:**
```markdown
### 2026-09-15
- Implemented new Business Rule validation framework
  - Modified `.github/skills/sn-code-review/SKILL.md` 
  - Added template `myinstance/global/sys_script/ValidationTemplate.script.js`
- Updated project documentation to reference new validation patterns
```

**Why this format prevents merge conflicts:**
- New entries always go at the **top** (different Git locations for each branch)
- Never editing existing entries means no competing changes
- Clear date headers make Git merges automatic when multiple people contribute

## Recommended .gitignore

Add these entries to your `.gitignore` to protect credentials and avoid syncing local state:

```gitignore
# ServiceNow credentials
**/settings.json
**/_settings.json

# Extension logs
debug.log

# OS files
.DS_Store
Thumbs.db
```

## Guidelines for AI Assistants (GitHub Copilot)

### 🚨 CRITICAL: Always Confirm Instance and Scope

**Before ANY ServiceNow operation, confirm:**
1. **Instance**: Which ServiceNow instance to use (e.g., `dev12345`, `myinstance`)
2. **Scope**: Which scope to create/update artifacts in (e.g., `global`, `x_abc_my_app`)

**If the user does NOT provide instance and/or scope, ASK BEFORE PROCEEDING.**

### ⚠️ Configuration vs Code Fields

**⚠️ CRITICAL: Distinguish between code fields and configuration fields**:
- ❌ DO NOT create files for configuration fields like `.collection.js`, `.when.js`, `.active.js`, `.http_method.js`
- ✅ DO create files for script/code fields like `.script.js`, `.server_script.js`, `.client_script.js`, `.template.html`
- ✅ Use `create_artifact` command to include configuration fields in the payload

**Examples - Configuration fields (DO NOT create files):**
```
❌ MyBR.collection.js          (STRING - table reference, put in payload)
❌ MyBR.when.js                (STRING - timing choice, put in payload)
❌ MyBR.active.js              (BOOLEAN - active flag, put in payload)
❌ MyOperation.http_method.js  (STRING - HTTP method, put in payload)
```

**Examples - Code fields (DO create files):**
```
✅ MyBR.script.js              (CODE - business rule logic)
✅ MyWidget.server_script.js   (CODE - server-side widget logic)
✅ MyWidget.client_script.js   (CODE - client-side widget logic)
✅ MyUIPage.processing_script.js (CODE - UI page processing logic)
✅ MyWidget.template.html      (MARKUP - widget template)
```
