const mapList = document.querySelector("#map-list");
const mapFrame = document.querySelector("#garage-map-frame");
const mapKind = document.querySelector("#map-kind");
const mapTitle = document.querySelector("#map-title");
const mapDescription = document.querySelector("#map-description");
const mapStats = document.querySelector("#map-stats");
const mapOpenLink = document.querySelector("#map-open-link");
const mapSave = document.querySelector("#map-save");
const mapFilters = [...document.querySelectorAll(".map-filter")];
const mapPinLayer = document.querySelector("#map-pin-layer");
const routeForm = document.querySelector("#route-form");
const routeFrom = document.querySelector("#route-from");
const routeTo = document.querySelector("#route-to");
const routeStop = document.querySelector("#route-stop");
const routeMarkerType = document.querySelector("#route-marker-type");
const markerList = document.querySelector("#marker-list");
const useGpsButton = document.querySelector("#use-gps");
const mapStatus = document.querySelector("#map-status");
const helpForm = document.querySelector("#help-form");
const helpProblem = document.querySelector("#help-problem");
const helpVehicle = document.querySelector("#help-vehicle");
const helpTools = document.querySelector("#help-tools");
const helpComment = document.querySelector("#help-comment");
const helpPingList = document.querySelector("#help-ping-list");
const helpPingKey = "togos-map-help-pings";
const routeMarkerKey = "togos-route-markers";
const openGoogleTranslate = document.querySelector("#open-google-translate");

const osmMaps = [
  {
    kind: "Route",
    title: "Harbor Coffee Loop",
    description: "A relaxed old-bike loop with smooth roads, two fuel stops, and a cafe finish.",
    lat: 59.9139,
    lon: 10.7522,
    zoom: 12,
    bbox: [10.556, 59.836, 10.948, 59.99],
    stats: [["Fuel", "2 stops"], ["Roads", "Smooth"], ["Cafe", "Harbor"], ["Difficulty", "Easy"]]
  },
  {
    kind: "Route",
    title: "Lake Road Shakedown",
    description: "Short test route for fresh builds with easy pull-offs and low-speed roads.",
    lat: 59.9664,
    lon: 10.7339,
    zoom: 12,
    bbox: [10.54, 59.895, 10.93, 60.04],
    stats: [["Fuel", "1 stop"], ["Roads", "Calm"], ["Cafe", "North"], ["Difficulty", "Easy"]]
  },
  {
    kind: "Shop",
    title: "Trusted Machine Shops",
    description: "Member-vetted painters, machinists, upholsterers, chromers, mechanics, and parts sellers.",
    lat: 59.91,
    lon: 10.67,
    zoom: 11,
    bbox: [10.38, 59.78, 10.96, 60.02],
    stats: [["Painters", "4"], ["Machinists", "6"], ["Upholstery", "3"], ["Parts", "11"]]
  },
  {
    kind: "Tool",
    title: "Tool Lending Map",
    description: "Find nearby members with compression testers, lifts, welders, trailers, timing lights, and specialty tools.",
    lat: 59.89,
    lon: 10.82,
    zoom: 11,
    bbox: [10.52, 59.76, 11.08, 60.0],
    stats: [["Trailers", "3"], ["Lifts", "2"], ["Welders", "4"], ["Timing lights", "5"]]
  },
  {
    kind: "Meetup",
    title: "Back-road Photo Run",
    description: "Temporary meetup page map with RSVP, route, weather, fuel stops, emergency contacts, and album.",
    lat: 60.003,
    lon: 10.78,
    zoom: 11,
    bbox: [10.48, 59.88, 11.1, 60.11],
    stats: [["RSVP", "18"], ["Fuel", "2"], ["Weather", "Watch"], ["Photos", "Open"]]
  },
  {
    kind: "Help",
    title: "Emergency Local Help",
    description: "A shared map area for breakdowns, trailer help, stuck repairs, tools, and safe pickup points.",
    lat: 59.94,
    lon: 10.6,
    zoom: 10,
    bbox: [10.18, 59.68, 11.12, 60.16],
    stats: [["Trailer help", "2"], ["Roadside tools", "6"], ["Fuel cans", "3"], ["Priority", "High"]]
  }
];

let activeMapFilter = "all";
let activeMapIndex = 0;
let markerOffset = 0;
let editingMarkerId = null;
let editingHelpPingId = null;

