/* ═══════════════════════════════════════════
   MARCH PORTFOLIO — script.js
   ═══════════════════════════════════════════ */

/* ─── LIVE CLOCK ─── */
function updateClock() {
  const now = new Date();
  const timeEl = document.getElementById('menubar-time');
  const dateEl = document.getElementById('menubar-date');
  if (!timeEl || !dateEl) return;

  const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  timeEl.textContent = timeStr;
  dateEl.textContent = dateStr;
}
updateClock();
setInterval(updateClock, 1000);

/* ─── LANGUAGE TOGGLE ─── */
let currentLang = 'en';

function toggleLang() {
  currentLang = currentLang === 'en' ? 'th' : 'en';
  document.getElementById('lang-toggle-btn').textContent = currentLang.toUpperCase();
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute('data-' + currentLang);
    if (text) el.innerHTML = text;
  });
}

function setLang(lang) {
  currentLang = lang;
  document.getElementById('lang-toggle-btn').textContent = lang.toUpperCase();
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (text) el.innerHTML = text;
  });
}

/* ─── WINDOW MANAGEMENT ─── */
let highestZ = 100;

function openWindow(id) {
  const win = document.getElementById(id);
  if (!win) return;
  win.classList.add('active');
  bringToFront(win);
  applyLang(win);
}

function closeWindow(id) {
  const win = document.getElementById(id);
  if (!win) return;
  win.style.animation = 'none';
  win.style.opacity = '0';
  win.style.transform = 'scale(0.95)';
  win.style.transition = 'opacity 0.15s, transform 0.15s';
  setTimeout(() => {
    win.classList.remove('active');
    win.style.opacity = '';
    win.style.transform = '';
    win.style.transition = '';
    win.style.animation = '';
  }, 150);
}

function minimizeWindow(id) {
  closeWindow(id);
}

const _winStates = {};

function maximizeWindow(id) {
  const win = document.getElementById(id);
  if (!win) return;
  bringToFront(win);
  if (_winStates[id]) {
    // Restore
    const s = _winStates[id];
    win.classList.remove('maximized');
    win.style.left = s.left;
    win.style.top = s.top;
    win.style.width = s.width;
    win.style.height = s.height;
    delete _winStates[id];
  } else {
    // Save & maximize
    _winStates[id] = {
      left: win.style.left,
      top: win.style.top,
      width: win.style.width,
      height: win.style.height
    };
    win.classList.add('maximized');
    win.style.left = '';
    win.style.top = '';
    win.style.width = '';
    win.style.height = '';
  }
}

function bringToFront(win) {
  highestZ++;
  win.style.zIndex = highestZ;
}

function applyLang(win) {
  win.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute('data-' + currentLang);
    if (text) el.innerHTML = text;
  });
}

document.querySelectorAll('.mac-window').forEach(win => {
  win.addEventListener('mousedown', () => bringToFront(win));
});

/* ─── WINDOW DRAGGING ─── */
let dragging = null;
let dragOffX = 0, dragOffY = 0;

function startDrag(e, id) {
  const win = document.getElementById(id);
  if (!win) return;
  bringToFront(win);
  dragging = win;
  const rect = win.getBoundingClientRect();
  dragOffX = e.clientX - rect.left;
  dragOffY = e.clientY - rect.top;
  e.preventDefault();
}

document.addEventListener('mousemove', e => {
  if (!dragging) return;
  let x = e.clientX - dragOffX;
  let y = e.clientY - dragOffY;
  const maxX = window.innerWidth - dragging.offsetWidth;
  const maxY = window.innerHeight - dragging.offsetHeight;
  x = Math.max(0, Math.min(x, maxX));
  y = Math.max(28, Math.min(y, maxY));
  dragging.style.left = x + 'px';
  dragging.style.top = y + 'px';
  dragging.style.right = 'auto';
  dragging.style.bottom = 'auto';
});

document.addEventListener('mouseup', () => { dragging = null; });

/* ─── DESKTOP ITEM DRAGGING ─── */
let itemDragging = null;
let itemOffX = 0, itemOffY = 0;

document.querySelectorAll('.desktop-item').forEach(item => {
  item.addEventListener('mousedown', e => {
    if (e.target.closest('.mac-window')) return;
    itemDragging = item;
    const rect = item.getBoundingClientRect();
    itemOffX = e.clientX - rect.left;
    itemOffY = e.clientY - rect.top;
    item.style.zIndex = 50;
    e.preventDefault();
  });
});

