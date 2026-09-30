# ServiceNow Boilerplate AI Agent Setup — Customization Guide

This guide explains what needs to be manually edited when you fork/copy this boilerplate for your ServiceNow project.

> ⚠️ **IMPORTANT SECURITY & APPROVAL NOTICE**
> 
> Several steps in this guide involve setting up connections to your ServiceNow instance and syncing code. Before proceeding with ANY step marked **"PROJECT APPROVAL REQUIRED"**:
> 
> - ✅ Get explicit written approval from your project lead or security team
> - ✅ Confirm your org allows local credential storage
> - ✅ Understand your org's policies for local-to-ServiceNow artifact sync
> - ✅ Follow all credential protection and Git security guidelines in your org
> 
> Proceeding without approval may violate your organization's security policies.

## Quick Start Checklist

- [ ] **Step 1**: Rename `myinstance/` folder to your actual instance name (e.g., `dev12345`)
- [ ] **Step 2**: Edit `_settings.json` in your instance folder with ServiceNow credentials
  > ⚠️ **PROJECT APPROVAL REQUIRED** — This step connects to your ServiceNow instance. Get approval from your project lead before proceeding.
- [ ] **Step 3**: Customize agent descriptions in `.github/agents/`
- [ ] **Step 4**: Update `.github/skills/` descriptions for your scope
- [ ] **Step 5**: Edit `docs/collaboration-log.md` header with your project name
- [ ] **Step 6**: Update `.github/copilot-instructions.md` to reference your instance name
- [ ] **Step 7**: Delete this file once customization is complete

---

## Prerequisites & Tools Setup

Before you begin customization, you'll need to set up your development environment with VS Code and required extensions.

### 1. Download and Install VS Code

**VS Code** is a free, lightweight code editor that integrates with GitHub Copilot and ServiceNow extensions.

#### Download Steps:

1. Visit **https://code.visualstudio.com/**
2. Click the **Download** button for your operating system:
   - **Windows**: Download the Windows installer (`.exe`)
   - **macOS**: Download for Intel or Apple Silicon (M1/M2/M3)
   - **Linux**: Download for your distribution

3. Run the installer and follow the setup wizard:
   - Accept the license agreement
   - Choose installation location (default is fine)
   - Choose additional tasks (recommended: add to PATH, add "Open with Code" context menu)
   - Click **Install**

4. Launch VS Code when the installation completes

#### Verify Installation:

```bash
# Open terminal and run:
code --version
# Should display: [version] (your version number)
```

---

### 2. Install GitHub Copilot Extension

**GitHub Copilot** provides AI-powered code assistance and is essential for this boilerplate.

#### Installation Steps:

1. **Open VS Code**
2. Click the **Extensions** icon on the left sidebar (looks like 4 squares)
3. Search for `GitHub Copilot`
4. Click the **GitHub Copilot** extension (by GitHub)
5. Click **Install**
6. Click **Sign in with GitHub**
   - A browser window will open
   - Complete the GitHub authentication
   - Return to VS Code
7. Restart VS Code (Ctrl+Shift+P → "Reload Window")

#### Verify Installation:

- You should see a **Copilot chat icon** in the left sidebar
- The icon looks like a speech bubble with the GitHub Copilot logo

---

### 3. Install sn-scriptsync VS Code Extension

**sn-scriptsync** syncs ServiceNow artifacts (Business Rules, Script Includes, Widgets) with local files for development.

#### Installation Steps:

1. **Open VS Code**
2. Click **Extensions** on the left sidebar
3. Search for `sn-scriptsync`
4. Click the **sn-scriptsync** extension (by Arnoud Kooi)
5. Click **Install**
6. Restart VS Code (Ctrl+Shift+P → "Reload Window")

#### Verify Installation:

- You should see a **ServiceNow icon** in the left sidebar (orange/red N logo)
- Click it to open the sn-scriptsync panel

#### Configure sn-scriptsync:

