sap.ui.define(["./generateTxt"], function () {
  "use strict";

  return {
    createIM: function (txtHeader, txtTestata, txtPosizioni) {
      console.log(txtHeader, txtTestata, txtPosizioni);
      //   this._parseModelToText(txtHeader, txtPosizioni);
      this._downloadToFile(
        this._parseModelToText(txtHeader, txtTestata, txtPosizioni),
        "my-new-file.txt",
        "text/plain"
      );
    },
    _downloadToFile: function (content, filename, contentType) {
      const a = document.createElement("a");
      const file = new Blob([content], { type: contentType });

      a.href = URL.createObjectURL(file);
      a.download = filename;
      a.click();

      URL.revokeObjectURL(a.href);
    },
    _parseModelToText: function (txtHeader, txtTestata, txtPosizioni) {
      // const headerRor = this._createHeaderRow(txtHeader);
      const headerRor = this._createHeaderRow(
        {
          USER: "",
          COD_UTENTE: "",
          NOME_FLUSSO: "",
          SEZIONE_DOGANALE: "",
          COD_EORI: "",
          COD_FISCALE: "",
          PROG_SEDE: "",
        },
        txtPosizioni.length.toString()
      );

      const up = [txtTestata].concat(txtPosizioni);
      const details = this._createDetailRows(up);
      //  const details = this._createDetailRows([{}, {}]);

      return `${headerRor}\n${details}`;
    },
    _createHeaderRow: function (header, totRows) {
      const {
        USER,
        COD_UTENTE,
        NOME_FLUSSO,
        SEZIONE_DOGANALE,
        COD_EORI,
        COD_FISCALE,
        PROG_SEDE,
      } = header;
      return (
        this._ps(COD_UTENTE, "X(4)") + // Codice utente abilitato (mittente)
        this._ps("", "X(12)") + // Riservato a SDA
        this._ps(NOME_FLUSSO, "X(12)") +
        this._ps("", "X(12)") + // Riservato a SDA
        this._ps(SEZIONE_DOGANALE, "9(6)") + // Codice sezione doganale presso la quale si effettua l'operazione
        this._ps("", "X(4)") + // Riservato a SDA
        this._ps(COD_FISCALE, "X(16)") + // Codice fiscale o numero partita IVA o codice spedizioniere del richiedente (utente autorizzato)
        this._ps(PROG_SEDE, "9(3)") + // Progressivo sede utente autorizzato
        this._ps("", "X(1)") + // Riservato a SDA
        this._ps(totRows, "9(5)") // Numero di record presenti nel flusso (compreso il record di testa)
      );
    },
    _createDetailRows: function (detailRows) {
      const self = this;
      let string = "";
      let testata = null;
      detailRows.map(function (e, i) {
        //per ogni riga di tettaglio creo la parte fissa
        let fixedPart, contentPart;
        if (i === 0) {
          fixedPart = self._createFixedPart({
            type: "T",
            messageCode: "",
            progressiveYearPratica: "",
            progressiveNumber: "",
          });
          contentPart = self._composeContentPartTestata(e);
          testata = e;
        } else {
          fixedPart = self._createFixedPart({
            type: "?",
            messageCode: "",
            progressiveYearPratica: "",
            progressiveNumber: "",
          });
          contentPart = self._composeContentPart(e, testata);
        }
        string += `${fixedPart}${contentPart}\n`;
      });
      return string;
    },
    _createFixedPart: function (obj) {
      const { type, messageCode, progressiveYearPratica, progressiveNumber } =
        obj;
      return (
        this._ps(type, "X(1)") + // Tipo record: testata = "T" continuazione = "?"
        this._ps(messageCode, "X(8)") + // Codice del messaggio di tempo reale
        this._ps("", "X(4)") + // Campo vuoto
        this._ps("", "X(1)") + // Campo vuoto
        this._ps(progressiveYearPratica, "9(6)") + // Numero progressivo annuale della pratica
        this._ps(progressiveNumber, "9(2)") // Numero progressivo (a partire da zero) dei messaggi relativi ad una stessa pratica
      );
    },
    _composeContentPartTestata: function (e) {
      console.log(e);
      return (
        this._psD("", "n..6") + // Numero dell'autorizzazione
        this._psD("", "a1") + // "CIN dell'autorizzazione"
        this._psD("", "n..6") + // Numero del registro aziendale
        this._psD("", "an..2") + // Serie del registro aziendale
        this._psD("", "n8") + // Data del registro aziendale
        this._psD("", "n..8") + // Numero preavviso
        this._psD("", "n..8") + // Numero d'ordine del preavviso
        this._psD("", "n8") + // Data del preavviso
        this._psD("", "n1") + // Pre-clearing
        // Dichiarazione
        this._psD(e.DICHIARAZIONE1_FORMULARIO, "a..3") +
        this._psD(e.DICHIARAZIONE2_TIPO, "a1") +
        this._psD(e.DICHIARAZIONE3_TIPO_SPEDIZIONE, "an..5") +
        this._psD(e.DATA_ACCETTAZIONE, "n8") +
        this._psD(e.DATI_TESTATA_DICHIARANTI, "n1") +
        this._psD(e.TOTALE_ARTICOLI, "n..5") +
        this._psD(e.TOTALE_COLLI, "n..7") +
        // Speditore/Esportatore
        this._psD(e.SPEDITORE1_PAESE_CF, "a2") + // 2.1
        this._psD(e.SPEDITORE2_CODICE_FISCALE, "an..16") +
        this._psD(e.SPEDITORE3_RAGIONE_SOCIALE, "an..35") +
        this._psD(e.SPEDITORE4_INDIRIZZO, "an..35") +
        this._psD(e.SPEDITORE5_CAP, "an..9") +
        this._psD(e.SPEDITORE6_CITTA, "an..35") +
        this._psD(e.SPEDITORE7_PAESE, "a2") +
        this._psD(e.NUMERO_RIFERIEMENTO, "an..22") +
        // Destinatario
        this._psD(e.DESTINATARIO1_PAESE_CF, "a2") +
        this._psD(e.DESTINATARIO2_CODICE_FISCALE, "an..16") +
        this._psD(e.DESTINATARIO3_RAGIONE_SOCIALE, "an..35") +
        this._psD(e.DESTINATARIO4_INDIRIZZO, "an..35") +
        this._psD(e.DESTINATARIO5_CAP, "an..9") +
        this._psD(e.DESTINATARIO6_CITTA, "an..35") +
        this._psD(e.DESTINATARIO7_PAESE, "a2") +
        this._psD(e.SPESE_CONSEGNA, "n..±14,2") +
        // Dichiarante/Rappresentante
        this._psD(e.DICHIARANTE1_REPPRESENTANZA, "n1") +
        this._psD(e.DICHIARANTE2_CODICE_PAESE, "a2") +
        this._psD(e.DICHIARANTE3_DICHIARANTE, "an..16") +
        this._psD(e.DICHIARANTE4_RAGIONE_SOCIALE, "an..35") +
        this._psD(e.DICHIARANTE5_INDIRIZZO, "an..35") +
        this._psD(e.DICHIARANTE6_CAP, "an..9") +
        this._psD(e.DICHIARANTE7_CITTA, "an..35") +
        this._psD(e.DICHIARANTE8_PAESE, "a2") +
        this._psD(e.CODICE_PAESE_SPEDIZIONE, "a2") +
        // Paese di destinazione
        this._psD(e.PAESE_DESTINAZIONE1_CODICE_PAESE, "a2") +
        this._psD(e.PAESE_DESTINAZIONE2_PROVINCIA, "a2") +
        // Mezzo trasporto all'arrivo
        this._psD(e.MEZZO_TRASPORTO1_NAZIONALITA, "a2") +
        this._psD(e.MEZZO_TRASPORTO2_IDENTITA, "an..27") +
        this._psD(e.TRASPORTO_CONTAINER, "n1") +
        // Termini di consegna
        this._psD(e.TERMINI_CONSEGNA1_CONDIZIONI, "a3") +
        this._psD(e.TERMINI_CONSEGNA2_LUOGO_CONVENUTO, "an..35") +
        this._psD(e.TERMINI_CONSEGNA3_CODICE_LUOGO_CONVENUTO, "n1") +
        // Mezzo trasporto alla frontiera
        this._psD(e.MEZZO_FRONTIERA1_NAZIONALITA, "a2") +
        this._psD(e.MEZZO_FRONTIERA2_IDENTITA, "an..27") +
        // Dati della transazione
        this._psD(e.TRANSAZIONE1_VALUTA, "an..3") +
        this._psD(e.TRANSAZIONE2_TOTALE_FATTURATO, "n..17,2") +
        this._psD(e.TASSO_CAMBIO, "n..11,5") +
        this._psD(e.CODICE_TRANSAZIONE, "n..2") +
        this._psD(e.MODO_TRANSPORTO_FRONTIERA, "n..2") +
        this._psD(e.MODO_TRANSPORTO_INTERNO, "n..2") +
        this._psD(e.LUOGO_CARICO, "an..17") +
        // Ufficio di entrata
        this._psD(e.UFFICIO_ENTRATA1_NAZIONALITA, "a2") +
        this._psD(e.UFFICIO_ENTRATA2_CODICE, "n6") +
        this._psD(e.UFFICIO_ENTRATA3_DENOMINAZIONE, "an..30") +
        // Localizzazione delle merci
        this._psD(e.LOCAZIONE_MERCI1_LUOGO_VISITA, "an..17") +
        this._psD(e.LOCAZIONE_MERCI2_LUOGO_SCARICO, "an..17") +
        // Pagamento differito
        this._psD(e.PAGAMENTO_DIFFERITO1_NUMERO_CONTO, "n..6") +
        this._psD(e.PAGAMENTO_DIFFERITO2_CIN_CONTO, "a1") +
        //Identificativo del Magazzino
        this._psD(e.MAGAZZINO1_ACCERTAMENTO, "a1") +
        this._psD(e.MAGAZZINO2_TIPO_DEPOSITO, "a1") +
        this._psD(e.MAGAZZINO3_ID_DEPOSITO, "an..14") +
        this._psD(e.MAGAZZINO4_CIN_ID_DEPOSITO, "a1") +
        this._psD(e.MAGAZZINO5_CODICE_PAESE, "a2") +
        this._psD(e.MAGAZZINO6_UFFICIO_CONTROLLO, "an..8") +
        this._psD(e.DATA_LIMITE_TEMPORANEA, "n8") +
        // Obbligato principale
        this._psD(e.OBBLIGATO_PRINCIPALE1_PAESE_CF, "a2") +
        this._psD(e.OBBLIGATO_PRINCIPALE2_CODICE_FISCALE, "an..16") +
        this._psD(e.OBBLIGATO_PRINCIPALE3_RAGIONE_SOCIALE, "an..35") +
        this._psD(e.OBBLIGATO_PRINCIPALE4_INDIRIZZO, "an..35") +
        this._psD(e.OBBLIGATO_PRINCIPALE5_CAP, "an..9") +
        this._psD(e.OBBLIGATO_PRINCIPALE6_COMUNE, "an..35") +
        this._psD(e.OBBLIGATO_PRINCIPALE7_PAESE, "a2") +
        // Rappresentante
        this._psD(e.OBBLIGATO_PRINCIPALE8_REPPRESENTANTE, "an..35") +
        this._psD(e.OBBLIGATO_PRINCIPALE9_TIPO_REPRESENTANTE, "an..35") +
        // Uffici di passaggio
        this._psD(e.UFFICIO_PASSAGGIO1_NRO, "n..2") +
        this._psD(e.UFFICIO_PASSAGGIO2_UFFICI, "an8") +
        // Garanzia
        this._psD(e.GARANZIA1_NRO, "n..2") +
        this._psD(e.GARANZIA2_TIPO, "an1") +
        // Riferimento della garanzia
        this._psD(e.GARANZIA3_GRN_ID, "an..24") +
        this._psD(e.GARANZIA4_ID_ALTRE, "an..35") +
        this._psD(e.GARANZIA5_CODICE_ACCESSO, "an4") +
        this._psD(e.GARANZIA6_UFFICIO, "an8") +
        this._psD(e.GARANZIA7_IMPORTO, "n..10,2") +
        // Limitazione di validità (paesi EU)
        this._psD(e.GARANZIA8_NON_VALIDA_EU, "a2") +
        // Limitazione di validità (paesi extra EU)
        this._psD(e.GARANZIA9_NON_VALIDA_EXTRA_EU, "a2") +
        this._psD(e.GARANZIA10_NON_VALIDA_EXTRA_EU, "a2") +
        // Ufficio di destinazione
        this._psD(e.UFFICIO_DESTINAZIONE1_NAME, "an8") +
        this._psD(e.UFFICIO_DESTINAZIONE2_CF_DEST_AUTORIZZATO, "an..16") +
        // Identificativo dei sigilli
        this._psD(e.ID_SIGILLI1_NRO, "n..2") +
        this._psD(e.ID_SIGILLI2_DESCRIZIONE, "an..11") +
        // Risultato del controllo
        this._psD(e.RESUL_CONTROLLO1_DATA_LIMIT_ARRIVO, "n8") +
        this._psD(e.RESUL_CONTROLLO2_DATA_LIMIT_ESITO, "n8")
      );
    },
    _composeContentPart: function (e, t) {
      console.log(e, t);
      debugger;
      return (
        this._psD("", "an..5") +
        // Speditore/Esportatore
        // this._psD("", "a2") +
        // this._psD("", "an..16") +
        // this._psD("", "an..35") +
        // this._psD("", "an..35") +
        // this._psD("", "an..9") +
        // this._psD("", "an..35") +
        // this._psD("", "a2") +

        this._psD(t.SPEDITORE1_PAESE_CF, "a2") +
        this._psD(t.SPEDITORE2_CODICE_FISCALE, "an..16") +
        this._psD(t.SPEDITORE3_RAGIONE_SOCIALE, "an..35") +
        this._psD(t.SPEDITORE4_INDIRIZZO, "an..35") +
        this._psD(t.SPEDITORE5_CAP, "an..9") +
        this._psD(t.SPEDITORE6_CITTA, "an..35") +
        this._psD(t.SPEDITORE7_PAESE, "a2") +
        // Destinatario
        // this._psD("", "a2") +
        // this._psD("", "an..16") +
        // this._psD("", "an..35") +
        // this._psD("", "an..35") +
        // this._psD("", "an..9") +
        // this._psD("", "an..35") +
        // this._psD("", "a2") +
        this._psD(t.DESTINATARIO1_PAESE_CF, "a2") +
        this._psD(t.DESTINATARIO2_CODICE_FISCALE, "an..16") +
        this._psD(t.DESTINATARIO3_RAGIONE_SOCIALE, "an..35") +
        this._psD(t.DESTINATARIO4_INDIRIZZO, "an..35") +
        this._psD(t.DESTINATARIO5_CAP, "an..9") +
        this._psD(t.DESTINATARIO6_CITTA, "an..35") +
        this._psD(t.DESTINATARIO7_PAESE, "a2") +
        this._psD(t.SPEDITORE7_PAESE, "a2") +
        this._psD(t.CODICE_PAESE_SPEDIZIONE, "a2") +
        // Imballaggi
        this._psD(e.CONTAINER1_NRO_COLLI, "n..7") +
        // Container
        this._psD(e.CONTAINER2_NRO, "n..2") +
        this._psD(e.CONTAINER3_SIGLA, "an..11") +
        this._psD(e.CONTAINER4_INDICAZIONE_SCARICO, "an..3") +
        // Descrizione della merce; Marche e numeri
        this._psD(e.CONTAINER5_DESCRIZIONE_MERCE, "an..140") +
        this._psD(e.CONTAINER6_NUMERI_IMBALLAGIO, "an..42") +
        this._psD(e.CONTAINER7_TIPO_IMBALLAGIO, "an..3") +
        this._psD(e.CONTAINER8_NRO_PEZZI, "n..5") +
        // Merce sensibile
        this._psD(e.CONTAINER9_CODICE_MERCE_SENSIBILE, "n..2") +
        this._psD(e.CONTAINER10_QUANTITA_MERCE_SENSIBILE, "n..11,3") +
        this._psD(e.ARTICOLO, "n..3") +
        // Codice delle merci
        this._psD(e.CODICE_MERCI, "an..10") +
        this._psD("", "n..2") +
        this._psD("", "an4") +
        this._psD("", "a2") +
        this._psD(e.MASSA_LORDA, "n..16,5") +
        this._psD(e.PREFERENCE, "n..3") +
        // Regime
        this._psD(e.REGIME, "n4") +
        this._psD("", "n..2") +
        this._psD("", "an..3") +
        this._psD(e.MASSA_NETTA, "n..16,5") +
        // Contingenti
        this._psD(e.CONTINGENTI1_NRO_DECHIARATO, "n..2") +
        this._psD(e.CONTINGENTI2_IDENTIFICATI, "n6") +
        this._psD(e.DOC_PRECEDENTE1_TIPO, "a1") +
        this._psD(e.DOC_PRECEDENTE2_NATURA, "a..3") +
        this._psD(e.DOC_PRECEDENTE3_REGISTRO_DOC_SCORTA, "an..4") +
        this._psD(e.DOC_PRECEDENTE4_NRO_REGISTRAZIONE, "n..8") +
        this._psD("", "a1") +
        this._psD(e.DOC_PRECEDENTE6_DATA_DOC_SCORTA, "n8") +
        this._psD("", "an..2") +
        this._psD("", "an8") +
        this._psD(e.DOC_PRECEDENTE9_SINGOLO_RIFERIMENTO, "n..3") + // Singolo di riferimento del precedente allibramento
        this._psD(e.DOC_PRECEDENTE10_ID_MRN, "an18") +
        this._psD(e.DOC_PRECEDENTE11_INF_COMPLEMENTARI, "an..500") +
        this._psD(e.UNITA_SUPPLEMENTARI, "n..16,5") +
        this._psD(e.PREZZO_ARTICOLO_EUR, "n..17,2") +
        this._psD(e.METODO_VALUTAZIONE, "n1") +
        // Menzioni speciali
        this._psD(e.MENZIONI_SPECIALI1_PRIMO_TIN, "an..16") +
        this._psD(e.MENZIONI_SPECIALI2_SECONDO_TIN, "an..16") +
        this._psD(e.MENZIONI_SPECIALI3_IMPORTO_FATTURA, "n..17,2") +
        this._psD("", "n..10") +
        this._psD("00,00", "n..16,5") +
        this._psD("00,00", "n..16,5") +
        this._psD("", "an..4") +
        this._psD("", "n..8") +
        this._psD("", "a1") +
        this._psD("", "n8") +
        this._psD("", "an..2") +
        this._psD("", "an8") +
        this._psD("", "n..3") +
        this._psD("", "n1") +
        this._psD(e.CERTIFICATI15_NRO_DICHIARATO, "n..2") +
        this._psD(e.CERTIFICATI16_TIPO_DOC, "an..5") +
        this._psD(e.CERTIFICATI17_PAESE_EMISSIONE, "a2") +
        this._psD(e.CERTIFICATI18_ANNO_EMISSIONE, "n4") +
        this._psD(e.CERTIFICATI19_ID_DOC, "an..35") +
        this._psD(e.CERTIFICATI20_QUANTITA_DOC, "n..16,5") +
        this._psD(e.CERTIFICATI21_UNITA_MISURA_DOC, "a..3") +
        this._psD("", "n1") +
        this._psD("", "n1") +
        // UNITÀ DI MISURA
        this._psD(e.UNITA_MISURA24_NRO_DICHIARATO, "n..2") +
        this._psD(e.UNITA_MISURA25_MISURA_LIQUIDAZIONE, "a..3") +
        this._psD(e.UNITA_MISURA26_QUANTITA_LIQUIDAZIONE, "n..14,5") +
        this._psD(e.UNITA_MISURA27_QUALIFICATORE_LIQUIDAZIONE, "an..5") +
        this._psD(e.UNITA_MISURA28_ULTERIORE_LIQUIDAZIONE, "an..5") +
        this._psD(e.UNITA_MISURA29_ULTERIORE_QUANTITA_LIQUIDAZIONE, "n..14,5") +
        this._psD(e.PREZZO_ENTRATA, "n..16,2") +
        this._psD("", "an..500") +
        this._psD("00,00", "n..±14,2") +
        this._psD(e.VALORE_STATISTICO, "n..17,2") +
        // Menzioni speciali
        this._psD(e.MENZIONI_SPECIALI1_ESPORTAZIONE_CE, "n1") +
        this._psD(e.MENZIONI_SPECIALI2_ESPORTAZIONE_PAESE, "a2") +
        this._psD(e.CALCOLO_DIRITTI_NRO_DICHIARATO, "n..2") +
        this._psD(e.CALCOLO_DIRITTI1_CODICE_TRIBUTO, "an3") +
        this._psD(e.CALCOLO_DIRITTI2_BASE_IMPONIBILE, "n..±17,2") +
        this._psD("", "a1") +
        this._psD("", "an..15") +
        this._psD("", "a1") +
        this._psD("", "an..15") +
        this._psD("", "a1") +
        this._psD("", "an..15") +
        this._psD("", "a1") +
        this._psD(e.CALCOLO_DIRITTI10_IMPORTO_TRIBUTO, "n..±17,2") +
        this._psD(e.CALCOLO_DIRITTI11_MODALITA_PAGAMENTO, "a1") +
        this._psD(e.TOTALE_DIRITTI_PAGARE, "n..17,2") +
        this._psD(e.TOTALE_GENERALE_PAGARE, "n..19,2")
      );
    },
    // PARSING TYPE
    _ps: function (string, type) {
      const length = parseInt(type.split("(")[1].split(")")[0]);
      const typeOf = type.substring(0, 1);
      switch (typeOf) {
        case "X": // alalfabetico
          return string.padEnd(length);
        case "9": // numerico
          return string.padStart(length, "0");
      }
    },
    _psD: function (string, type) {
      console.log(string, type);
      let typeOf, length, decimal, sign;
      const s = type.split("..");
      if (s.length > 1) {
        typeOf = s[0];

        if (type.indexOf(",") !== -1) {
          if (type.indexOf("±") !== -1) {
            // caso particolare n..±14,2
            sign = true;
            length = parseInt(s[1].split(",")[0].substring(1));
          } else {
            length = parseInt(s[1].split(",")[0]);
          }

          decimal = parseInt(s[1].split(",")[1]); // cifre
        } else {
          length = parseInt(s[1]);
        }
      } else {
        if (type.startsWith("an")) {
          typeOf = type.substring(0, 2);
          length = parseInt(type.substring(2, type.length));
        } else {
          // "a" && "n"
          typeOf = type.substring(0, 1);
          length = parseInt(type.substring(1, type.length));
        }
      }
      switch (typeOf) {
        case "a": // alalfabetico
        case "an": // alfanumerico
          return string.toString().padEnd(length);
        case "n": // numerico
          if (decimal) {
            if (sign) {
              // da gestire in base ai dati reali
              const v = string.toString().split(",")[0].substring(1);
              const sign = string.toString().split(",")[0].substring(0, 1);
              return (
                sign +
                v.padStart(length, "0") +
                "," +
                string.toString().split(",")[1].padStart(decimal, "0")
              );
            } else {
              return (
                string.toString().split(",")[0].padStart(length, "0") +
                "," +
                string.toString().split(",")[1].padStart(decimal, "0")
              );
            }
          } else {
            return string.toString().padStart(length, "0");
          }
      }
    },
  };
});
