const hackFeed = document.querySelector("#hack-feed");
const hackDetail = document.querySelector("#hack-detail");
const hackFilters = [...document.querySelectorAll(".hack-filter")];
const hackForm = document.querySelector("#hack-form");
const hackTitleInput = document.querySelector("#hack-title-input");
const hackCategoryInput = document.querySelector("#hack-category-input");
const hackRiskInput = document.querySelector("#hack-risk-input");

const hacks = [
  {
    title: "Bench grinder bracket polishing setup",
    category: "Tool hack",
    media: "Video",
    author: "Togos Garage",
    summary: "Use a simple bolted rest and soft wheel setup to polish small brackets more safely and consistently.",
    tools: ["Bench grinder", "Soft polishing wheel", "Bolt-on tool rest", "Eye protection", "Gloves off near rotating tools"],
    steps: ["Bolt a stable rest in front of the wheel.", "Test clearance by hand before power.", "Use light pressure and keep small parts clamped.", "Stop if the part heats or catches."],
    risk: "Rotating tools can grab loose gloves, rags, sleeves, or small parts. Use eye protection, a face shield, and a clamp for tiny pieces.",
    likes: 42
  },
  {
    title: "Cardboard template for awkward gasket cuts",
    category: "Photo guide",
    media: "Photos",
    author: "Nora V.",
    summary: "Make a sacrificial template before cutting gasket paper for old covers with uneven bolt spacing.",
    tools: ["Cardboard", "Hole punch", "Marker", "Gasket paper"],
    steps: ["Rub the cover edge onto cardboard.", "Punch bolt holes first.", "Test fit the template.", "Transfer to gasket paper."],
    risk: "Do not cut gasket material directly on painted or machined surfaces.",
    likes: 28
  },
  {
    title: "Magnet tray made from an old speaker",
    category: "Parts",
    media: "Photos",
    author: "Leif K.",
    summary: "Reuse a speaker magnet under a shallow tin to keep tiny trim screws and clips from wandering.",
    tools: ["Old speaker magnet", "Tin lid", "Tape", "Label marker"],
    steps: ["Remove the magnet safely.", "Tape it under the tin.", "Label the tray by vehicle area.", "Keep fragile brass parts separate."],
    risk: "Magnets can damage cards, phones, and some instruments. Keep it away from electronics.",
    likes: 36
  },
  {
    title: "First-start fuel bottle stand",
    category: "Safety",
    media: "Video",
    author: "Arne M.",
    summary: "A temporary gravity-feed bottle holder for first-start testing without balancing fuel on the frame.",
    tools: ["Fuel-safe bottle", "Hose clamp", "Stable stand", "Fire extinguisher"],
    steps: ["Use only a fuel-safe container.", "Clamp hose connections.", "Keep the bottle below face height.", "Remove before road testing."],
    risk: "Fuel vapors ignite easily. Work outside or with ventilation, keep sparks away, and have an extinguisher ready.",
    likes: 51
  }
];

let activeHackFilter = "all";
let activeHack = 0;

function visibleHacks() {
  return hacks.filter((hack) => activeHackFilter === "all" || hack.category === activeHackFilter || hack.media === activeHackFilter);
}

function renderHackFeed() {
  const list = visibleHacks();
  hackFeed.innerHTML = "";
  list.forEach((hack) => {
    const index = hacks.indexOf(hack);
    const card = document.createElement("button");
    card.type = "button";
    card.className = `hack-card${index === activeHack ? " active" : ""}`;
    card.innerHTML = `
      <span class="hack-thumb" aria-hidden="true"></span>
      <span>
        <h3>${hack.title}</h3>
        <p>${hack.summary}</p>
        <small>${hack.author} / ${hack.media}</small>
      </span>
      <strong class="hack-badge">${hack.category}</strong>
    `;
    card.addEventListener("click", () => renderHackDetail(index));
    hackFeed.append(card);
  });
}

function renderHackDetail(index) {
  activeHack = index;
  const hack = hacks[index];
  hackDetail.innerHTML = `
    <article>
      <div class="hack-hero-media ${hack.media === "Video" ? "video" : ""}">
        <span>${hack.media}</span>
      </div>
      <div class="hack-detail-body">
        <div>
          <p class="eyebrow">${hack.category}</p>
          <h2>${hack.title}</h2>
          <p>${hack.summary}</p>
        </div>
        <div class="hack-meta">
          <span>${hack.author}</span>
          <span><strong>${hack.likes}</strong> helpful votes</span>
          <span>${hack.media}</span>
        </div>
        <section class="hack-section">
          <h3>Tools and materials</h3>
          <div class="hack-tools">${hack.tools.map((tool) => `<span>${tool}</span>`).join("")}</div>
        </section>
        <section class="hack-section">
          <h3>How to do it</h3>
          <div class="hack-steps">${hack.steps.map((step, stepIndex) => `<div class="hack-step">${stepIndex + 1}. ${step}</div>`).join("")}</div>
        </section>
        <section class="hack-section">
          <h3>Risk note</h3>
          <div class="risk-box">${hack.risk}</div>
        </section>
        <div class="hack-actions">
          <button type="button" id="helpful-hack">Helpful</button>
          <button class="secondary" type="button" id="save-hack">Save to garage</button>
        </div>
      </div>
    </article>
  `;
  renderHackFeed();
}

hackFilters.forEach((button) => {
  button.addEventListener("click", () => {
    activeHackFilter = button.dataset.hackFilter;
    hackFilters.forEach((item) => item.classList.toggle("active", item === button));
    const first = visibleHacks()[0];
    if (first) {
      renderHackDetail(hacks.indexOf(first));
    }
  });
});

hackDetail.addEventListener("click", (event) => {
  if (event.target.id === "helpful-hack") {
    hacks[activeHack].likes += 1;
    renderHackDetail(activeHack);
  }

  if (event.target.id === "save-hack") {
    event.target.textContent = "Saved";
    window.togosI18n?.apply();
  }
});

hackForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = hackTitleInput.value.trim();
  const risk = hackRiskInput.value.trim();
  if (!title || !risk) {
    return;
  }

  hacks.unshift({
    title,
    category: hackCategoryInput.value,
    media: hackCategoryInput.value === "Video" ? "Video" : "Photos",
    author: "You",
    summary: "New member-submitted garage hack idea ready for review.",
    tools: ["Add tools", "Add photos", "Add safety checks"],
    steps: ["Document setup.", "Add clear photos or video.", "Add a safer alternative."],
    risk,
    likes: 0
  });

  hackTitleInput.value = "";
  hackRiskInput.value = "";
  activeHackFilter = "all";
  hackFilters.forEach((item) => item.classList.toggle("active", item.dataset.hackFilter === "all"));
  renderHackDetail(0);
});

renderHackDetail(0);
