# Edizione critica digitale di un canone di canzoni di Gausbert de Poicibot

## Descrizione

Questo repository contiene il codice sorgente e i dati relativi all'edizione critica digitale delle canzoni del trovatore provenzale Gausbert de Poicibot, un progetto sviluppato per una tesi magistrale in Informatica Umanistica discussa presso l'Università di Pisa (a.a. 2025/2026).

L'edizione è pubblicata tramite la piattaforma TEI Publisher. 

*Ultimo aggiornamento: 8 novembre 2026.* 

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
config.json            File di configurazione JSON base dell'applicazione
data/                  File TEI XML
data/images/           Riproduzioni facsimile delle pagine dei testimoni manoscritti

resources/        
resources/css          Fogli di stile CSS
resources/images       Banner principale, più banner e stemmi per ognuna delle canzoni edite
resources/odd          Personalizzazioni ODD
resources/scripts      Script JS

templates/pages        Template HTML della pagina standard di ogni canzone
```

### Immagini
| Funzionamento pulsanti | Approfondimenti in apparato | Facsimili |
| :---: | :---: | :---: |
| <img width="750" height="auto" alt="Screenshot-bttn" src="https://github.com/user-attachments/assets/2f83b81f-0f6c-4edc-af59-587ee85f63ec" />| <img width="750" height="auto" alt="Screenshot-pop-up-cont" src="https://github.com/user-attachments/assets/4c5a291a-cf1f-4e03-a4e2-4fa38de2e328" /> | <img width="300" height="auto" alt="Screenshot-facs" src="https://github.com/user-attachments/assets/ec4365ba-56db-4a36-9339-c9faabb2ecd8" /> |

| Divergenze fra i testi | Tradizione indiretta | Sidebar stemma | 
| :---: | :---: | :---: |
| <img width="750" height="auto" alt="Screenshot-div" src="https://github.com/user-attachments/assets/a3b5972c-375d-4302-8bc6-175ca7d6941b" /> | <img width="750" height="auto" alt="Screenshot-extra" src="https://github.com/user-attachments/assets/ccb5182e-63e0-4708-926b-b8c6c71f6947" /> | <img width="500" height="auto" alt="Screenshot-sidebar-l"  src="https://github.com/user-attachments/assets/783a7f1c-1292-465f-8f38-6ae891ca80bd" /> |

