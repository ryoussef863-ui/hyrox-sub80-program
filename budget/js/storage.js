/* ============================================================
   STORAGE — state model, persistence (localStorage), month logic
   All financial data lives on-device only. No network calls.
   ============================================================ */

const STORAGE_KEY = 'ledger.budget.v1';

const CATEGORIES = ['Food', 'Transport', 'Going out', 'Shopping', 'Health', 'Other'];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function monthKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

function monthLabel(key) {
  const [y, m] = key.split('-').map(Number);
  return `${MONTH_NAMES[m - 1]} ${y}`;
}

function defaultFixedExpenses() {
  return [
    { id: uid(), name: 'House', amount: 55300 },
    { id: uid(), name: 'Takka', amount: 6600 },
    { id: uid(), name: 'Loan', amount: 4930 },
    { id: uid(), name: 'Credit', amount: 5000 },
    { id: uid(), name: 'Valu', amount: 3600 },
    { id: uid(), name: 'Family', amount: 3600 },
    { id: uid(), name: 'Halan', amount: 3000 },
    { id: uid(), name: 'Internet', amount: 1600 },
    { id: uid(), name: 'Sohoula', amount: 400 },
  ];
}

function defaultSettings() {
  return {
    income: 115000,
    savingsPercent: 17,
    fixedExpenses: defaultFixedExpenses(),
  };
}

function defaultState() {
  const now = new Date();
  const key = monthKey(now);
  const settings = defaultSettings();
  const state = {
    version: 1,
    settings,
    months: {},
    currentMonthKey: key,
  };
  state.months[key] = {
    settingsSnapshot: cloneSettings(settings),
    log: [],
  };
  return state;
}

function cloneSettings(settings) {
  return {
    income: settings.income,
    savingsPercent: settings.savingsPercent,
    fixedExpenses: settings.fixedExpenses.map(fe => ({ ...fe })),
  };
}

function computeFixedTotal(fixedExpenses) {
  return fixedExpenses.reduce((sum, fe) => sum + (Number(fe.amount) || 0), 0);
}

/* ---- load / save ---- */

function loadState() {
  let raw;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    raw = null;
  }
  let state;
  if (!raw) {
    state = defaultState();
  } else {
    try {
      state = JSON.parse(raw);
      if (!state || !state.settings || !state.months) throw new Error('malformed');
    } catch (e) {
      state = defaultState();
    }
  }
  ensureCurrentMonth(state);
  return state;
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state', e);
  }
}

/* Ensure the real-world current month has a record, carrying forward
   whatever settings are currently active (so edits persist month to month). */
function ensureCurrentMonth(state) {
  const key = monthKey(new Date());
  if (!state.months[key]) {
    state.months[key] = {
      settingsSnapshot: cloneSettings(state.settings),
      log: [],
    };
  }
  state.currentMonthKey = key;
  return key;
}

function getCurrentMonth(state) {
  return state.months[state.currentMonthKey];
}

/* ---- settings mutation (always applies to the live current month) ---- */

function setIncome(state, value) {
  const v = Math.max(0, Number(value) || 0);
  state.settings.income = v;
  getCurrentMonth(state).settingsSnapshot.income = v;
}

function setSavingsPercent(state, value) {
  const v = Math.min(100, Math.max(0, Number(value) || 0));
  state.settings.savingsPercent = v;
  getCurrentMonth(state).settingsSnapshot.savingsPercent = v;
}

function addFixedExpense(state, name, amount) {
  const fe = { id: uid(), name: name || 'New item', amount: Number(amount) || 0 };
  state.settings.fixedExpenses.push(fe);
  getCurrentMonth(state).settingsSnapshot.fixedExpenses.push({ ...fe });
  return fe;
}

function updateFixedExpense(state, id, patch) {
  for (const list of [state.settings.fixedExpenses, getCurrentMonth(state).settingsSnapshot.fixedExpenses]) {
    const item = list.find(fe => fe.id === id);
    if (item) {
      if (patch.name !== undefined) item.name = patch.name;
      if (patch.amount !== undefined) item.amount = Number(patch.amount) || 0;
    }
  }
}

function removeFixedExpense(state, id) {
  state.settings.fixedExpenses = state.settings.fixedExpenses.filter(fe => fe.id !== id);
  const snap = getCurrentMonth(state).settingsSnapshot;
  snap.fixedExpenses = snap.fixedExpenses.filter(fe => fe.id !== id);
}

/* ---- expense log ---- */

function addExpense(state, { category, amount, note }) {
  const entry = {
    id: uid(),
    category: CATEGORIES.includes(category) ? category : 'Other',
    amount: Math.max(0, Number(amount) || 0),
    note: (note || '').trim().slice(0, 200),
    ts: new Date().toISOString(),
  };
  getCurrentMonth(state).log.unshift(entry);
  return entry;
}

function deleteExpense(state, id) {
  const month = getCurrentMonth(state);
  month.log = month.log.filter(e => e.id !== id);
}

/* ---- derived stats ---- */

function computeMonthStats(monthRecord) {
  const { income, savingsPercent, fixedExpenses } = monthRecord.settingsSnapshot;
  const fixedTotal = computeFixedTotal(fixedExpenses);
  const savingsTarget = Math.round(income * (savingsPercent / 100));
  const pool = Math.max(0, income - fixedTotal - savingsTarget);
  const spent = monthRecord.log.reduce((sum, e) => sum + e.amount, 0);
  const poolRemaining = pool - spent;
  const byCategory = {};
  for (const cat of CATEGORIES) byCategory[cat] = 0;
  for (const e of monthRecord.log) byCategory[e.category] = (byCategory[e.category] || 0) + e.amount;
  const onTrack = spent <= pool;
  return {
    income, savingsPercent, fixedTotal, savingsTarget,
    pool, spent, poolRemaining, byCategory, onTrack,
    poolUsedPct: pool > 0 ? Math.min(999, (spent / pool) * 100) : (spent > 0 ? 999 : 0),
  };
}

/* ---- history ---- */

function listHistoryKeys(state) {
  return Object.keys(state.months)
    .filter(k => k !== state.currentMonthKey)
    .sort((a, b) => b.localeCompare(a));
}

/* ---- backup export / import ---- */

function exportBackup(state) {
  return JSON.stringify(state, null, 2);
}

function importBackup(json) {
  const parsed = JSON.parse(json);
  if (!parsed || !parsed.settings || !parsed.months) throw new Error('Invalid backup file');
  ensureCurrentMonth(parsed);
  return parsed;
}