1. Open the sn-scriptsync panel (click the ServiceNow icon in left sidebar)
2. Click **+ Add Instance** or the settings gear icon
3. Enter your instance details:
   - **Instance URL**: `https://your-instance.service-now.com` (e.g., `https://dev12345.service-now.com`)
   - **Username**: Your ServiceNow username
   - **Password**: Your ServiceNow password
   - **API Endpoint**: Leave as default (usually `/api/sn_scriptsync/v1`)

4. Click **Test Connection** to verify
5. Your instance will appear in the panel when connected

---

### 4. Install sn-utils Web Extension (Browser)

**sn-utils** is a browser extension that adds utility features to ServiceNow's web interface, making development easier.

#### Installation Steps:

**For Chrome/Chromium-based browsers (Chrome, Edge, Brave, etc.):**

1. Visit the **Chrome Web Store**: https://chromewebstore.google.com/detail/sn-utils/jgcljakibdemkfmhjbfjahjdhopkhfeg
2. Click **Add to Chrome**
3. Click **Add Extension** in the confirmation dialog
4. The extension icon should appear in your browser toolbar

**For Firefox:**

1. Visit **Firefox Add-ons**: https://addons.mozilla.org/en-US/firefox/addon/sn-utils/
2. Click **Add to Firefox**
3. Click **Add** in the confirmation dialog
4. The extension icon should appear in your browser toolbar

#### Configuration Steps:

1. Click the **sn-utils icon** in your browser toolbar
2. Click **Settings** (gear icon)
3. Configure options:
   - **Enable Extensions**: Toggle features you want to use
   - **Instance URL**: Enter your primary ServiceNow instance URL
   - **Username**: Enter your ServiceNow username
   - **Auto-save**: Enable if desired (saves form changes automatically)

4. Click **Save Settings**

---

### 5. How to Use sn-scriptsync (VS Code)

**sn-scriptsync** lets you edit ServiceNow artifacts locally and sync changes back to your instance.

#### Basic Workflow:

1. **Open sn-scriptsync Panel**:
   - Click the ServiceNow icon (orange N) in the VS Code left sidebar
   - You should see your configured instances

2. **Sync Artifacts FROM ServiceNow** (Pull):
   - Click your instance name in the panel
   - Expand categories (Business Rules, Script Includes, Widgets, etc.)
   - Click the **Download/Sync icon** next to an artifact
   - The artifact appears in your local folder: `your-instance-name/[scope]/[table]/[artifact-name].js`

3. **Edit Artifacts Locally**:
   - Open the synced file in VS Code
   - Make your changes
   - **Save the file** (Ctrl+S)
   - sn-scriptsync automatically syncs changes back to your ServiceNow instance after a short delay (~2-3 seconds)

4. **Create NEW Artifacts**:
   - Create a new file in the proper folder structure: `your-instance-name/global/sys_script_include/MyNewScript.script.js`
   - Add your code
   - **Save the file**
   - sn-scriptsync will create the artifact in ServiceNow and update the `_map.json` file

#### File Structure Reference:

```
your-instance-name/                    # Your instance folder (renamed from myinstance)
├── _settings.json                    # Connection settings (git-ignored)
├── _map.json                         # Maps local files to ServiceNow sys_ids (auto-updated)
├── global/                           # Global scope
│   ├── sys_script_include/          # Script Includes
│   │   ├── MyUtils.script.js
│   │   └── _map.json
│   ├── sys_script/                  # Business Rules
│   │   ├── MyRule.script.js
│   │   └── _map.json
│   └── [other tables]/
└── x_myorg_custom/                  # Scoped app (if applicable)
    ├── sys_script_include/
    └── [other tables]/
```

#### Tips:

