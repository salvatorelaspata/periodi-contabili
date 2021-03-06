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
        /** TXT */
        generateTxt.createIM(null, txtHeader, txtPosizioni);
      },
      onInit: function () {
        const oView = this.getView();
        /** TXT - Start */
        const txtHeader = this.getOwnerComponent().getModel("txtHeader");
        const txtPosizioni = this.getOwnerComponent().getModel("txtPosizioni");
        oView.setModel(txtHeader, "DauHeader");
        oView.setModel(txtPosizioni, "DauSingleItemModel");
        /** TXT - End */
        /** PERIODI CONTABILI - Start */
        const oModel = this.getOwnerComponent().getModel("TreeTable");
        oView.setModel(oModel, "TreeTable");

        let periodiContabili = this._parsePeriodiContabili(oModel.getData());
        periodiContabili = this._groupBy(periodiContabili);
        /** TABELLA TOTALI - Start */
        debugger;
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
            subjectCode: "di cui",
            pieces: count,
            doganeItem: material,
          });
        }
        oDataTotal.unshift({
          subjectCode: "Totale",
          pieces: totale,
          doganeItem: "",
        });

        const oModelTotal = new sap.ui.model.json.JSONModel(oDataTotal);
        oView.setModel(oModelTotal, "totalPeriodiContabili");
        /** TABELLA TOTALI - End */

        /** SUBTOTALI - Start */
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
            doganeItem: "",
            doganePosition: "",
            valueCurrency: "",
            origin: "",
            originPref: "",
            originNotPref: "",
            transDocIntroIM7: "",
            transDocExtcnIM4: "",
            subjectCode: "Sub Totale",
            stockDocument: "",
          };
          array.push(objToPush);
        }
        /** SUBTOTALI - End */

        const periodiContabiliTable =
          this._createTablePeriodi(periodiContabili);

        oView.byId("container-periodi-contabili").addItem(
          new sap.m.FlexBox({
            direction: "Column",
            items: periodiContabiliTable,
          })
        );
        /** PERIODI CONTABILI - End */
      },
      _groupBy: function (periodiContabili) {
        for (const [year, array] of Object.entries(periodiContabili)) {
          var helper = {};
          periodiContabili[year] = array.reduce(function (r, o) {
            var key = o.subjectCode + "-" + o.doganeItem;

            if (!helper[key]) {
              helper[key] = Object.assign({}, o); // create a copy of o
              r.push(helper[key]);
            } else {
              helper[key].pieces += o.pieces;
              helper[key].netWeight += o.netWeight;
              helper[key].grossWeight += o.grossWeight;
            }

            return r;
          }, []);
        }
        return periodiContabili;
      },
      _parsePeriodiContabili: function (oData) {
        const data = oData.RegisterCollection;

        //sortByDate
        data.sort(function (a, b) {
          //if (a.date < b.date) {
          if (a.date.split("/")[2] < b.date.split("/")[2]) {
            return -1;
          } else if (a.date.split("/")[2] > b.date.split("/")[2]) {
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
      onExport: function (oEvent) {
        //recupero i dati
        var TreeTable = this.getOwnerComponent()
          .getModel("TreeTable")
          .getData();

        var oSettings;

        oSettings = exportXLSX.createSettings(
          "TreeTable",
          exportXLSX.createColumnConfig(exportXLSX.treeTableCols), //this._createColumnConfigTreeTable(),
          TreeTable.RegisterCollection
        );
        exportXLSX.export(oSettings);
        debugger;

        const oDynamicVBox = this.getView()
          .byId("container-periodi-contabili")
          .getItems()[0]
          .getItems();
        let items = [];
        oDynamicVBox.map(function (table) {
          items = items.concat(table.getItems());
        });
        let array = items.map(function (i) {
          return i.getBindingContext().getObject();
        });

        const totalPeriodiContabili = this.getView()
          .getModel("totalPeriodiContabili")
          .getData();

        array = array.concat({}, totalPeriodiContabili);

        exportXLSX.export(
          exportXLSX.createSettings(
            "Periodi Contabili",
            exportXLSX.createColumnConfig(exportXLSX.totaleQntCols),
            array
          )
        );
      },
    });
  }
);
