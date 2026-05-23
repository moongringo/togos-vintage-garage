const languageOptions = [
  { id: "en", code: "GB", name: "English", flag: "flag-gb" },
  { id: "no", code: "NO", name: "Norsk", flag: "flag-no" },
  { id: "sv", code: "SE", name: "Svenska", flag: "flag-se" },
  { id: "da", code: "DK", name: "Dansk", flag: "flag-dk" },
  { id: "de", code: "DE", name: "Deutsch", flag: "flag-de" },
  { id: "fr", code: "FR", name: "Francais", flag: "flag-fr" },
  { id: "es", code: "ES", name: "Espanol", flag: "flag-es" },
  { id: "it", code: "IT", name: "Italiano", flag: "flag-it" },
  { id: "nl", code: "NL", name: "Nederlands", flag: "flag-nl" },
  { id: "pl", code: "PL", name: "Polski", flag: "flag-pl" },
  { id: "pt", code: "PT", name: "Portugues", flag: "flag-pt" }
];

const phraseTranslations = {
  Community: { no: "Fellesskap", sv: "Gemenskap", da: "Faellesskab", de: "Gemeinschaft", fr: "Communaute", es: "Comunidad", it: "Comunita", nl: "Gemeenschap", pl: "Spolecznosc", pt: "Comunidade" },
  Profiles: { no: "Profiler", sv: "Profiler", da: "Profiler", de: "Profile", fr: "Profils", es: "Perfiles", it: "Profili", nl: "Profielen", pl: "Profile", pt: "Perfis" },
  Vehicles: { no: "Kjoretoy", sv: "Fordon", da: "Koretojer", de: "Fahrzeuge", fr: "Vehicules", es: "Vehiculos", it: "Veicoli", nl: "Voertuigen", pl: "Pojazdy", pt: "Veiculos" },
  Forum: { no: "Forum", sv: "Forum", da: "Forum", de: "Forum", fr: "Forum", es: "Foro", it: "Forum", nl: "Forum", pl: "Forum", pt: "Forum" },
  Planner: { no: "Planlegger", sv: "Planerare", da: "Planlaegger", de: "Planer", fr: "Planning", es: "Planificador", it: "Pianificatore", nl: "Planner", pl: "Planer", pt: "Planeador" },
  Hub: { no: "Hub", sv: "Nav", da: "Hub", de: "Zentrale", fr: "Centre", es: "Centro", it: "Centro", nl: "Hub", pl: "Centrum", pt: "Centro" },
  Features: { no: "Funksjoner", sv: "Funktioner", da: "Funktioner", de: "Funktionen", fr: "Fonctions", es: "Funciones", it: "Funzioni", nl: "Functies", pl: "Funkcje", pt: "Funcionalidades" },
  Hacks: { no: "Garasjetriks", sv: "Garagetricks", da: "Garagetricks", de: "Tricks", fr: "Astuces", es: "Trucos", it: "Trucchi", nl: "Hacks", pl: "Triki", pt: "Truques" },
  Maps: { no: "Kart", sv: "Kartor", da: "Kort", de: "Karten", fr: "Cartes", es: "Mapas", it: "Mappe", nl: "Kaarten", pl: "Mapy", pt: "Mapas" },
  Merch: { no: "Merch", sv: "Merch", da: "Merch", de: "Merch", fr: "Produits", es: "Merch", it: "Merch", nl: "Merch", pl: "Merch", pt: "Merch" },
  Ideas: { no: "Ideer", sv: "Ideer", da: "Ideer", de: "Ideen", fr: "Idees", es: "Ideas", it: "Idee", nl: "Ideeen", pl: "Pomysly", pt: "Ideias" },
  Admin: { no: "Admin", sv: "Admin", da: "Admin", de: "Admin", fr: "Admin", es: "Admin", it: "Admin", nl: "Admin", pl: "Admin", pt: "Admin" },
  Contact: { no: "Kontakt", sv: "Kontakt", da: "Kontakt", de: "Kontakt", fr: "Contact", es: "Contacto", it: "Contatto", nl: "Contact", pl: "Kontakt", pt: "Contacto" },
  "Open site": { no: "Apne siden", sv: "Oppna sidan", da: "Aabn siden", de: "Site offnen", fr: "Ouvrir le site", es: "Abrir sitio", it: "Apri sito", nl: "Open site", pl: "Otworz strone", pt: "Abrir site" },
  "Public site": { no: "Offentlig side", sv: "Offentlig sida", da: "Offentlig side", de: "Offentliche Site", fr: "Site public", es: "Sitio publico", it: "Sito pubblico", nl: "Publieke site", pl: "Strona publiczna", pt: "Site publico" },
  "Feature guide": { no: "Funksjonsguide", sv: "Funktionsguide", da: "Funktionsguide", de: "Funktionsguide", fr: "Guide des fonctions", es: "Guia de funciones", it: "Guida funzioni", nl: "Functiegids", pl: "Przewodnik funkcji", pt: "Guia de funcoes" },
  "Classic motorcycles. Old cars. Good company.": { no: "Klassiske motorsykler. Gamle biler. Godt selskap.", sv: "Klassiska motorcyklar. Gamla bilar. Bra sallskap.", da: "Klassiske motorcykler. Gamle biler. Godt selskab.", de: "Klassische Motorrader. Alte Autos. Gute Gesellschaft.", fr: "Motos classiques. Vieilles voitures. Bonne compagnie.", es: "Motos clasicas. Coches antiguos. Buena compania.", it: "Moto classiche. Auto d'epoca. Buona compagnia.", nl: "Klassieke motoren. Oude auto's. Goed gezelschap.", pl: "Klasyczne motocykle. Stare auta. Dobre towarzystwo.", pt: "Motos classicas. Carros antigos. Boa companhia." },
  "Join the garage": { no: "Bli med i garasjen", sv: "Ga med i garaget", da: "Bliv med i garagen", de: "Garage beitreten", fr: "Rejoindre le garage", es: "Unirse al garaje", it: "Unisciti al garage", nl: "Word lid van de garage", pl: "Dolacz do garazu", pt: "Entrar na garagem" },
  "Browse threads": { no: "Se trader", sv: "Bladdra i tradar", da: "Se trader", de: "Themen ansehen", fr: "Voir les sujets", es: "Ver hilos", it: "Sfoglia discussioni", nl: "Bekijk threads", pl: "Przegladaj watki", pt: "Ver topicos" },
  "Garage profiles": { no: "Garasjeprofiler", sv: "Garageprofiler", da: "Garageprofiler", de: "Garageprofile", fr: "Profils garage", es: "Perfiles de garaje", it: "Profili garage", nl: "Garageprofielen", pl: "Profile garazu", pt: "Perfis de garagem" },
  "Social profiles for motor fanatics": { no: "Sosiale profiler for motorentusiaster", sv: "Sociala profiler for motorfanatiker", da: "Sociale profiler for motorfans", de: "Soziale Profile fur Motorfans", fr: "Profils sociaux pour passionnes de moteurs", es: "Perfiles sociales para fanaticos del motor", it: "Profili social per appassionati di motori", nl: "Sociale profielen voor motorfans", pl: "Profile spolecznosciowe dla fanow motoryzacji", pt: "Perfis sociais para fanaticos por motores" },
  "Vehicle registry": { no: "Kjoretoyregister", sv: "Fordonsregister", da: "Koretojsregister", de: "Fahrzeugregister", fr: "Registre des vehicules", es: "Registro de vehiculos", it: "Registro veicoli", nl: "Voertuigregister", pl: "Rejestr pojazdow", pt: "Registo de veiculos" },
  "Browse every era, then open the machine file": { no: "Bla gjennom alle epoker, apne sa maskinfilen", sv: "Bladdra genom alla epoker och oppna maskinfilen", da: "Gennemse alle epoker og aabn maskinfilen", de: "Alle Epochen durchsuchen und die Maschinendatei offnen", fr: "Parcourez chaque epoque puis ouvrez le dossier machine", es: "Explora cada epoca y abre el archivo de la maquina", it: "Sfoglia ogni era e apri il file della macchina", nl: "Bekijk elk tijdperk en open het machinedossier", pl: "Przegladaj epoki i otworz plik maszyny", pt: "Veja cada era e abra o ficheiro da maquina" },
  "What Togos Vintage Garage can do": { no: "Hva Togos Vintage Garage kan gjore", sv: "Vad Togos Vintage Garage kan gora", da: "Hvad Togos Vintage Garage kan gore", de: "Was Togos Vintage Garage kann", fr: "Ce que Togos Vintage Garage peut faire", es: "Lo que Togos Vintage Garage puede hacer", it: "Cosa puo fare Togos Vintage Garage", nl: "Wat Togos Vintage Garage kan doen", pl: "Co potrafi Togos Vintage Garage", pt: "O que Togos Vintage Garage pode fazer" },
  "Member Hub": { no: "Medlemshub", sv: "Medlemsnav", da: "Medlemshub", de: "Mitgliederzentrale", fr: "Centre membres", es: "Centro de miembros", it: "Centro membri", nl: "Ledenhub", pl: "Centrum czlonkow", pt: "Centro de membros" },
  "Private chat groups": { no: "Private chatgrupper", sv: "Privata chattgrupper", da: "Private chatgrupper", de: "Private Chatgruppen", fr: "Groupes de chat prives", es: "Grupos privados", it: "Gruppi chat privati", nl: "Prive chatgroepen", pl: "Prywatne grupy czatu", pt: "Grupos privados" },
  "AI Part Identifier": { no: "AI-delidentifikator", sv: "AI-delidentifierare", da: "AI-delidentifikation", de: "KI-Teilekennung", fr: "Identification de piece IA", es: "Identificador de piezas IA", it: "Identificatore pezzi AI", nl: "AI onderdeelherkenner", pl: "AI identyfikacja czesci", pt: "Identificador de pecas IA" },
  "Restoration Receipts Vault": { no: "Hvelv for restaureringskvitteringer", sv: "Valv for restaureringskvitton", da: "Boks til restaureringskvitteringer", de: "Restaurierungsbeleg-Tresor", fr: "Coffre des recus de restauration", es: "Boveda de recibos de restauracion", it: "Archivio ricevute restauro", nl: "Restauratiebonnen kluis", pl: "Sejf rachunkow renowacji", pt: "Cofre de recibos de restauro" },
  "Route Quality Ratings": { no: "Rutekvalitetsvurderinger", sv: "Ruttkvalitetsbetyg", da: "Rutekvalitetsvurderinger", de: "Routenqualitat", fr: "Notes de qualite de route", es: "Calidad de rutas", it: "Valutazioni percorso", nl: "Routekwaliteitscores", pl: "Oceny jakosci tras", pt: "Avaliacoes de rotas" },
  "Build Provenance Timeline": { no: "Tidslinje for kjoretoyhistorikk", sv: "Tidslinje for fordonshistorik", da: "Tidslinje for koretojshistorik", de: "Herkunfts-Zeitleiste", fr: "Chronologie de provenance", es: "Linea de procedencia", it: "Timeline provenienza", nl: "Herkomsttijdlijn", pl: "Os czasu pochodzenia", pt: "Linha de proveniencia" }
};

