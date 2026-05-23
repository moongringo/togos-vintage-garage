const vehicleProfileShell = document.querySelector("#vehicle-profile-shell");

const vehicleProfiles = [
  { year: 1912, era: "pre1920", name: "1912 belt-drive motorcycle", owner: "Archive Circle", status: "Running carefully", passport: ["Running", "Museum plates", "Hand-start only"], route: [85, 42, 76, 91], tools: ["Magneto puller", "Leather punch", "Trailer"], build: "Fuel line and leather belt documented", meetup: "Display-only heritage morning" },
  { year: 1928, era: "1920s", name: "1928 roadster project", owner: "Leif K.", status: "Under restoration", passport: ["Needs parts", "Wood frame repair", "Receipts active"], route: [72, 64, 58, 88], tools: ["Calipers", "Trailer", "Wood clamps"], build: "Frame measurements uploaded", meetup: "Pre-war project table" },
  { year: 1936, era: "1930s", name: "1936 sedan", owner: "Nora V.", status: "Roadworthy", passport: ["Roadworthy", "Interior original", "Valve check due"], route: [78, 70, 82, 75], tools: ["Trim tools", "Timing light"], build: "Seat stitching photographed", meetup: "Story night feature" },
  { year: 1954, era: "1950s", name: "1954 green coupe", owner: "Togos Garage", status: "Roadworthy", passport: ["Running", "Chrome hunt", "Winter tune-up"], route: [88, 79, 84, 94], tools: ["Compression tester", "Timing light", "Trailer access"], build: "Winter tune-up and chrome trim hunt", meetup: "Coffee and cold starts" },
  { year: 1966, era: "1960s", name: "1966 twin motorcycle", owner: "Togos Garage", status: "Needs parts", passport: ["Needs cable", "Spark confirmed", "Tank clean"], route: [82, 75, 88, 90], tools: ["Vacuum gauges", "Metric tools", "Compression tester"], build: "First-start checklist started", meetup: "First-start Saturday" },
  { year: 1974, era: "1970s", name: "1974 Honda CB550", owner: "Arne M.", status: "Under restoration", passport: ["Carbs open", "Charging fault", "Brake fluid due"], route: [79, 81, 76, 92], tools: ["Vacuum gauges", "Torque wrench", "Compression tester"], build: "CB550 first-start diary", meetup: "Shop night tuning bench" },
  { year: 1987, era: "1980s", name: "1987 future-classic coupe", owner: "Mia S.", status: "Running", passport: ["Running", "Daily friendly", "Future classic"], route: [92, 86, 90, 78], tools: ["Jump leads", "Fuel can", "Tool roll"], build: "Route library favorite", meetup: "Back-road photo run" },
  { year: 1994, era: "1990s", name: "1994 roadster", owner: "Jon P.", status: "Roadworthy", passport: ["Roadworthy", "Track-safe brakes", "Soft top aged"], route: [95, 72, 89, 86], tools: ["Trailer", "Welder", "Bike lift"], build: "100-mile challenge car", meetup: "100-mile challenge" },
  { year: 2003, era: "2000s", name: "2003 sport touring motorcycle", owner: "Mia S.", status: "For sale", passport: ["For sale", "Service current", "Touring luggage"], route: [89, 94, 83, 80], tools: ["Metric tools", "Jump leads"], build: "Marketplace watch active", meetup: "Buyer inspection day" },
  { year: 2016, era: "2010s", name: "2016 modern classic", owner: "Nora V.", status: "Running", passport: ["Running", "ABS", "Cafe setup"], route: [96, 88, 84, 91], tools: ["OBD reader", "Metric tools"], build: "Sound gallery added", meetup: "New member ride" },
  { year: 2023, era: "2020s", name: "2023 electric restomod", owner: "Build Lab", status: "Prototype", passport: ["Prototype", "EV conversion", "Documentation heavy"], route: [90, 68, 96, 70], tools: ["Lift", "Insulated tools", "Torque wrench"], build: "Road test deadline planned", meetup: "Restomod debate night" }
];

function getRequestedVehicle() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("vehicle") || "";
  const aliases = {
    "1950s-green-coupe": "1954-green-coupe",
    "1960s-twin-motorcycle": "1966-twin-motorcycle",
    "classic-mini": "1987-future-classic-coupe",
    "1968-volvo-amazon": "1936-sedan",
    "1971-triumph-bonneville": "1966-twin-motorcycle",
    "1965-mercedes-sedan": "1936-sedan",
    "1970s-project-moped": "1974-honda-cb550",
    "1962-saab-96": "1936-sedan",
    "1950s-scooter": "1966-twin-motorcycle",
    "1978-land-rover": "1994-roadster",
    "1969-bsa-project": "1974-honda-cb550"
  };
  const resolvedSlug = aliases[slug] || slug;
  return vehicleProfiles.find((vehicle) => window.togosVehicleSocial.makeVehicleSlug(vehicle.name) === resolvedSlug)
    || findSharedVehicleProfile(resolvedSlug)
    || vehicleProfiles[3];
}

