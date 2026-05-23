const vehicleList = document.querySelector("#vehicle-list");
const vehicleDetail = document.querySelector("#vehicle-detail");
const vehicleCount = document.querySelector("#vehicle-count");
const eraFilters = [...document.querySelectorAll(".era-filter")];

const vehicles = [
  {
    year: 1912,
    era: "pre1920",
    name: "1912 belt-drive motorcycle",
    owner: "Archive Circle",
    status: "Running carefully",
    passport: ["Running", "Museum plates", "Hand-start only"],
    provenance: [["1912", "Factory delivery noted in club archive"], ["1958", "Barn discovery and first recommission"], ["2025", "Fuel line and leather belt documented"]],
    receipts: ["Leather belt measurement", "Magneto service note", "Brass fuel tap drawing"],
    route: [85, 42, 76, 91],
    market: ["rare trim", "verify magneto", "fair price only with paperwork"],
    tools: ["Magneto puller", "Leather punch", "Trailer"],
    mentors: ["Pre-war mechanics", "Brass-era ignition"],
    meetup: "Display-only heritage morning"
  },
  {
    year: 1928,
    era: "1920s",
    name: "1928 roadster project",
    owner: "Leif K.",
    status: "Under restoration",
    passport: ["Needs parts", "Wood frame repair", "Receipts active"],
    provenance: [["1928", "Delivered as open roadster"], ["1974", "Stored after clutch failure"], ["2026", "Frame measurements uploaded"]],
    receipts: ["Wood frame measurements", "Paint code research", "Clutch parts invoice"],
    route: [72, 64, 58, 88],
    market: ["check rust here", "wrong badge risk", "rare trim"],
    tools: ["Calipers", "Trailer", "Wood clamps"],
    mentors: ["Wood frame", "Paint research"],
    meetup: "Pre-war project table"
  },
  {
    year: 1936,
    era: "1930s",
    name: "1936 sedan",
    owner: "Nora V.",
    status: "Roadworthy",
    passport: ["Roadworthy", "Interior original", "Valve check due"],
    provenance: [["1936", "First owner record"], ["1999", "Interior preserved"], ["2026", "Seat stitching photographed"]],
    receipts: ["Upholstery pattern", "Valve clearance card", "Period manual scan"],
    route: [78, 70, 82, 75],
    market: ["original interior", "fair price", "check door bottoms"],
    tools: ["Trim tools", "Timing light"],
    mentors: ["Upholstery", "Interior preservation"],
    meetup: "Story night feature"
  },
  {
    year: 1954,
    era: "1950s",
    name: "1954 green coupe",
    owner: "Togos Garage",
    status: "Roadworthy",
    passport: ["Running", "Chrome hunt", "Winter tune-up"],
    provenance: [["1954", "Sold new in town"], ["1988", "Family ownership begins"], ["2026", "Chrome trim hunt logged"]],
    receipts: ["Chrome trim list", "Carb rebuild receipt", "Paint chip reference"],
    route: [88, 79, 84, 94],
    market: ["fair price", "rare trim", "check rust behind arches"],
    tools: ["Compression tester", "Timing light", "Trailer access"],
    mentors: ["Carb tuning", "First starts"],
    meetup: "Coffee and cold starts"
  },
  {
    year: 1966,
    era: "1960s",
    name: "1966 twin motorcycle",
    owner: "Togos Garage",
    status: "Needs parts",
    passport: ["Needs cable", "Spark confirmed", "Tank clean"],
    provenance: [["1966", "Dealer stamp in manual"], ["2011", "Engine refreshed"], ["2026", "First-start checklist started"]],
    receipts: ["Cable sleeve dimensions", "Spark plug notes", "Wiring diagram"],
    route: [82, 75, 88, 90],
    market: ["wrong cable length", "ask for stamping", "fair price"],
    tools: ["Vacuum gauges", "Metric tools", "Compression tester"],
    mentors: ["Carb tuning", "Electrical"],
    meetup: "First-start Saturday"
  },
  {
    year: 1974,
    era: "1970s",
    name: "1974 Honda CB550",
    owner: "Arne M.",
    status: "Under restoration",
    passport: ["Carbs open", "Charging fault", "Brake fluid due"],
    provenance: [["1974", "Original sales booklet"], ["2024", "Charging issue found"], ["2026", "Carb sync diary active"]],
    receipts: ["Regulator invoice", "Carb gasket set", "Brake fluid note"],
    route: [79, 81, 76, 92],
    market: ["check side covers", "fair price", "wrong badge"],
    tools: ["Vacuum gauges", "Torque wrench", "Compression tester"],
    mentors: ["Carb sync", "Spark diagnosis"],
    meetup: "Shop night tuning bench"
  },
  {
    year: 1987,
    era: "1980s",
    name: "1987 future-classic coupe",
    owner: "Mia S.",
    status: "Running",
    passport: ["Running", "Daily friendly", "Future classic"],
    provenance: [["1987", "First registered"], ["2021", "Suspension refreshed"], ["2026", "Route library favorite"]],
    receipts: ["Suspension receipt", "Cafe route GPX", "Service stamp scan"],
    route: [92, 86, 90, 78],
    market: ["rising interest", "check dashboard cracks", "fair price"],
    tools: ["Jump leads", "Fuel can", "Tool roll"],
    mentors: ["Route planning", "Meetup mode"],
    meetup: "Back-road photo run"
  },
  {
    year: 1994,
    era: "1990s",
    name: "1994 roadster",
    owner: "Jon P.",
    status: "Roadworthy",
    passport: ["Roadworthy", "Track-safe brakes", "Soft top aged"],
    provenance: [["1994", "Original service book"], ["2018", "Brake upgrade"], ["2026", "Challenge car for 100-mile month"]],
    receipts: ["Brake pad receipt", "Soft top quote", "Alignment sheet"],
    route: [95, 72, 89, 86],
    market: ["future classic", "check sill rust", "clean history"],
    tools: ["Trailer", "Welder", "Bike lift"],
    mentors: ["Welding", "Towing"],
    meetup: "100-mile challenge"
  },
  {
    year: 2003,
    era: "2000s",
    name: "2003 sport touring motorcycle",
    owner: "Mia S.",
    status: "For sale",
    passport: ["For sale", "Service current", "Touring luggage"],
    provenance: [["2003", "Dealer delivery"], ["2020", "Luggage added"], ["2026", "Marketplace watch active"]],
    receipts: ["Valve service", "Tire invoice", "Luggage key code"],
    route: [89, 94, 83, 80],
    market: ["fair price", "verify service", "check pannier locks"],
    tools: ["Metric tools", "Jump leads"],
    mentors: ["Buying advice", "Touring setup"],
    meetup: "Buyer inspection day"
  },
  {
    year: 2016,
    era: "2010s",
    name: "2016 modern classic",
    owner: "Nora V.",
    status: "Running",
    passport: ["Running", "ABS", "Cafe setup"],
    provenance: [["2016", "Bought new"], ["2023", "Seat customized"], ["2026", "Sound gallery added"]],
    receipts: ["Seat upholstery", "Exhaust note clip", "ABS service"],
    route: [96, 88, 84, 91],
    market: ["modern classic", "good entry point", "check extras"],
    tools: ["OBD reader", "Metric tools"],
    mentors: ["First classic purchase", "Seat setup"],
    meetup: "New member ride"
  },
  {
    year: 2023,
    era: "2020s",
    name: "2023 electric restomod",
    owner: "Build Lab",
    status: "Prototype",
    passport: ["Prototype", "EV conversion", "Documentation heavy"],
    provenance: [["2023", "Donor shell purchased"], ["2025", "Battery layout documented"], ["2026", "Road test deadline planned"]],
    receipts: ["Battery diagram", "Motor invoice", "Paint code"],
    route: [90, 68, 96, 70],
    market: ["restomod debate", "document everything", "deadline risk"],
    tools: ["Lift", "Insulated tools", "Torque wrench"],
    mentors: ["EV safety", "Restomod planning"],
    meetup: "Restomod debate night"
  }
];