Object.assign(phraseTranslations, {
  "Route builder": { no: "Rutebygger", sv: "Ruttbyggare", da: "Rutebygger", de: "Routenbauer", fr: "Createur de route", es: "Constructor de rutas", it: "Costruttore percorsi", nl: "Routebouwer", pl: "Budowanie trasy", pt: "Construtor de rotas" },
  "Google Translate on maps": { no: "Google Translate pa kart", sv: "Google Translate pa kartor", da: "Google Translate pa kort", de: "Google Translate auf Karten", fr: "Google Translate sur les cartes", es: "Google Translate en mapas", it: "Google Translate sulle mappe", nl: "Google Translate op kaarten", pl: "Google Translate na mapach", pt: "Google Translate nos mapas" },
  "Members can add from and to destinations, fuel stops, cafe breaks, viewpoints, hazards, tool pickups, and road notes.": { no: "Medlemmer kan legge til fra og til, drivstoffstopp, cafepauser, utsiktspunkt, farer, verktoyhenting og veinotater.", sv: "Medlemmar kan lagga till fran och till, branslestopp, cafepauser, utsikt, faror, verktygshamtning och vagnotiser.", da: "Medlemmer kan tilfoje fra og til, braendstofstop, cafepauser, udsigt, farer, vaerktojshentning og vejnoter.", de: "Mitglieder konnen Start und Ziel, Tankstopps, Cafepausen, Aussichtspunkte, Gefahren, Werkzeugabholung und Strassennotizen hinzufugen.", fr: "Les membres ajoutent depart, arrivee, carburant, cafes, points de vue, dangers, outils et notes de route.", es: "Los miembros agregan origen, destino, combustible, cafes, miradores, peligros, herramientas y notas.", it: "I membri aggiungono partenza, arrivo, carburante, cafe, punti panoramici, pericoli, attrezzi e note.", nl: "Leden voegen van/naar, tankstops, cafe's, uitzicht, gevaren, tool-pickups en wegnotities toe.", pl: "Czlonkowie dodaja start, cel, paliwo, kawiarnie, widoki, zagrozenia, narzedzia i notatki drogowe.", pt: "Membros adicionam origem, destino, combustivel, cafes, miradouros, perigos, ferramentas e notas." },
  "Breakdown posts can include a GPS ping, vehicle trouble comment, tools needed, shared map area, trailer help, fuel, or stuck repairs.": { no: "Havariposter kan ha GPS-ping, kommentar om kjoretoyproblem, verktoybehov, delt kart, hengerhjelp, drivstoff eller fast reparasjon.", sv: "Haveriposter kan ha GPS-ping, fordonskommentar, verktygsbehov, delad karta, slaphjalp, bransle eller fast reparation.", da: "Nedbrudsposter kan have GPS-ping, koretojsproblem, vaerktojsbehov, delt kort, trailerhjaelp, braendstof eller fast reparation.", de: "Pannenposts konnen GPS-Ping, Fahrzeugproblem, benotigte Werkzeuge, Kartenbereich, Anhangerhilfe, Kraftstoff oder Reparaturhilfe enthalten.", fr: "Les pannes peuvent inclure GPS, probleme vehicule, outils, carte partagee, remorque, carburant ou reparation bloquee.", es: "Las averias pueden incluir GPS, comentario, herramientas, mapa compartido, remolque, combustible o reparacion.", it: "I post guasto includono GPS, problema veicolo, attrezzi, mappa condivisa, rimorchio, carburante o riparazione.", nl: "Pechposts kunnen GPS, voertuigprobleem, tools, gedeelde kaart, trailerhulp, brandstof of reparatie bevatten.", pl: "Posty awarii moga miec GPS, problem pojazdu, narzedzia, mape, lawete, paliwo lub naprawe.", pt: "Posts de avaria podem incluir GPS, problema, ferramentas, mapa, reboque, combustivel ou reparacao." },
  "The Maps page language picker can store a preferred language and request Google Translate for the selected flag.": { no: "Sprakvelgeren pa Kart kan lagre foretrukket sprak og be Google Translate bruke valgt flagg.", sv: "Sprakvaljaren pa Kartor kan spara standardsprak och be Google Translate anvanda vald flagga.", da: "Sprogvaelgeren paa Kort kan gemme standardsprog og bede Google Translate bruge valgt flag.", de: "Die Kartenseite speichert die bevorzugte Sprache und fordert Google Translate fur die gewahlte Flagge an.", fr: "Le selecteur de cartes enregistre la langue preferee et demande Google Translate pour le drapeau choisi.", es: "El selector de mapas guarda idioma preferido y pide Google Translate para la bandera elegida.", it: "Il selettore mappe salva la lingua preferita e chiede Google Translate per la bandiera scelta.", nl: "De kaarttaalkiezer bewaart voorkeurstaal en vraagt Google Translate voor de gekozen vlag.", pl: "Wybierak map zapisuje jezyk i prosi Google Translate o wybrana flage.", pt: "O seletor de mapas guarda idioma preferido e pede Google Translate para a bandeira." },
  "A relaxed old-bike loop with smooth roads, two fuel stops, and a cafe finish.": { no: "En rolig runde for gamle sykler med jevne veier, to drivstoffstopp og cafeavslutning.", sv: "En lugn runda for aldre hojar med jamna vagar, tva branslestopp och cafeavslut.", da: "En rolig runde for gamle cykler med jaevne veje, to braendstofstop og cafe.", de: "Eine entspannte Oldtimer-Runde mit ruhigen Strassen, zwei Tankstopps und Cafe-Ziel.", fr: "Une boucle tranquille pour anciennes avec bonnes routes, deux arrets carburant et cafe.", es: "Una ruta tranquila para clasicos con carreteras suaves, dos paradas de combustible y cafe.", it: "Un giro tranquillo per mezzi storici con strade lisce, due soste carburante e cafe.", nl: "Een rustige oldtimerroute met gladde wegen, twee tankstops en cafe-einde.", pl: "Spokojna trasa dla klasykow z rownymi drogami, dwoma tankowaniami i kawiarnia.", pt: "Uma rota calma para classicos com estradas boas, duas paragens de combustivel e cafe." },
  "Short test route for fresh builds with easy pull-offs and low-speed roads.": { no: "Kort testrute for ferske bygg med enkle stopp og rolige veier.", sv: "Kort testrutt for nya byggen med enkla stopp och lagfartsvagar.", da: "Kort testrute til nye byg med lette stop og rolige veje.", de: "Kurze Testroute fur frische Builds mit einfachen Haltebuchten und langsamen Strassen.", fr: "Petite route de test avec arrets faciles et routes lentes.", es: "Ruta corta de prueba con paradas faciles y vias lentas.", it: "Breve percorso di test con soste facili e strade lente.", nl: "Korte testroute met makkelijke stops en langzame wegen.", pl: "Krotka trasa testowa z latwymi zjazdami i wolnymi drogami.", pt: "Rota curta de teste com paragens faceis e estradas lentas." },
  "Member-vetted painters, machinists, upholsterers, chromers, mechanics, and parts sellers.": { no: "Lakkkere, maskinister, salmakere, forkrommere, mekanikere og deleselgere godkjent av medlemmer.", sv: "Lackerare, maskinister, tapetserare, kromare, mekaniker och delforsaljare granskade av medlemmar.", da: "Lakerere, maskinister, polstrere, kromere, mekanikere og delesalg vurderet af medlemmer.", de: "Von Mitgliedern geprufte Lackierer, Maschinenbauer, Polsterer, Verchromer, Mechaniker und Teilehandler.", fr: "Peintres, usineurs, selliers, chromeurs, mecaniciens et vendeurs valides par les membres.", es: "Pintores, maquinistas, tapiceros, cromadores, mecanicos y vendedores revisados.", it: "Verniciatori, tornitori, tappezzieri, cromatori, meccanici e venditori verificati.", nl: "Door leden beoordeelde spuiters, machinisten, bekleders, verchromers, monteurs en verkopers.", pl: "Lakiernicy, tokarze, tapicerzy, chromownie, mechanicy i sprzedawcy czesci ocenieni przez czlonkow.", pt: "Pintores, maquinistas, estofadores, cromadores, mecanicos e vendedores avaliados." },
  "Find nearby members with compression testers, lifts, welders, trailers, timing lights, and specialty tools.": { no: "Finn medlemmer i naerheten med kompresjonstester, lift, sveiser, henger, timinglampe og spesialverktoy.", sv: "Hitta medlemmar nara med kompressionstestare, lyft, svets, slap, timinglampa och specialverktyg.", da: "Find medlemmer i naerheden med kompressionstester, lift, svejser, trailer, timinglampe og specialvaerktoj.", de: "Finde Mitglieder in der Nahe mit Kompressionstester, Lift, Schweissgerat, Anhanger, Zundlampe und Spezialwerkzeug.", fr: "Trouvez des membres proches avec compressiometre, pont, poste a souder, remorque, lampe strobo et outils speciaux.", es: "Encuentra miembros cercanos con compresimetro, elevador, soldador, remolque, lampara de tiempo y herramientas.", it: "Trova membri vicini con prova compressione, ponte, saldatrice, rimorchio, lampada stroboscopica e attrezzi.", nl: "Vind leden in de buurt met compressietester, lift, lasser, trailer, timinglamp en speciaal gereedschap.", pl: "Znajdz czlonkow z testerem kompresji, podnosnikiem, spawarka, laweta, lampa i narzedziami.", pt: "Encontre membros perto com testador de compressao, elevador, soldador, reboque, luz de ponto e ferramentas." },
  "Temporary meetup page map with RSVP, route, weather, fuel stops, emergency contacts, and album.": { no: "Midlertidig treffkart med RSVP, rute, vaer, drivstoffstopp, nodkontakter og album.", sv: "Tillfallig traffkarta med OSA, rutt, vader, branslestopp, nodkontakter och album.", da: "Midlertidigt treffkort med RSVP, rute, vejr, braendstofstop, nodkontakter og album.", de: "Temporare Treffen-Karte mit RSVP, Route, Wetter, Tankstopps, Notfallkontakten und Album.", fr: "Carte temporaire avec RSVP, route, meteo, carburant, contacts d'urgence et album.", es: "Mapa temporal con RSVP, ruta, clima, combustible, contactos de emergencia y album.", it: "Mappa temporanea con RSVP, percorso, meteo, carburante, contatti emergenza e album.", nl: "Tijdelijke meetupkaart met RSVP, route, weer, tankstops, noodcontacten en album.", pl: "Tymczasowa mapa spotkania z RSVP, trasa, pogoda, paliwem, kontaktami i albumem.", pt: "Mapa temporario com RSVP, rota, tempo, combustivel, contactos de emergencia e album." },
  "A shared map area for breakdowns, trailer help, stuck repairs, tools, and safe pickup points.": { no: "Delt kartomrade for havari, hengerhjelp, fastlaste reparasjoner, verktoy og trygge hentepunkt.", sv: "Delad kartyta for haverier, slaphjalp, fastnade reparationer, verktyg och sakra upphamtningsplatser.", da: "Delt kortomraade til nedbrud, trailerhjaelp, fastsiddende reparationer, vaerktoj og sikre afhentningssteder.", de: "Gemeinsamer Kartenbereich fur Pannen, Anhangerhilfe, festgefahrene Reparaturen, Werkzeuge und sichere Treffpunkte.", fr: "Zone partagee pour pannes, remorque, reparations bloquees, outils et points de prise en charge.", es: "Area compartida para averias, remolque, reparaciones atascadas, herramientas y puntos seguros.", it: "Area condivisa per guasti, rimorchio, riparazioni bloccate, attrezzi e punti sicuri.", nl: "Gedeeld kaartgebied voor pech, trailerhulp, vastgelopen reparaties, tools en veilige ophaalpunten.", pl: "Wspolny obszar dla awarii, lawety, trudnych napraw, narzedzi i bezpiecznych miejsc odbioru.", pt: "Area partilhada para avarias, reboque, reparacoes presas, ferramentas e pontos seguros." },
  Fuel: { no: "Drivstoff", sv: "Bransle", da: "Braendstof", de: "Kraftstoff", fr: "Carburant", es: "Combustible", it: "Carburante", nl: "Brandstof", pl: "Paliwo", pt: "Combustivel" },
  Roads: { no: "Veier", sv: "Vagar", da: "Veje", de: "Strassen", fr: "Routes", es: "Carreteras", it: "Strade", nl: "Wegen", pl: "Drogi", pt: "Estradas" },
  Cafe: { no: "Cafe", sv: "Cafe", da: "Cafe", de: "Cafe", fr: "Cafe", es: "Cafe", it: "Cafe", nl: "Cafe", pl: "Kawiarnia", pt: "Cafe" },
  Difficulty: { no: "Vanskelighet", sv: "Svarighet", da: "Svaerhed", de: "Schwierigkeit", fr: "Difficulte", es: "Dificultad", it: "Difficolta", nl: "Moeilijkheid", pl: "Trudnosc", pt: "Dificuldade" },
  Smooth: { no: "Jevn", sv: "Jamn", da: "Jaevn", de: "Ruhig", fr: "Lisse", es: "Suave", it: "Liscia", nl: "Glad", pl: "Rowne", pt: "Suave" },
  Easy: { no: "Enkel", sv: "Latt", da: "Let", de: "Leicht", fr: "Facile", es: "Facil", it: "Facile", nl: "Makkelijk", pl: "Latwa", pt: "Facil" },
  "OpenStreetMap garage atlas": { no: "OpenStreetMap garasjeatlas", sv: "OpenStreetMap garageatlas", da: "OpenStreetMap garageatlas", de: "OpenStreetMap Garage-Atlas", fr: "Atlas garage OpenStreetMap", es: "Atlas de garaje OpenStreetMap", it: "Atlante garage OpenStreetMap", nl: "OpenStreetMap garage-atlas", pl: "Atlas garazu OpenStreetMap", pt: "Atlas de garagem OpenStreetMap" },
  "Routes, shops, tools, meetups, and local help on one map": { no: "Ruter, verksteder, verktoy, treff og lokal hjelp pa ett kart", sv: "Rutter, verkstader, verktyg, traffar och lokal hjalp pa en karta", da: "Ruter, vaerksteder, vaerktoj, treff og lokal hjaelp pa et kort", de: "Routen, Werkstatten, Werkzeuge, Treffen und lokale Hilfe auf einer Karte", fr: "Routes, ateliers, outils, rencontres et aide locale sur une carte", es: "Rutas, talleres, herramientas, encuentros y ayuda local en un mapa", it: "Percorsi, officine, attrezzi, incontri e aiuto locale in una mappa", nl: "Routes, shops, tools, meetups en lokale hulp op een kaart", pl: "Trasy, warsztaty, narzedzia, spotkania i lokalna pomoc na jednej mapie", pt: "Rotas, oficinas, ferramentas, encontros e ajuda local num mapa" },
  "Use free OpenStreetMap previews for ride planning, route quality checks, trusted shop notes, tool lending, emergency help, and meetup pages.": { no: "Bruk gratis OpenStreetMap-forhandsvisninger for turplanlegging, rutekvalitet, verkstednotater, verktoylan, nodhjelp og treff.", sv: "Anvand gratis OpenStreetMap-forhandsvisningar for turplanering, ruttkvalitet, verkstadsnotiser, verktygslan, akuthjalp och traffar.", da: "Brug gratis OpenStreetMap-visninger til turplanlaegning, rutekvalitet, vaerkstedsnoter, vaerktojslan, nodhjaelp og treff.", de: "Nutze kostenlose OpenStreetMap-Vorschauen fur Tourenplanung, Routenqualitat, Werkstattnotizen, Werkzeugleihe, Notfallhilfe und Treffen.", fr: "Utilisez les apercus OpenStreetMap gratuits pour routes, qualite, ateliers, pret d'outils, aide urgente et rencontres.", es: "Usa vistas gratuitas de OpenStreetMap para rutas, calidad, talleres, prestamo de herramientas, ayuda y encuentros.", it: "Usa anteprime OpenStreetMap gratuite per percorsi, qualita, officine, prestito attrezzi, aiuto e incontri.", nl: "Gebruik gratis OpenStreetMap-previews voor ritplanning, routekwaliteit, shops, tool-lenen, noodhulp en meetups.", pl: "Uzyj darmowych podgladow OpenStreetMap do tras, jakosci drog, warsztatow, narzedzi, pomocy i spotkan.", pt: "Use pre-visualizacoes OpenStreetMap gratuitas para rotas, qualidade, oficinas, emprestimo de ferramentas, ajuda e encontros." },
  "Map source": { no: "Kartkilde", sv: "Kartkalla", da: "Kortkilde", de: "Kartenquelle", fr: "Source de carte", es: "Fuente del mapa", it: "Fonte mappa", nl: "Kaartbron", pl: "Zrodlo mapy", pt: "Fonte do mapa" },
  "Powered by OpenStreetMap. Each card can open the same area on the full OSM site for deeper exploring.": { no: "Drevet av OpenStreetMap. Hvert kort kan apne samme omrade pa OSM for mer utforsking.", sv: "Drivs av OpenStreetMap. Varje kort kan oppna samma omrade pa OSM for mer utforskning.", da: "Drevet af OpenStreetMap. Hvert kort kan aabne samme omraade paa OSM for mere udforskning.", de: "Basiert auf OpenStreetMap. Jede Karte kann denselben Bereich auf OSM offnen.", fr: "Alimente par OpenStreetMap. Chaque carte peut ouvrir la meme zone sur OSM.", es: "Usa OpenStreetMap. Cada tarjeta puede abrir la misma zona en OSM.", it: "Basato su OpenStreetMap. Ogni scheda puo aprire la stessa area su OSM.", nl: "Gebouwd op OpenStreetMap. Elke kaart kan hetzelfde gebied op OSM openen.", pl: "Oparte na OpenStreetMap. Kazda karta moze otworzyc ten sam obszar w OSM.", pt: "Com OpenStreetMap. Cada cartao pode abrir a mesma area no OSM." },
  "Map layers": { no: "Kartlag", sv: "Kartlager", da: "Kortlag", de: "Kartenebenen", fr: "Couches de carte", es: "Capas de mapa", it: "Livelli mappa", nl: "Kaartlagen", pl: "Warstwy mapy", pt: "Camadas do mapa" },
  "Pick a garage map": { no: "Velg et garasjekart", sv: "Valj en garagekarta", da: "Vaelg et garagekort", de: "Garagekarte wahlen", fr: "Choisir une carte garage", es: "Elegir mapa de garaje", it: "Scegli mappa garage", nl: "Kies garagekaart", pl: "Wybierz mape garazu", pt: "Escolher mapa da garagem" },
  Routes: { no: "Ruter", sv: "Rutter", da: "Ruter", de: "Routen", fr: "Routes", es: "Rutas", it: "Percorsi", nl: "Routes", pl: "Trasy", pt: "Rotas" },
  Shops: { no: "Verksteder", sv: "Verkstader", da: "Vaerksteder", de: "Werkstatten", fr: "Ateliers", es: "Talleres", it: "Officine", nl: "Shops", pl: "Warsztaty", pt: "Oficinas" },
  Tools: { no: "Verktoy", sv: "Verktyg", da: "Vaerktoj", de: "Werkzeuge", fr: "Outils", es: "Herramientas", it: "Attrezzi", nl: "Tools", pl: "Narzedzia", pt: "Ferramentas" },
  Meetups: { no: "Treff", sv: "Traffar", da: "Treff", de: "Treffen", fr: "Rencontres", es: "Encuentros", it: "Incontri", nl: "Meetups", pl: "Spotkania", pt: "Encontros" },
  Help: { no: "Hjelp", sv: "Hjalp", da: "Hjaelp", de: "Hilfe", fr: "Aide", es: "Ayuda", it: "Aiuto", nl: "Hulp", pl: "Pomoc", pt: "Ajuda" },
  Route: { no: "Rute", sv: "Rutt", da: "Rute", de: "Route", fr: "Route", es: "Ruta", it: "Percorso", nl: "Route", pl: "Trasa", pt: "Rota" },
  Shop: { no: "Verksted", sv: "Verkstad", da: "Vaerksted", de: "Werkstatt", fr: "Atelier", es: "Taller", it: "Officina", nl: "Shop", pl: "Warsztat", pt: "Oficina" },
  Tool: { no: "Verktoy", sv: "Verktyg", da: "Vaerktoj", de: "Werkzeug", fr: "Outil", es: "Herramienta", it: "Attrezzo", nl: "Tool", pl: "Narzedzie", pt: "Ferramenta" },
  Meetup: { no: "Treff", sv: "Traff", da: "Treff", de: "Treffen", fr: "Rencontre", es: "Encuentro", it: "Incontro", nl: "Meetup", pl: "Spotkanie", pt: "Encontro" },
  "Open in OpenStreetMap": { no: "Apne i OpenStreetMap", sv: "Oppna i OpenStreetMap", da: "Aabn i OpenStreetMap", de: "In OpenStreetMap offnen", fr: "Ouvrir dans OpenStreetMap", es: "Abrir en OpenStreetMap", it: "Apri in OpenStreetMap", nl: "Open in OpenStreetMap", pl: "Otworz w OpenStreetMap", pt: "Abrir no OpenStreetMap" },
  "Save to planner": { no: "Lagre i planlegger", sv: "Spara i planerare", da: "Gem i planlaegger", de: "Im Planer speichern", fr: "Sauver au planning", es: "Guardar en planificador", it: "Salva nel planner", nl: "Opslaan in planner", pl: "Zapisz w planerze", pt: "Guardar no planeador" },
  "Saved to planner": { no: "Lagret i planlegger", sv: "Sparat i planerare", da: "Gemt i planlaegger", de: "Im Planer gespeichert", fr: "Sauve au planning", es: "Guardado en planificador", it: "Salvato nel planner", nl: "Opgeslagen in planner", pl: "Zapisano w planerze", pt: "Guardado no planeador" },
  "Where maps plug in": { no: "Hvor kart brukes", sv: "Var kartor anvands", da: "Hvor kort bruges", de: "Wo Karten helfen", fr: "Ou les cartes servent", es: "Donde entran los mapas", it: "Dove servono le mappe", nl: "Waar kaarten passen", pl: "Gdzie dzialaja mapy", pt: "Onde entram mapas" },
  "Map-backed features for the garage": { no: "Kartstottede garasjefunksjoner", sv: "Kartstodda garagefunktioner", da: "Kortstottede garagefunktioner", de: "Kartenfunktionen fur die Garage", fr: "Fonctions avec cartes pour le garage", es: "Funciones con mapas para el garaje", it: "Funzioni con mappe per il garage", nl: "Kaartfuncties voor de garage", pl: "Funkcje map w garazu", pt: "Funcoes com mapas para a garagem" },
  "Maps For Routes, Shops, Tools, Meetups, And Help": { no: "Kart for ruter, verksteder, verktoy, treff og hjelp", sv: "Kartor for rutter, verkstader, verktyg, traffar och hjalp", da: "Kort til ruter, vaerksteder, vaerktoj, treff og hjaelp", de: "Karten fur Routen, Werkstatten, Werkzeuge, Treffen und Hilfe", fr: "Cartes pour routes, ateliers, outils, rencontres et aide", es: "Mapas para rutas, talleres, herramientas, encuentros y ayuda", it: "Mappe per percorsi, officine, attrezzi, incontri e aiuto", nl: "Kaarten voor routes, shops, tools, meetups en hulp", pl: "Mapy tras, warsztatow, narzedzi, spotkan i pomocy", pt: "Mapas para rotas, oficinas, ferramentas, encontros e ajuda" },
  "Open Maps": { no: "Apne kart", sv: "Oppna kartor", da: "Aabn kort", de: "Karten offnen", fr: "Ouvrir les cartes", es: "Abrir mapas", it: "Apri mappe", nl: "Open kaarten", pl: "Otworz mapy", pt: "Abrir mapas" },
  "Share practical motor-fanatic hacks: safe tool setups, temporary fixtures, measuring tricks, cleaning methods, grinder jigs, parts organization, and clever ways to solve old-machine problems.": { no: "Del praktiske motortriks: trygge verktoyoppsett, midlertidige fester, maletriks, rensemetoder, slipejigger, deleorganisering og smarte losninger for gamle maskiner.", sv: "Dela praktiska motortricks: sakra verktygsupplagg, tillfalliga fixturer, mattricks, rengoring, slipjiggar, delordning och smarta losningar.", da: "Del praktiske motortricks: sikre vaerktojsopsaetninger, midlertidige fiksturer, maletricks, rensning, slibejigs, deleorden og smarte losninger.", de: "Teile praktische Motortricks: sichere Werkzeug-Setups, Hilfsvorrichtungen, Messtricks, Reinigung, Schleifhilfen, Teileordnung und clevere Losungen fur alte Maschinen.", fr: "Partagez des astuces pratiques: outils surs, montages temporaires, mesure, nettoyage, gabarits, rangement des pieces et solutions pour anciennes.", es: "Comparte trucos practicos: herramientas seguras, utiles temporales, medicion, limpieza, plantillas, organizacion de piezas y soluciones.", it: "Condividi trucchi pratici: setup sicuri, supporti temporanei, misure, pulizia, dime, ordine pezzi e soluzioni.", nl: "Deel praktische motorhacks: veilige tool-opstellingen, tijdelijke hulpstukken, meettrucs, schoonmaak, slijpmallen, onderdelenorde en slimme oplossingen.", pl: "Dziel sie praktycznymi trikami: bezpieczne ustawienia narzedzi, uchwyty, pomiary, czyszczenie, przyrzady, porzadek czesci i rozwiazania.", pt: "Partilhe truques praticos: ferramentas seguras, suportes temporarios, medicao, limpeza, gabaritos, organizacao e solucoes." },
  "Use a simple bolted rest and soft wheel setup to polish small brackets more safely and consistently.": { no: "Bruk en enkel boltet anleggsflate og mykt hjul for tryggere og jevnere polering av sma braketter.", sv: "Anvand ett enkelt bultat stod och mjukt hjul for sakrare och jamnare polering av sma faste.", da: "Brug et simpelt boltet anslag og blodhjul til sikrere og jaevnere polering af smaa beslag.", de: "Nutze eine einfache verschraubte Auflage und weiche Scheibe, um kleine Halter sicherer und gleichmassiger zu polieren.", fr: "Utilisez un appui boulonne simple et un disque souple pour polir les petites pattes plus surement.", es: "Usa un apoyo atornillado y rueda blanda para pulir soportes pequenos con mas seguridad.", it: "Usa un appoggio imbullonato e una ruota morbida per lucidare piccole staffe in modo piu sicuro.", nl: "Gebruik een simpele geschroefde steun en zachte schijf om kleine beugels veiliger te polijsten.", pl: "Uzyj prostej przykrecanej podpory i miekkiego kola, aby bezpieczniej polerowac male wsporniki.", pt: "Use um apoio aparafusado e roda macia para polir suportes pequenos com mais seguranca." },
  "Make a sacrificial template before cutting gasket paper for old covers with uneven bolt spacing.": { no: "Lag en provemal for du kutter pakningspapir til gamle deksler med ujevne bolthull.", sv: "Gor en testmall innan du skar packningspapper for gamla lock med ojamt bultavstand.", da: "Lav en proveskabelon for du skaerer pakningspapir til gamle daeksler med ujaevne bolthuller.", de: "Erstelle zuerst eine Opferschablone, bevor du Dichtungspapier fur alte Deckel mit ungleichen Lochabstanden schneidest.", fr: "Faites un gabarit d'essai avant de couper le papier joint pour les vieux couvercles.", es: "Haz una plantilla de prueba antes de cortar junta para tapas antiguas con tornillos irregulares.", it: "Crea una sagoma di prova prima di tagliare carta guarnizione per coperchi vecchi.", nl: "Maak eerst een testmal voordat je pakkingpapier snijdt voor oude deksels.", pl: "Zrob szablon probny przed cieciem papieru uszczelkowego do starych pokryw.", pt: "Faca um molde de teste antes de cortar papel de junta para tampas antigas." },
  "Reuse a speaker magnet under a shallow tin to keep tiny trim screws and clips from wandering.": { no: "Bruk en hoyttalermagnet under et grunt lokk sa sma skruer og klips holder seg pa plass.", sv: "Ateranvand en hogtalarmagnet under ett grunt lock sa sma skruvar och clips stannar kvar.", da: "Genbrug en hojttalermagnet under et lavt laag saa smaa skruer og clips bliver pa plads.", de: "Nutze einen Lautsprechermagneten unter einer flachen Dose, damit kleine Schrauben und Clips bleiben.", fr: "Reutilisez un aimant de haut-parleur sous une boite peu profonde pour garder vis et clips.", es: "Reutiliza un iman de altavoz bajo una lata baja para sujetar tornillos y clips.", it: "Riusa un magnete di altoparlante sotto una scatola bassa per tenere viti e clip.", nl: "Gebruik een speakermagneet onder een laag bakje zodat kleine schroeven blijven liggen.", pl: "Uzyj magnesu z glosnika pod plytka puszka, aby male srubki i spinki nie uciekaly.", pt: "Reutilize um iman de coluna sob uma lata rasa para segurar parafusos e clips." },
  "A temporary gravity-feed bottle holder for first-start testing without balancing fuel on the frame.": { no: "En midlertidig tyngdematet flaskestotte for forste-start uten a balansere drivstoff pa rammen.", sv: "En tillfallig gravitationsmatad flaskhallare for forsta start utan att balansera bransle pa ramen.", da: "En midlertidig tyngdefodet flaskeholder til forste start uden at balancere braendstof pa rammen.", de: "Ein provisorischer Schwerkraft-Flaschenhalter fur Erststarts, ohne Kraftstoff am Rahmen zu balancieren.", fr: "Un support de bouteille par gravite pour premier demarrage sans poser le carburant sur le cadre.", es: "Un soporte temporal por gravedad para primer arranque sin equilibrar combustible en el chasis.", it: "Un supporto temporaneo a gravita per primo avvio senza bilanciare carburante sul telaio.", nl: "Een tijdelijke zwaartekrachtfleshouder voor eerste start zonder brandstof op het frame te balanceren.", pl: "Tymczasowy uchwyt butelki grawitacyjnej do pierwszego startu bez stawiania paliwa na ramie.", pt: "Um suporte temporario por gravidade para primeiro arranque sem equilibrar combustivel no quadro." },
  "Site guide": { no: "Sideguide", sv: "Sidguide", da: "Sideguide", de: "Site-Guide", fr: "Guide du site", es: "Guia del sitio", it: "Guida del sito", nl: "Sitegids", pl: "Przewodnik strony", pt: "Guia do site" },
  "This page explains the features in plain language so new members understand how to use the community and what each area is meant to do.": { no: "Denne siden forklarer funksjonene enkelt, slik at nye medlemmer forstar hvordan fellesskapet brukes og hva hvert omrade er til.", sv: "Den har sidan forklarar funktionerna enkelt sa nya medlemmar forstar hur gemenskapen anvands och vad varje omrade ar till for.", da: "Denne side forklarer funktionerne enkelt, saa nye medlemmer forstaar hvordan faellesskabet bruges og hvad hvert omraade er til.", de: "Diese Seite erklart die Funktionen einfach, damit neue Mitglieder die Community und jeden Bereich verstehen.", fr: "Cette page explique simplement les fonctions afin que les nouveaux membres comprennent la communaute et chaque zone.", es: "Esta pagina explica las funciones de forma sencilla para que los nuevos miembros entiendan la comunidad y cada area.", it: "Questa pagina spiega le funzioni in modo semplice, cosi i nuovi membri capiscono la comunita e ogni area.", nl: "Deze pagina legt de functies eenvoudig uit zodat nieuwe leden de gemeenschap en elk onderdeel begrijpen.", pl: "Ta strona prosto wyjasnia funkcje, aby nowi czlonkowie rozumieli spolecznosc i kazda sekcje.", pt: "Esta pagina explica as funcoes de forma simples para que novos membros entendam a comunidade e cada area." },
  "Garage Profiles": { no: "Garasjeprofiler", sv: "Garageprofiler", da: "Garageprofiler", de: "Garageprofile", fr: "Profils garage", es: "Perfiles de garaje", it: "Profili garage", nl: "Garageprofielen", pl: "Profile garazu", pt: "Perfis de garagem" },
  "Workshop know-how": { no: "Verkstedkunnskap", sv: "Verkstadskunskap", da: "Vaerkstedsviden", de: "Werkstattwissen", fr: "Savoir-faire atelier", es: "Saber de taller", it: "Sapere da officina", nl: "Werkplaatskennis", pl: "Wiedza warsztatowa", pt: "Saber de oficina" },
  "Garage Hacks And How-To Guides": { no: "Garasjetriks og veiledninger", sv: "Garagetricks och guider", da: "Garagetricks og guides", de: "Garage-Tricks und Anleitungen", fr: "Astuces garage et guides pratiques", es: "Trucos de garaje y guias", it: "Trucchi garage e guide", nl: "Garagehacks en handleidingen", pl: "Triki garazowe i poradniki", pt: "Truques de garagem e guias" },
  "The Hacks area is for member-made videos, photo guides, clever fixtures, tool setups, and small workshop tricks that help old motorcycles and cars get back on the road.": { no: "Hacks-omradet er for medlemsvideoer, fotoguider, smarte fester, verktoyoppsett og sma verkstedtriks som hjelper gamle motorsykler og biler tilbake pa veien.", sv: "Hacks-omradet ar for medlemsvideor, fotoguider, smarta fixturer, verktygsupplagg och sma verkstadstricks som hjalper gamla motorcyklar och bilar tillbaka pa vagen.", da: "Hacks-omraadet er til medlemsvideoer, fotoguides, smarte fiksturer, vaerktojsopsaetninger og smaa tricks der faar gamle motorcykler og biler tilbage paa vejen.", de: "Der Hacks-Bereich ist fur Mitgliedervideos, Fotoguides, clevere Vorrichtungen, Werkzeug-Setups und kleine Werkstatttricks fur alte Motorrader und Autos.", fr: "La zone Astuces accueille videos, guides photo, montages malins, outils adaptes et petits trucs d'atelier pour remettre les anciennes sur la route.", es: "La zona de Trucos reune videos, guias fotograficas, utiles ingeniosos, montajes de herramientas y trucos de taller para clasicos.", it: "L'area Trucchi raccoglie video, guide foto, dime intelligenti, setup utensili e piccoli trucchi per rimettere in strada i mezzi storici.", nl: "Het Hacks-gedeelte is voor ledenvideo's, fotogidsen, slimme hulpstukken, tool-opstellingen en kleine werkplaatstrucs voor oude machines.", pl: "Sekcja Triki jest na filmy, poradniki zdjeciowe, sprytne uchwyty, ustawienia narzedzi i male warsztatowe patenty.", pt: "A area de Truques e para videos, guias com fotos, suportes inteligentes, configuracoes de ferramentas e pequenos truques de oficina." },
  "Tool hacks": { no: "Verktoytriks", sv: "Verktygstricks", da: "Vaerktojstricks", de: "Werkzeugtricks", fr: "Astuces outils", es: "Trucos de herramientas", it: "Trucchi utensili", nl: "Toolhacks", pl: "Triki narzedziowe", pt: "Truques de ferramentas" },
  "How-to videos": { no: "Hvordan-videoer", sv: "Instruktionsvideor", da: "How-to-videoer", de: "Anleitungsvideos", fr: "Videos pratiques", es: "Videos practicos", it: "Video guida", nl: "How-to-video's", pl: "Filmy poradnikowe", pt: "Videos de como fazer" },
  "Photo guides": { no: "Fotoguider", sv: "Fotoguider", da: "Fotoguides", de: "Fotoguides", fr: "Guides photo", es: "Guias con fotos", it: "Guide foto", nl: "Fotogidsen", pl: "Poradniki zdjeciowe", pt: "Guias com fotos" },
  "Safety notes": { no: "Sikkerhetsnotater", sv: "Sakerhetsnotiser", da: "Sikkerhedsnoter", de: "Sicherheitshinweise", fr: "Notes securite", es: "Notas de seguridad", it: "Note di sicurezza", nl: "Veiligheidsnotities", pl: "Uwagi bezpieczenstwa", pt: "Notas de seguranca" },
  "Parts tricks": { no: "Deltriks", sv: "Deltricks", da: "Deltricks", de: "Teiletricks", fr: "Astuces pieces", es: "Trucos de piezas", it: "Trucchi pezzi", nl: "Onderdelentrucs", pl: "Triki z czesciami", pt: "Truques de pecas" },
  "Community review": { no: "Fellesskapets vurdering", sv: "Gemenskapens granskning", da: "Faellesskabets vurdering", de: "Community-Prufung", fr: "Avis de la communaute", es: "Revision comunitaria", it: "Revisione community", nl: "Communityreview", pl: "Ocena spolecznosci", pt: "Revisao da comunidade" },
  "Garage hacks": { no: "Garasjetriks", sv: "Garagetricks", da: "Garagetricks", de: "Garage-Tricks", fr: "Astuces garage", es: "Trucos de garaje", it: "Trucchi garage", nl: "Garagehacks", pl: "Triki garazowe", pt: "Truques de garagem" },
  "How-to videos, photos, and clever workshop tricks": { no: "Hvordan-videoer, bilder og smarte verkstedtriks", sv: "Instruktionsvideor, foton och smarta verkstadstricks", da: "How-to-videoer, fotos og smarte vaerkstedstricks", de: "Anleitungsvideos, Fotos und clevere Werkstatttricks", fr: "Videos, photos et astuces d'atelier", es: "Videos, fotos y trucos de taller", it: "Video, foto e trucchi da officina", nl: "How-to-video's, foto's en slimme werkplaatstrucs", pl: "Filmy, zdjecia i sprytne triki warsztatowe", pt: "Videos, fotos e truques inteligentes de oficina" },
  "Safety first": { no: "Sikkerhet forst", sv: "Sakerhet forst", da: "Sikkerhed forst", de: "Sicherheit zuerst", fr: "Securite d'abord", es: "Seguridad primero", it: "Sicurezza prima", nl: "Veiligheid eerst", pl: "Bezpieczenstwo najpierw", pt: "Seguranca primeiro" },
  "Every hack needs a risk note, protective gear, and a safer alternative when possible.": { no: "Hvert triks trenger risikonotat, verneutstyr og en tryggere variant nar mulig.", sv: "Varje trick behover risknotis, skyddsutrustning och ett sakrare alternativ nar det gar.", da: "Hvert trick skal have risikonote, vaernemidler og et sikrere alternativ naar muligt.", de: "Jeder Trick braucht Risiko, Schutzkleidung und wenn moglich eine sicherere Alternative.", fr: "Chaque astuce doit indiquer risques, protection et alternative plus sure si possible.", es: "Cada truco necesita riesgo, proteccion y una alternativa mas segura si existe.", it: "Ogni trucco deve indicare rischi, protezioni e un'alternativa piu sicura.", nl: "Elke hack heeft risico, bescherming en waar mogelijk een veiliger alternatief nodig.", pl: "Kazdy trik wymaga ryzyka, ochrony i bezpieczniejszej alternatywy, jesli istnieje.", pt: "Cada truque precisa de risco, protecao e alternativa mais segura quando possivel." },
  All: { no: "Alle", sv: "Alla", da: "Alle", de: "Alle", fr: "Tous", es: "Todo", it: "Tutti", nl: "Alles", pl: "Wszystko", pt: "Todos" },
  Videos: { no: "Videoer", sv: "Videor", da: "Videoer", de: "Videos", fr: "Videos", es: "Videos", it: "Video", nl: "Video's", pl: "Filmy", pt: "Videos" },
  Safety: { no: "Sikkerhet", sv: "Sakerhet", da: "Sikkerhed", de: "Sicherheit", fr: "Securite", es: "Seguridad", it: "Sicurezza", nl: "Veiligheid", pl: "Bezpieczenstwo", pt: "Seguranca" },
  Parts: { no: "Deler", sv: "Delar", da: "Dele", de: "Teile", fr: "Pieces", es: "Piezas", it: "Pezzi", nl: "Onderdelen", pl: "Czesci", pt: "Pecas" },
  "Tool hack": { no: "Verktoytriks", sv: "Verktygstrick", da: "Vaerktojstrick", de: "Werkzeugtrick", fr: "Astuce outil", es: "Truco de herramienta", it: "Trucco utensile", nl: "Toolhack", pl: "Trik narzedziowy", pt: "Truque de ferramenta" },
  Video: { no: "Video", sv: "Video", da: "Video", de: "Video", fr: "Video", es: "Video", it: "Video", nl: "Video", pl: "Film", pt: "Video" },
  Photos: { no: "Bilder", sv: "Foton", da: "Fotos", de: "Fotos", fr: "Photos", es: "Fotos", it: "Foto", nl: "Foto's", pl: "Zdjecia", pt: "Fotos" },
  "Photo guide": { no: "Fotoguide", sv: "Fotoguide", da: "Fotoguide", de: "Fotoguide", fr: "Guide photo", es: "Guia con fotos", it: "Guida foto", nl: "Fotogids", pl: "Poradnik zdjeciowy", pt: "Guia com fotos" },
  Contribute: { no: "Bidra", sv: "Bidra", da: "Bidrag", de: "Mitmachen", fr: "Contribuer", es: "Contribuir", it: "Contribuisci", nl: "Bijdragen", pl: "Dodaj", pt: "Contribuir" },
  "Submit a garage hack": { no: "Send inn et garasjetriks", sv: "Skicka in ett garagetrick", da: "Indsend et garagetrick", de: "Garage-Trick einreichen", fr: "Proposer une astuce garage", es: "Enviar truco de garaje", it: "Invia trucco garage", nl: "Garagehack indienen", pl: "Dodaj trik garazowy", pt: "Enviar truque de garagem" },
  "Hack title": { no: "Tittel pa triks", sv: "Titel pa trick", da: "Tricktitel", de: "Titel des Tricks", fr: "Titre de l'astuce", es: "Titulo del truco", it: "Titolo trucco", nl: "Hacktitel", pl: "Tytul triku", pt: "Titulo do truque" },
  Category: { no: "Kategori", sv: "Kategori", da: "Kategori", de: "Kategorie", fr: "Categorie", es: "Categoria", it: "Categoria", nl: "Categorie", pl: "Kategoria", pt: "Categoria" },
  "Risk note": { no: "Risikonotat", sv: "Risknotis", da: "Risikonote", de: "Risikohinweis", fr: "Note de risque", es: "Nota de riesgo", it: "Nota rischio", nl: "Risiconotitie", pl: "Uwaga o ryzyku", pt: "Nota de risco" },
  "Add hack idea": { no: "Legg til trikside", sv: "Lagg till trickide", da: "Tilfoj trickide", de: "Trickidee hinzufugen", fr: "Ajouter une idee", es: "Anadir idea", it: "Aggiungi idea", nl: "Hackidee toevoegen", pl: "Dodaj pomysl", pt: "Adicionar ideia" },
  "Example: grinder stand for polishing small brackets": { no: "Eksempel: slipestativ for polering av sma braketter", sv: "Exempel: slipstall for polering av sma faste", da: "Eksempel: slibestativ til polering af smaa beslag", de: "Beispiel: Schleifstander zum Polieren kleiner Halter", fr: "Exemple : support de meuleuse pour petites pattes", es: "Ejemplo: soporte de amoladora para soportes pequenos", it: "Esempio: supporto smerigliatrice per staffe piccole", nl: "Voorbeeld: slijpstandaard voor kleine beugels", pl: "Przyklad: stojak do szlifierki do malych wspornikow", pt: "Exemplo: suporte de rebarbadora para pecas pequenas" },
  "What can go wrong and how should members stay safe?": { no: "Hva kan ga galt, og hvordan holder medlemmer seg trygge?", sv: "Vad kan ga fel och hur haller medlemmar sig sakra?", da: "Hvad kan gaa galt, og hvordan holder medlemmer sig sikre?", de: "Was kann schiefgehen und wie bleiben Mitglieder sicher?", fr: "Qu'est-ce qui peut mal tourner et comment rester en securite ?", es: "Que puede salir mal y como se mantiene la seguridad?", it: "Cosa puo andare storto e come restare sicuri?", nl: "Wat kan misgaan en hoe blijven leden veilig?", pl: "Co moze pojsc zle i jak zachowac bezpieczenstwo?", pt: "O que pode correr mal e como manter seguranca?" },
  "Tools and materials": { no: "Verktoy og materialer", sv: "Verktyg och material", da: "Vaerktoj og materialer", de: "Werkzeuge und Material", fr: "Outils et materiaux", es: "Herramientas y materiales", it: "Utensili e materiali", nl: "Gereedschap en materialen", pl: "Narzedzia i materialy", pt: "Ferramentas e materiais" },
  "How to do it": { no: "Slik gjor du", sv: "Sa gor du", da: "Saadan gor du", de: "So geht es", fr: "Comment faire", es: "Como hacerlo", it: "Come farlo", nl: "Zo doe je het", pl: "Jak to zrobic", pt: "Como fazer" },
  Helpful: { no: "Nyttig", sv: "Hjalpsam", da: "Nyttig", de: "Hilfreich", fr: "Utile", es: "Util", it: "Utile", nl: "Handig", pl: "Pomocne", pt: "Util" },
  "Save to garage": { no: "Lagre i garasjen", sv: "Spara i garaget", da: "Gem i garagen", de: "In Garage speichern", fr: "Sauver au garage", es: "Guardar en garaje", it: "Salva in garage", nl: "Opslaan in garage", pl: "Zapisz w garazu", pt: "Guardar na garagem" },
  Saved: { no: "Lagret", sv: "Sparad", da: "Gemt", de: "Gespeichert", fr: "Enregistre", es: "Guardado", it: "Salvato", nl: "Opgeslagen", pl: "Zapisano", pt: "Guardado" }
});