- ✅ **Before syncing to production**: Always test changes in dev first
- ✅ **Check _map.json**: Keep these files in Git; they track artifact IDs
- ✅ **Use Git regularly**: Commit your changes frequently for version control
- ❌ **Don't manually edit _map.json**: Let sn-scriptsync manage this automatically
- ❌ **Don't commit _settings.json**: Already in .gitignore for security

---

### 6. How to Use sn-utils (Browser)

**sn-utils** adds helpful features directly in your ServiceNow instance web interface.

#### Common Features:

1. **Quick Copy Sys ID**:
   - Hover over any record in ServiceNow
   - Click the **copy icon** that appears
   - The sys_id is copied to your clipboard

2. **Table Inspector**:
   - Open a table view
   - Click **sn-utils icon** → **Table Inspector**
   - See field names, types, and descriptions

3. **Quick Links**:
   - The extension adds quick navigation links to common areas
   - Access via the sn-utils dropdown menu

4. **Code Highlighting**:
   - Script fields display with syntax highlighting
   - Makes code easier to read and review

5. **REST API Tester** (if enabled):
   - Test ServiceNow REST APIs directly from the browser
   - View requests and responses

#### Accessing sn-utils Features:

1. **While on your ServiceNow instance**:
   - Look for the **sn-utils icon** in your browser toolbar
   - Click it to see available options
   - Features vary based on which ServiceNow page you're on

2. **Context Menu Integration**:
   - Right-click on elements in ServiceNow
   - Look for sn-utils options in the context menu

3. **Settings**:
   - Click the sn-utils icon
   - Click **Settings**
   - Toggle features on/off based on your preferences

---

## File-by-File Customization Guide

### 1. `.github/copilot-instructions.md` (ServiceNow Sync Instructions)

**What it is:** Core reference for GitHub Copilot on how to work with sn-scriptsync extension.

**What to customize:**

After you rename the `myinstance/` folder to your actual instance name, update references throughout the boilerplate:
- **Find/Replace**: `myinstance` → your actual instance name (e.g., `dev12345`, `prod_instance`)
- **Find/Replace**: `x_abc_my_app` → your actual scoped app names (if applicable)

**Where to look for examples:**
- This file references `myinstance` as an example throughout
- Search for `myinstance` in `.github/copilot-instructions.md` and replace with your actual instance name
- Update any custom documentation that references the old instance name

**Generic vs. Specific:**
- ✅ Generic guidance: Kept as-is (applies to all instances)
- ❌ Instance-specific: Replace with your values

**After editing:**
This file is read automatically by Copilot. No additional steps needed.

---

### 2. `.github/agents/` (Specialized Agent Configurations)

**Files in this directory:**
- `architecture.agent.md`
- `developer.agent.md`
- `devops.agent.md`
- `qa.agent.md`
- `agent-creator.agent.md`

**What to customize in each:**

1. **YAML Frontmatter** (`description` field):
   ```yaml
   description: "Use when: [your specific use cases for YOUR project]"
   ```
   - Make descriptions specific to your ServiceNow implementation
   - Example: Change "ServiceNow HR Agent Workspace" to "HR Payroll Integration Agent"

2. **Agent scope and responsibilities** (in the agent body):
   - Review and adjust for your project's needs
   - Update examples to reference your custom tables/modules

3. **Tools access** (`tools:` field):
   - Keep default tools unless your security policies restrict them
   - Consider read/write/execute restrictions for your environment

**Example customization:**
```yaml
# BEFORE (Generic)
description: "Use when: creating or implementing ServiceNow artifacts"

# AFTER (Custom)
description: "Use when: implementing HR Service Delivery artifacts (Stories, Widgets, Business Rules)"
```

**When NOT to edit:**
- ❌ Don't remove agents (all five are important)
- ❌ Don't change `user-invocable: false` for `agent-creator` (it's a subagent)
- ❌ Don't remove core `tools` unless you have specific security requirements

---

### 3. `.github/skills/` (Reusable Domain Knowledge)

