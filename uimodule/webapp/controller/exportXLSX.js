sap.ui.define(
  ["./exportXLSX", "sap/ui/export/Spreadsheet", "sap/ui/export/library"],
  function (_, Spreadsheet, exportLibrary) {
    "use strict";

    var EdmType = exportLibrary.EdmType;
    return {
      export: function (oSettings) {
        var oSheet = new Spreadsheet(oSettings);
        oSheet.build().finally(function () {
          oSheet.destroy();
        });
      },
      createSettings: function (filename, columns, data) {
        return {
          workbook: {
            columns: columns,
            context: {
              sheetName: "TreeTable",
            },
          },
          dataSource: data,
          fileName: filename,
          worker: false, // We need to disable worker because we are using a Mockserver as OData Service
        };
      },
      createColumnConfig: function (cols) {
        return cols.map((c) => {
          return {
            label: c.label,
            type: EdmType.String,
            property: c.property,
            wrap: false,
          };
        });
      },
      totaleQntCols: [
        { label: "Codice oggetto", property: "subjectCode" },
        { label: "Voce doganale", property: "doganeItem" },
        { label: "Pezzi", property: "pieces" },
        { label: "Peso lordo", property: "grossWeight" },
        { label: "peso Netto (Kg)", property: "netWeight" },
        { label: "value", property: "value" },
      ],
      treeTableCols: [
        { label: "nro", property: "nro" },
        { label: "date", property: "date" },
        { label: "pieces", property: "pieces" },
        { label: "grossWeight", property: "grossWeight" },
        { label: "netWeight", property: "netWeight" },
        { label: "doganeItem", property: "doganeItem" },
        { label: "doganePosition", property: "doganePosition" },
        { label: "valueCurrency", property: "valueCurrency" },
        { label: "origin", property: "origin" },
        { label: "originPref", property: "originPref" },
        { label: "originNotPref", property: "originNotPref" },
        { label: "transDocIntroIM7", property: "transDocIntroIM7" },
        { label: "transDocExtcnIM4", property: "transDocExtcnIM4" },
        { label: "subjectCode", property: "subjectCode" },
        { label: "stockDocument", property: "stockDocument" },
      ],
    };
  }
);