Object.assign(phraseTranslations, {
  "Members can post short repair clips, first-start walkthroughs, carb cleaning steps, wiring checks, and paint prep demos.": { no: "Medlemmer kan legge ut korte reparasjonsklipp, forste-start, forgasserrens, ledningssjekk og lakkforberedelse.", sv: "Medlemmar kan lagga upp korta reparationsklipp, forsta start, forgasarrengoring, elsystemskontroll och lackforberedelse.", da: "Medlemmer kan dele korte reparationsklip, forste-start, karburatorrens, ledningstjek og lakforberedelse.", de: "Mitglieder posten kurze Reparaturclips, Erststart, Vergaserreinigung, Elektrikchecks und Lackvorbereitung.", fr: "Les membres publient de courts clips de reparation, premier demarrage, nettoyage carbu, controle electrique et preparation peinture.", es: "Los miembros publican clips de reparacion, primer arranque, limpieza de carburador, electricidad y preparacion de pintura.", it: "I membri pubblicano brevi clip di riparazione, primo avvio, pulizia carburatori, controlli elettrici e preparazione vernice.", nl: "Leden plaatsen korte reparatieclips, eerste start, carburateurreiniging, bedradingchecks en lakvoorbereiding.", pl: "Czlonkowie dodaja krotkie naprawy, pierwsze uruchomienie, czyszczenie gaznika, elektryke i przygotowanie lakieru.", pt: "Membros publicam clips de reparacao, primeiro arranque, carburador, eletrica e preparacao de pintura." },
  "Step-by-step photos make it easier to follow bracket repairs, gasket cutting, cable routing, trim fitting, and parts sorting.": { no: "Trinnvise bilder gjor det enklere a folge brakettreparasjon, pakningskutt, kabelforing, pyntelister og delesortering.", sv: "Stegvisa foton gor det lattare att folja fastejobb, packningsskarning, kabeldragning, listmontering och delsortering.", da: "Trinvise fotos gor det lettere at folge beslagreparation, pakningsskaering, kabelforing, lister og delesortering.", de: "Schrittbilder helfen bei Haltern, Dichtungen, Kabelfuhrung, Zierteilen und Teileordnung.", fr: "Les photos etape par etape aident pour supports, joints, cables, garnitures et tri des pieces.", es: "Las fotos paso a paso ayudan con soportes, juntas, cables, molduras y organizacion de piezas.", it: "Le foto passo passo aiutano con staffe, guarnizioni, cavi, finiture e ordine pezzi.", nl: "Stapfoto's helpen bij beugels, pakkingen, kabelroutes, sierdelen en onderdelen sorteren.", pl: "Zdjecia krok po kroku pomagaja przy wspornikach, uszczelkach, kablach, listwach i sortowaniu czesci.", pt: "Fotos passo a passo ajudam com suportes, juntas, cabos, acabamentos e organizacao de pecas." },
  "Every hack should explain what can go wrong, what protective gear is needed, and the safer alternative when there is one.": { no: "Hvert triks skal forklare hva som kan ga galt, hvilket verneutstyr som trengs og tryggere alternativ.", sv: "Varje trick ska forklara vad som kan ga fel, skyddsutrustning och sakrare alternativ.", da: "Hvert trick skal forklare hvad der kan gaa galt, vaernemidler og sikrere alternativer.", de: "Jeder Trick erklart Risiken, Schutzkleidung und sichere Alternativen.", fr: "Chaque astuce explique les risques, les protections et l'alternative plus sure.", es: "Cada truco explica riesgos, proteccion y alternativa mas segura.", it: "Ogni trucco spiega rischi, protezioni e alternativa piu sicura.", nl: "Elke hack legt risico, bescherming en veiliger alternatief uit.", pl: "Kazdy trik wyjasnia ryzyko, ochrone i bezpieczniejsza alternatywe.", pt: "Cada truque explica riscos, protecao e alternativa mais segura." },
  "Ideas for labeling, storing, cleaning, measuring, and identifying old parts before they disappear into the wrong box.": { no: "Ideer for merking, lagring, rensing, maling og identifisering av gamle deler for de havner i feil eske.", sv: "Ideer for markning, lagring, rengoring, matning och identifiering innan gamla delar hamnar fel.", da: "Ideer til maerkning, opbevaring, rensning, maling og identifikation for gamle dele ender forkert.", de: "Ideen zum Beschriften, Lagern, Reinigen, Messen und Erkennen alter Teile.", fr: "Idees pour etiqueter, ranger, nettoyer, mesurer et identifier les vieilles pieces.", es: "Ideas para etiquetar, guardar, limpiar, medir e identificar piezas antiguas.", it: "Idee per etichettare, conservare, pulire, misurare e identificare vecchi pezzi.", nl: "Ideeen voor labelen, bewaren, schoonmaken, meten en herkennen van oude onderdelen.", pl: "Pomysly na opisywanie, przechowywanie, czyszczenie, mierzenie i identyfikacje starych czesci.", pt: "Ideias para etiquetar, guardar, limpar, medir e identificar pecas antigas." },
  "Members can mark hacks helpful, suggest improvements, warn about risky setups, and add better photos.": { no: "Medlemmer kan markere triks som nyttige, foresla forbedringer, advare om risiko og legge til bedre bilder.", sv: "Medlemmar kan markera tricks som hjalpsamma, foresla forbattringar, varna for risker och lagga till battre foton.", da: "Medlemmer kan markere tricks som nyttige, foresla forbedringer, advare om risiko og tilfoje bedre fotos.", de: "Mitglieder markieren Tricks als hilfreich, schlagen Verbesserungen vor, warnen vor Risiken und erganzen Fotos.", fr: "Les membres notent les astuces utiles, proposent mieux, signalent les risques et ajoutent des photos.", es: "Los miembros marcan trucos utiles, sugieren mejoras, advierten riesgos y agregan mejores fotos.", it: "I membri segnano trucchi utili, suggeriscono miglioramenti, avvisano sui rischi e aggiungono foto.", nl: "Leden markeren hacks als handig, stellen verbeteringen voor, waarschuwen en voegen betere foto's toe.", pl: "Czlonkowie oznaczaja triki jako pomocne, proponuja poprawki, ostrzegaja i dodaja lepsze zdjecia.", pt: "Membros marcam truques uteis, sugerem melhorias, avisam riscos e adicionam fotos melhores." },
  "Open Garage Hacks": { no: "Apne Garasjetriks", sv: "Oppna Garagetricks", da: "Aabn Garagetricks", de: "Garage-Tricks offnen", fr: "Ouvrir Astuces garage", es: "Abrir Trucos de garaje", it: "Apri Trucchi garage", nl: "Open Garagehacks", pl: "Otworz Triki garazowe", pt: "Abrir Truques de garagem" },
  "Open Hacks when someone says \"I made a weird tool for this\" and the method deserves photos, video, steps, and a safety note.": { no: "Apne Hacks nar noen sier \"jeg laget et rart verktoy til dette\" og metoden trenger bilder, video, trinn og sikkerhetsnotat.", sv: "Oppna Hacks nar nagon sager \"jag gjorde ett konstigt verktyg for detta\" och metoden behover foton, video, steg och sakerhet.", da: "Aabn Hacks naar nogen siger \"jeg lavede et maerkeligt vaerktoj til dette\" og metoden fortjener fotos, video, trin og sikkerhed.", de: "Offne Hacks, wenn jemand sagt: \"Ich habe dafur ein komisches Werkzeug gebaut\" und die Methode Fotos, Video, Schritte und Sicherheit braucht.", fr: "Ouvrez Astuces quand quelqu'un dit \"j'ai fabrique un outil bizarre pour ca\" et que la methode merite photos, video, etapes et securite.", es: "Abre Trucos cuando alguien dice \"hice una herramienta rara para esto\" y el metodo merece fotos, video, pasos y seguridad.", it: "Apri Trucchi quando qualcuno dice \"ho fatto uno strano attrezzo per questo\" e servono foto, video, passi e sicurezza.", nl: "Open Hacks als iemand zegt \"ik maakte hier een raar gereedschap voor\" en de methode foto's, video, stappen en veiligheid verdient.", pl: "Otworz Triki, gdy ktos mowi \"zrobilem do tego dziwne narzedzie\" i metoda wymaga zdjec, filmu, krokow i bezpieczenstwa.", pt: "Abra Truques quando alguem diz \"fiz uma ferramenta estranha para isto\" e o metodo merece fotos, video, passos e seguranca." },
  "Bench grinder bracket polishing setup": { no: "Poleringsoppsett for braketter pa benkesliper", sv: "Polerupplagg for faste pa bankslip", da: "Poleringsopsaetning til beslag paa baenksliber", de: "Poliersetup fur Halter am Schleifbock", fr: "Polissage de petites pattes au touret", es: "Pulido de soportes con esmeril", it: "Lucidatura staffe su mola da banco", nl: "Beugels polijsten op bankslijper", pl: "Polerowanie wspornikow na szlifierce", pt: "Polir suportes no esmeril" },
  "Cardboard template for awkward gasket cuts": { no: "Pappmal for vanskelige pakningskutt", sv: "Kartongmall for svara packningar", da: "Papmal til svaere pakninger", de: "Pappschablone fur schwierige Dichtungen", fr: "Gabarit carton pour joint difficile", es: "Plantilla de carton para juntas dificiles", it: "Sagoma cartone per guarnizioni difficili", nl: "Kartonnen mal voor lastige pakkingen", pl: "Kartonowy szablon do uszczelek", pt: "Molde de cartao para juntas dificeis" },
  "Magnet tray made from an old speaker": { no: "Magnetbrett laget av gammel hoyttaler", sv: "Magnetbricka av gammal hogtalare", da: "Magnetbakke fra gammel hojttaler", de: "Magnetschale aus altem Lautsprecher", fr: "Plateau magnetique avec vieux haut-parleur", es: "Bandeja magnetica de altavoz viejo", it: "Vassoio magnetico da vecchio speaker", nl: "Magneetbak van oude speaker", pl: "Tacka magnetyczna ze starego glosnika", pt: "Bandeja magnetica de coluna antiga" },
  "First-start fuel bottle stand": { no: "Drivstoffflaskestativ for forste start", sv: "Bransleflaskstall for forsta start", da: "Braendstofflaskestativ til forste start", de: "Kraftstoffflaschenstander fur Erststart", fr: "Support de bouteille pour premier demarrage", es: "Soporte de botella para primer arranque", it: "Supporto bottiglia carburante per primo avvio", nl: "Brandstofflesstandaard voor eerste start", pl: "Stojak butelki paliwa do pierwszego startu", pt: "Suporte de garrafa para primeiro arranque" },
  "helpful votes": { no: "nyttige stemmer", sv: "hjalpsamma roster", da: "nyttige stemmer", de: "hilfreiche Stimmen", fr: "votes utiles", es: "votos utiles", it: "voti utili", nl: "handige stemmen", pl: "pomocne glosy", pt: "votos uteis" },
  You: { no: "Deg", sv: "Du", da: "Dig", de: "Du", fr: "Vous", es: "Tu", it: "Tu", nl: "Jij", pl: "Ty", pt: "Voce" },
  "New member-submitted garage hack idea ready for review.": { no: "Ny medlemside for garasjetriks klar til vurdering.", sv: "Ny medlemside for garagetrick klar for granskning.", da: "Ny medlemside til garagetrick klar til vurdering.", de: "Neue Garage-Trick-Idee eines Mitglieds bereit zur Prufung.", fr: "Nouvelle idee d'astuce garage prete a etre revue.", es: "Nueva idea de truco lista para revision.", it: "Nuova idea di trucco pronta per revisione.", nl: "Nieuw garagehackidee klaar voor review.", pl: "Nowy pomysl triku gotowy do oceny.", pt: "Nova ideia de truque pronta para revisao." }
});