const defaultRouteMarkers = [
  { kind: "Start", label: "Start", note: "Togos Garage", x: 22, y: 56 },
  { kind: "Fuel", label: "Fuel", note: "Top up before the lake road", x: 45, y: 42 },
  { kind: "Cafe", label: "Cafe", note: "Harbor coffee break", x: 69, y: 53 },
  { kind: "Finish", label: "Finish", note: "Back before dark", x: 82, y: 36 }
];

let routeMarkers = normalizeRouteMarkers(readRouteMarkers());

const seedHelpPings = [
  {
    id: "seed-help",
    problem: "Need trailer",
    vehicle: "1968 coupe project",
    tools: "Trailer, tie-downs, battery booster",
    comment: "Starter clicks and car is parked safely near the fuel station.",
    createdAt: Date.now(),
    expiresAt: Date.now() + 24 * 60 * 60 * 1000
  }
];

function readHelpPings() {
  if (window.togosData?.hasApi?.()) {
    return window.togosData.get("helpPings");
  }

  const stored = JSON.parse(localStorage.getItem(helpPingKey) || "null");
  return Array.isArray(stored) ? stored : seedHelpPings;
}

function writeHelpPings(pings) {
  if (window.togosData) {
    window.togosData.save("helpPings", pings);
    return;
  }

  localStorage.setItem(helpPingKey, JSON.stringify(pings));
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function normalizeRouteMarkers(markers) {
  return (Array.isArray(markers) ? markers : defaultRouteMarkers).map((marker, index) => ({
    id: marker.id || makeId(`marker-${index}`),
    kind: marker.kind || "Break",
    label: marker.label || marker.kind || "Stop",
    note: marker.note || "",
    x: Number(marker.x) || 20 + ((index * 17) % 60),
    y: Number(marker.y) || 34 + ((index * 11) % 32),
    comments: Array.isArray(marker.comments) ? marker.comments : []
  }));
}

function normalizeHelpPings(pings) {
  return (Array.isArray(pings) ? pings : seedHelpPings).map((ping) => ({
    ...ping,
    id: ping.id || makeId("help"),
    comments: Array.isArray(ping.comments) ? ping.comments : []
  }));
}

function readRouteMarkers() {
  if (window.togosData?.hasApi?.()) {
    const apiMarkers = window.togosData.get("routeMarkers");
    return normalizeRouteMarkers(apiMarkers.length ? apiMarkers : defaultRouteMarkers);
  }

  const stored = JSON.parse(localStorage.getItem(routeMarkerKey) || "null");
  return normalizeRouteMarkers(Array.isArray(stored) && stored.length ? stored : defaultRouteMarkers);
}

function writeRouteMarkers(markers) {
  if (window.togosData) {
    window.togosData.save("routeMarkers", markers);
    return;
  }

  localStorage.setItem(routeMarkerKey, JSON.stringify(markers));
}

function getActiveHelpPings() {
  const now = Date.now();
  const active = normalizeHelpPings(readHelpPings()).filter((ping) => !ping.expiresAt || ping.expiresAt > now);
  writeHelpPings(active);
  return active;
}

function currentAuthor() {
  return window.togosAuth?.getCurrentMember?.()?.name || "Garage member";
}

function osmEmbedUrl(item) {
  const bbox = item.bbox.join("%2C");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${item.lat}%2C${item.lon}`;
}

function osmOpenUrl(item) {
  return `https://www.openstreetmap.org/#map=${item.zoom}/${item.lat}/${item.lon}`;
}

function osmPointEmbedUrl(lat, lon, zoom = 14) {
  const spread = 0.035;
  const bbox = [lon - spread, lat - spread, lon + spread, lat + spread].map((value) => value.toFixed(5)).join("%2C");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}`;
}

function visibleMaps() {
  return osmMaps.filter((item) => activeMapFilter === "all" || item.kind === activeMapFilter);
}

function renderMapList() {
  mapList.innerHTML = "";
  visibleMaps().forEach((item) => {
    const index = osmMaps.indexOf(item);
    const button = document.createElement("button");
    button.type = "button";
    button.className = index === activeMapIndex ? "active" : "";
    button.innerHTML = `
      <small>${item.kind}</small>
      <strong>${item.title}</strong>
      <span>${item.description}</span>
    `;
    button.addEventListener("click", () => renderMapStage(index));
    mapList.append(button);
  });
}

function renderMapStage(index) {
  activeMapIndex = index;
  const item = osmMaps[index];
  mapFrame.src = osmEmbedUrl(item);
  mapOpenLink.href = osmOpenUrl(item);
  mapKind.textContent = item.kind;
  mapTitle.textContent = item.title;
  mapDescription.textContent = item.description;
  mapStats.innerHTML = item.stats.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join("");
  mapSave.textContent = "Save to planner";
  renderMapList();
  renderMarkers();
  window.togosI18n?.apply();
}

function renderMarkers() {
  const helpMarkers = getActiveHelpPings().map((ping, index) => ({
    kind: "Help",
    label: "Help",
    note: `${ping.problem}: ${ping.vehicle}`,
    x: 28 + ((index * 19) % 52),
    y: 31 + ((index * 13) % 36),
    pingId: ping.id
  }));
  const allMarkers = [...routeMarkers, ...helpMarkers];
  mapPinLayer.innerHTML = allMarkers.map((marker, index) => `
    <span class="map-pin" data-kind="${marker.kind}" style="--x:${marker.x}%; --y:${marker.y}%">${marker.kind === "Help" ? "Help" : index + 1}</span>
  `).join("");

  markerList.innerHTML = [
    ...routeMarkers.map((marker, index) => `
      <article class="marker-item" data-route-marker="${marker.id}">
        <strong>Stop ${index + 1}: ${escapeHtml(marker.label)}</strong>
        <span>${escapeHtml(marker.kind)} / ${escapeHtml(marker.note)}</span>
        <div class="marker-actions" aria-label="Reorder stop ${index + 1}">
          <button type="button" data-move-marker="${index}" data-marker-direction="-1" ${index === 0 ? "disabled" : ""}>Move up</button>
          <button type="button" data-move-marker="${index}" data-marker-direction="1" ${index === routeMarkers.length - 1 ? "disabled" : ""}>Move down</button>
          <button type="button" data-edit-marker="${marker.id}">Edit</button>
          <button type="button" data-delete-marker="${marker.id}">Delete</button>
        </div>
        <div class="marker-comments">
          ${(marker.comments || []).map((comment) => `
            <p><strong>${escapeHtml(comment.author)}</strong> ${escapeHtml(comment.text)} <small>${escapeHtml(comment.createdAt)}</small></p>
          `).join("")}
        </div>
        <form class="marker-comment-form" data-marker-comment="${marker.id}">
          <input type="text" placeholder="Add marker comment or road note">
          <button type="submit">Comment</button>
        </form>
      </article>
    `),
    ...helpMarkers.map((marker) => `
      <article class="marker-item emergency-marker">
        <strong>Help ping: ${escapeHtml(marker.label)}</strong>
        <span>${escapeHtml(marker.note)}</span>
      </article>
    `)
  ].join("");
}

function renderHelpPings() {
  const activePings = getActiveHelpPings();
  helpPingList.innerHTML = activePings.map((ping) => `
    <article class="help-ping" data-help-ping="${ping.id}">
      <strong>${escapeHtml(ping.problem)} / ${escapeHtml(ping.vehicle)}</strong>
      <span>${escapeHtml(ping.comment)}</span>
      <span>Needs: ${escapeHtml(ping.tools)}</span>
      <small>Auto-removes after 24 hours unless closed earlier.</small>
      <div class="marker-comments">
        ${(ping.comments || []).map((comment) => `
          <p><strong>${escapeHtml(comment.author)}</strong> ${escapeHtml(comment.text)} <small>${escapeHtml(comment.createdAt)}</small></p>
        `).join("")}
      </div>
      <form class="marker-comment-form" data-help-comment="${ping.id}">
        <input type="text" placeholder="Reply with ETA, tools, or safety update">
        <button type="submit">Comment</button>
      </form>
      <div class="marker-actions">
        <button type="button" data-edit-help="${ping.id}">Edit</button>
        <button type="button" data-close-help="${ping.id}">Close help ping</button>
      </div>
    </article>
  `).join("");
  renderMarkers();
}

function addMarker(kind, label, note) {
  markerOffset += 1;
  routeMarkers.push({
    id: makeId("marker"),
    kind,
    label,
    note,
    x: 22 + ((markerOffset * 17) % 58),
    y: 34 + ((markerOffset * 11) % 32),
    comments: []
  });
  writeRouteMarkers(routeMarkers);
  renderMarkers();
  window.togosI18n?.apply();
}

function moveRouteMarker(index, direction) {
  const nextIndex = index + direction;
  if (nextIndex < 0 || nextIndex >= routeMarkers.length) {
    return;
  }

  [routeMarkers[index], routeMarkers[nextIndex]] = [routeMarkers[nextIndex], routeMarkers[index]];
  writeRouteMarkers(routeMarkers);
  renderMarkers();
  mapStatus.textContent = `Moved stop ${index + 1} ${direction < 0 ? "up" : "down"} in the route order.`;
}

mapFilters.forEach((button) => {
  button.addEventListener("click", () => {
    activeMapFilter = button.dataset.mapFilter;
    mapFilters.forEach((item) => item.classList.toggle("active", item === button));
    const first = visibleMaps()[0];
    if (first) {
      renderMapStage(osmMaps.indexOf(first));
    }
  });
});

mapSave.addEventListener("click", () => {
  mapSave.textContent = "Saved to planner";
  window.togosI18n?.apply();
});

routeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const from = routeFrom.value.trim();
  const to = routeTo.value.trim();
  const stop = routeStop.value.trim();
  const type = routeMarkerType.value;

  if (editingMarkerId) {
    const marker = routeMarkers.find((item) => item.id === editingMarkerId);
    if (marker) {
      marker.kind = type;
      marker.label = type;
      marker.note = stop || from || to || marker.note;
      writeRouteMarkers(routeMarkers);
      mapStatus.textContent = `Updated ${type.toLowerCase()} marker.`;
    }
    editingMarkerId = null;
    routeForm.querySelector("button[type='submit']").textContent = "Add route marker";
    routeFrom.value = "";
    routeTo.value = "";
    routeStop.value = "";
    renderMarkers();
    window.togosI18n?.apply();
    return;
  }

  if (from && !routeMarkers.some((marker) => marker.kind === "Start" && marker.note === from)) {
    addMarker("Start", "Start", from);
  }

  if (to && !routeMarkers.some((marker) => marker.kind === "Finish" && marker.note === to)) {
    addMarker("Finish", "Finish", to);
  }

  if (stop) {
    addMarker(type, type, stop);
  }

  mapStatus.textContent = stop
    ? `Added ${type.toLowerCase()} marker: ${stop}`
    : "Add at least a stop, start, or destination.";
  routeStop.value = "";
});

useGpsButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    mapStatus.textContent = "GPS is not available in this browser.";
    return;
  }

  mapStatus.textContent = "Waiting for phone GPS permission...";
  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude.toFixed(5);
    const lon = position.coords.longitude.toFixed(5);
    mapFrame.src = osmPointEmbedUrl(Number(lat), Number(lon), 14);
    mapOpenLink.href = `https://www.openstreetmap.org/#map=14/${lat}/${lon}`;
    addMarker("Help", "GPS", `Live location ping: ${lat}, ${lon}`);
    mapStatus.textContent = `GPS ping added at ${lat}, ${lon}.`;
  }, () => {
    mapStatus.textContent = "GPS was blocked or unavailable. On phones, live location usually needs HTTPS and location permission.";
  }, {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 60000
  });
});

helpForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const vehicle = helpVehicle.value.trim();
  const tools = helpTools.value.trim();
  const comment = helpComment.value.trim();

  if (!vehicle || !tools || !comment) {
    mapStatus.textContent = "Add vehicle, tools needed, and a short trouble comment before posting a help ping.";
    return;
  }

  const helpPings = getActiveHelpPings();
  if (editingHelpPingId) {
    const ping = helpPings.find((item) => item.id === editingHelpPingId);
    if (ping) {
      ping.problem = helpProblem.value;
      ping.vehicle = vehicle;
      ping.tools = tools;
      ping.comment = comment;
      ping.expiresAt = Date.now() + 24 * 60 * 60 * 1000;
      writeHelpPings(helpPings);
      mapStatus.textContent = "Help ping updated and its 24-hour expiry was refreshed.";
    }
    editingHelpPingId = null;
    helpForm.querySelector("button[type='submit']").textContent = "Add help ping";
    renderHelpPings();
    helpVehicle.value = "";
    helpTools.value = "";
    helpComment.value = "";
    return;
  }

  helpPings.unshift({
    id: makeId("help"),
    problem: helpProblem.value,
    vehicle,
    tools,
    comment,
    comments: [],
    createdAt: Date.now(),
    expiresAt: Date.now() + 24 * 60 * 60 * 1000
  });
  writeHelpPings(helpPings);
  renderHelpPings();
  helpVehicle.value = "";
  helpTools.value = "";
  helpComment.value = "";
  mapStatus.textContent = "Help ping added with vehicle notes and tools needed.";
});

