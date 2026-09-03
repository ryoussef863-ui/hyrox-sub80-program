/* ============================================================
   APP — rendering, events, chart, service worker registration
   ============================================================ */

const SAVINGS_MIN = 5;
const SAVINGS_MAX = 30;
const SAVINGS_BAND = [15, 20];

const CAT_COLORS = {
  'Food': '#c9a869',
  'Transport': '#7fae8e',
  'Going out': '#8a93a3',
  'Shopping': '#c1666b',
  'Health': '#6d8fc7',
  'Other': '#5b6272',
};

let state = loadState();
let selectedCategory = CATEGORIES[0];
let toastTimer = null;

/* ---- formatting ---- */

function formatEGP(n) {
  const rounded = Math.round(n || 0);
  const sign = rounded < 0 ? '-' : '';
  const abs = Math.abs(rounded);
  return `${sign}${abs.toLocaleString('en-US')} EGP`;
}

function formatTime(iso) {
  const d = new Date(iso);
  return d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}

/* ---- toast ---- */

function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

/* ---- view switching ---- */

function switchView(view) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-' + view).classList.add('active');
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.view === view));
  window.scrollTo(0, 0);
  if (view === 'history') renderHistory();
}

/* ---- month label ---- */

function renderMonthLabel() {
  document.getElementById('month-label').textContent = monthLabel(state.currentMonthKey);
}

/* ---- dashboard ---- */

function renderDashboard() {
  const month = getCurrentMonth(state);
  const stats = computeMonthStats(month);

  const heroEl = document.getElementById('pool-remaining');
  heroEl.textContent = formatEGP(stats.poolRemaining);
  heroEl.className = 'hero-amount ' + (stats.poolRemaining >= 0 ? 'good' : 'bad');

  document.getElementById('pool-sub').textContent =
    `${formatEGP(stats.spent)} of ${formatEGP(stats.pool)} used (${Math.round(stats.poolUsedPct)}%)`;

  const fill = document.getElementById('pool-progress');
  fill.style.width = Math.min(100, stats.poolUsedPct) + '%';
  fill.className = 'progress-fill ' + (stats.poolUsedPct > 100 ? 'bad' : '');

  document.getElementById('row-income').textContent = formatEGP(stats.income);
  document.getElementById('row-fixed').textContent = formatEGP(stats.fixedTotal);
  document.getElementById('row-savings-label').textContent = `Savings target (${stats.savingsPercent}%)`;
  document.getElementById('row-savings').textContent = formatEGP(stats.savingsTarget);
  document.getElementById('row-spent').textContent = formatEGP(stats.spent);
  document.getElementById('row-pool').textContent = formatEGP(stats.pool);

  const statusEl = document.getElementById('savings-status');
  if (stats.onTrack) {
    statusEl.textContent = `On track — set aside ${formatEGP(stats.savingsTarget)} (${stats.savingsPercent}%) and you're still within your spending pool.`;
    statusEl.style.color = 'var(--good)';
  } else {
    const over = stats.spent - stats.pool;
    statusEl.textContent = `${formatEGP(over)} over your spending pool — that's eating into this month's savings target.`;
    statusEl.style.color = 'var(--bad)';
  }

  renderCategoryChart(stats);
}

function renderCategoryChart(stats) {
  const canvas = document.getElementById('category-chart');
  const legend = document.getElementById('category-legend');
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const cssWidth = canvas.parentElement.clientWidth;
  const rowH = 30;
  const cssHeight = CATEGORIES.length * rowH + 6;

  canvas.width = Math.max(1, cssWidth * dpr);
  canvas.height = Math.max(1, cssHeight * dpr);
  canvas.style.height = cssHeight + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cssWidth, cssHeight);

  const max = Math.max(1, ...CATEGORIES.map(c => stats.byCategory[c] || 0));
  const labelW = 82;
  const amountW = 82;
  const barAreaW = Math.max(20, cssWidth - labelW - amountW);

  ctx.textBaseline = 'middle';
  CATEGORIES.forEach((cat, i) => {
    const y = i * rowH + rowH / 2;
    const val = stats.byCategory[cat] || 0;

    ctx.fillStyle = '#8a93a3';
    ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(cat, 0, y);

    ctx.fillStyle = '#1d222c';
    ctx.fillRect(labelW, y - 7, barAreaW, 14);

    const w = val > 0 ? Math.max(4, (val / max) * barAreaW) : 0;
    ctx.fillStyle = CAT_COLORS[cat] || '#8a93a3';
    ctx.fillRect(labelW, y - 7, w, 14);

    ctx.fillStyle = '#e8e6df';
    ctx.font = '12px ui-monospace, SFMono-Regular, Menlo, monospace';
    ctx.textAlign = 'right';
    ctx.fillText(formatEGP(val), cssWidth, y);
  });

  const total = CATEGORIES.reduce((s, c) => s + (stats.byCategory[c] || 0), 0);
  legend.innerHTML = total === 0
    ? '<span class="text-dim" style="font-size:12px;">No variable spending logged yet this month.</span>'
    : '';
}

