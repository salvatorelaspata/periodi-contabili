function _insertDauItem(runSQL, item, docId, date, user) {
	try {
		var pStmt,
			results = [],
			sqlQuery =
			'UPSERT "ESFG_1"."com.everis.esfg::dau_items_dep"( ' +
                '"ID_DOC"'+ 
                '"REGIME"'+ 
                '"CODICE_MERCI"'+ 
                '"CONTAINER1_NRO_COLLI"'+ 
                '"CONTAINER2_NRO"'+ 
                '"CONTAINER3_SIGLA"'+ 
                '"CONTAINER4_INDICAZIONE_SCARICO"'+ 
                '"CONTAINER5_DESCRIZIONE_MERCE"'+ 
                '"CONTAINER6_NUMERI_IMBALLAGIO"'+ 
                '"CONTAINER7_TIPO_IMBALLAGIO"'+ 
                '"CONTAINER8_NRO_PEZZI"'+ 
                '"CONTAINER9_CODICE_MERCE_SENSIBILE"'+ 
                '"CONTAINER10_QUANTITA_MERCE_SENSIBILE"'+ 
                '"ARTICOLO"'+ 
                '"MASSA_LORDA"'+ 
                '"PREFERENCE"'+ 
                '"MASSA_NETTA"'+ 
                '"CONTINGENTI1_NRO_DECHIARATO"'+ 
                '"CONTINGENTI2_IDENTIFICATI"'+ 
                '"DOC_PRECEDENTE1_TIPO"'+ 
                '"DOC_PRECEDENTE2_NATURA"'+ 
                '"DOC_PRECEDENTE3_REGISTRO_DOC_SCORTA"'+ 
                '"DOC_PRECEDENTE4_NRO_REGISTRAZIONE"'+ 
                '"DOC_PRECEDENTE6_DATA_DOC_SCORTA"'+ 
                '"DOC_PRECEDENTE9_SINGOLO_RIFERIMENTO"'+ 
                '"DOC_PRECEDENTE10_ID_MRN"'+ 
                '"DOC_PRECEDENTE11_INF_COMPLEMENTARI"'+ 
                '"UNITA_SUPPLEMENTARI"'+ 
                '"PREZZO_ARTICOLO_EUR"'+ 
                '"METODO_VALUTAZIONE"'+ 
                '"MENZIONI_SPECIALI1_PRIMO_TIN"'+ 
                '"MENZIONI_SPECIALI2_SECONDO_TIN"'+ 
                '"MENZIONI_SPECIALI3_IMPORTO_FATTURA"'+ 
                '"CERTIFICATI15_NRO_DICHIARATO"'+ 
                '"CERTIFICATI16_TIPO_DOC"'+ 
                '"CERTIFICATI17_PAESE_EMISSIONE"'+ 
                '"CERTIFICATI18_ANNO_EMISSIONE"'+ 
                '"CERTIFICATI19_ID_DOC"'+ 
                '"CERTIFICATI20_QUANTITA_DOC"'+ 
                '"CERTIFICATI21_UNITA_MISURA_DOC"'+ 
                '"UNITA_MISURA24_NRO_DICHIARATO"'+ 
                '"UNITA_MISURA25_MISURA_LIQUIDAZIONE"'+ 
                '"UNITA_MISURA26_QUANTITA_LIQUIDAZIONE"'+ 
                '"UNITA_MISURA27_QUALIFICATORE_LIQUIDAZIONE"'+ 
                '"UNITA_MISURA28_ULTERIORE_LIQUIDAZIONE"'+ 
                '"UNITA_MISURA29_ULTERIORE_QUANTITA_LIQUIDAZIONE"'+ 
                '"PREZZO_ENTRATA"'+ 
                '"AGGIUSTAMENTO_EURO"'+ 
                '"VALORE_STATISTICO"'+ 
                '"MENZIONI_SPECIALI1_ESPORTAZIONE_CE"'+ 
                '"MENZIONI_SPECIALI2_ESPORTAZIONE_PAESE"'+ 
                '"CALCOLO_DIRITTI_NRO_DICHIARATO"'+ 
                '"CALCOLO_DIRITTI1_CODICE_TRIBUTO"'+ 
                '"CALCOLO_DIRITTI2_BASE_IMPONIBILE"'+ 
                '"CALCOLO_DIRITTI10_IMPORTO_TRIBUTO"'+ 
                '"CALCOLO_DIRITTI11_MODALITA_PAGAMENTO"'+ 
                '"TOTALE_DIRITTI_PAGARE"'+ 
                '"TOTALE_GENERALE_PAGARE"'+ 
                "'CREATE_EDIT_TS"+
                "'USER"
      ') ' +

      'VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) WITH PRIMARY KEY ';

		// Execute the query and return the results
		pStmt = runSQL.prepareStatement(sqlQuery);
    var iPos = 0;
        pStmt.setNString(++iPos, docId)

        pStmt.setInteger(++iPos, item.REGIME)
        pStmt.setNString(++iPos, item.CODICE_MERCI)
        pStmt.setInteger(++iPos, item.CONTAINER1_NRO_COLLI)
        pStmt.setInteger(++iPos, item.CONTAINER2_NRO)
        pStmt.setNString(++iPos, item.CONTAINER3_SIGLA)
        pStmt.setNString(++iPos, item.CONTAINER4_INDICAZIONE_SCARICO)
        pStmt.setNString(++iPos, item.CONTAINER5_DESCRIZIONE_MERCE)
        pStmt.setNString(++iPos, item.CONTAINER6_NUMERI_IMBALLAGIO)
        pStmt.setNString(++iPos, item.CONTAINER7_TIPO_IMBALLAGIO)
        pStmt.setInteger(++iPos, item.CONTAINER8_NRO_PEZZI)
        pStmt.setInteger(++iPos, item.CONTAINER9_CODICE_MERCE_SENSIBILE)
        pStmt.setDecimal(++iPos, item.CONTAINER10_QUANTITA_MERCE_SENSIBILE)
        pStmt.setNString(++iPos, item.ARTICOLO)
        pStmt.setDecimal(++iPos, item.MASSA_LORDA)
        pStmt.setInteger(++iPos, item.PREFERENCE)
        pStmt.setDecimal(++iPos, item.MASSA_NETTA)
        pStmt.setInteger(++iPos, item.CONTINGENTI1_NRO_DECHIARATO)
        pStmt.setInteger(++iPos, item.CONTINGENTI2_IDENTIFICATI)
        pStmt.setNString(++iPos, item.DOC_PRECEDENTE1_TIPO)
        pStmt.setNString(++iPos, item.DOC_PRECEDENTE2_NATURA)
        pStmt.setNString(++iPos, item.DOC_PRECEDENTE3_REGISTRO_DOC_SCORTA)
        pStmt.setInteger(++iPos, item.DOC_PRECEDENTE4_NRO_REGISTRAZIONE)
        pStmt.setTimestamp(++iPos, item.DOC_PRECEDENTE6_DATA_DOC_SCORTA)
        pStmt.setInteger(++iPos, item.DOC_PRECEDENTE9_SINGOLO_RIFERIMENTO)
        pStmt.setNString(++iPos, item.DOC_PRECEDENTE10_ID_MRN)
        pStmt.setNString(++iPos, item.DOC_PRECEDENTE11_INF_COMPLEMENTARI)
        pStmt.setDecimal(++iPos, item.UNITA_SUPPLEMENTARI)
        pStmt.setDecimal(++iPos, item.PREZZO_ARTICOLO_EUR)
        pStmt.setInteger(++iPos, item.METODO_VALUTAZIONE)
        pStmt.setNString(++iPos, item.MENZIONI_SPECIALI1_PRIMO_TIN)
        pStmt.setNString(++iPos, item.MENZIONI_SPECIALI2_SECONDO_TIN)
        pStmt.setDecimal(++iPos, item.MENZIONI_SPECIALI3_IMPORTO_FATTURA)
        pStmt.setInteger(++iPos, item.CERTIFICATI15_NRO_DICHIARATO)
        pStmt.setNString(++iPos, item.CERTIFICATI16_TIPO_DOC)
        pStmt.setNString(++iPos, item.CERTIFICATI17_PAESE_EMISSIONE)
        pStmt.setInteger(++iPos, item.CERTIFICATI18_ANNO_EMISSIONE)
        pStmt.setNString(++iPos, item.CERTIFICATI19_ID_DOC)
        pStmt.setDecimal(++iPos, item.CERTIFICATI20_QUANTITA_DOC)
        pStmt.setNString(++iPos, item.CERTIFICATI21_UNITA_MISURA_DOC)
        pStmt.setInteger(++iPos, item.UNITA_MISURA24_NRO_DICHIARATO)
        pStmt.setNString(++iPos, item.UNITA_MISURA25_MISURA_LIQUIDAZIONE)
        pStmt.setDecimal(++iPos, item.UNITA_MISURA26_QUANTITA_LIQUIDAZIONE)
        pStmt.setNString(++iPos, item.UNITA_MISURA27_QUALIFICATORE_LIQUIDAZIONE)
        pStmt.setNString(++iPos, item.UNITA_MISURA28_ULTERIORE_LIQUIDAZIONE)
        pStmt.setDecimal(++iPos, item.UNITA_MISURA29_ULTERIORE_QUANTITA_LIQUIDAZIONE)
        pStmt.setDecimal(++iPos, item.PREZZO_ENTRATA)
        pStmt.setDecimal(++iPos, item.AGGIUSTAMENTO_EURO)
        pStmt.setDecimal(++iPos, item.VALORE_STATISTICO)
        pStmt.setInteger(++iPos, item.MENZIONI_SPECIALI1_ESPORTAZIONE_CE)
        pStmt.setNString(++iPos, item.MENZIONI_SPECIALI2_ESPORTAZIONE_PAESE)
        pStmt.setInteger(++iPos, item.CALCOLO_DIRITTI_NRO_DICHIARATO)
        pStmt.setNString(++iPos, item.CALCOLO_DIRITTI1_CODICE_TRIBUTO)
        pStmt.setDecimal(++iPos, item.CALCOLO_DIRITTI2_BASE_IMPONIBILE)
        pStmt.setDecimal(++iPos, item.CALCOLO_DIRITTI10_IMPORTO_TRIBUTO)
        pStmt.setNString(++iPos, item.CALCOLO_DIRITTI11_MODALITA_PAGAMENTO)
        pStmt.setDecimal(++iPos, item.TOTALE_DIRITTI_PAGARE)
        pStmt.setDecimal(++iPos, item.TOTALE_GENERALE_PAGARE)
        //
        pStmt.setNString(++iPos, user)
        pStmt.setTimestamp(++iPos, date)

    try {
        pStmt.executeUpdate();
        results = {
          status: 200,
				  message: RESULT_REQUEST_OK,
          id: docId
        };
    } catch (err) {
        results = {
          status: 200,
				  message: err.message //RESULT_REQUEST_KO
        };
    }
		
		pStmt.close();

		return results;
	} catch (err) {
		return {
			status: 460,
			message: err.message
		};
	}
}

