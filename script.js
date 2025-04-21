const settings = document.getElementById("settings");
const summary = settings.children[0];
const theme = document.getElementById("theme");

summary.addEventListener("click", () => {
  localStorage.setItem("settingsOpen", JSON.stringify(!settings.open));
});

theme.addEventListener("input", () => {
  localStorage.setItem("themeInputChecked", JSON.stringify(theme.checked));
});

window.addEventListener("beforeunload", () => {
  localStorage.setItem("scrollPosition", JSON.stringify(window.scrollY));
});

const settingsOpen = JSON.parse(localStorage.getItem("settingsOpen"));
const themeInputChecked = JSON.parse(localStorage.getItem("themeInputChecked"));
const scrollPosition = JSON.parse(localStorage.getItem("scrollPosition"));

if (settingsOpen) settings.open = settingsOpen;
if (themeInputChecked) theme.checked = themeInputChecked;
if (scrollPosition)
  window.scrollTo({ top: scrollPosition, behavior: "instant" });

const mainSections = Array.from(document.getElementsByTagName("section")).slice(
  2
);
const details = mainSections.map((s) => s.children[0]);
const summaries = details.map((d) => d.children[0]);
const getOpenSectionsData = () =>
  JSON.parse(localStorage.getItem("openSections"));

const openSectionsTemplate = Object.fromEntries(
  mainSections.map((section) => [section.classList[0], true])
);
let openSectionsData = getOpenSectionsData();
if (!openSectionsData) {
  openSectionsData = openSectionsTemplate;
  localStorage.setItem("openSections", JSON.stringify(openSectionsTemplate));
}

summaries.forEach((el, i) => {
  el.addEventListener("click", () => {
    const openSections = getOpenSectionsData();
    const sectionName = mainSections[i].classList[0];
    const openSectionsUpdated = {
      ...openSections,
      [sectionName]: !details[i].open,
    };
    localStorage.setItem("openSections", JSON.stringify(openSectionsUpdated));
  });
});

mainSections.forEach((section, i) => {
  const sectionName = section.classList[0];
  const openDetails = openSectionsData[sectionName];
  details[i].open = openDetails;
});
