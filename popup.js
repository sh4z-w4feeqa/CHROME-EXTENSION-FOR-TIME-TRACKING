function formatTime(ms) {
  if (!ms || isNaN(ms)) return "0:00";
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return hours > 0
    ? `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    : `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function getWebsiteName(url) {
  try {
    if (url.startsWith("chrome://") || url.startsWith("edge://")) {
      return url.split("://")[1].split("/")[0];
    }
    if (url.startsWith("file://")) return "localfile";
    const domain = new URL(url).hostname.replace(/^www\./, "");
    return domain.split(".")[0];
  } catch {
    return "unknown";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const timeEl = document.getElementById("time");

  chrome.storage.local.get(["timeSpent", "history"], (result) => {
    const timeSpent = result?.timeSpent || {};
    const history = result?.history || [];

    let htmlOutput = "";

  // ======== CURRENT WEEK ========
if (Object.keys(timeSpent).length === 0) {
  htmlOutput += `<p>No time tracked yet.</p>`;
} else {
  let uniqueTimeSpent = {};
  const categoryTotals = { Productive: 0, Unproductive: 0, Neutral: 0 };

  for (const [url, data] of Object.entries(timeSpent)) {
    const siteName = getWebsiteName(url);
    const siteTime = data.time || 0;
    const siteCategory = data.category || "Neutral";

    if (!uniqueTimeSpent[siteName]) {
      uniqueTimeSpent[siteName] = { time: 0, category: siteCategory };
    }
    uniqueTimeSpent[siteName].time += siteTime;
    categoryTotals[siteCategory] += siteTime;
  }

  htmlOutput += `
    <div class="summary">
      <div class="summary-item productive">Productive: ${formatTime(categoryTotals.Productive)}</div>
      <div class="summary-item unproductive">Unproductive: ${formatTime(categoryTotals.Unproductive)}</div>
      <div class="summary-item neutral">Neutral: ${formatTime(categoryTotals.Neutral)}</div>
    </div>
    <hr>
  `;

  // 👇 ADD THIS to list sites
  Object.entries(uniqueTimeSpent)
    .sort((a, b) => b[1].time - a[1].time)
    .forEach(([siteName, data]) => {
      htmlOutput += `
        <div class="entry">
          <span class="site-name">${siteName}</span>
          <span class="category ${data.category.toLowerCase()}">${data.category}</span>
          <span class="time">${formatTime(data.time)}</span>
        </div>
      `;
    });
}



    // ======== LAST WEEK ========
    if (history.length > 0) {
      const lastWeek = history[history.length - 1];
      htmlOutput += `<hr><h3>Last Week Report (${lastWeek.week})</h3>`;

      let lastWeekUnique = {};
      const lastCategoryTotals = { Productive: 0, Unproductive: 0, Neutral: 0 };

      for (const [url, data] of Object.entries(lastWeek.data)) {
        const siteName = getWebsiteName(url);
        const siteTime = data.time || 0;
        const siteCategory = data.category || "Neutral";

        if (!lastWeekUnique[siteName]) {
          lastWeekUnique[siteName] = { time: 0, category: siteCategory };
        }
        lastWeekUnique[siteName].time += siteTime;
        lastCategoryTotals[siteCategory] += siteTime;
      }

      htmlOutput += `
        <div class="summary">
          <div class="summary-item productive">Productive: ${formatTime(lastCategoryTotals.Productive)}</div>
          <div class="summary-item unproductive">Unproductive: ${formatTime(lastCategoryTotals.Unproductive)}</div>
          <div class="summary-item neutral">Neutral: ${formatTime(lastCategoryTotals.Neutral)}</div>
        </div>
        <hr>
      `;

      Object.entries(lastWeekUnique)
        .sort((a, b) => b[1].time - a[1].time)
        .forEach(([siteName, data]) => {
          htmlOutput += `
            <div class="entry">
              <span class="site-name">${siteName}</span>
              <span class="category ${data.category.toLowerCase()}">${data.category}</span>
              <span class="time">${formatTime(data.time)}</span>
            </div>
          `;
        });
    }

    timeEl.innerHTML = htmlOutput;
  });

  // Buttons
  document.getElementById("weeklyReset").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "forceWeeklyReset" }, (res) => {
      if (res?.success) {
        alert("✅ Weekly data archived and reset!");
        location.reload();
      }
    });
  });

  document.getElementById("reset").addEventListener("click", () => {
    chrome.storage.local.remove("timeSpent", () => {
      alert("Data reset successfully!");
      document.getElementById("time").textContent = "No time tracked yet.";
    });
  });
});
