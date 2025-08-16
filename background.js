let activeTabId = null;
let startTime = null;
let timeSpent = {};
let history = [];

// Categorized sites
const productiveSites = [
  "github.com", "stackoverflow.com", "w3schools.com",
  "geeksforgeeks.org", "coursera.org", "udemy.com",
  "skillrack.com", "docs.google.com", "swayam.gov.in",
  "infyspringboard.com", "portal.com", "gmail.com"
];

const unproductiveSites = [
  "facebook.com", "youtube.com", "instagram.com", "twitter.com",
  "reddit.com", "netflix.com", "primevideo.com",
  "tiktok.com", "discord.com"
];

// Load storage
chrome.storage.local.get(["timeSpent", "history"], (result) => {
  if (result.timeSpent) timeSpent = result.timeSpent;
  if (result.history) history = result.history;
});

// Classify site
function getSiteCategory(url) {
  try {
    const domain = new URL(url).hostname.replace(/^www\./, "");
    if (productiveSites.includes(domain)) return "Productive";
    if (unproductiveSites.includes(domain)) return "Unproductive";
    return "Neutral";
  } catch {
    return "Neutral";
  }
}

// Store state
function storeTabState() {
  if (startTime !== null && activeTabId !== null) {
    chrome.storage.local.set({ activeTabId, startTime, timeSpent, history });
  }
}

async function getUrlFromTabId(tabId) {
  return new Promise((resolve) => {
    chrome.tabs.get(tabId, (tab) => resolve(tab?.url || null));
  });
}

// Save time for tab
async function saveTime(tabId) {
  if (tabId !== null && startTime !== null) {
    const now = Date.now();
    const duration = now - startTime;
    const url = await getUrlFromTabId(tabId);

    if (url) {
      const category = getSiteCategory(url);
      timeSpent[url] = {
        time: (timeSpent[url]?.time || 0) + duration,
        category
      };
      storeTabState();
    }
    startTime = now;
  }
}

// Events
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  await saveTime(activeTabId);
  activeTabId = activeInfo.tabId;
  startTime = Date.now();
  storeTabState();
});

chrome.tabs.onRemoved.addListener(async (tabId) => {
  if (tabId === activeTabId) {
    await saveTime(tabId);
    activeTabId = null;
    startTime = null;
    storeTabState();
  }
});

chrome.webNavigation.onCompleted.addListener(
  async (details) => {
    if (details.tabId === activeTabId) await saveTime(activeTabId);
  },
  { url: [{ urlMatches: "http://*/*" }, { urlMatches: "https://*/*" }] }
);

chrome.runtime.onSuspend.addListener(async () => {
  await saveTime(activeTabId);
});

// Weekly auto-reset check
chrome.alarms.create("weeklyReset", { periodInMinutes: 60 });
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "weeklyReset") {
    const now = new Date();
    if (now.getDay() === 0 && now.getHours() === 0) {
      archiveAndReset();
    }
  }
});

// ✅ Archive + reset
function archiveAndReset() {
  if (Object.keys(timeSpent).length > 0) {
    const now = new Date();
    const weekLabel = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
    history.push({
      week: weekLabel,
      data: timeSpent
    });
  }
  timeSpent = {};
  chrome.storage.local.set({ timeSpent, history }, () => {
    console.log("✅ Weekly reset done, data archived.");
  });
}

// Listen for popup request
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "forceWeeklyReset") {
    archiveAndReset();
    sendResponse({ success: true });
  }
});