let activeEra = "all";
let activeVehicle = 0;
let joinedChallenge = false;

function getEraLabel(era) {
  return era === "pre1920" ? "Before 1920s" : era;
}

function visibleVehicles() {
  return vehicles.filter((vehicle) => activeEra === "all" || vehicle.era === activeEra);
}

function renderVehicleList() {
  const list = visibleVehicles();
  vehicleList.innerHTML = "";
  vehicleCount.textContent = `${list.length} ${list.length === 1 ? "vehicle" : "vehicles"}`;

  list.forEach((vehicle) => {
    const index = vehicles.indexOf(vehicle);
    const card = document.createElement("button");
    card.type = "button";
    card.className = `vehicle-card${index === activeVehicle ? " active" : ""}`;
    card.innerHTML = `
      <span class="vehicle-thumb" aria-hidden="true"></span>
      <span>
        <h3>${vehicle.name}</h3>
        <p>${vehicle.owner} / ${vehicle.status}</p>
        <span class="vehicle-card-link">Profile page</span>
      </span>
      <small class="vehicle-era">${getEraLabel(vehicle.era)}</small>
    `;
    card.addEventListener("click", () => renderVehicleDetail(index));
    vehicleList.append(card);
  });
}

function renderVehicleDetail(index) {
  activeVehicle = index;
  const vehicle = vehicles[index];
  const [potholes, fuel, cafe, oldBike] = vehicle.route;

  vehicleDetail.innerHTML = `
    <article>
      <div class="vehicle-cover">
        <span>${vehicle.year} / ${getEraLabel(vehicle.era)}</span>
      </div>
      <div class="vehicle-head">
        <div>
          <h2>${vehicle.name}</h2>
          <p>${vehicle.owner} / ${vehicle.status}</p>
          <a class="vehicle-map-link" href="vehicle-profile.html?vehicle=${window.togosVehicleSocial.makeVehicleSlug(vehicle.name)}">Open full vehicle profile</a>
        </div>
        <span class="health-pill">${vehicle.passport[0]}</span>
      </div>
      <div class="vehicle-dashboard">
        <section class="vehicle-panel">
          <h3>Vehicle Health Passport</h3>
          <div class="passport-grid">
            ${vehicle.passport.map((item) => `<article class="passport-card"><span>Status</span><strong>${item}</strong></article>`).join("")}
          </div>
        </section>

        <div class="vehicle-feature-grid">
          <section class="vehicle-panel">
            <h3>AI Part Identifier</h3>
            <div class="part-id-box">
              <span class="mystery-photo" aria-hidden="true"></span>
              <p id="part-id-result">Upload a mystery part photo later. For now, try the demo analysis.</p>
            </div>
            <button type="button" id="analyze-part">Analyze mystery part</button>
          </section>

          <section class="vehicle-panel">
            <h3>Restoration Receipts Vault</h3>
            <div class="vault-list">
              ${vehicle.receipts.map((receipt) => `<div class="vault-item"><strong>${receipt}</strong><span>Saved</span></div>`).join("")}
            </div>
          </section>

          <section class="vehicle-panel">
            <h3>Route Quality Ratings</h3>
            <div class="route-ratings">
              <div class="route-score"><strong>Pothole comfort</strong><i style="--score:${potholes}%"></i><span>${potholes}</span></div>
              <div class="route-score"><strong>Fuel access</strong><i style="--score:${fuel}%"></i><span>${fuel}</span></div>
              <div class="route-score"><strong>Cafe stops</strong><i style="--score:${cafe}%"></i><span>${cafe}</span></div>
              <div class="route-score"><strong>Old-bike friendly</strong><i style="--score:${oldBike}%"></i><span>${oldBike}</span></div>
            </div>
          </section>

          <section class="vehicle-panel">
            <h3>Meetup Mode</h3>
            <div class="meetup-card">
              <strong>${vehicle.meetup}</strong>
              <p>RSVP, route, fuel stops, emergency contact, weather note, and photo album.</p>
            </div>
            <button type="button" id="meetup-rsvp">RSVP</button>
          </section>
        </div>

        <section class="vehicle-panel">
          <h3>Build Provenance Timeline</h3>
          <div class="timeline-list-vehicle">
            ${vehicle.provenance.map(([year, text]) => `<article class="timeline-item"><time>${year}</time><strong>${text}</strong></article>`).join("")}
          </div>
        </section>

        <div class="vehicle-feature-grid">
          <section class="vehicle-panel">
            <h3>Garage Marketplace With Red-Flag Comments</h3>
            <div class="market-list">
              ${vehicle.market.map((note) => `<div class="market-note"><strong>${note}</strong><span>Member note</span></div>`).join("")}
            </div>
          </section>

          <section class="vehicle-panel">
            <h3>Tool Availability Map</h3>
            <div class="vehicle-osm-map" aria-label="OpenStreetMap tool availability preview">
              <iframe title="OpenStreetMap tool availability preview" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=10.52%2C59.76%2C11.08%2C60.0&amp;layer=mapnik&amp;marker=59.89%2C10.82"></iframe>
              <span>OSM tool map</span>
            </div>
            <div class="tool-map">${vehicle.tools.map((tool) => `<span>${tool}</span>`).join("")}</div>
            <a class="vehicle-map-link" href="maps.html">Open full map</a>
          </section>

          <section class="vehicle-panel">
            <h3>Garage Challenges</h3>
            <div class="challenge-list">
              <span>Fix one thing this week</span>
              <span>Ride 100 miles</span>
              <span>Post a before photo</span>
              <span>Organize parts shelf</span>
            </div>
            <button type="button" id="join-vehicle-challenge">${joinedChallenge ? "Joined challenge" : "Join challenge"}</button>
          </section>

          <section class="vehicle-panel">
            <h3>Mentor Circles</h3>
            <div class="mentor-list">
              ${vehicle.mentors.map((mentor) => `<div class="mentor-chip"><strong>${mentor}</strong><p>Small group with members who can help.</p></div>`).join("")}
            </div>
          </section>
        </div>
      </div>
    </article>
  `;

  renderVehicleList();
}

eraFilters.forEach((button) => {
  button.addEventListener("click", () => {
    activeEra = button.dataset.era;
    eraFilters.forEach((item) => item.classList.toggle("active", item === button));
    const firstMatch = visibleVehicles()[0];
    if (firstMatch) {
      renderVehicleDetail(vehicles.indexOf(firstMatch));
    } else {
      renderVehicleList();
    }
  });
});

vehicleDetail.addEventListener("click", (event) => {
  if (event.target.id === "analyze-part") {
    const vehicle = vehicles[activeVehicle];
    document.querySelector("#part-id-result").textContent = `Likely match: period-correct bracket or trim hardware for ${vehicle.name}. Ask members for dimensions, rear stamping, and fitment photos.`;
  }

  if (event.target.id === "meetup-rsvp") {
    event.target.textContent = event.target.textContent === "RSVP" ? "Going" : "RSVP";
  }

  if (event.target.id === "join-vehicle-challenge") {
    joinedChallenge = !joinedChallenge;
    event.target.textContent = joinedChallenge ? "Joined challenge" : "Join challenge";
  }
});

renderVehicleDetail(0);
