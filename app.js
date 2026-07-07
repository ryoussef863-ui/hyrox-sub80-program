/* ============================================================
   APP LOGIC — schedule generation, routing, rendering, storage
   ============================================================ */

const START_DATE = new Date(2026, 6, 7); // July is month index 6
const RACE_DATE_1 = new Date(2026, 10, 14);
const RACE_DATE_2 = new Date(2026, 10, 15);
const TOTAL_WEEKS = 19;

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function isoOf(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
function fmtShort(date) {
  return `${MONTHS[date.getMonth()]} ${date.getDate()}`;
}
function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function getPhaseForWeek(weekNumber) {
  return PHASES.find(p => weekNumber >= p.weeks[0] && weekNumber <= p.weeks[1]);
}

// Build the full 19-week x 7-day schedule once
const SCHEDULE = [];
(function buildSchedule() {
  for (let i = 0; i < TOTAL_WEEKS * 7; i++) {
    const date = addDays(START_DATE, i);
    const weekNumber = Math.floor(i / 7) + 1;
    const idxInWeek = i % 7;
    const weekday = WEEKDAY_ORDER[idxInWeek];
    const slot = SLOT_BY_WEEKDAY[weekday];
    const phase = getPhaseForWeek(weekNumber);
    const weekInPhase = weekNumber - phase.weeks[0] + 1;
    SCHEDULE.push({
      date, iso: isoOf(date), weekNumber, weekday, slot, phaseId: phase.id, weekInPhase
    });
  }
})();

function findEntry(iso) {
  return SCHEDULE.find(e => e.iso === iso);
}

function cloneBlocksWithLongRun(blocks, longRunText) {
  return blocks.map(b => ({
    ...b,
    items: b.items.map(it => it.replace("{LONGRUN}", longRunText || ""))
  }));
}

// Resolve the actual content for a schedule entry
function resolveContent(entry) {
  const phase = PHASES.find(p => p.id === entry.phaseId);

  if (entry.slot === "REST") {
    if (phase.id === 4 && phase.customWeeks[entry.weekNumber]) {
      const cw = phase.customWeeks[entry.weekNumber];
      if (entry.weekday === "Fri" && cw.FRI_REST) return { ...cw.FRI_REST, isRest: true };
      if (entry.weekday === "Mon" && cw.MON_REST) return { ...cw.MON_REST, isRest: true };
    }
    return { ...GENERIC_REST, isRest: true };
  }

  if (phase.id === 4) {
    const cw = phase.customWeeks[entry.weekNumber];
    const content = cw[entry.slot];
    return { ...content, isRest: false, weekLabel: cw.label };
  }

  // Phases 1-3
  let template;
  if (phase.specialD && entry.slot === "D" && phase.specialD[entry.weekNumber]) {
    template = phase.specialD[entry.weekNumber];
  } else {
    template = phase.templates[entry.slot];
  }
  const progression = phase.progression[entry.weekInPhase];
  const longRun = phase.longRun ? phase.longRun[entry.weekInPhase] : null;
  const blocks = cloneBlocksWithLongRun(template.blocks, longRun);
  return { title: template.title, blocks, progression, isRest: false };
}

/* ============================================================
   STORAGE
   ============================================================ */
const STORAGE_KEY = "hyroxCompleted";
const NOTES_KEY = "hyroxNotes";

function getCompleted() {
  try { return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY)) || []); }
  catch { return new Set(); }
}
function setCompleted(set) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
}
function toggleComplete(iso) {
  const set = getCompleted();
  if (set.has(iso)) set.delete(iso); else set.add(iso);
  setCompleted(set);
}
function isComplete(iso) {
  return getCompleted().has(iso);
}
function getNotes() {
  try { return JSON.parse(localStorage.getItem(NOTES_KEY)) || {}; }
  catch { return {}; }
}
function setNote(iso, text) {
  const notes = getNotes();
  if (text && text.trim()) notes[iso] = text; else delete notes[iso];
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

/* ============================================================
   PROGRESS HELPERS
   ============================================================ */
function isTrainingDay(entry) { return entry.slot !== "REST"; }

function progressForWeek(weekNumber) {
  const days = SCHEDULE.filter(e => e.weekNumber === weekNumber && isTrainingDay(e));
  const completed = getCompleted();
  const done = days.filter(d => completed.has(d.iso)).length;
  return { done, total: days.length };
}
function progressForPhase(phaseId) {
  const phase = PHASES.find(p => p.id === phaseId);
  const days = SCHEDULE.filter(e => e.phaseId === phaseId && isTrainingDay(e));
  const completed = getCompleted();
  const done = days.filter(d => completed.has(d.iso)).length;
  return { done, total: days.length };
}
function progressOverall() {
  const days = SCHEDULE.filter(isTrainingDay);
  const completed = getCompleted();
  const done = days.filter(d => completed.has(d.iso)).length;
  return { done, total: days.length };
}

/* ============================================================
   RENDERING
   ============================================================ */
const app = document.getElementById("app");

function el(html) {
  const div = document.createElement("div");
  div.innerHTML = html.trim();
  return div.firstElementChild;
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}

function todayIso() {
  return isoOf(new Date());
}

function daysUntilRace() {
  const now = new Date();
  const t0 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diff = Math.round((RACE_DATE_1 - t0) / 86400000);
  return diff;
}

function renderDashboard() {
  const overall = progressOverall();
  const pct = overall.total ? Math.round((overall.done / overall.total) * 100) : 0;
  const dLeft = daysUntilRace();
  const todayEntry = findEntry(todayIso());

  let countdownHtml;
  if (dLeft > 0) countdownHtml = `<div class="countdown"><span class="num">${dLeft}</span><span class="lbl">days to ${PROGRAM_META.raceName}</span></div>`;
  else if (dLeft === 0) countdownHtml = `<div class="countdown race-today"><span class="num">RACE</span><span class="lbl">DAY IS TODAY — GO GET IT</span></div>`;
  else countdownHtml = `<div class="countdown"><span class="num">✓</span><span class="lbl">Race complete — nice work</span></div>`;

  app.innerHTML = `
    <div class="hero">
      <h1>Hyrox Cairo — Sub-80 Program</h1>
      <p class="sub">${PROGRAM_META.raceDates} · Goal: ${PROGRAM_META.goal}</p>
      ${countdownHtml}
      <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
      <p class="progress-label">${overall.done}/${overall.total} training days complete (${pct}%)</p>
      ${todayEntry ? `<button class="btn btn-today" data-nav="day/${todayEntry.iso}">Go to Today — ${fmtShort(todayEntry.date)}</button>` : ""}
      <button class="btn btn-guide" data-nav="guide">Open the Complete Guide</button>
    </div>
    <div class="phase-list">
      ${PHASES.map(p => {
        const prog = progressForPhase(p.id);
        const startDate = SCHEDULE.find(e => e.weekNumber === p.weeks[0]).date;
        const endEntry = SCHEDULE.filter(e => e.weekNumber === p.weeks[1]).pop();
        const pPct = prog.total ? Math.round((prog.done / prog.total) * 100) : 0;
        return `
        <div class="phase-card" style="border-left-color:${p.color}" data-nav="phase/${p.id}">
          <div class="phase-card-head">
            <span class="phase-tag" style="background:${p.color}">Phase ${p.id}</span>
            <span class="phase-weeks">Weeks ${p.weeks[0]}–${p.weeks[1]}</span>
          </div>
          <h2>${p.name}</h2>
          <p class="phase-dates">${fmtShort(startDate)} – ${fmtShort(endEntry.date)}</p>
          <p class="phase-focus">${p.focus}</p>
          <div class="progress-bar small"><div class="progress-fill" style="width:${pPct}%;background:${p.color}"></div></div>
          <p class="progress-label small">${prog.done}/${prog.total} days complete</p>
        </div>`;
      }).join("")}
    </div>
  `;
  bindNav();
}

function renderPhase(phaseId) {
  const phase = PHASES.find(p => p.id === phaseId);
  const weeks = [];
  for (let w = phase.weeks[0]; w <= phase.weeks[1]; w++) weeks.push(w);

  app.innerHTML = `
    <div class="topbar">
      <button class="back" data-nav="">← Dashboard</button>
    </div>
    <div class="phase-banner" style="background:${phase.color}22;border-color:${phase.color}">
      <span class="phase-tag" style="background:${phase.color}">Phase ${phase.id}</span>
      <h1>${phase.name}</h1>
      <p>${phase.focus}</p>
    </div>
    <div class="week-list">
      ${weeks.map(w => {
        const entries = SCHEDULE.filter(e => e.weekNumber === w);
        const start = entries[0].date, end = entries[entries.length - 1].date;
        const prog = progressForWeek(w);
        const wPct = prog.total ? Math.round((prog.done / prog.total) * 100) : 0;
        const label = (phase.id === 4 && phase.customWeeks[w]) ? phase.customWeeks[w].label
          : (phase.progression[w - phase.weeks[0] + 1] ? phase.progression[w - phase.weeks[0] + 1].label : "");
        return `
        <div class="week-card" data-nav="week/${w}">
          <div class="week-card-left">
            <span class="week-num">Week ${w}</span>
            <span class="week-dates">${fmtShort(start)} – ${fmtShort(end)}</span>
            ${label ? `<span class="week-tag">${label}</span>` : ""}
          </div>
          <div class="week-card-right">
            <div class="progress-bar small"><div class="progress-fill" style="width:${wPct}%;background:${phase.color}"></div></div>
            <span class="progress-label small">${prog.done}/${prog.total}</span>
          </div>
        </div>`;
      }).join("")}
    </div>
  `;
  bindNav();
}

function renderWeek(weekNumber) {
  const entries = SCHEDULE.filter(e => e.weekNumber === weekNumber);
  const phase = PHASES.find(p => p.id === entries[0].phaseId);
  const completed = getCompleted();

  app.innerHTML = `
    <div class="topbar">
      <button class="back" data-nav="phase/${phase.id}">← Phase ${phase.id}</button>
    </div>
    <div class="phase-banner" style="background:${phase.color}22;border-color:${phase.color}">
      <h1>Week ${weekNumber}</h1>
      <p>${fmtShort(entries[0].date)} – ${fmtShort(entries[entries.length-1].date)} · ${phase.name}</p>
    </div>
    <div class="day-list">
      ${entries.map(e => {
        const content = resolveContent(e);
        const done = completed.has(e.iso);
        const isToday = e.iso === todayIso();
        return `
        <div class="day-card ${content.isRest ? "rest" : ""} ${done ? "done" : ""} ${isToday ? "today" : ""}" data-nav="day/${e.iso}">
          <div class="day-card-left">
            <span class="day-weekday">${e.weekday}</span>
            <span class="day-date">${fmtShort(e.date)}</span>
          </div>
          <div class="day-card-mid">
            <span class="day-title">${content.title}</span>
            ${isToday ? '<span class="today-badge">TODAY</span>' : ""}
          </div>
          <div class="day-card-right">
            ${done ? '<span class="check">✓</span>' : ""}
          </div>
        </div>`;
      }).join("")}
    </div>
  `;
  bindNav();
}

function renderDay(iso) {
  const entry = findEntry(iso);
  if (!entry) { renderDashboard(); return; }
  const phase = PHASES.find(p => p.id === entry.phaseId);
  const content = resolveContent(entry);
  const done = isComplete(iso);
  const notes = getNotes();
  const noteText = notes[iso] || "";

  const idx = SCHEDULE.findIndex(e => e.iso === iso);
  const prevIso = idx > 0 ? SCHEDULE[idx - 1].iso : null;
  const nextIso = idx < SCHEDULE.length - 1 ? SCHEDULE[idx + 1].iso : null;

  let bodyHtml;
  if (content.isRest || content.type === "RACE") {
    bodyHtml = `
      <div class="rest-body ${content.type === "RACE" ? "race-body" : ""}">
        ${content.body.map(p => `<p>${p}</p>`).join("")}
      </div>`;
  } else {
    bodyHtml = `
      ${content.progression ? `
        <div class="progression-badge">
          <strong>${content.progression.label}</strong> · ${content.progression.rpe}
          <p>${content.progression.note}</p>
        </div>` : ""}
      ${content.weekLabel ? `<div class="progression-badge"><strong>${content.weekLabel}</strong></div>` : ""}
      <div class="blocks">
        ${content.blocks.map(b => `
          <div class="block">
            <div class="block-head">
              <span class="block-section">${b.section}</span>
              <span class="block-structure">${b.structure}</span>
            </div>
            ${b.goal ? `<p class="block-goal">${b.goal}</p>` : ""}
            <ul class="block-items">
              ${b.items.map(it => `<li>${it}</li>`).join("")}
            </ul>
          </div>
        `).join("")}
      </div>`;
  }

  app.innerHTML = `
    <div class="topbar">
      <button class="back" data-nav="week/${entry.weekNumber}">← Week ${entry.weekNumber}</button>
      <div class="day-nav">
        ${prevIso ? `<button class="pill" data-nav="day/${prevIso}">‹</button>` : "<span></span>"}
        ${nextIso ? `<button class="pill" data-nav="day/${nextIso}">›</button>` : "<span></span>"}
      </div>
    </div>
    <div class="day-banner" style="background:${phase.color}22;border-color:${phase.color}">
      <span class="phase-tag" style="background:${phase.color}">Phase ${phase.id} · Week ${entry.weekNumber}</span>
      <h1>${entry.weekday} — ${fmtShort(entry.date)}</h1>
      <h2>${content.title}</h2>
    </div>
    ${bodyHtml}
    <div class="notes-section">
      <label for="note-input">Notes (loads used, RPE, how it felt)</label>
      <textarea id="note-input" placeholder="e.g. squat @ 80kg felt smooth, wall balls unbroken to 50">${escapeHtml(noteText)}</textarea>
    </div>
    <button class="btn btn-complete ${done ? "done" : ""}" id="complete-btn">
      ${done ? "✓ Marked Complete — tap to undo" : "Mark Day Complete"}
    </button>
  `;
  bindNav();

  document.getElementById("complete-btn").addEventListener("click", () => {
    toggleComplete(iso);
    renderDay(iso);
  });
  const noteInput = document.getElementById("note-input");
  noteInput.addEventListener("change", () => setNote(iso, noteInput.value));
  noteInput.addEventListener("blur", () => setNote(iso, noteInput.value));
}

/* ============================================================
   GUIDE
   ============================================================ */
const GUIDE_TABS = [
  { key: "overview", label: "Race Overview" },
  { key: "pacing", label: "Sub-80 Pacing" },
  { key: "stations", label: "Station Guide" },
  { key: "mistakes", label: "Common Mistakes" },
  { key: "mobility", label: "Mobility & Recovery" },
  { key: "qualities", label: "Athletic Qualities" },
  { key: "raceWeek", label: "Race Day Checklist" }
];

function renderGuide(section) {
  const active = section && GUIDE_TABS.some(t => t.key === section) ? section : "overview";

  app.innerHTML = `
    <div class="topbar">
      <button class="back" data-nav="">← Dashboard</button>
    </div>
    <div class="guide-banner"><h1>The Complete Guide</h1><p>Everything to know about racing Hyrox strong — and going sub-80.</p></div>
    <div class="guide-tabs">
      ${GUIDE_TABS.map(t => `<button class="tab ${t.key === active ? "active" : ""}" data-guide="${t.key}">${t.label}</button>`).join("")}
    </div>
    <div class="guide-content" id="guide-content"></div>
  `;
  renderGuideContent(active);
  bindNav();

  document.querySelectorAll("[data-guide]").forEach(btn => {
    btn.addEventListener("click", () => {
      history.replaceState(null, "", `#/guide/${btn.dataset.guide}`);
      document.querySelectorAll("[data-guide]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderGuideContent(btn.dataset.guide);
    });
  });
}

function renderGuideContent(key) {
  const c = document.getElementById("guide-content");
  const g = GUIDE[key];

  if (key === "overview") {
    c.innerHTML = `<h2>${g.title}</h2>${g.body.map(p => `<p>${p}</p>`).join("")}`;
  } else if (key === "pacing") {
    c.innerHTML = `
      <h2>${g.title}</h2>
      <p class="intro">${g.intro}</p>
      <table class="pacing-table">
        <thead><tr><th>Segment</th><th>Target Split</th></tr></thead>
        <tbody>${g.rows.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join("")}</tbody>
      </table>`;
  } else if (key === "stations") {
    c.innerHTML = `
      <h2>Station-by-Station Guide</h2>
      ${GUIDE.stations.map(s => `
        <div class="station-card">
          <div class="station-head"><h3>${s.name}</h3><span class="station-target">Target: ${s.target}</span></div>
          <p><strong>Technique cues:</strong> ${s.cues}</p>
          <p><strong>Where people fail:</strong> ${s.mistake}</p>
          <p><strong>How this program builds it:</strong> ${s.fix}</p>
        </div>
      `).join("")}`;
  } else if (key === "mistakes") {
    c.innerHTML = `<h2>${g.title}</h2><ul class="guide-list">${g.items.map(i => `<li>${i}</li>`).join("")}</ul>`;
  } else if (key === "mobility") {
    c.innerHTML = `<h2>${g.title}</h2><ul class="guide-list">${g.items.map(i => `<li>${i}</li>`).join("")}</ul>`;
  } else if (key === "qualities") {
    c.innerHTML = `<h2>${g.title}</h2>${g.items.map(([name, desc]) => `
      <div class="quality-card"><h3>${name}</h3><p>${desc}</p></div>
    `).join("")}`;
  } else if (key === "raceWeek") {
    c.innerHTML = `<h2>${g.title}</h2><ul class="guide-list">${g.items.map(i => `<li>${i}</li>`).join("")}</ul>`;
  }
}

/* ============================================================
   ROUTER
   ============================================================ */
function bindNav() {
  document.querySelectorAll("[data-nav]").forEach(elt => {
    elt.addEventListener("click", (e) => {
      e.preventDefault();
      const path = elt.dataset.nav;
      location.hash = "#/" + path;
    });
  });
}

function route() {
  const hash = location.hash.replace(/^#\/?/, "");
  const parts = hash.split("/").filter(Boolean);

  if (parts.length === 0) { renderDashboard(); return; }
  if (parts[0] === "guide") { renderGuide(parts[1]); return; }
  if (parts[0] === "phase" && parts[1]) { renderPhase(Number(parts[1])); return; }
  if (parts[0] === "week" && parts[1]) { renderWeek(Number(parts[1])); return; }
  if (parts[0] === "day" && parts[1]) { renderDay(parts[1]); return; }
  renderDashboard();
}

window.addEventListener("hashchange", route);
window.addEventListener("DOMContentLoaded", route);
