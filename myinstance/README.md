# ServiceNow Instance Folder - Example

This is an example instance folder structure for the sn-scriptsync boilerplate.

## Quick Customize

**Before using this boilerplate, rename this folder:**

```
BEFORE: myinstance/
AFTER:  your-instance-name/
```

Example: `dev12345/`, `prod_hrsd/`, `test-instance/`

## Folder Structure

```
myinstance/
├── _settings.json                 ← Your ServiceNow instance credentials
├── global/                        ← Global scope artifacts
│   └── sys_script_include/       ← Script Include table
│       ├── _map.json             ← Auto-managed by sn-scriptsync
│       └── ExampleUtils.script.js ← Example artifact
└── x_your_scope/                 ← (Optional) Scoped app artifacts
    └── sys_script_include/
        ├── _map.json
        └── YourUtils.script.js
```

## _settings.json

Edit with your ServiceNow instance details:

```json
{
  "instanceUrl": "https://dev12345.service-now.com",
  "username": "your_username",
  "password": "your_password_or_api_token",
  "scope": "global"
}
```

⚠️ **SECURITY**: This file contains credentials. Add it to `.gitignore` so it's never committed to version control.

## How sn-scriptsync Works

1. You edit files in this folder
2. Save the file
3. The sn-scriptsync extension automatically syncs to ServiceNow
4. The extension updates `_map.json` with sys_ids

## Creating New Artifacts

1. **Create the file** in the correct location:
   ```
   myinstance/global/sys_script_include/MyNewUtils.script.js
   ```

2. **Write your code:**
   ```javascript
   var MyNewUtils = Class.create();
   MyNewUtils.prototype = {
       myMethod: function() {
           return 'Hello World';
       },
       type: 'MyNewUtils'
   };
   ```

3. **Save** — sn-scriptsync handles the rest!

## Next Steps

- See `.github/copilot-instructions.md` for detailed guidance
- See `.github/Setup-README.md` for boilerplate customization steps
- See sn-scriptsync docs: https://github.com/arnoudkooi/sn-scriptsync