function findSharedVehicleProfile(slug) {
  const members = window.togosData?.get("garageMembers") || [];

  for (const member of members) {
    const vehicleName = (member.vehicles || []).find((vehicle) => window.togosVehicleSocial.makeVehicleSlug(vehicle) === slug);
    if (!vehicleName) {
      continue;
    }

    const yearMatch = String(vehicleName).match(/\b(19|20)\d{2}\b/);
    const year = yearMatch ? Number(yearMatch[0]) : new Date().getFullYear();
    const decade = year < 1920 ? "pre1920" : `${Math.floor(year / 10) * 10}s`;

    return {
      year,
      era: decade,
      name: vehicleName,
      owner: member.name,
      status: "New profile",
      passport: ["Profile started", member.status || "In the workshop", "Needs build details"],
      route: [70, 70, 70, 70],
      tools: member.tools?.length ? member.tools : ["Basic tools"],
      build: member.build || "Owner-created vehicle profile ready for photos, receipts, and build notes.",
      meetup: "Add a first route, maintenance log, and help request when ready."
    };
  }

  return null;
}

function renderVehicleComments(vehicle) {
  const slug = window.togosVehicleSocial.makeVehicleSlug(vehicle.name);
  const comments = window.togosVehicleSocial.commentsForVehicle(slug);
  if (!comments.length) {
    return `<p class="planner-note">No comments yet. Ask a question, leave a build note, or tag the owner for help.</p>`;
  }

  return comments.map((comment) => `
    <article class="comment-card" data-comment-id="${comment.id}">
      <div class="comment-meta"><strong>${comment.author}</strong><span>${comment.createdAt}</span></div>
      <p>${comment.text}</p>
      <div class="reply-list">
        ${comment.replies.map((reply) => `
          <div class="reply-card">
            <div class="comment-meta"><strong>${reply.author}</strong><span>${reply.createdAt}</span></div>
            <p>${reply.text}</p>
          </div>
        `).join("")}
      </div>
      <form class="comment-reply-form" data-reply-comment="${comment.id}">
        <textarea placeholder="Answer from the vehicle profile..."></textarea>
        <button type="submit">Reply</button>
      </form>
    </article>
  `).join("");
}

function renderVehicleProfile() {
  const vehicle = getRequestedVehicle();
  const slug = window.togosVehicleSocial.makeVehicleSlug(vehicle.name);
  const [potholes, fuel, cafe, oldBike] = vehicle.route;
  document.title = `${vehicle.name} | Togos Vintage Garage`;

  vehicleProfileShell.innerHTML = `
    <article class="vehicle-profile-card">
      <div class="vehicle-cover">
        <span>${vehicle.year} / ${vehicle.era === "pre1920" ? "Before 1920s" : vehicle.era}</span>
      </div>
      <div class="vehicle-head">
        <div>
          <h1>${vehicle.name}</h1>
          <p>${vehicle.owner} / ${vehicle.status}</p>
          <a class="vehicle-owner-link" href="profiles.html?member=${encodeURIComponent(vehicle.owner)}">Open owner profile</a>
        </div>
        <span class="health-pill">${vehicle.passport[0]}</span>
      </div>
      <div class="vehicle-profile-grid">
        <div class="vehicle-profile-side">
          <section class="vehicle-panel">
            <h2>Vehicle Health Passport</h2>
            <div class="passport-grid">${vehicle.passport.map((item) => `<article class="passport-card"><span>Status</span><strong>${item}</strong></article>`).join("")}</div>
          </section>
          <section class="vehicle-panel">
            <h2>Route Quality Ratings</h2>
            <div class="route-ratings">
              <div class="route-score"><strong>Pothole comfort</strong><i style="--score:${potholes}%"></i><span>${potholes}</span></div>
              <div class="route-score"><strong>Fuel access</strong><i style="--score:${fuel}%"></i><span>${fuel}</span></div>
              <div class="route-score"><strong>Cafe stops</strong><i style="--score:${cafe}%"></i><span>${cafe}</span></div>
              <div class="route-score"><strong>Old-bike friendly</strong><i style="--score:${oldBike}%"></i><span>${oldBike}</span></div>
            </div>
          </section>
          <section class="vehicle-panel">
            <h2>Tool Availability Map</h2>
            <div class="tool-map">${vehicle.tools.map((tool) => `<span>${tool}</span>`).join("")}</div>
            <a class="vehicle-map-link" href="maps.html">Open full map</a>
          </section>
        </div>
        <div class="vehicle-comments">
          <section class="vehicle-panel">
            <h2>Build diary snapshot</h2>
            <p>${vehicle.build}</p>
            <p>${vehicle.meetup}</p>
          </section>
          <form class="comment-form" id="vehicle-comment-form">
            <h2>Comments and owner replies</h2>
            <textarea id="vehicle-comment-text" placeholder="Comment on this vehicle, ask a question, or suggest a fix..."></textarea>
            <button type="submit">Post comment and notify owner</button>
          </form>
          <section class="vehicle-comment-list" id="vehicle-comment-list">${renderVehicleComments(vehicle)}</section>
        </div>
      </div>
    </article>
  `;

  document.querySelector("#vehicle-comment-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.querySelector("#vehicle-comment-text");
    const text = input.value.trim();
    if (!text) {
      return;
    }
    window.togosVehicleSocial.addVehicleComment({
      vehicleSlug: slug,
      vehicleName: vehicle.name,
      owner: vehicle.owner,
      author: "You",
      text
    });
    input.value = "";
    renderVehicleProfile();
  });
}

vehicleProfileShell.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-reply-comment]");
  if (!form) {
    return;
  }
  event.preventDefault();
  const input = form.querySelector("textarea");
  const text = input.value.trim();
  if (!text) {
    return;
  }
  window.togosVehicleSocial.addVehicleReply(form.dataset.replyComment, "Owner reply", text);
  renderVehicleProfile();
});

renderVehicleProfile();

window.addEventListener("togos-data-ready", renderVehicleProfile);
