const featureTabs = [...document.querySelectorAll(".feature-tab")];
const featurePanels = [...document.querySelectorAll(".feature-panel")];

featureTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.featureTab;

    featureTabs.forEach((item) => {
      item.classList.toggle("active", item === tab);
      item.setAttribute("aria-selected", String(item === tab));
    });

    featurePanels.forEach((panel) => {
      panel.classList.toggle("active", panel.dataset.featurePanel === target);
    });
  });
});
