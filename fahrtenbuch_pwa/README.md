# Fahrtenbuch als installierbare Web-App (PWA)

Diese Version deiner Fahrtenbuch-App kann sich der Browser wie eine echte
App merken: eigenes Icon auf dem Homescreen, kein Adressleisten-Rand,
funktioniert auch offline (bis auf GPS/Reverse-Geocoding und den
Excel-Export, die Internet brauchen).

## Wichtig: Wo muss das liegen, damit "Installieren" funktioniert?

Browser erlauben die Installation **nur über HTTPS** (oder auf `localhost`
beim reinen Testen). Einfach die Datei `index.html` doppelklicken reicht
NICHT aus -- dann fehlt der "Installieren"-Button.

Der einfachste kostenlose Weg, da du schon ein GitHub-Konto hast:
**GitHub Pages**.

### So richtest du GitHub Pages ein (einmalig, ca. 5 Minuten)

1. Lege die vier Dateien aus diesem Ordner (`index.html`, `manifest.json`,
   `sw.js`, `icon-192.png`, `icon-512.png`) in dein bestehendes
   GitHub-Repository `Fahrten-Buch` -- entweder per GitHub Desktop
   (Dateien in den lokalen Repo-Ordner kopieren, dann "Commit" + "Push")
   oder direkt auf github.com über "Add file" -> "Upload files".

2. Geh auf github.com zu deinem Repository -> **Settings** -> **Pages**
   (linkes Menü).

3. Unter "Build and deployment" -> "Source" wähle **"Deploy from a
   branch"**, als Branch **main** und Ordner **/ (root)**. Speichern.

4. Nach ein bis zwei Minuten ist die App erreichbar unter:
   `https://matttedesco420-creator.github.io/Fahrten-Buch/`

5. Öffne diese Adresse auf deinem Handy im Browser (Chrome/Safari).
   Es erscheint automatisch die Option **"Zum Startbildschirm
   hinzufügen"** bzw. **"App installieren"**.

## Was danach anders ist als vorher

- Eigenes Icon auf dem Homescreen (das amber "F")
- Öffnet sich ohne Browser-Adressleiste, wie eine native App
- Läuft auch offline weiter (Eingaben, Liste, Speicherung)
- GPS-Erfassung und Excel-Export brauchen weiterhin eine
  Internetverbindung (Reverse-Geocoding bzw. die Excel-Bibliothek)

## Falls du Änderungen an der App machst

Einfach die geänderte(n) Datei(en) erneut ins Repository hochladen
(Commit + Push). GitHub Pages aktualisiert sich automatisch innerhalb
weniger Minuten. Auf dem Handy ggf. die App einmal schließen und neu
öffnen, damit der Service Worker die neue Version lädt.