const storageKey = "togos-preferred-language";
const googleStorageKey = "togos-google-language";
let applyingTranslations = false;

function isGoogleTranslateMode() {
  return document.body?.dataset.translationMode === "google";
}

function getPreferredLanguage() {
  if (isGoogleTranslateMode()) {
    return localStorage.getItem(googleStorageKey) || localStorage.getItem(storageKey) || "en";
  }
  return localStorage.getItem(storageKey) || "en";
}

function translatePhrase(source, lang) {
  if (lang === "en") {
    return source;
  }
  return phraseTranslations[source]?.[lang] || source;
}

function translateTextNode(node, lang) {
  const parent = node.parentElement;
  if (!parent || parent.closest("[data-no-translate]")) {
    return;
  }

  if (["SCRIPT", "STYLE", "TEXTAREA", "INPUT"].includes(parent.tagName)) {
    return;
  }

  const raw = node.nodeValue;
  const sourceText = raw.trim();
  if (!sourceText) {
    return;
  }

  const source = node.__togosI18nSource || sourceText;
  if (!phraseTranslations[source]) {
    return;
  }

  const leading = raw.match(/^\s*/)[0];
  const trailing = raw.match(/\s*$/)[0];
  node.__togosI18nSource = source;
  node.nodeValue = `${leading}${translatePhrase(source, lang)}${trailing}`;
}

