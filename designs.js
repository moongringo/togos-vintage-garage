const designButtons = [...document.querySelectorAll("[data-design-choice]")];
const previewEyebrow = document.querySelector("#preview-eyebrow");
const previewTitle = document.querySelector("#preview-title");
const previewCopy = document.querySelector("#preview-copy");

const designCopy = {
  classic: {
    eyebrow: "Classic clubhouse",
    title: "Old engines, good roads, and people who show up.",
    copy: "A warm social garage with member stories, route maps, build logs, and practical help nearby."
  },
  cartoon: {
    eyebrow: "1950s cartoon garage",
    title: "Big smiles, shiny chrome, and Saturday-morning garage fun.",
    copy: "A playful mid-century direction with enamel colors, chunky cards, thick outlines, and friendly illustrated energy."
  },
  deco: {
    eyebrow: "Art deco showroom",
    title: "Polished metal, confident lines, and a proper club entrance.",
    copy: "A more elegant classic-car look inspired by showroom plaques, badges, chrome trim, and formal club nights."
  },
  brass: {
    eyebrow: "Brass-era workshop",
    title: "Archive notes, hand tools, and pre-war machine stories.",
    copy: "A quieter heritage direction for early machines, provenance timelines, manuals, receipts, and careful restoration notes."
  },
  magazine: {
    eyebrow: "Club magazine",
    title: "A printed monthly for builds, routes, people, and machines.",
    copy: "An editorial style with strong headlines, featured members, columns, route reports, and restoration spotlights."
  },
  dashboard: {
    eyebrow: "Workshop dashboard",
    title: "Dense, practical, and built for daily garage work.",
    copy: "A quieter operational style for people checking tasks, comments, tools, routes, and help pings often."
  },
  rally: {
    eyebrow: "Rally poster",
    title: "Bold club energy for rides, shows, and challenges.",
    copy: "A punchier look for events, photo contests, route days, and public community moments."
  },
  midnight: {
    eyebrow: "Midnight garage",
    title: "Dark bench lights, polished chrome, and late-night repairs.",
    copy: "A moodier style for build diaries, media, sound clips, and restoration stories."
  }
};

designButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const design = button.dataset.designChoice;
    document.body.dataset.design = design;
    designButtons.forEach((item) => item.classList.toggle("active", item === button));
    previewEyebrow.textContent = designCopy[design].eyebrow;
    previewTitle.textContent = designCopy[design].title;
    previewCopy.textContent = designCopy[design].copy;
  });
});