**Files in this directory:**
- `sn-code-review/SKILL.md`
- `sn-agent-workspace/SKILL.md`
- `sn-docs/SKILL.md`
- `sn-ux-consistency/SKILL.md`

**What to customize:**

Each skill has a frontmatter with a `description`:
```yaml
description: "Use when: [list of specific situations this skill helps with]"
```

**For each skill, decide:**
1. **Keep as-is?** → If it applies to your project (most do for standard ServiceNow)
2. **Customize description?** → Make it specific to your team/project
3. **Add new skill?** → Create `yourskill/SKILL.md` if you have domain-specific workflows

**Common customizations:**

| Skill | Customize? | Example |
|-------|-----------|---------|
| `sn-code-review` | Maybe | Add your org's specific security/performance standards |
| `sn-agent-workspace` | Yes* | Critical if using Agent Workspace; generic otherwise |
| `sn-docs` | Keep | Document templates work for any ServiceNow project |
| `sn-ux-consistency` | Maybe | Add your org's design system/branding rules |

*If you're NOT using ServiceNow Agent Workspace, you can comment out or remove the `sn-agent-workspace` skill.

**How to create a custom skill:**

1. Create `.github/skills/your-skill-name/` directory
2. Add `SKILL.md` file inside with YAML frontmatter
3. Copy the structure and frontmatter from an existing skill (e.g., `sn-code-review/SKILL.md`)
4. Update the `description` field to match your use case
5. Add your domain-specific content below the frontmatter
6. Reference it in your agents' `skills:` field when needed

---

### 4. `docs/collaboration-log.md` (Project Collaboration Log)

**What it is:** Running log of all session work, decisions, and changes.

**What to customize:**

**Header section (top of file):**
```markdown
# [Your Project Name] — Collaboration Log

**Project**: [Your Project]
**Team**: [Your Team/Organization]
**Date Range**: [Start Date] → Present
**Repository**: [Your Repo URL]
```

**Example:**
```markdown
# HR Service Delivery Portal — Collaboration Log

**Project**: HRSD Portal Modernization
**Team**: Deloitte ServiceNow Center of Excellence
**Date Range**: 2026-06-01 → Present
**Repository**: https://github.com/your-org/hrsd-portal
```

**What NOT to edit:**
- ❌ Remove existing session entries (keep all history)
- ❌ Change the format of session entries (consistency matters)

**How to maintain:**
- Keep entries chronological (newest at top)
- Add entry after each major session with Copilot
- Include: date, what was done, what was learned, any decisions made

---

### 5. `myinstance/` Folder (Your ServiceNow Instance)

**What it is:** Template folder structure for syncing ServiceNow artifacts. This is a boilerplate example you'll customize.

**What to customize:**

1. **Rename the folder:**
   ```
   BEFORE: myinstance/
   AFTER:  your-instance-name/
   ```
   Use your actual ServiceNow instance name (e.g., `dev12345`, `prod_hrsd`, `test-instance`)

2. **Update paths in any documentation** that references `dev394997`

3. **Inside the folder structure:**
   ```
   your-instance-name/
   ├── _settings.json          ← EDIT with your credentials
   ├── README.md               ← Reference guide for this folder
   ├── global/
   │   └── sys_script_include/
   │       ├── _map.json       ← Auto-managed by sn-scriptsync
   │       └── ExampleUtils.script.js  ← Example artifact template
   └── [other_scope]/          ← Add as you sync more scopes
   ```

4. **_settings.json:**
   - ✅ Keep this file
   - ⚠️ **CRITICAL — PROJECT APPROVAL REQUIRED** — This file contains credentials. You must:
     - Get approval from your project lead before adding credentials
     - Always add `**/settings.json` and `**/_settings.json` to `.gitignore`
     - Never commit credentials to version control
     - Never share this file outside your secure development environment

5. **_map.json files:**
   - ✅ Keep these files
   - ✅ Commit to version control
   - ❌ Never manually edit (auto-managed by extension)

---