function _insertDauHeader(runSQL, header, type, date, user) {
	try {
		var pStmt,
			instance,
			register = [],
			results = [],
			sqlQuery =
			'UPSERT "ESFG_1"."com.everis.esfg::dau_header"( ' +
                '"ID_DOC"' + 
                '"TYPE_DAU"' + 
                '"DICHIARAZIONE1_FORMULARIO"' + 
                '"DICHIARAZIONE2_TIPO"' + 
                '"DICHIARAZIONE3_TIPO_SPEDIZIONE"' + 
                '"DATA_ACCETTAZIONE"' + 
                '"DATI_TESTATA_DICHIARANTI"' + 
                '"TOTALE_ARTICOLI"' + 
                '"TOTALE_COLLI"' + 
                '"SPEDITORE1_PAESE_CF"' + 
                '"SPEDITORE2_CODICE_FISCALE"' + 
                '"SPEDITORE3_RAGIONE_SOCIALE"' + 
                '"SPEDITORE4_INDIRIZZO"' + 
                '"SPEDITORE5_CAP"' + 
                '"SPEDITORE6_CITTA"' + 
                '"SPEDITORE7_PAESE"' + 
                '"NUMERO_RIFERIEMENTO"' + 
                '"DESTINATARIO1_PAESE_CF"' + 
                '"DESTINATARIO2_CODICE_FISCALE"' + 
                '"DESTINATARIO3_RAGIONE_SOCIALE"' + 
                '"DESTINATARIO4_INDIRIZZO"' + 
                '"DESTINATARIO5_CAP"' + 
                '"DESTINATARIO6_CITTA"' + 
                '"DESTINATARIO7_PAESE"' + 
                '"SPESE_CONSEGNA"' + 
                '"DICHIARANTE1_REPPRESENTANZA"' + 
                '"DICHIARANTE2_CODICE_PAESE"' + 
                '"DICHIARANTE3_DICHIARANTE"' + 
                '"DICHIARANTE4_RAGIONE_SOCIALE"' + 
                '"DICHIARANTE5_INDIRIZZO"' + 
                '"DICHIARANTE6_CAP"' + 
                '"DICHIARANTE7_CITTA"' + 
                '"DICHIARANTE8_PAESE"' + 
                '"CODICE_PAESE_SPEDIZIONE"' + 
                '"PAESE_DESTINAZIONE1_CODICE_PAESE"' + 
                '"PAESE_DESTINAZIONE2_PROVINCIA"' + 
                '"MEZZO_TRASPORTO1_NAZIONALITA"' + 
                '"MEZZO_TRASPORTO2_IDENTITA"' + 
                '"TRASPORTO_CONTAINER"' + 
                '"TERMINI_CONSEGNA1_CONDIZIONI"' + 
                '"TERMINI_CONSEGNA2_LUOGO_CONVENUTO"' + 
                '"TERMINI_CONSEGNA3_CODICE_LUOGO_CONVENUTO"' + 
                '"MEZZO_FRONTIERA1_NAZIONALITA"' + 
                '"MEZZO_FRONTIERA2_IDENTITA"' + 
                '"TRANSAZIONE1_VALUTA"' + 
                '"TRANSAZIONE2_TOTALE_FATTURATO"' + 
                '"TASSO_CAMBIO"' + 
                '"CODICE_TRANSAZIONE"' + 
                '"CODICE_TRANSAZIONE1"' + 
                '"CODICE_TRANSAZIONE2"' + 
                '"MODO_TRANSPORTO_FRONTIERA"' + 
                '"MODO_TRANSPORTO_INTERNO"' + 
                '"LUOGO_CARICO"' + 
                '"UFFICIO_ENTRATA1_NAZIONALITA"' + 
                '"UFFICIO_ENTRATA2_CODICE"' + 
                '"UFFICIO_ENTRATA3_DENOMINAZIONE"' + 
                '"LOCAZIONE_MERCI1_LUOGO_VISITA"' + 
                '"LOCAZIONE_MERCI2_LUOGO_SCARICO"' + 
                '"PAGAMENTO_DIFFERITO1_NUMERO_CONTO"' + 
                '"PAGAMENTO_DIFFERITO2_CIN_CONTO"' + 
                '"MAGAZZINO1_ACCERTAMENTO"' + 
                '"MAGAZZINO2_TIPO_DEPOSITO"' + 
                '"MAGAZZINO3_ID_DEPOSITO"' + 
                '"MAGAZZINO4_CIN_ID_DEPOSITO"' + 
                '"MAGAZZINO5_CODICE_PAESE"' + 
                '"MAGAZZINO6_UFFICIO_CONTROLLO"' + 
                '"DATA_LIMITE_TEMPORANEA"' + 
                '"OBBLIGATO_PRINCIPALE1_PAESE_CF"' + 
                '"OBBLIGATO_PRINCIPALE2_CODICE_FISCALE"' + 
                '"OBBLIGATO_PRINCIPALE3_RAGIONE_SOCIALE"' + 
                '"OBBLIGATO_PRINCIPALE4_INDIRIZZO"' + 
                '"OBBLIGATO_PRINCIPALE5_CAP"' + 
                '"OBBLIGATO_PRINCIPALE6_COMUNE"' + 
                '"OBBLIGATO_PRINCIPALE7_PAESE"' + 
                '"OBBLIGATO_PRINCIPALE8_REPPRESENTANTE"' + 
                '"OBBLIGATO_PRINCIPALE9_TIPO_REPRESENTANTE"' + 
                '"UFFICIO_PASSAGGIO1_NRO"' + 
                '"UFFICIO_PASSAGGIO2_UFFICI"' + 
                '"GARANZIA1_NRO"' + 
                '"GARANZIA2_TIPO"' + 
                '"GARANZIA3_GRN_ID"' + 
                '"GARANZIA4_ID_ALTRE"' + 
                '"GARANZIA5_CODICE_ACCESSO"' + 
                '"GARANZIA6_UFFICIO"' + 
                '"GARANZIA7_IMPORTO"' + 
                '"GARANZIA8_NON_VALIDA_EU"' + 
                '"GARANZIA9_NON_VALIDA_EXTRA_EU"' + 
                '"GARANZIA10_NON_VALIDA_EXTRA_EU"' + 
                '"UFFICIO_DESTINAZIONE1_NAME"' + 
                '"UFFICIO_DESTINAZIONE2_CF_DEST_AUTORIZZATO"' + 
                '"ID_SIGILLI1_NRO"' + 
                '"ID_SIGILLI2_DESCRIZIONE"' + 
                '"RESUL_CONTROLLO1_DATA_LIMIT_ARRIVO"' + 
                '"RESUL_CONTROLLO2_DATA_LIMIT_ESITO"' + 
                '"CREATE_EDIT_TS"' + 
                '"USER"' + ') ' +
      'VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) WITH PRIMARY KEY ';


    var docId;
    if (!docId){
        docId = _getDauId();
    }
    // Execute the query and return the results
    pStmt = runSQL.prepareStatement(sqlQuery);
    var iPos = 0;
            pStmt.setNString(++iPos, docId)
            pStmt.setNString(++iPos, type)
            pStmt.setNString(++iPos, header.DICHIARAZIONE1_FORMULARIO)
            pStmt.setNString(++iPos, header.DICHIARAZIONE2_TIPO)
            pStmt.setNString(++iPos, header.DICHIARAZIONE3_TIPO_SPEDIZIONE)
            pStmt.setTimeStamp(++iPos, header.DATA_ACCETTAZIONE)
            pStmt.setImteger(++iPos, header.DATI_TESTATA_DICHIARANTI)
            pStmt.setImteger(++iPos, header.TOTALE_ARTICOLI)
            pStmt.setImteger(++iPos, header.TOTALE_COLLI)
            pStmt.setNString(++iPos, header.SPEDITORE1_PAESE_CF)
            pStmt.setNString(++iPos, header.SPEDITORE2_CODICE_FISCALE)
            pStmt.setNString(++iPos, header.SPEDITORE3_RAGIONE_SOCIALE)
            pStmt.setNString(++iPos, header.SPEDITORE4_INDIRIZZO)
            pStmt.setNString(++iPos, header.SPEDITORE5_CAP)
            pStmt.setNString(++iPos, header.SPEDITORE6_CITTA)
            pStmt.setNString(++iPos, header.SPEDITORE7_PAESE)
            pStmt.setNString(++iPos, header.NUMERO_RIFERIEMENTO)
            pStmt.setNString(++iPos, header.DESTINATARIO1_PAESE_CF)
            pStmt.setNString(++iPos, header.DESTINATARIO2_CODICE_FISCALE)
            pStmt.setNString(++iPos, header.DESTINATARIO3_RAGIONE_SOCIALE)
            pStmt.setNString(++iPos, header.DESTINATARIO4_INDIRIZZO)
            pStmt.setNString(++iPos, header.DESTINATARIO5_CAP)
            pStmt.setNString(++iPos, header.DESTINATARIO6_CITTA)
            pStmt.setNString(++iPos, header.DESTINATARIO7_PAESE)
            pStmt.setDecimal(++iPos, header.SPESE_CONSEGNA)
            pStmt.setImteger(++iPos, header.DICHIARANTE1_REPPRESENTANZA)
            pStmt.setNString(++iPos, header.DICHIARANTE2_CODICE_PAESE)
            pStmt.setNString(++iPos, header.DICHIARANTE3_DICHIARANTE)
            pStmt.setNString(++iPos, header.DICHIARANTE4_RAGIONE_SOCIALE)
            pStmt.setNString(++iPos, header.DICHIARANTE5_INDIRIZZO)
            pStmt.setNString(++iPos, header.DICHIARANTE6_CAP)
            pStmt.setNString(++iPos, header.DICHIARANTE7_CITTA)
            pStmt.setNString(++iPos, header.DICHIARANTE8_PAESE)
            pStmt.setNString(++iPos, header.CODICE_PAESE_SPEDIZIONE)
            pStmt.setNString(++iPos, header.PAESE_DESTINAZIONE1_CODICE_PAESE)
            pStmt.setNString(++iPos, header.PAESE_DESTINAZIONE2_PROVINCIA)
            pStmt.setNString(++iPos, header.MEZZO_TRASPORTO1_NAZIONALITA)
            pStmt.setNString(++iPos, header.MEZZO_TRASPORTO2_IDENTITA)
            pStmt.setImteger(++iPos, header.TRASPORTO_CONTAINER)
            pStmt.setNString(++iPos, header.TERMINI_CONSEGNA1_CONDIZIONI)
            pStmt.setNString(++iPos, header.TERMINI_CONSEGNA2_LUOGO_CONVENUTO)
            pStmt.setImteger(++iPos, header.TERMINI_CONSEGNA3_CODICE_LUOGO_CONVENUTO)
            pStmt.setNString(++iPos, header.MEZZO_FRONTIERA1_NAZIONALITA)
            pStmt.setNString(++iPos, header.MEZZO_FRONTIERA2_IDENTITA)
            pStmt.setNString(++iPos, header.TRANSAZIONE1_VALUTA)
            pStmt.setDecimal(++iPos, header.TRANSAZIONE2_TOTALE_FATTURATO)
            pStmt.setDecimal(++iPos, header.TASSO_CAMBIO)
            pStmt.setImteger(++iPos, header.CODICE_TRANSAZIONE)
            pStmt.setImteger(++iPos, header.CODICE_TRANSAZIONE1)
            pStmt.setImteger(++iPos, header.CODICE_TRANSAZIONE2)
            pStmt.setImteger(++iPos, header.MODO_TRANSPORTO_FRONTIERA)
            pStmt.setImteger(++iPos, header.MODO_TRANSPORTO_INTERNO)
            pStmt.setNString(++iPos, header.LUOGO_CARICO)
            pStmt.setNString(++iPos, header.UFFICIO_ENTRATA1_NAZIONALITA)
            pStmt.setImteger(++iPos, header.UFFICIO_ENTRATA2_CODICE)
            pStmt.setNString(++iPos, header.UFFICIO_ENTRATA3_DENOMINAZIONE)
            pStmt.setNString(++iPos, header.LOCAZIONE_MERCI1_LUOGO_VISITA)
            pStmt.setNString(++iPos, header.LOCAZIONE_MERCI2_LUOGO_SCARICO)
            pStmt.setImteger(++iPos, header.PAGAMENTO_DIFFERITO1_NUMERO_CONTO)
            pStmt.setNString(++iPos, header.PAGAMENTO_DIFFERITO2_CIN_CONTO)
            pStmt.setNString(++iPos, header.MAGAZZINO1_ACCERTAMENTO)
            pStmt.setNString(++iPos, header.MAGAZZINO2_TIPO_DEPOSITO)
            pStmt.setNString(++iPos, header.MAGAZZINO3_ID_DEPOSITO)
            pStmt.setNString(++iPos, header.MAGAZZINO4_CIN_ID_DEPOSITO)
            pStmt.setNString(++iPos, header.MAGAZZINO5_CODICE_PAESE)
            pStmt.setNString(++iPos, header.MAGAZZINO6_UFFICIO_CONTROLLO)
            pStmt.setTimeStamp(++iPos, header.DATA_LIMITE_TEMPORANEA)
            pStmt.setNString(++iPos, header.OBBLIGATO_PRINCIPALE1_PAESE_CF)
            pStmt.setNString(++iPos, header.OBBLIGATO_PRINCIPALE2_CODICE_FISCALE)
            pStmt.setNString(++iPos, header.OBBLIGATO_PRINCIPALE3_RAGIONE_SOCIALE)
            pStmt.setNString(++iPos, header.OBBLIGATO_PRINCIPALE4_INDIRIZZO)
            pStmt.setNString(++iPos, header.OBBLIGATO_PRINCIPALE5_CAP)
            pStmt.setNString(++iPos, header.OBBLIGATO_PRINCIPALE6_COMUNE)
            pStmt.setNString(++iPos, header.OBBLIGATO_PRINCIPALE7_PAESE)
            pStmt.setNString(++iPos, header.OBBLIGATO_PRINCIPALE8_REPPRESENTANTE)
            pStmt.setNString(++iPos, header.OBBLIGATO_PRINCIPALE9_TIPO_REPRESENTANTE)
            pStmt.setImteger(++iPos, header.UFFICIO_PASSAGGIO1_NRO)
            pStmt.setNString(++iPos, header.UFFICIO_PASSAGGIO2_UFFICI)
            pStmt.setImteger(++iPos, header.GARANZIA1_NRO)
            pStmt.setNString(++iPos, header.GARANZIA2_TIPO)
            pStmt.setNString(++iPos, header.GARANZIA3_GRN_ID)
            pStmt.setNString(++iPos, header.GARANZIA4_ID_ALTRE)
            pStmt.setNString(++iPos, header.GARANZIA5_CODICE_ACCESSO)
            pStmt.setNString(++iPos, header.GARANZIA6_UFFICIO)
            pStmt.setDecimal(++iPos, header.GARANZIA7_IMPORTO)
            pStmt.setNString(++iPos, header.GARANZIA8_NON_VALIDA_EU)
            pStmt.setNString(++iPos, header.GARANZIA9_NON_VALIDA_EXTRA_EU)
            pStmt.setNString(++iPos, header.GARANZIA10_NON_VALIDA_EXTRA_EU)
            pStmt.setNString(++iPos, header.UFFICIO_DESTINAZIONE1_NAME)
            pStmt.setNString(++iPos, header.UFFICIO_DESTINAZIONE2_CF_DEST_AUTORIZZATO)
            pStmt.setImteger(++iPos, header.ID_SIGILLI1_NRO)
            pStmt.setNString(++iPos, header.ID_SIGILLI2_DESCRIZIONE)
            pStmt.setTimeStamp(++iPos, header.RESUL_CONTROLLO1_DATA_LIMIT_ARRIVO)
            pStmt.setTimeStamp(++iPos, header.RESUL_CONTROLLO2_DATA_LIMIT_ESITO)
            pStmt.setTimeStamp(++iPos, date)
            pStmt.setNString(++iPos, user)

    try {
      pStmt.executeUpdate();
      results = {
        status: 200,
				message: RESULT_REQUEST_OK
      };
    } catch (err) {
      results = {
        status: 200,
				message: err.message //RESULT_REQUEST_KO
      };
    }
		
		pStmt.close();

		return results;
	} catch (err) {
		return {
			status: 460,
			message: err.message
		};
	}
}