document.addEventListener('mousemove', e => {
  if (!itemDragging) return;
  let x = e.clientX - itemOffX;
  let y = e.clientY - itemOffY;
  const maxX = window.innerWidth - itemDragging.offsetWidth;
  const maxY = window.innerHeight - itemDragging.offsetHeight - 60;
  x = Math.max(0, Math.min(x, maxX));
  y = Math.max(34, Math.min(y, maxY));
  itemDragging.style.left = x + 'px';
  itemDragging.style.top = y + 'px';
  itemDragging.style.right = 'auto';
  itemDragging.style.bottom = 'auto';
});

document.addEventListener('mouseup', () => { itemDragging = null; });

/* ─── RESUME DOWNLOAD ─── */
function triggerDownload() {
  document.getElementById('resume-dl').click();
}

/* ─── SCROLL TO TOP (HOME) ─── */
function scrollToTop() {
  // On desktop layout, just briefly flash/highlight center title
  const title = document.getElementById('center-title');
  title.style.transition = 'opacity 0.3s';
  title.style.opacity = '0.4';
  setTimeout(() => { title.style.opacity = ''; }, 400);
}

/* ─── AI CHAT ─── */
const SYSTEM_PROMPT = `You are a friendly, concise AI assistant for March (Siwawong Jearramanon), a 22-year-old Multimedia Engineering student at Bangkok University, Bangkok, Thailand. Answer questions about him based only on the facts below. Keep answers short (2-4 sentences max). Be warm and professional.

FACTS ABOUT MARCH:
- Full name: Siwawong Jearramanon, goes by "March"
- Age: 22, based in Bangkok, Thailand. Open to remote/international roles.
- Email: march.siwawong@gmail.com | GitHub: github.com/swwmrch
- Education: Multimedia and Entertainment Engineering, Bangkok University, GPA 3.54 (2022–present)
- Experience: Audio Engineer Intern at The Standard (Jun–Aug 2025) — Logic Pro X, dialogue mastering, broadcast audio pipeline, QC under production deadlines
- Projects: (1) Balance Game System — Unity, C#, Arduino (thesis, real-time sensor feedback loop), (2) AI Trading System — Python, LLM, prompt design (in progress), (3) Broadcast Audio Pipeline at The Standard, (4) This portfolio website itself
- Skills: Prompt engineering, few-shot learning, chain-of-thought, Claude/GPT-4, output evaluation, C# Unity, Arduino, HTML/CSS/JS, Python (learning), Logic Pro X, dialogue mastering
- Career target: Prompt Engineer — AI product teams, research, or tooling. Open to remote and international.
- Languages: Thai (native), English (professional)
- Personality: Systems thinker. Believes good output starts with precise input — whether audio or AI. Curious, fast learner, detail-oriented.

If asked something not covered above, say you don't have that info and suggest emailing march directly.`;

async function sendChat() {
  const input = document.getElementById('chat-input');
  const messages = document.getElementById('chat-messages');
  const text = input.value.trim();
  if (!text) return;

  input.value = '';

  const userMsg = document.createElement('div');
  userMsg.className = 'chat-msg user';
  userMsg.textContent = text;
  messages.appendChild(userMsg);

  const thinking = document.createElement('div');
  thinking.className = 'chat-msg assistant thinking';
  thinking.textContent = 'Thinking...';
  messages.appendChild(thinking);
  messages.scrollTop = messages.scrollHeight;

  setTimeout(() => {
    thinking.remove();
    const reply = document.createElement('div');
    reply.className = 'chat-msg assistant';
    reply.textContent = 'This feature is unavailable right now.';
    messages.appendChild(reply);
    messages.scrollTop = messages.scrollHeight;
  }, 600);

  messages.scrollTop = messages.scrollHeight;
}

/* ─── CLOSE WINDOWS ON DESKTOP CLICK ─── */
document.getElementById('desktop').addEventListener('click', e => {
  if (e.target.id === 'desktop' || e.target.classList.contains('dot-grid')) {
    document.querySelectorAll('.folder-item.selected').forEach(el => el.classList.remove('selected'));
  }
});

/* ─── FOLDER SINGLE CLICK SELECT ─── */
document.querySelectorAll('.folder-item').forEach(item => {
  item.addEventListener('click', e => {
    document.querySelectorAll('.folder-item.selected').forEach(el => el.classList.remove('selected'));
    item.classList.add('selected');
    e.stopPropagation();
  });
});
