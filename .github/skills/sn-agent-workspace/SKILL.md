---
name: sn-agent-workspace
description: 'ServiceNow HR Agent Workspace configuration. Use when: adding a new COE to the HR Agent Workspace side menu, configuring list views, setting up audiences, creating list categories, creating UX list views for cases/tasks/profiles/knowledge, reviewing existing agent workspace menu configurations, troubleshooting missing side menu items.'
argument-hint: 'Specify the COE name and the list views required (cases, HR tasks, HR profile, knowledge)'
---

# ServiceNow HR Agent Workspace Configuration

Configure the HR Agent Workspace side menu for a new Center of Excellence (COE). This covers creating a UI View, Audience, List Categories, UX List views, and the applicability links that control visibility.

## When to Use

- Adding a new COE to the HR Agent Workspace side menu
- Adding new list view items (cases, tasks, profiles, knowledge) to an existing menu
- Configuring role-based visibility for workspace sections
- Replicating an existing COE workspace config
- Troubleshooting a missing side menu section or list view

---

## Architecture

The HR Agent Workspace side menu is built in three tiers:

```
sys_ux_list_menu_config          ← The menu container (one per workspace config)
    ↑ configuration= (field on category)
sys_ux_list_category             ← Section headings in the left nav
    ↑ category= (field on list)
sys_ux_list                      ← Individual list items (Open, Closed, Assigned to me, etc.)
    ↑ linked via
sys_ux_applicability_m2m_list    ← Ties each list to an Audience record
    ↑ applicability= (field on m2m)
sys_ux_applicability             ← Audience: who sees this menu (role/group-based)
```

### Supporting record (required once per COE workspace):

```
sys_ui_view                      ← UI View with name pattern: hr_agent_workspace_{coe_slug}
```

> **Key insight:** `sys_ux_list_menu_config` is the entry point — without it, the category records (`sys_ux_list_category`) have no parent to attach to, and the menu will not render. Always query the existing `sys_ux_list_menu_config` first to confirm its sys_id before creating new categories.

---

## Table Reference

| Table | Purpose | Key Fields |
|-------|---------|-----------|
| `sys_ux_list_menu_config` | Menu container | `name`, `active`, `description` |
| `sys_ux_list_category` | Side menu section heading | `title`, `configuration` (→ menu config), `order`, `active` |
| `sys_ux_list` | Individual list view item | `title`, `table`, `condition`, `category` (→ list category), `configuration` (→ menu config), `active` |
| `sys_ux_applicability` | Audience / visibility rule | `name`, `active`, `api_name` (pattern: `{scope}.{COE Name}`) |
| `sys_ux_applicability_m2m_list` | Links a list to an audience | `applicability` (→ audience), `list` (→ sys_ux_list), `active` |
| `sys_ui_view` | UI View for the workspace | `name` (pattern: `hr_agent_workspace_{coe_slug}`), `hidden=false` |

---

## Procedure

### Step 1: Check Connection

Always verify the Agent API broker is ready before any commands:
```json
{ "command": "check_connection" }
```

---

### Step 2: Query Existing COE Config as Template

Capture the `sys_ux_list_menu_config` sys_id and naming patterns:

```json
{
  "command": "query_records",
  "params": {
    "table": "sys_ux_list_menu_config",
    "fields": "sys_id,name,active,description"
  }
}
```

Then query existing categories and list views:
```json
{
  "command": "query_records",
  "params": {
    "table": "sys_ux_list_category",
    "fields": "sys_id,title,order,configuration",
    "query": "configuration={existing_menu_config_sys_id}"
  }
}
```

```json
{
  "command": "query_records",
  "params": {
    "table": "sys_ux_list",
    "fields": "sys_id,title,table,condition,category,order,active",
    "query": "category.configuration={existing_menu_config_sys_id}"
  }
}
```

> Use the existing COE list views as the source of truth for: filter conditions (Open/Closed/Recently updated), Case SLAs admin role, HR Tasks table, HR Profile table, Knowledge tables.

---

### Step 3: Create UI View

```json
{
  "command": "create_artifact",
  "params": {
    "table": "sys_ui_view",
    "scope": "sn_hr_agent_ws",
    "fields": {
      "name": "hr_agent_workspace_{coe_slug}",
      "title": "{COE Display Name}",
      "hidden": "false"
    }
  }
}
```

**Naming convention:** `hr_agent_workspace_product_support`, `hr_agent_workspace_payroll`, etc.

---

### Step 4: Create Audience (`sys_ux_applicability`)

```json
{
  "command": "create_artifact",
  "params": {
    "table": "sys_ux_applicability",
    "scope": "sn_hr_agent_ws",
    "fields": {
      "name": "HR {COE Display Name}",
      "active": "true",
      "api_name": "sn_hr_agent_ws.HR {COE Display Name}"
    }
  }
}
```

> Optionally add User Criteria inclusion records (`sys_ux_criteria_m2m_inclusion`) to scope the audience to the correct role or group. This controls which users see the menu.

---

### Step 5: Create List Categories (`sys_ux_list_category`)