function translateTextNodes(lang) {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    translateTextNode(node, lang);
    node = walker.nextNode();
  }
}

function applyTranslations(lang = getPreferredLanguage()) {
  applyingTranslations = true;
  document.documentElement.lang = lang;

  if (isGoogleTranslateMode()) {
    updateLanguageSwitchers(lang);
    ensureGoogleTranslate();
    applyingTranslations = false;
    return;
  }

  translateTextNodes(lang);

  document.querySelectorAll("input[placeholder], textarea[placeholder]").forEach((element) => {
    const source = element.dataset.i18nPlaceholder || element.getAttribute("placeholder");
    if (phraseTranslations[source]) {
      element.dataset.i18nPlaceholder = source;
      element.setAttribute("placeholder", translatePhrase(source, lang));
    }
  });

  updateLanguageSwitchers(lang);
  applyingTranslations = false;
}

function updateLanguageSwitchers(lang) {
  document.querySelectorAll("[data-language-switcher]").forEach((switcher) => {
    const option = languageOptions.find((item) => item.id === lang) || languageOptions[0];
    switcher.querySelector("[data-lang-code]").textContent = option.code;
    switcher.querySelector("[data-lang-name]").textContent = option.name;
    const flag = switcher.querySelector("[data-lang-flag]");
    flag.className = `lang-flag ${option.flag}`;
  });
}

