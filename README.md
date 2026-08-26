# Edizione critica digitale di un corpus di canzoni di Gausbert de Poicibot

## Descrizione

Questo repository contiene il codice sorgente e i dati relativi all'edizione critica digitale delle canzoni del trovatore provenzale Gausbert de Poicibot, un progetto sviluppato per una tesi magistrale in Informatica Umanistica discussa presso l'Università di Pisa (a.a. 2025/2026).

L'edizione è pubblicata tramite la piattaforma TEI Publisher. 

Ultimo aggiornamento: 21 agosto 2026. 

## Contenuti del repository

- File TEI XML delle canzoni editate
- Personalizzazioni ODD
- Template HTML/Jinks
- Fogli di stile CSS
- Script JS
- Risorse grafiche
- Documentazione del progetto

## Tecnologie utilizzate

- TEI P5
- TEI Publisher 10
- eXist-db
- HTML
- CSS
- JavaScript

## Installazione

### Requisiti

- Java 17 o superiore
- eXist-db
- TEI Publisher 10

### Procedura

1. Creare una nuova applicazione tramite l'Application Manager di TEI Publisher.

2. Copiare il contenuto delle cartelle presenti in questo repository nelle corrispondenti directory dell'applicazione appena creata:

```text
data/       → data/
templates/  → templates/
resources/  → resources/
```

3. Riavviare l'applicazione o aggiornare la cache di TEI Publisher, se necessario.

4. Accedere all'applicazione tramite browser dall'interfaccia di TEI Publisher.

### Note

Il repository contiene esclusivamente le personalizzazioni sviluppate per il progetto (file TEI XML, template, fogli di stile e risorse dell'interfaccia). L'infrastruttura di base dell'applicazione è fornita automaticamente da TEI Publisher al momento della creazione della nuova applicazione.


## Struttura dei file nella repository
```bash
data/                  File TEI XML
data/images/           Riproduzioni facsimile delle pagine dei testimoni manoscritti

resources/        
resources/css          Fogli di stile CSS
resources/images       Banner e stemmi per ognuna delle canzoni edite
resources/odd          Personalizzazioni ODD
resources/scripts      Script JS

templates/pages        Template HTML della pagina standard di ogni canzone
