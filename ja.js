// ===========================
//  STATE
// ===========================
const STORAGE_KEY = 'attendance-calculator-subjects';
const THRESHOLD = 75;

let nextId = 1;
let subjects = loadSubjects();
nextId = getNextId(subjects);

const subjectsList = document.getElementById('subjects-list');
const addSubjectBtn = document.getElementById('add-subject-btn');

// ===========================
//  LOCAL STORAGE
// ===========================
function loadSubjects() {
  const savedSubjects = localStorage.getItem(STORAGE_KEY);

  if (!savedSubjects) {
    return [
      createSubject('Mathematics'),
      createSubject('Physics'),
      createSubject('Computer Science')
    ];
  }

  try {
    const parsedSubjects = JSON.parse(savedSubjects);

    if (!Array.isArray(parsedSubjects)) {
      return [];
    }

    return parsedSubjects.map(subject => ({
      id: Number(subject.id),
      name: subject.name || '',
      attended: subject.attended || '',
      total: subject.total || ''
    })).filter(subject => Number.isFinite(subject.id));
  } catch (error) {
    return [];
  }
}

function saveSubjects() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects));
}

function getNextId(subjectList) {
  const highestId = subjectList.reduce((max, subject) => Math.max(max, subject.id), 0);
  return highestId + 1;
}

function createSubject(name = '', attended = '', total = '') {
  return {
    id: nextId ? nextId++ : Date.now(),
    name,
    attended,
    total
  };
}

// ===========================
//  SUBJECT ACTIONS
// ===========================
function addSubject() {
  const subject = createSubject();
  subjects.push(subject);
  saveSubjects();
  renderSubjects();
  document.getElementById(`name-${subject.id}`)?.focus();
}

function removeSubject(id) {
  subjects = subjects.filter(subject => subject.id !== id);
  saveSubjects();
  renderSubjects();
}

function updateSubject(id, field, value) {
  const subject = subjects.find(item => item.id === id);

  if (!subject) return;

  subject[field] = value;
  saveSubjects();
  renderSubjectResult(subject);
  updateSummary();
}

// ===========================
//  RENDER ALL SUBJECTS
// ===========================
function renderSubjects() {
  subjectsList.innerHTML = '';

  subjects.forEach((subject, index) => {
    subjectsList.insertAdjacentHTML('beforeend', subjectHTML(subject, index + 1));
    renderSubjectResult(subject);
  });

  updateSummary();
}

// ===========================
//  BUILD SUBJECT CARD HTML
// ===========================
function subjectHTML(subject, num) {
  return `
    <div class="subject-card" id="card-${subject.id}" data-subject-id="${subject.id}">
      <div class="card-top">
        <span class="subject-num">#${String(num).padStart(2, '0')}</span>
        <input
          class="subject-name-input"
          id="name-${subject.id}"
          type="text"
          value="${escapeHTML(subject.name)}"
          placeholder="Subject name (e.g. Mathematics)"
          data-field="name"
        />
        <button class="remove-btn" type="button" data-action="remove" title="Remove subject" aria-label="Remove subject">
          &times;
        </button>
      </div>

      <div class="inputs-row">
        <div class="input-group">
          <label for="attended-${subject.id}">Classes Attended</label>
          <input
            type="number"
            id="attended-${subject.id}"
            min="0"
            value="${escapeHTML(subject.attended)}"
            placeholder="0"
            data-field="attended"
          />
        </div>
        <div class="input-group">
          <label for="total-${subject.id}">Total Classes</label>
          <input
            type="number"
            id="total-${subject.id}"
            min="0"
            value="${escapeHTML(subject.total)}"
            placeholder="0"
            data-field="total"
          />
        </div>
      </div>

      <div class="result-bar empty" id="result-${subject.id}">
        <span class="result-pct">Enter classes above</span>
        <span class="result-info"></span>
      </div>

      <div class="progress-wrap">
        <div class="progress-fill" id="prog-${subject.id}" style="width:0%; background:#252535;"></div>
      </div>
    </div>`;
}

// ===========================
//  CALCULATE ATTENDANCE
// ===========================
function getAttendanceStatus(subject) {
  const attended = parseFloat(subject.attended);
  const total = parseFloat(subject.total);

  if (isNaN(attended) || isNaN(total) || total <= 0 || attended < 0) {
    return null;
  }

  const cappedAttended = Math.min(attended, total);
  const percent = (cappedAttended / total) * 100;

  if (percent >= THRESHOLD) {
    const canBunk = Math.floor(cappedAttended / 0.75 - total);

    return {
      percent,
      className: percent >= 85 && canBunk > 0 ? 'safe' : 'warn',
      message: canBunk > 0
        ? `You can skip <strong>${canBunk}</strong> more class${canBunk > 1 ? 'es' : ''} and still stay at 75%.`
        : `You're right at the edge - don't miss any more classes!`,
      color: percent >= 85 && canBunk > 0 ? '#36e8a0' : '#f7c36a'
    };
  }

  const needed = Math.ceil((0.75 * total - cappedAttended) / 0.25);

  return {
    percent,
    className: 'danger',
    message: `Attend <strong>${needed}</strong> consecutive class${needed > 1 ? 'es' : ''} to reach 75%.`,
    color: '#f76a6a'
  };
}

function renderSubjectResult(subject) {
  const resultEl = document.getElementById(`result-${subject.id}`);
  const progEl = document.getElementById(`prog-${subject.id}`);

  if (!resultEl || !progEl) return;

  const status = getAttendanceStatus(subject);

  if (!status) {
    resultEl.className = 'result-bar empty';
    resultEl.innerHTML = '<span class="result-pct">Enter classes above</span><span class="result-info"></span>';
    progEl.style.width = '0%';
    progEl.style.background = '#252535';
    return;
  }

  resultEl.className = `result-bar ${status.className}`;
  resultEl.innerHTML = `
    <span class="result-pct">${status.percent.toFixed(1)}%</span>
    <span class="result-info">${status.message}</span>
  `;

  progEl.style.width = `${Math.min(status.percent, 100)}%`;
  progEl.style.background = status.color;
}

// ===========================
//  UPDATE SUMMARY PANEL
// ===========================
function updateSummary() {
  let safe = 0;
  let warn = 0;
  let danger = 0;

  subjects.forEach(subject => {
    const status = getAttendanceStatus(subject);

    if (!status) return;

    if (status.className === 'safe') safe++;
    if (status.className === 'warn') warn++;
    if (status.className === 'danger') danger++;
  });

  document.getElementById('sum-safe').textContent = safe;
  document.getElementById('sum-warn').textContent = warn;
  document.getElementById('sum-danger').textContent = danger;
}

// ===========================
//  EVENTS
// ===========================
addSubjectBtn.addEventListener('click', addSubject);

subjectsList.addEventListener('input', event => {
  const field = event.target.dataset.field;
  const card = event.target.closest('[data-subject-id]');

  if (!field || !card) return;

  updateSubject(Number(card.dataset.subjectId), field, event.target.value);
});

subjectsList.addEventListener('click', event => {
  const removeButton = event.target.closest('[data-action="remove"]');
  const card = event.target.closest('[data-subject-id]');

  if (!removeButton || !card) return;

  removeSubject(Number(card.dataset.subjectId));
});

function escapeHTML(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

// ===========================
//  INITIALISE
// ===========================
renderSubjects();