function setGoogleTranslateCookie(lang) {
  const target = lang === "en" ? "/en/en" : `/en/${lang}`;
  document.cookie = `googtrans=${target};path=/`;
  if (location.hostname.includes(".")) {
    document.cookie = `googtrans=${target};path=/;domain=${location.hostname}`;
  }
}

function selectGoogleTranslateLanguage(lang) {
  const combo = document.querySelector(".goog-te-combo");
  if (!combo) {
    return false;
  }

  combo.value = lang === "en" ? "" : lang;
  combo.dispatchEvent(new Event("change"));
  return true;
}

function refreshGoogleTranslate(lang) {
  [200, 900, 1800, 3200].forEach((delay) => {
    window.setTimeout(() => selectGoogleTranslateLanguage(lang), delay);
  });
}

function applyGoogleTranslateLanguage(lang) {
  localStorage.setItem(googleStorageKey, lang);
  localStorage.setItem(storageKey, lang);
  setGoogleTranslateCookie(lang);
  updateLanguageSwitchers(lang);
  if (!selectGoogleTranslateLanguage(lang)) {
    refreshGoogleTranslate(lang);
  } else {
    refreshGoogleTranslate(lang);
  }
}

function ensureGoogleTranslate() {
  if (!isGoogleTranslateMode()) {
    return;
  }

  if (!document.querySelector("#google_translate_element")) {
    const mount = document.createElement("div");
    mount.id = "google_translate_element";
    mount.setAttribute("aria-hidden", "true");
    document.body.append(mount);
  }

  const lang = getPreferredLanguage();
  setGoogleTranslateCookie(lang);

  window.googleTranslateElementInit = () => {
    new google.translate.TranslateElement({
      pageLanguage: "en",
      includedLanguages: languageOptions.map((item) => item.id).join(","),
      autoDisplay: false
    }, "google_translate_element");
    refreshGoogleTranslate(getPreferredLanguage());
  };

  if (!document.querySelector("script[data-google-translate]")) {
    const script = document.createElement("script");
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.dataset.googleTranslate = "true";
    script.async = true;
    document.head.append(script);
  } else {
    window.clearTimeout(window.togosGoogleRefreshTimer);
    window.togosGoogleRefreshTimer = window.setTimeout(() => refreshGoogleTranslate(lang), 350);
  }
}