helpPingList.addEventListener("click", (event) => {
  const closeButton = event.target.closest("[data-close-help]");
  const editButton = event.target.closest("[data-edit-help]");

  if (editButton) {
    const ping = getActiveHelpPings().find((item) => item.id === editButton.dataset.editHelp);
    if (ping) {
      editingHelpPingId = ping.id;
      helpProblem.value = ping.problem;
      helpVehicle.value = ping.vehicle;
      helpTools.value = ping.tools;
      helpComment.value = ping.comment;
      helpForm.querySelector("button[type='submit']").textContent = "Save help ping";
      mapStatus.textContent = "Editing help ping. Save it when the trouble details change.";
      helpForm.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return;
  }

  if (!closeButton) {
    return;
  }
  const remaining = getActiveHelpPings().filter((ping) => ping.id !== closeButton.dataset.closeHelp);
  writeHelpPings(remaining);
  mapStatus.textContent = "Help ping closed and marker removed.";
  renderHelpPings();
  window.togosI18n?.apply();
});

helpPingList.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-help-comment]");
  if (!form) {
    return;
  }
  event.preventDefault();
  const input = form.querySelector("input");
  const text = input.value.trim();
  if (!text) {
    return;
  }
  const pings = getActiveHelpPings();
  const ping = pings.find((item) => item.id === form.dataset.helpComment);
  if (ping) {
    ping.comments = ping.comments || [];
    ping.comments.push({
      id: makeId("help-comment"),
      author: currentAuthor(),
      text,
      createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    });
    writeHelpPings(pings);
  }
  input.value = "";
  renderHelpPings();
});