One category per section. Standard sections for an HRSD COE workspace:

| Section Title | Purpose |
|--------------|---------|
| `{COE Name} Cases` or descriptive label | All case-related list views |
| HR Tasks | Task views (uses `sn_hr_core_task`) |
| HR Profile | Profile view (uses `sn_hr_core_profile`) |
| Knowledge | KB article and task views |

```json
{
  "command": "create_artifact",
  "params": {
    "table": "sys_ux_list_category",
    "scope": "sn_hr_agent_ws",
    "fields": {
      "title": "All {COE Name} Cases",
      "configuration": "{sys_ux_list_menu_config_sys_id}",
      "order": "100",
      "active": "true"
    }
  }
}
```

> **Lesson learned:** The category title (e.g., "All Product Support Cases") serves as the section heading — it is NOT a duplicate of a list view. The list items underneath are the individual filtered views (Open, Closed, etc.).

---

### Step 6: Create List Views (`sys_ux_list`)

Each list view is one entry in the side menu under its category.

#### Standard Case List Views

All point to the COE's case table (e.g., `sn_hr_core_{coe_table}`):

| Title | Condition | Notes |
|-------|-----------|-------|
| Assigned to me | `assigned_to=javascript:gs.getUserID()` | |
| Collaborations | `collaborator_list=javascript:gs.getUserID()` | |
| Open | *(match existing COE open filter)* | |
| Open - unassigned | `active=true^assigned_toISEMPTY` | |
| Closed | *(match existing COE closed filter)* | |
| Recently updated | *(match existing COE sort/filter)* | |
| All | *(none)* | |
| Case SLAs | *(SLA filter)* | Table: `task_sla` — Admin role only |

```json
{
  "command": "create_artifact",
  "params": {
    "table": "sys_ux_list",
    "scope": "sn_hr_agent_ws",
    "fields": {
      "title": "Assigned to me",
      "table": "sn_hr_core_{coe_table}",
      "condition": "assigned_to=javascript:gs.getUserID()",
      "category": "{list_category_sys_id}",
      "configuration": "{sys_ux_list_menu_config_sys_id}",
      "active": "true",
      "order": "100"
    }
  }
}
```

#### Standard HR Tasks List Views

Table: `sn_hr_core_task` — 5 views: Assigned to me, Open, Open - unassigned, Closed, All

#### HR Profile List View

Table: `sn_hr_core_profile` — 1 view: "HR profiles"

#### Knowledge List Views

| Title | Table |
|-------|-------|
| My articles - unpublished | `kb_knowledge` |
| My articles - published | `kb_knowledge` |
| All articles | `kb_knowledge` |
| My tasks - feedback | `kb_task` |
| My tasks - flagged | `kb_task` |

---

### Step 7: Create List Applicability Records (`sys_ux_applicability_m2m_list`)

**One record per list view** — links the list to the Audience so only the right users see it:

```json
{
  "command": "create_artifact",
  "params": {
    "table": "sys_ux_applicability_m2m_list",
    "scope": "sn_hr_agent_ws",
    "fields": {
      "applicability": "{audience_sys_id}",
      "list": "{sys_ux_list_sys_id}",
      "active": "true"
    }
  }
}
```

> Create one of these for every `sys_ux_list` record created in Step 6. This is easy to miss — if a list view is not appearing in the workspace, a missing applicability record is the most common cause.

---

### Step 8: Sync and Verify

```json
{ "command": "sync_now" }
```

Then visually verify in the instance:
1. Log in as a user with `agent_workspace_user` + the COE's read role
2. Navigate to HR Agent Workspace
3. Confirm the new section heading appears in the left nav
4. Click each list view — confirm correct records and empty states
5. Verify Case SLAs is hidden for non-admin users

---

## Common Mistakes

| Mistake | Symptom | Fix |
|---------|---------|-----|
| Missing `sys_ux_applicability_m2m_list` record | List view exists in the table but never appears in the workspace | Create the m2m applicability record |
| Wrong `configuration` sys_id on category | Category not associated with correct menu | Re-query `sys_ux_list_menu_config` and update the category |
| Using `sys_aw_list` / `sys_aw_list_category` tables | Old Agent Workspace tables — not the UX framework | Use `sys_ux_list` / `sys_ux_list_category` |
| Category title same as a list view title | Confusing UX — category is the section, list views are the items | Rename one of them |
| Case SLAs on wrong table | No SLA data shown | Use `task_sla` table, not the case table |

---

## Reference: Example COE Configuration

| Artifact | Table | Name | Scope |
|----------|-------|------|-------|
| UI View | `sys_ui_view` | `hr_agent_workspace_{coe_slug}` | `sn_hr_agent_ws` |
| Audience | `sys_ux_applicability` | HR {COE Name} | `sn_hr_agent_ws` |
| Category | `sys_ux_list_category` | All {COE Name} Cases | `sn_hr_agent_ws` |
| Case Lists (8) | `sys_ux_list` | Assigned to me, Collaborations, Open, Open - unassigned, Closed, Recently updated, All, Case SLAs | `sn_hr_agent_ws` |
