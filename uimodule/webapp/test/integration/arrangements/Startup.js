sap.ui.define(["sap/ui/test/Opa5"], function (Opa5) {
    "use strict";

    return Opa5.extend("com.myorg.spreadsheet.test.integration.arrangements.Startup", {
        iStartMyApp: function () {
            this.iStartMyUIComponent({
                componentConfig: {
                    name: "com.myorg.spreadsheet",
                    async: true,
                    manifest: true
                }
            });
        }
    });
});