function createLanguageSwitcher() {
  const current = languageOptions.find((item) => item.id === getPreferredLanguage()) || languageOptions[0];
  const switcher = document.createElement("div");
  switcher.className = "language-switcher notranslate";
  switcher.dataset.languageSwitcher = "true";
  switcher.dataset.noTranslate = "true";
  switcher.setAttribute("translate", "no");
  switcher.innerHTML = `
    <button class="language-trigger" type="button" aria-expanded="false">
      <span class="lang-flag ${current.flag}" data-lang-flag aria-hidden="true"></span>
      <span data-lang-code>${current.code}</span>
      <small data-lang-name>${current.name}</small>
    </button>
    <div class="language-menu" hidden>
      ${languageOptions.map((option) => `
        <button type="button" data-lang="${option.id}">
          <span class="lang-flag ${option.flag}" aria-hidden="true"></span>
          <strong>${option.code}</strong>
          <span>${option.name}</span>
        </button>
      `).join("")}
    </div>
  `;

  const trigger = switcher.querySelector(".language-trigger");
  const menu = switcher.querySelector(".language-menu");
  trigger.addEventListener("click", () => {
    const isOpen = !menu.hidden;
    menu.hidden = isOpen;
    trigger.setAttribute("aria-expanded", String(!isOpen));
  });

  menu.addEventListener("click", (event) => {
    const button = event.target.closest("[data-lang]");
    if (!button) {
      return;
    }
    if (isGoogleTranslateMode()) {
      applyGoogleTranslateLanguage(button.dataset.lang);
    } else {
      localStorage.setItem(storageKey, button.dataset.lang);
      applyTranslations(button.dataset.lang);
    }
    menu.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
  });

  document.addEventListener("click", (event) => {
    if (!switcher.contains(event.target)) {
      menu.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
    }
  });

  return switcher;
}

function mountLanguageSwitcher() {
  const siteHeader = document.querySelector(".site-header");
  const adminActions = document.querySelector(".admin-actions");
  const target = siteHeader || adminActions;
  if (!target || target.querySelector("[data-language-switcher]")) {
    return;
  }

  const switcher = createLanguageSwitcher();
  if (siteHeader) {
    const cta = siteHeader.querySelector(".nav-cta");
    siteHeader.insertBefore(switcher, cta);
  } else {
    adminActions.prepend(switcher);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  mountLanguageSwitcher();
  applyTranslations();
  const observer = new MutationObserver(() => {
    if (!applyingTranslations) {
      window.clearTimeout(window.togosI18nTimer);
      window.togosI18nTimer = window.setTimeout(() => applyTranslations(), 60);
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
});

window.togosI18n = {
  apply: applyTranslations,
  getLanguage: getPreferredLanguage
};
