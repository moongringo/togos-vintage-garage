const adminNavItems = [...document.querySelectorAll(".admin-nav-item")];
const adminViews = [...document.querySelectorAll(".admin-view")];
const adminStatus = document.querySelector("#admin-status");
const pendingCount = document.querySelector("#pending-count");
const flagCount = document.querySelector("#flag-count");
const reviewCount = document.querySelector("#review-count");
const memberTotal = document.querySelector("#member-total");
const saveAdmin = document.querySelector("#save-admin");
const exportReport = document.querySelector("#export-report");

let pendingMembers = 3;
let flags = 4;
let reviews = 7;
let members = 58;

function setStatus(message) {
  adminStatus.textContent = message;
}

function updateCounters() {
  pendingCount.textContent = `${pendingMembers} ${pendingMembers === 1 ? "waiting" : "waiting"}`;
  flagCount.textContent = `${flags} ${flags === 1 ? "flag" : "flags"}`;
  reviewCount.textContent = reviews;
  memberTotal.textContent = members;
}

adminNavItems.forEach((item) => {
  item.addEventListener("click", () => {
    const view = item.dataset.adminView;

    adminNavItems.forEach((button) => button.classList.toggle("active", button === item));
    adminViews.forEach((section) => section.classList.toggle("active", section.dataset.view === view));
    setStatus(`${item.textContent} view opened.`);
  });
});

document.querySelectorAll(".approve-member").forEach((button) => {
  button.addEventListener("click", () => {
    const row = button.closest(".table-row");
    row.remove();
    pendingMembers = Math.max(0, pendingMembers - 1);
    reviews = Math.max(0, reviews - 1);
    members += 1;
    updateCounters();
    setStatus("Member approved and private room access prepared.");
  });
});

document.querySelectorAll(".resolve-flag").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest("article");
    item.remove();
    flags = Math.max(0, flags - 1);
    reviews = Math.max(0, reviews - 1);
    updateCounters();
    setStatus("Moderation item resolved.");
  });
});

document.querySelectorAll("[data-admin-note]").forEach((button) => {
  button.addEventListener("click", () => {
    setStatus(button.dataset.adminNote);
  });
});

document.querySelectorAll(".content-tile button").forEach((button) => {
  button.addEventListener("click", () => {
    setStatus(`${button.textContent} workflow opened as a prototype action.`);
  });
});

saveAdmin.addEventListener("click", () => {
  setStatus("Admin changes saved locally for this prototype.");
});

exportReport.addEventListener("click", () => {
  setStatus("Report export prepared: members, moderation, merch votes, events, and content health.");
});

updateCounters();