markerList.addEventListener("click", (event) => {
  const moveButton = event.target.closest("[data-move-marker]");
  const editButton = event.target.closest("[data-edit-marker]");
  const deleteButton = event.target.closest("[data-delete-marker]");

  if (moveButton) {
    moveRouteMarker(Number(moveButton.dataset.moveMarker), Number(moveButton.dataset.markerDirection));
    window.togosI18n?.apply();
    return;
  }

  if (editButton) {
    const marker = routeMarkers.find((item) => item.id === editButton.dataset.editMarker);
    if (marker) {
      editingMarkerId = marker.id;
      routeMarkerType.value = marker.kind;
      routeStop.value = marker.note;
      routeFrom.value = marker.kind === "Start" ? marker.note : "";
      routeTo.value = marker.kind === "Finish" ? marker.note : "";
      routeForm.querySelector("button[type='submit']").textContent = "Save marker";
      mapStatus.textContent = `Editing ${marker.kind.toLowerCase()} marker. Change the stop text or type, then save.`;
      routeForm.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return;
  }

  if (deleteButton) {
    routeMarkers = routeMarkers.filter((marker) => marker.id !== deleteButton.dataset.deleteMarker);
    writeRouteMarkers(routeMarkers);
    mapStatus.textContent = "Route marker deleted.";
    renderMarkers();
    window.togosI18n?.apply();
  }
});

markerList.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-marker-comment]");
  if (!form) {
    return;
  }
  event.preventDefault();
  const input = form.querySelector("input");
  const text = input.value.trim();
  if (!text) {
    return;
  }
  const marker = routeMarkers.find((item) => item.id === form.dataset.markerComment);
  if (marker) {
    marker.comments = marker.comments || [];
    marker.comments.push({
      id: makeId("marker-comment"),
      author: currentAuthor(),
      text,
      createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    });
    writeRouteMarkers(routeMarkers);
  }
  input.value = "";
  renderMarkers();
  window.togosI18n?.apply();
});

openGoogleTranslate.addEventListener("click", () => {
  const lang = window.togosI18n?.getLanguage?.() || "en";
  const target = lang === "en" ? "sv" : lang;
  const pageUrl = encodeURIComponent(window.location.href);
  window.open(`https://translate.google.com/translate?sl=en&tl=${target}&u=${pageUrl}`, "_blank", "noreferrer");
});

renderMapStage(0);
renderHelpPings();

window.addEventListener("togos-data-ready", () => {
  routeMarkers = readRouteMarkers();
  renderMapStage(activeMapIndex);
  renderHelpPings();
});
