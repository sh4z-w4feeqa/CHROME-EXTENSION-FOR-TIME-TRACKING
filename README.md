# PRODUCTIVITY-TRACKER (Chrome Extension)
*COMPANY* : CodTech IT Solutions

*NAME*: Shaziya Wafeeqa S

*INTERN ID*: CT12DF710

*DOMAIN*: Full Stack Development

*DURATION*: 12 Weeks

*MENTOR*: NEELA SANTHOSH

# PROJECT DESCRIPTION

The Time Tracker Chrome Extension is a productivity-enhancing tool designed to monitor and analyze how users spend their time on various websites. It enables users to distinguish between productive, unproductive, and neutral online activities, providing a detailed weekly and historical report of their browsing habits. This extension used modern web technologies to deliver real-time tracking and insights directly within the browser, helping users improve focus, manage distractions, and optimize workflow.

**Tools and Technologies Used**

_JavaScript_
JavaScript is the core programming language used for both the background logic and the popup interface. It manages tab activity, calculates time spent on each website, and dynamically updates the user interface. Asynchronous programming with Promises and event listeners ensures smooth, real-time data handling without blocking the browser’s operations.

_Chrome Extensions API_
The project relies heavily on the Chrome Extensions API, which provides access to browser tabs, storage, alarms, and web navigation events. Key APIs used include:

* chrome.tabs for detecting active tabs and tab switches.

* chrome.webNavigation to track page loads and updates.

* chrome.storage.local for persisting time-tracking data across sessions.

* chrome.alarms for automating weekly data archiving and resets.

* chrome.runtime for messaging between background scripts and popup interfaces.

_Manifest V3_
The extension is built using Manifest Version 3, the latest Chrome standard, which introduces service workers for background scripts, improved security, and more efficient resource management.

_HTML and CSS_
The popup interface is developed with HTML and CSS, providing a clean, user-friendly dashboard. CSS Grid and flexbox layouts are used for structured display of website names, categories, and time spent. Color-coded categories (green for productive, red for unproductive, gray for neutral) allow users to quickly visualize their browsing behavior.

_Time Management Logic_
The background script calculates the time spent on each active tab by tracking tab activation, navigation events, and session durations. This ensures accurate measurement of productive versus unproductive activity. The system also supports automated weekly archiving and optional manual resets.

**Key Functionalities**

_Categorization of Websites_
Websites are classified into productive, unproductive, or neutral categories based on predefined lists. Users can immediately see whether their browsing behavior is aligned with their productivity goals.

_Real-Time Time Tracking_
The extension tracks active tab usage in real time, measuring how long a user spends on each website. It automatically handles tab switches, page navigations, and browser suspensions, ensuring continuous monitoring.

_Weekly Reports and History_
The extension generates a weekly summary of time spent on each website, providing insights into productive versus unproductive activities. Historical data is stored, allowing users to compare week-to-week performance and identify trends.

_User Controls_
Users can reset data for the current week, manually force a weekly reset, and view detailed statistics for each site. The popup interface is intuitive, with hover effects and buttons for quick interactions.

_Automation_
Weekly data is automatically archived and reset via Chrome alarms. This ensures that users always have up-to-date weekly reports without manual intervention.

**Real-Life Usage and Applications**

The Time Tracker extension has numerous practical applications:

_Productivity Management:_ Helps remote workers, students, and professionals monitor and optimize their browsing habits.

_Distraction Reduction:_ By highlighting time spent on unproductive sites like social media or streaming platforms, users can make informed decisions to limit distractions.

_Time Auditing:_ Users can generate detailed reports of weekly online activity, which is useful for self-assessment, parental oversight, or workplace monitoring.

_Behavioral Insights:_ Tracking trends over time helps identify habits, such as peak productivity hours or frequent distractions, enabling targeted interventions.

This extension can also be expanded for organizational use, allowing teams to analyze collective time allocation across different work-related and non-work-related websites.

**Conclusion**

In conclusion, the Time Tracker Chrome Extension combines Chrome Extensions API, JavaScript, HTML, and CSS to create a robust, real-time monitoring tool. Its intuitive design, automated reporting, and categorization system make it ideal for individuals aiming to improve productivity and maintain focus. Beyond personal use, it demonstrates how browser extensions can provide actionable insights into digital behavior, bridging the gap between technology usage and time management efficiency.

# OUTPUT
<img width="1720" height="963" alt="Image" src="https://github.com/user-attachments/assets/e2f141c6-ec61-487c-b626-bad755a5d6f8" />

<img width="1718" height="950" alt="Image" src="https://github.com/user-attachments/assets/59b8363b-4ffa-4a57-891a-ec87c2485fc7" />

