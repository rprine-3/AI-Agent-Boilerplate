/**
 * ExampleUtils - Sample Script Include
 * 
 * This is an example Script Include file. When you sync artifacts from ServiceNow
 * using the sn-scriptsync extension, they will appear in this folder structure.
 * 
 * File naming convention: {ArtifactName}.script.js
 * 
 * To customize this boilerplate:
 * 1. Rename the parent folder "myinstance" to your actual instance name (e.g., "dev12345")
 * 2. Update myinstance/_settings.json with your ServiceNow credentials
 * 3. Sync your first artifact from ServiceNow using the sn-scriptsync extension
 * 4. The extension will create the proper folder structure automatically
 */

var ExampleUtils = Class.create();
ExampleUtils.prototype = {
    initialize: function() {
    },

    /**
     * Example method
     * @return {string} A greeting message
     */
    greet: function(name) {
        return 'Hello, ' + name + '!';
    },

    type: 'ExampleUtils'
};