### 6. Root Level Files

#### `.gitignore`
**What to check:**
```gitignore
# Add these if not present:
**/settings.json
**/_settings.json
# (keeps credentials out of version control)
```

#### `.github/` folder structure
**What it is:** Your AI agent configuration workspace.

**What to customize:**
- ✅ Keep full folder structure:
  - `.github/agents/` — Custom agent definitions
  - `.github/skills/` — Reusable domain knowledge
  - `.github/instructions/` — File-type specific rules
  - `.github/prompts/` — Custom prompt templates
  - `.github/hooks/` — Custom VS Code behavior
  - `copilot-instructions.md` — Copilot workspace guidance

---

## Customization Priority

### Must Do (Blocking):
1. **Rename `myinstance/` folder** to your actual instance name (e.g., `dev12345`, `prod_hrsd`)
   - This is critical: the folder name should match your ServiceNow instance
2. **Edit `_settings.json`** inside your renamed instance folder
   > ⚠️ **PROJECT APPROVAL REQUIRED** — Before adding ServiceNow credentials:
   > - Get explicit approval from your project lead
   > - Confirm credential storage is allowed in your project
   > - Understand your org's security policies for local credentials
   - Update `instanceUrl` to your ServiceNow instance URL
   - Update `username` and `password` with your credentials
3. **Verify `.gitignore`** contains:
   ```gitignore
   **/settings.json
   **/_settings.json
   ```
   - This prevents credentials from being committed to Git
4. **Update `.github/copilot-instructions.md`**
   - Search for all instances of `myinstance` and replace with your instance name
   - This ensures Copilot references your actual instance in examples

### Should Do (Recommended):
4. **Customize agent descriptions** in `.github/agents/`
   - Edit the `description` field in each `.agent.md` file's YAML frontmatter
   - Make descriptions specific to your project (e.g., "HRSD implementation" vs. generic "ServiceNow")
5. **Update `docs/collaboration-log.md`** header
   - Replace placeholder values with your project name, team, and repository
   - Start fresh with today's date as your first entry
6. **Review skill descriptions** in `.github/skills/`
   - Customize `description` fields to match your org's practices
   - Remove or comment out skills you won't use (e.g., `sn-agent-workspace` if not using Agent Workspace)

### Nice to Do (Optional):
7. **Create custom skills** for your org's specific patterns
   - Follow the pattern in `.github/skills/sn-code-review/SKILL.md`
   - Examples: `sn-performance-patterns/`, `sn-security-review/`, `org-naming-conventions/`
8. **Add `.github/instructions/` files** for file-type specific rules
   - Example: `.github/instructions/script-include.instructions.md` for your Script Include standards
   - Use `applyTo` patterns to apply to specific file paths
9. **Update `README.md`** in root with project-specific info
   - Add quick links to your ServiceNow instance
   - Document any custom setup requirements
   - Include links to team documentation

---

## Common Customization Patterns

### Pattern 1: HR Service Delivery Specific

If you're building HRSD solutions, you may want to:

1. Create a custom skill `.github/skills/hrsd-patterns/SKILL.md`:
   ```markdown
   # HRSD Patterns Skill
   
   Use when: Implementing HR Service Delivery table solutions, designing HR workflows, creating HRSD portal widgets
   
   [Your org's HRSD best practices]
   ```

2. Update agent descriptions to mention HRSD focus:
   ```yaml
   description: "Use when: implementing HRSD artifacts, designing HR workflows, creating Employee Center experiences"
   ```

### Pattern 2: Multi-Instance Setup

If you have multiple ServiceNow instances (dev, test, prod):

1. Create multiple instance folders:
   ```
   dev12345/
   test12346/
   prod12347/
   ```

2. Update `.github/copilot-instructions.md` with guidance:
   ```markdown
   ## Multiple Instances
   
   This workspace contains three instances:
   - dev12345 - Development environment
   - test12346 - Testing environment
   - prod12347 - Production environment (read-only)
   
   **Always confirm which instance** before creating/updating artifacts.
   ```

