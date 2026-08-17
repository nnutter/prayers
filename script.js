const prayerPeriods = {
  morning: {
    label: "Good morning",
    switchLabel: "Switch to evening prayer",
  },
  evening: {
    label: "Good evening",
    switchLabel: "Switch to morning prayer",
  },
};

const prayerPanels = document.querySelectorAll("[data-prayer-panel]");
const commonPrayers = document.querySelector("#common-prayers");
const periodToggle = document.querySelector("#period-toggle");
const periodLabel = document.querySelector("#period-label");
const currentTime = document.querySelector("#current-time");
const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: "numeric",
  minute: "2-digit",
  timeZoneName: "short",
});
let automaticPeriod = null;
let selectedPeriod = null;

function getPrayerPeriod(date) {
  return date.getHours() < 12 ? "morning" : "evening";
}

function updatePeriodLabel(period) {
  const copy = prayerPeriods[period];

  periodLabel.textContent = copy.label;
  periodToggle.setAttribute("aria-label", copy.switchLabel);
}

function showPrayer(period) {
  selectedPeriod = period;

  prayerPanels.forEach((panel) => {
    panel.hidden = panel.dataset.prayerPanel !== period;
  });

  placeCommonPrayers(period);
  updatePeriodLabel(period);
}

function placeCommonPrayers(period) {
  const targetSlot = document.querySelector(
    `[data-common-prayers-slot="${period}"]`,
  );

  targetSlot.append(commonPrayers);
}

function updateClock() {
  const now = new Date();
  const nextAutomaticPeriod = getPrayerPeriod(now);

  currentTime.textContent = timeFormatter.format(now);
  currentTime.dateTime = now.toISOString();

  if (nextAutomaticPeriod !== automaticPeriod) {
    automaticPeriod = nextAutomaticPeriod;
    showPrayer(nextAutomaticPeriod);
  }
}

function togglePrayer() {
  const nextPeriod = selectedPeriod === "morning" ? "evening" : "morning";

  showPrayer(nextPeriod);
}

function refreshWhenVisible() {
  if (document.visibilityState === "visible") {
    updateClock();
  }
}

periodToggle.addEventListener("click", togglePrayer);
document.addEventListener("visibilitychange", refreshWhenVisible);
window.addEventListener("pageshow", updateClock);

updateClock();
window.setInterval(updateClock, 60_000);
