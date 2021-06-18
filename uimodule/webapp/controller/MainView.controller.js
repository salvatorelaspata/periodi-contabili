sap.ui.define(
  [
    "com/myorg/spreadsheet/controller/BaseController",
    "./exportXLSX",
    "./generateTxt",
  ],
  function (BaseController, exportXLSX, generateTxt) {
    "use strict";
    return BaseController.extend("com.myorg.spreadsheet.controller.MainView", {
      onPressHelp: function () {
        const txtHeader = this.getOwnerComponent()
          .getModel("txtHeader")
          .getData();
        const txtPosizioni = this.getOwnerComponent()
          .getModel("txtPosizioni")
          .getData();
        generateTxt.createIM(null, txtHeader, txtPosizioni);
      },
      onInit: function () {
        const oView = this.getView();
        /** TXT - Start */
        // const emptyModel = new sap.ui.model.json.JSONModel();
        // prepopolo i valori del form
        const txtHeader = this.getOwnerComponent().getModel("txtHeader");
        const txtPosizioni = this.getOwnerComponent().getModel("txtPosizioni");
        oView.setModel(txtHeader, "DauHeader");
        oView.setModel(txtPosizioni, "DauSingleItemModel");
        /** TXT - End */
        const oModel = this.getOwnerComponent().getModel("TreeTable");
        oView.setModel(oModel, "TreeTable");
        const periodiContabili = this._parsePeriodiContabili(oModel.getData());

        const objMaterial = {};
        let totale = 0;
        oModel.getData().RegisterCollection.map((a) => {
          if (a.doganeItem) {
            if (!objMaterial[a.doganeItem]) {
              objMaterial[a.doganeItem] = parseFloat(a.pieces);
            } else {
              objMaterial[a.doganeItem] += parseFloat(a.pieces);
            }
            totale += parseFloat(a.pieces);
          }
        });
        let oDataTotal = [];
        for (const [material, count] of Object.entries(objMaterial)) {
          oDataTotal.push({
            label: "di cui",
            totale: count,
            materiale: material,
          });
        }
        oDataTotal.unshift({
          label: "Totale",
          totale: totale,
          materiale: "",
        });

        const oModelTotal = new sap.ui.model.json.JSONModel(oDataTotal);
        oView.setModel(oModelTotal, "totalPeriodiContabili");

        //ciclo ogni anno per calcolare il sub totale
        for (const [year, array] of Object.entries(periodiContabili)) {
          const grossWeight = array.reduce(
            (a, b) => a + (parseFloat(b["grossWeight"]) || 0),
            0
          );
          const netWeight = array.reduce(
            (a, b) => a + (parseFloat(b["netWeight"]) || 0),
            0
          );

          const pieces = array.reduce(
            (a, b) => a + (parseFloat(b["pieces"]) || 0),
            0
          );

          var objToPush = {
            nro: "",
            date: "",
            pieces: pieces,
            grossWeight: grossWeight,
            netWeight: netWeight,
            doganeItem: "Sub Totale",
            doganePosition: "",
            valueCurrency: "",
            origin: "",
            originPref: "",
            originNotPref: "",
            transDocIntroIM7: "",
            transDocExtcnIM4: "",
            subjectCode: "",
            stockDocument: "",
          };
          array.push(objToPush);
        }

        const periodiContabiliTable =
          this._createTablePeriodi(periodiContabili);

        oView.byId("container-periodi-contabili").addItem(
          new sap.m.FlexBox({
            direction: "Column",
            items: periodiContabiliTable,
          })
        );
      },
      _parsePeriodiContabili: function (oData) {
        const data = oData.RegisterCollection;

        //sortByDate
        data.sort(function (a, b) {
          //if (a.date < b.date) {
          if (a.date.split("/")[2] < b.date.split("/")[2]) {
            return -1;
          } else if (a.date > b.date) {
            return 1;
          } else {
            return 0;
          }
        });

        let currentYear = [];
        let obj = {};
        data.map(function (d) {
          const year = d.date.split("/")[2];
          if (currentYear.indexOf(year) === -1) {
            currentYear.push(year);
            if (!isNaN(parseInt(d.nro))) obj[year] = [d];
          } else {
            if (!isNaN(parseInt(d.nro))) obj[year].push(d);
          }
        });

        return obj;
      },
      _createTablePeriodi: function (periodiContabili) {
        const self = this;
        let container = [];
        for (const [year, array] of Object.entries(periodiContabili)) {
          const oModel = new sap.ui.model.json.JSONModel(array);
          const oTable = self._createTable(oModel);

          const length = oTable.getItems().length;
          const lastRows = oTable.getItems()[length - 1];
          lastRows.getCells().map((cel) => {
            cel.addStyleClass(`bold`);
          });
          // inserisco una riga per il subTotale
          container.push(oTable);
        }
        return container;
      },
      _createTable: function (oModel) {
        const items = this._createItemsPeriodi();
        const oTable = new sap.m.Table({
          columns: this._createColumnsPeriodi(),
        });

        oTable.bindItems("/", items);
        oTable.setModel(oModel);
        return oTable;
      },
      _createColumnsPeriodi: function () {
        const col = exportXLSX.totaleQntCols;
        return col.map(function (c) {
          return new sap.m.Column({
            header: new sap.m.Text({ text: c.label }),
          });
        });
      },
      _createItemsPeriodi: function () {
        const col = exportXLSX.totaleQntCols;
        return new sap.m.ColumnListItem({
          cells: col.map(function (cc) {
            return new sap.m.Text({
              text: `{${cc.property}}`,
            });
          }),
        });
      },
      onExport: function () {
        //recupero i dati
        var TreeTable = this.getOwnerComponent()
          .getModel("TreeTable")
          .getData();
        var TotaleQuantita1 = this.getOwnerComponent()
          .getModel("TotaleQuantita1")
          .getData();
        var TotaleQuantita2 = this.getOwnerComponent()
          .getModel("TotaleQuantita2")
          .getData();

        //effettuo il merge dei totali
        const totale = TotaleQuantita1.doganeItem.concat(
          { subjectCode: "Antani come se non ci fosse un domani xD" },
          TotaleQuantita2.doganeItem
        );

        var oSettings;

        oSettings = exportXLSX.createSettings(
          "TreeTable",
          exportXLSX.createColumnConfig(exportXLSX.treeTableCols), //this._createColumnConfigTreeTable(),
          TreeTable.RegisterCollection
        );
        exportXLSX.export(oSettings);

        var aColsTotaleQuantita = exportXLSX.createColumnConfig(
          exportXLSX.totaleQntCols
        );

        oSettings = exportXLSX.createSettings(
          "TotaleQuantita1",
          aColsTotaleQuantita,
          TotaleQuantita1.doganeItem
        );
        exportXLSX.export(oSettings);

        oSettings = exportXLSX.createSettings(
          "TotaleQuantita2",
          aColsTotaleQuantita,
          TotaleQuantita2.doganeItem
        );

        exportXLSX.export(oSettings);

        oSettings = exportXLSX.createSettings(
          "Totale",
          aColsTotaleQuantita,
          totale
        );
        exportXLSX.export(oSettings);
      },
    });
  }
);