/* ---- log view ---- */

function renderCategoryChips() {
  const wrap = document.getElementById('category-chips');
  wrap.innerHTML = '';
  CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'chip' + (cat === selectedCategory ? ' selected' : '');
    btn.textContent = cat;
    btn.dataset.cat = cat;
    btn.addEventListener('click', () => {
      selectedCategory = cat;
      wrap.querySelectorAll('.chip').forEach(c => c.classList.toggle('selected', c.dataset.cat === cat));
    });
    wrap.appendChild(btn);
  });
}

function renderEntries() {
  const month = getCurrentMonth(state);
  const listEl = document.getElementById('entries-list');
  listEl.innerHTML = '';

  if (month.log.length === 0) {
    listEl.innerHTML = '<div class="empty-note">No entries yet this month.</div>';
    return;
  }

  month.log.forEach(entry => {
    const row = document.createElement('div');
    row.className = 'entry-row';
    row.innerHTML = `
      <span class="cat-dot" style="background:${CAT_COLORS[entry.category] || '#8a93a3'}"></span>
      <span class="details">
        <span class="cat">${escapeHtml(entry.category)}</span>
        ${entry.note ? `<span class="note">${escapeHtml(entry.note)}</span>` : ''}
      </span>
      <span class="meta">
        <span class="amount">${formatEGP(entry.amount)}</span>
        <span class="time">${formatTime(entry.ts)}</span>
      </span>
      <button class="del" data-id="${entry.id}" aria-label="Delete entry">✕</button>
    `;
    listEl.appendChild(row);
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* ---- expenses / settings view ---- */

function renderExpensesView() {
  document.getElementById('income-input').value = state.settings.income;

  const slider = document.getElementById('savings-slider');
  slider.value = state.settings.savingsPercent;
  document.getElementById('savings-slider-value').textContent = state.settings.savingsPercent + '%';

  const band = document.getElementById('savings-band');
  const range = SAVINGS_MAX - SAVINGS_MIN;
  const leftPct = ((SAVINGS_BAND[0] - SAVINGS_MIN) / range) * 100;
  const widthPct = ((SAVINGS_BAND[1] - SAVINGS_BAND[0]) / range) * 100;
  band.style.left = leftPct + '%';
  band.style.width = widthPct + '%';

  renderFixedList();
}

function renderFixedList() {
  const wrap = document.getElementById('fixed-list');
  wrap.innerHTML = '';
  state.settings.fixedExpenses.forEach(fe => {
    const row = document.createElement('div');
    row.className = 'fixed-row';
    row.innerHTML = `
      <input type="text" value="${escapeAttr(fe.name)}" data-id="${fe.id}" data-field="name">
      <input type="number" value="${fe.amount}" min="0" step="10" data-id="${fe.id}" data-field="amount">
      <button class="remove" data-id="${fe.id}" aria-label="Remove">✕</button>
    `;
    wrap.appendChild(row);
  });
  document.getElementById('fixed-total').textContent = formatEGP(computeFixedTotal(state.settings.fixedExpenses));
}

function escapeAttr(str) {
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

/* ---- history view ---- */

function renderHistory() {
  const listEl = document.getElementById('history-list');
  const keys = listHistoryKeys(state);

  if (keys.length === 0) {
    listEl.innerHTML = '<div class="empty-note">No past months yet — history appears once a month rolls over.</div>';
    return;
  }

  listEl.innerHTML = '';
  keys.forEach(key => {
    const month = state.months[key];
    const stats = computeMonthStats(month);
    const catLines = CATEGORIES
      .filter(c => (stats.byCategory[c] || 0) > 0)
      .map(c => `
        <div class="ledger-row">
          <span class="label">${c}</span><span class="leader"></span>
          <span class="amount">${formatEGP(stats.byCategory[c])}</span>
        </div>`).join('');

    const item = document.createElement('div');
    item.className = 'history-item';
    item.innerHTML = `
      <div class="history-head" data-key="${key}">
        <span class="m">${monthLabel(key)}</span>
        <span style="display:flex;align-items:center;">
          <span class="status ${stats.onTrack ? 'good' : 'bad'}">${formatEGP(stats.poolRemaining)}</span>
          <svg class="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 6l6 6-6 6"/></svg>
        </span>
      </div>
      <div class="history-body">
        <div class="ledger-row"><span class="label">Income</span><span class="leader"></span><span class="amount">${formatEGP(stats.income)}</span></div>
        <div class="ledger-row"><span class="label">Fixed expenses</span><span class="leader"></span><span class="amount">${formatEGP(stats.fixedTotal)}</span></div>
        <div class="ledger-row"><span class="label">Savings target (${stats.savingsPercent}%)</span><span class="leader"></span><span class="amount">${formatEGP(stats.savingsTarget)}</span></div>
        <div class="ledger-row"><span class="label">Spent</span><span class="leader"></span><span class="amount">${formatEGP(stats.spent)}</span></div>
        <div class="ledger-row total"><span class="label">Pool remaining</span><span class="leader"></span><span class="amount">${formatEGP(stats.poolRemaining)}</span></div>
        ${catLines ? `<p class="section-title" style="margin-top:16px;">By category</p>${catLines}` : ''}
      </div>
    `;
    listEl.appendChild(item);
  });
}

/* ---- events ---- */

function bindEvents() {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => switchView(tab.dataset.view));
  });

  document.getElementById('log-form').addEventListener('submit', e => {
    e.preventDefault();
    const amountInput = document.getElementById('log-amount');
    const noteInput = document.getElementById('log-note');
    const amount = parseFloat(amountInput.value);
    if (!amount || amount <= 0) {
      toast('Enter a valid amount');
      return;
    }
    addExpense(state, { category: selectedCategory, amount, note: noteInput.value });
    saveState(state);
    amountInput.value = '';
    noteInput.value = '';
    renderDashboard();
    renderEntries();
    toast(`Logged ${formatEGP(amount)} — ${selectedCategory}`);
  });

  document.getElementById('entries-list').addEventListener('click', e => {
    const btn = e.target.closest('.del');
    if (!btn) return;
    deleteExpense(state, btn.dataset.id);
    saveState(state);
    renderDashboard();
    renderEntries();
    toast('Entry removed');
  });

  document.getElementById('income-input').addEventListener('change', e => {
    setIncome(state, e.target.value);
    saveState(state);
    renderDashboard();
  });

  const slider = document.getElementById('savings-slider');
  slider.addEventListener('input', e => {
    document.getElementById('savings-slider-value').textContent = e.target.value + '%';
  });
  slider.addEventListener('change', e => {
    setSavingsPercent(state, e.target.value);
    saveState(state);
    renderDashboard();
  });

  document.getElementById('add-fixed-btn').addEventListener('click', () => {
    addFixedExpense(state, 'New expense', 0);
    saveState(state);
    renderFixedList();
    renderDashboard();
  });

  document.getElementById('fixed-list').addEventListener('change', e => {
    const input = e.target.closest('input');
    if (!input) return;
    const id = input.dataset.id;
    const field = input.dataset.field;
    updateFixedExpense(state, id, { [field]: input.value });
    saveState(state);
    document.getElementById('fixed-total').textContent = formatEGP(computeFixedTotal(state.settings.fixedExpenses));
    renderDashboard();
  });

  document.getElementById('fixed-list').addEventListener('click', e => {
    const btn = e.target.closest('.remove');
    if (!btn) return;
    removeFixedExpense(state, btn.dataset.id);
    saveState(state);
    renderFixedList();
    renderDashboard();
  });

  document.getElementById('export-btn').addEventListener('click', () => {
    const json = exportBackup(state);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const stamp = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `ledger-backup-${stamp}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    toast('Backup exported');
  });

  document.getElementById('import-btn').addEventListener('click', () => {
    document.getElementById('import-file').click();
  });

  document.getElementById('import-file').addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        state = importBackup(reader.result);
        saveState(state);
        renderAll();
        toast('Backup imported');
      } catch (err) {
        toast('Invalid backup file');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  });

  document.getElementById('history-list').addEventListener('click', e => {
    const head = e.target.closest('.history-head');
    if (!head) return;
    const item = head.closest('.history-item');
    const body = item.querySelector('.history-body');
    const willOpen = !body.classList.contains('open');
    item.classList.toggle('open', willOpen);
    body.classList.toggle('open', willOpen);
  });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      const prevKey = state.currentMonthKey;
      ensureCurrentMonth(state);
      if (state.currentMonthKey !== prevKey) {
        saveState(state);
        renderAll();
        toast('New month started');
      }
    }
  });

  window.addEventListener('resize', () => {
    renderDashboard();
  });
}

/* ---- init ---- */

function renderAll() {
  renderMonthLabel();
  renderDashboard();
  renderEntries();
  renderExpensesView();
  if (document.getElementById('view-history').classList.contains('active')) renderHistory();
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(err => console.error('SW registration failed', err));
    });
  }
}

function init() {
  saveState(state);
  renderCategoryChips();
  renderAll();
  bindEvents();
  registerServiceWorker();
}

init();
