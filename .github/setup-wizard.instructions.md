---
applyTo: "**"
description: "First-time setup detection and interactive onboarding for ServiceNow boilerplate"
---

# Setup Wizard — Interactive Onboarding

**Purpose:** Automatically detect first-time setup and guide users through configuration interactively.

## Setup Detection

### Checking Setup Status

When you first open this workspace, I'll check if setup is complete by looking for:

1. **Instance folder renamed** — Looking for anything OTHER than `myinstance/`
2. **Credentials configured** — Checking if `_settings.json` exists in your instance folder
3. **Extensions installed** — Checking for GitHub Copilot and sn-scriptsync

If any of these are missing, I'll offer guided setup.

### First-Time Setup Prompt

**If this is your first time opening this project, you should see:**

```
🚀 Welcome to ServiceNow Boilerplate!

This workspace needs setup before you can start developing. 

I can help you get configured. Would you like me to:
  1. Walk you through setup step-by-step ✓ (Recommended)
  2. Just show me the README
  3. I'll do this later
```

---

## Interactive Setup Guide

### Step 1: Instance Setup
I'll ask:
```
What's your ServiceNow instance name? (e.g., dev12345, prod_hrsd)
```
- I'll help you rename the `myinstance/` folder
- Verify the folder structure is correct

### Step 2: Extensions Check
I'll verify:
```
Checking for required extensions...
  ✓ GitHub Copilot
  ✓ sn-scriptsync (ServiceNow Script Sync)
  ❌ sn-utils (Web extension)

Missing extensions? I can guide you to install them!
```

### Step 3: Credentials Configuration
I'll explain:
```
Your instance needs credentials to sync artifacts.

I'll help you:
1. Locate your _settings.json file
2. Add your instance URL
3. Add your username and password
4. Test the connection
```

**Security note:** These credentials are protected by `.gitignore` and won't be committed to Git.

### Step 4: Verification
I'll guide you through:
```
Let's verify everything is working:
  □ sn-scriptsync can see your instance
  □ Agents are loading in VS Code
  □ You can run a quick test sync
```

### Step 5: Next Steps
Once setup is complete:
```
✅ Setup complete! Here's what's next:

1. Customize your agents in .github/agents/
2. Update your collaboration log
3. Start syncing ServiceNow artifacts

Need help? Type: "help me get started"
```

---

## How to Use This Setup Guide

### If setup is NOT complete:

**Option A: Interactive guided setup (Recommended)**
- I'll detect missing setup on first use
- Simply respond "yes" when I offer to help
- I'll walk you through each step
- Takes about 5 minutes

**Option B: Manual setup**
- Open the README.md at the root
- Follow the "Customization Priority" section
- I can still help if you get stuck

**Option C: Ask for help anytime**
- Type in Copilot chat: `"Help me set up the boilerplate"`
- Type: `"What setup steps do I need to complete?"`
- I'll detect your current setup state and guide you

### If setup IS complete:

- You're ready to start developing!
- I'll offer help with:
  - Syncing artifacts from ServiceNow
  - Creating new artifacts
  - Code reviews
  - Documentation

---

## What I'll Check For

### Required Setup Items

1. **Instance folder** (CRITICAL)
   - ✅ Renamed from `myinstance/` to your actual instance (e.g., `dev12345/`)
   - ❌ Still named `myinstance/` → I'll offer to rename it

2. **Credentials** (CRITICAL)
   - ✅ `_settings.json` exists in your instance folder
   - ✅ Contains: instanceUrl, username, password
   - ❌ Missing or incomplete → I'll guide you to create/update it

3. **Extensions** (HIGHLY RECOMMENDED)
   - ✅ GitHub Copilot installed
   - ✅ sn-scriptsync installed
   - ❌ Missing → I'll provide installation links

4. **Configuration files** (RECOMMENDED)
   - ✅ `.gitignore` created with credential protection
   - ✅ README.md exists
   - ❌ Missing → I'll guide you through creation

### Optional Setup Items

- Customized agent descriptions
- Collaboration log updated
- Skill descriptions customized

---

## Conversation Flow

### If I detect incomplete setup:

**Me:**
```
👋 Welcome! I notice this is the first time 
this workspace is being set up.

Would you like me to guide you through 
the setup process? (Takes ~5 minutes)

Just say "yes" and I'll walk you through it!
```

### You respond: "yes"

**Me:**
```
Great! Let's get started.

First, I need to know: What's your 
ServiceNow instance name?

Examples: dev12345, prod_hrsd, test_instance
```

### You respond: "dev12345"

**Me:**
```
Perfect! I'll help you:

1. Rename myinstance/ → dev12345/
2. Set up your credentials
3. Verify sn-scriptsync connection
4. Test the setup

Let's start with renaming the folder.
Click here to open the file explorer...
[Explanation of steps]

Did you rename it? (yes/no)
```

---

## Commands You Can Use

### Explicit setup commands:

```
"Set up the boilerplate"
"Help me with initial setup"
"I'm new - guide me through setup"
"Check my setup status"
"Complete first-time setup"
```

### Status check commands:

```
"Am I set up?"
"What setup steps are missing?"
"Is my instance configured?"
```

### Help commands:

```
"How do I configure my credentials?"
"How do I install sn-scriptsync?"
"What's the folder structure?"
```

---

## What NOT to worry about

- ❌ You don't need to understand all the files yet
- ❌ You don't need to memorize folder structure
- ❌ You don't need to read the full README first
- ✅ Just follow my prompts and I'll handle the rest

---

## After Setup is Complete

Once everything is configured, I'll help you with:

- **Syncing artifacts** from ServiceNow
- **Creating new artifacts** locally
- **Code reviews** for quality and security
- **Documentation** generation
- **Troubleshooting** any issues

Just ask: `"What can I do now?"` and I'll show you the next steps.

---

## If Something Goes Wrong

If you get stuck or something doesn't work:

```
"Setup isn't working"
"I got an error during setup"
"My credentials aren't working"
"sn-scriptsync won't connect"
```

I'll help you troubleshoot and guide you to a solution.

---

## Disabling This Prompt

If you want to skip guided setup and do it manually:

```
"Don't prompt me about setup"
"I'll set this up myself"
"Skip the setup wizard"
```

I'll still offer help if you ask, but won't automatically prompt you.

To re-enable prompts later:

```
"Show me the setup wizard again"
"Restart setup wizard"
```

---

## Security Reminders

During setup, I'll remind you:

- ✅ Your credentials go in `_settings.json` (git-ignored)
- ✅ Never commit `_settings.json` to version control
- ✅ `.gitignore` protects your credentials automatically
- ✅ Get project approval before syncing to production

**I will never ask for or store your credentials.**
