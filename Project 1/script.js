// ===========================
//  STATE
// ===========================
let subjects = [];
let nextId = 1;

// ===========================
//  ADD SUBJECT
// ===========================
function addSubject(name = '', attended = '', total = '') {
  const id = nextId++;
  subjects.push({ id });
  renderSubjects();

  // Pre-fill values if provided
  if (name || attended !== '' || total !== '') {
    document.getElementById(`name-${id}`).value = name;
    document.getElementById(`attended-${id}`).value = attended;
    document.getElementById(`total-${id}`).value = total;
    calcSubject(id);
  }

  document.getElementById(`name-${id}`)?.focus();
}

// ===========================
//  REMOVE SUBJECT
// ===========================
function removeSubject(id) {
  subjects = subjects.filter(s => s.id !== id);
  renderSubjects();
  updateSummary();
}

// ===========================
//  RENDER ALL SUBJECTS
// ===========================
function renderSubjects() {
  const list = document.getElementById('subjects-list');
  list.innerHTML = '';
  subjects.forEach((s, idx) => {
    list.insertAdjacentHTML('beforeend', subjectHTML(s.id, idx + 1));
  });
  updateSummary();
}

// ===========================
//  BUILD SUBJECT CARD HTML
// ===========================
function subjectHTML(id, num) {
  return `
    <div class="subject-card" id="card-${id}">
      <div class="card-top">
        <span class="subject-num">#${String(num).padStart(2, '0')}</span>
        <input
          class="subject-name-input"
          id="name-${id}"
          type="text"
          placeholder="Subject name (e.g. Mathematics)"
        />
        <button class="remove-btn" onclick="removeSubject(${id})" title="Remove subject">✕</button>
      </div>

      <div class="inputs-row">
        <div class="input-group">
          <label>Classes Attended</label>
          <input
            type="number"
            id="attended-${id}"
            min="0"
            placeholder="0"
            oninput="calcSubject(${id})"
          />
        </div>
        <div class="input-group">
          <label>Total Classes</label>
          <input
            type="number"
            id="total-${id}"
            min="0"
            placeholder="0"
            oninput="calcSubject(${id})"
          />
        </div>
      </div>

      <div class="result-bar empty" id="result-${id}">
        <span class="result-pct">Enter classes above</span>
        <span class="result-info"></span>
      </div>

      <div class="progress-wrap">
        <div class="progress-fill" id="prog-${id}" style="width:0%; background:#252535;"></div>
      </div>
    </div>`;
}

// ===========================
//  CALCULATE ATTENDANCE
// ===========================
function calcSubject(id) {
  const attended  = parseFloat(document.getElementById(`attended-${id}`)?.value);
  const total     = parseFloat(document.getElementById(`total-${id}`)?.value);
  const resultEl  = document.getElementById(`result-${id}`);
  const progEl    = document.getElementById(`prog-${id}`);

  if (!resultEl) return;

  // Reset if inputs are invalid
  if (isNaN(attended) || isNaN(total) || total <= 0 || attended < 0) {
    resultEl.className = 'result-bar empty';
    resultEl.innerHTML = `<span class="result-pct">Enter classes above</span><span class="result-info"></span>`;
    progEl.style.width      = '0%';
    progEl.style.background = '#252535';
    updateSummary();
    return;
  }

  const THRESHOLD  = 75;
  const capped     = Math.min(attended, total);       // attended can't exceed total
  const pct        = (capped / total) * 100;
  const pctDisplay = pct.toFixed(1);

  let barClass, infoText, progColor;

  if (pct >= THRESHOLD) {
    // ── Above 75%: calculate how many classes can be bunked ──
    // Formula: attended / (total + x) >= 0.75
    // => x <= attended / 0.75 - total
    const canBunk = Math.floor(capped / 0.75 - total);

    if (canBunk > 0) {
      barClass  = pct >= 85 ? 'safe' : 'warn';
      infoText  = `You can skip <strong>${canBunk}</strong> more class${canBunk > 1 ? 'es' : ''} and still stay at 75%.`;
      progColor = barClass === 'safe' ? '#36e8a0' : '#f7c36a';
    } else {
      barClass  = 'warn';
      infoText  = `You're right at the edge — don't miss any more classes!`;
      progColor = '#f7c36a';
    }

  } else {
    // ── Below 75%: calculate classes needed to reach 75% ──
    // Formula: (attended + x) / (total + x) >= 0.75
    // => 0.25x >= 0.75*total - attended
    // => x >= (0.75*total - attended) / 0.25
    const needed = Math.ceil((0.75 * total - capped) / 0.25);
    barClass  = 'danger';
    infoText  = `Attend <strong>${needed}</strong> consecutive class${needed > 1 ? 'es' : ''} to reach 75%.`;
    progColor = '#f76a6a';
  }

  // Update result bar
  resultEl.className = `result-bar ${barClass}`;
  resultEl.innerHTML = `
    <span class="result-pct">${pctDisplay}%</span>
    <span class="result-info">${infoText}</span>
  `;

  // Update progress bar
  progEl.style.width      = Math.min(pct, 100) + '%';
  progEl.style.background = progColor;

  updateSummary();
}

// ===========================
//  UPDATE SUMMARY PANEL
// ===========================
function updateSummary() {
  let safe = 0, warn = 0, danger = 0;

  subjects.forEach(s => {
    const attended = parseFloat(document.getElementById(`attended-${s.id}`)?.value);
    const total    = parseFloat(document.getElementById(`total-${s.id}`)?.value);

    if (isNaN(attended) || isNaN(total) || total <= 0) return;

    const pct      = Math.min(attended, total) / total * 100;
    const canBunk  = Math.floor(Math.min(attended, total) / 0.75 - total);

    if (pct < 75)                        danger++;
    else if (pct >= 85 && canBunk > 0)   safe++;
    else                                  warn++;
  });

  document.getElementById('sum-safe').textContent   = safe;
  document.getElementById('sum-warn').textContent   = warn;
  document.getElementById('sum-danger').textContent = danger;
}

// ===========================
//  INITIALISE WITH DEFAULTS
// ===========================
addSubject('Mathematics');
addSubject('Physics');
addSubject('Computer Science');