### Pattern 3: Scoped App Development

If developing a scoped app (e.g., `x_myorg_hrsd`):

1. After syncing first artifact, you'll have:
   ```
   your-instance/x_myorg_hrsd/[tables]/
   ```

2. Create a custom instruction file `.github/instructions/scoped-app.instructions.md`:
   ```markdown
   ---
   applyTo: "your-instance/x_myorg_hrsd/**"
   ---
   
   # Scoped App Development Standards
   
   [Your org's scoped app conventions]
   ```

---

## After Customization

### Validation Checklist

```bash
# 1. Verify instance folder renamed
ls -la your-instance-name/

# 2. Check _settings.json exists
cat your-instance-name/_settings.json

# 3. Verify .gitignore protects credentials
grep "_settings.json" .gitignore

# 4. Verify agents load in VS Code
# Open command palette (Ctrl+Shift+P) and type: @architecture
# Should see agents like: architecture, developer, devops, qa

# 5. Verify copilot-instructions was updated
# Check that your instance name (not "myinstance") appears in:
grep "myinstance" .github/copilot-instructions.md
# Should return no matches if properly updated

# 6. Test sn-scriptsync connection
# In VS Code, look at the status bar for sn-scriptsync indicator
# Should show connection status and be ready to sync
#
# ⚠️ PROJECT APPROVAL REQUIRED — Before syncing artifacts:
# - Only proceed if you have explicit approval from your project lead
# - Understand what artifacts will be synced to/from ServiceNow
# - Confirm this is an allowed development workflow in your org
```

### Commit Your Changes

```bash
git add .github/ docs/ your-instance-name/
git commit -m "Customize boilerplate for [Your Project]"
git push
```

### What NOT to Commit

```bash
# Already in .gitignore (verify):
your-instance-name/_settings.json
your-instance-name/**/settings.json
debug.log
```

---

## Troubleshooting

### Issue: Copilot still shows generic examples

**Solution:** 
- Clear Copilot cache: Cmd+Shift+P → "Reload Window"
- Wait 30 seconds for `.github/copilot-instructions.md` to reload
- Verify file was saved with your instance names

### Issue: Agents not appearing in agent selector

**Solution:**
- Verify `.agent.md` files are in `.github/agents/`
- Check YAML frontmatter has required fields (`description`, `name`)
- Reload VS Code window

### Issue: sn-scriptsync not syncing

**Solution:**
- Check `_settings.json` has correct instance URL and credentials
- Verify `your-instance-name/` folder exists
- Make sure at least one artifact is in proper structure: `your-instance/global/[table]/[artifact.js]`

---

## Next Steps

1. **Follow the Quick Start Checklist** at the top of this file in order
2. **Rename `myinstance/`** to your actual instance name
3. **Edit `_settings.json`** with your ServiceNow credentials
4. **Update `.github/copilot-instructions.md`** — replace all `myinstance` with your instance name
5. **Test the setup**:
   - Open VS Code and verify agents appear (command palette: `@architecture`)
   - Check sn-scriptsync status bar indicator
   - ⚠️ **PROJECT APPROVAL REQUIRED** — Only perform this test if you have approval:
     - Try creating a simple Script Include file and verify it syncs
     - This involves pushing code to your ServiceNow instance
     - Confirm your project allows local artifact sync before proceeding
6. **Customize agents and skills** for your specific project needs
7. **Update `docs/collaboration-log.md`** header with your project details
8. **Delete this Setup-README.md file** (or keep it as a reference for your team)

---

## Questions?

- **sn-scriptsync docs**: https://github.com/arnoudkooi/sn-scriptsync
- **ServiceNow docs**: https://docs.servicenow.com/
- **GitHub Copilot agent customization**: [Copilot agent documentation](https://github.com/features/copilot)
