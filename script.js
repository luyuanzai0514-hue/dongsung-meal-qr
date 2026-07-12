// ====== 설정값 (필요하면 여기만 수정하세요) ======
const CONFIG = {
  ATPT_OFCDC_SC_CODE: "B10", // 서울특별시교육청
  SD_SCHUL_CODE: "7010155", // 동성고등학교
};

// 설문(구글폼 등) 링크. 만들었다면 이 값을 실제 주소로 바꾸세요.
const FEEDBACK_FORM_URL = https://docs.google.com/forms/d/e/1FAIpQLSc9eFweJns7M0HuS3N2dBDx8uKk9afu00E7-dee7DY2oc-c_Q/viewform?usp=publish-editor
const ALLERGY_MAP = {
  1: "난류(계란)",
  2: "우유",
  3: "메밀",
  4: "땅콩",
  5: "대두",
  6: "밀",
  7: "고등어",
  8: "게",
  9: "새우",
  10: "돼지고기",
  11: "복숭아",
  12: "토마토",
  13: "아황산류",
  14: "호두",
  15: "닭고기",
  16: "쇠고기",
  17: "오징어",
  18: "조개류(굴,전복,홍합 등)",
  19: "잣",
};

const STORAGE_KEY = "dongsung-meal-my-allergies";

const els = {};

let selectedDate = new Date();
let myAllergies = loadMyAllergies();
let viewMode = "day"; // "day" | "week"

document.addEventListener("DOMContentLoaded", init);

function init() {
  els.dayViewBtn = document.getElementById("dayViewBtn");
  els.weekViewBtn = document.getElementById("weekViewBtn");
  els.dateNav = document.getElementById("dateNav");
  els.dateInput = document.getElementById("dateInput");
  els.prevDayBtn = document.getElementById("prevDayBtn");
  els.nextDayBtn = document.getElementById("nextDayBtn");
  els.todayBtn = document.getElementById("todayBtn");
  els.mealContainer = document.getElementById("mealContainer");
  els.allergyWarning = document.getElementById("allergyWarning");
  els.settingsBtn = document.getElementById("settingsBtn");
  els.settingsModal = document.getElementById("settingsModal");
  els.allergyList = document.getElementById("allergyList");
  els.saveAllergyBtn = document.getElementById("saveAllergyBtn");
  els.closeModalBtn = document.getElementById("closeModalBtn");
  els.qrImage = document.getElementById("qrImage");
  els.qrUrl = document.getElementById("qrUrl");
  els.feedbackLink = document.getElementById("feedbackLink");

  els.dateInput.value = formatDateForInput(selectedDate);

  els.dateInput.addEventListener("change", () => {
    const [y, m, d] = els.dateInput.value.split("-").map(Number);
    if (!y || !m || !d) return;
    selectedDate = new Date(y, m - 1, d);
    loadMeals();
  });

  els.prevDayBtn.addEventListener("click", () => shiftDate(-1));
  els.nextDayBtn.addEventListener("click", () => shiftDate(1));
  els.todayBtn.addEventListener("click", () => {
    selectedDate = new Date();
    els.dateInput.value = formatDateForInput(selectedDate);
    loadMeals();
  });

  els.dayViewBtn.addEventListener("click", () => setViewMode("day"));
  els.weekViewBtn.addEventListener("click", () => setViewMode("week"));

  els.settingsBtn.addEventListener("click", openSettingsModal);
  els.closeModalBtn.addEventListener("click", closeSettingsModal);
  els.settingsModal.addEventListener("click", (e) => {
    if (e.target === els.settingsModal) closeSettingsModal();
  });
  els.saveAllergyBtn.addEventListener("click", saveSettingsModal);

  els.feedbackLink.href = FEEDBACK_FORM_URL;

  buildAllergyCheckboxes();
  setupQrCode();
  loadMeals();
}

function setViewMode(mode) {
  viewMode = mode;
  els.dayViewBtn.classList.toggle("active", mode === "day");
  els.weekViewBtn.classList.toggle("active", mode === "week");
  els.dateNav.classList.toggle("hidden", mode === "week");

  if (mode === "day") {
    loadMeals();
  } else {
    loadWeekMeals();
  }
}

function shiftDate(deltaDays) {
  const next = new Date(selectedDate);
  next.setDate(next.getDate() + deltaDays);
  selectedDate = next;
  els.dateInput.value = formatDateForInput(selectedDate);
  loadMeals();
}

function formatDateForInput(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatDateForApi(date) {
  return formatDateForInput(date).replaceAll("-", "");
}

async function loadMeals() {
  els.mealContainer.innerHTML = `<p class="loading">급식 정보를 불러오는 중입니다...</p>`;
  els.allergyWarning.classList.add("hidden");

  const ymd = formatDateForApi(selectedDate);
  const url =
    `https://open.neis.go.kr/hub/mealServiceDietInfo` +
    `?ATPT_OFCDC_SC_CODE=${CONFIG.ATPT_OFCDC_SC_CODE}` +
    `&SD_SCHUL_CODE=${CONFIG.SD_SCHUL_CODE}` +
    `&MLSV_YMD=${ymd}` +
    `&Type=json`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    renderMeals(data);
  } catch (err) {
    console.error(err);
    els.mealContainer.innerHTML = `<p class="error">급식 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.</p>`;
  }
}

function renderMeals(data) {
  const rows = extractRows(data);

  if (!rows || rows.length === 0) {
    els.mealContainer.innerHTML = `<p class="empty">이 날짜에는 등록된 급식 정보가 없어요. (주말/방학/휴업일일 수 있어요)</p>`;
    return;
  }

  rows.sort((a, b) => Number(a.MMEAL_SC_CODE || 0) - Number(b.MMEAL_SC_CODE || 0));

  let anyWarn = false;
  const cardsHtml = rows
    .map((row) => {
      const card = buildMealCardHtml(row);
      if (card.warn) anyWarn = true;
      return card.html;
    })
    .join("");

  els.mealContainer.innerHTML = cardsHtml;
  showAllergyWarning(anyWarn);
}

async function loadWeekMeals() {
  els.mealContainer.innerHTML = `<p class="loading">이번 주 급식 정보를 불러오는 중입니다...</p>`;
  els.allergyWarning.classList.add("hidden");

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const rangeEnd = getThisOrNextWednesday(today);

  const url =
    `https://open.neis.go.kr/hub/mealServiceDietInfo` +
    `?ATPT_OFCDC_SC_CODE=${CONFIG.ATPT_OFCDC_SC_CODE}` +
    `&SD_SCHUL_CODE=${CONFIG.SD_SCHUL_CODE}` +
    `&MLSV_FROM_YMD=${formatDateForApi(today)}` +
    `&MLSV_TO_YMD=${formatDateForApi(rangeEnd)}` +
    `&Type=json`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    renderWeekMeals(data);
  } catch (err) {
    console.error(err);
    els.mealContainer.innerHTML = `<p class="error">급식 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.</p>`;
  }
}

function renderWeekMeals(data) {
  const rows = extractRows(data);

  if (!rows || rows.length === 0) {
    els.mealContainer.innerHTML = `<p class="empty">오늘부터 이번 주 수요일까지 등록된 급식 정보가 없어요.</p>`;
    return;
  }

  const byDate = new Map();
  rows.forEach((row) => {
    const ymd = row.MLSV_YMD;
    if (!byDate.has(ymd)) byDate.set(ymd, []);
    byDate.get(ymd).push(row);
  });

  const sortedDates = [...byDate.keys()].sort();

  let anyWarn = false;
  const groupsHtml = sortedDates
    .map((ymd) => {
      const dayRows = byDate
        .get(ymd)
        .sort((a, b) => Number(a.MMEAL_SC_CODE || 0) - Number(b.MMEAL_SC_CODE || 0));

      const cardsHtml = dayRows
        .map((row) => {
          const card = buildMealCardHtml(row);
          if (card.warn) anyWarn = true;
          return card.html;
        })
        .join("");

      return `
        <section class="date-group">
          <h2 class="date-group-heading">${escapeHtml(formatYmdLabel(ymd))}</h2>
          ${cardsHtml}
        </section>
      `;
    })
    .join("");

  els.mealContainer.innerHTML = groupsHtml;
  showAllergyWarning(anyWarn);
}

function buildMealCardHtml(row) {
  const dishes = parseDishes(row.DDISH_NM || "");
  let warn = false;
  const dishItemsHtml = dishes
    .map((dish) => {
      const isWarn = dish.codes.some((code) => myAllergies.has(code));
      if (isWarn) warn = true;
      const codeText = dish.codes.length
        ? ` <span class="allergy-code">(${dish.codes.join(".")})</span>`
        : "";
      return `<li class="${isWarn ? "warn" : ""}">${escapeHtml(dish.name)}${codeText}${
        isWarn ? " ⚠️" : ""
      }</li>`;
    })
    .join("");

  const html = `
    <article class="meal-card">
      <h3>${escapeHtml(row.MMEAL_SC_NM || "급식")}</h3>
      <ul class="dish-list">${dishItemsHtml}</ul>
      <p class="meal-meta">${escapeHtml(row.CAL_INFO || "")}</p>
    </article>
  `;

  return { html, warn };
}

function showAllergyWarning(anyWarn) {
  if (anyWarn && myAllergies.size > 0) {
    els.allergyWarning.textContent =
      "⚠️ 급식에 내가 설정한 알레르기 유발 식재료가 포함되어 있어요. 메뉴를 확인해 주세요.";
    els.allergyWarning.classList.remove("hidden");
  } else {
    els.allergyWarning.classList.add("hidden");
  }
}

function getThisOrNextWednesday(from) {
  const d = new Date(from);
  const day = d.getDay(); // 0=Sun,1=Mon,...,3=Wed,...,6=Sat
  const diff = (3 - day + 7) % 7;
  d.setDate(d.getDate() + diff);
  return d;
}

const WEEKDAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];

function formatYmdLabel(ymd) {
  const y = Number(ymd.slice(0, 4));
  const m = Number(ymd.slice(4, 6));
  const d = Number(ymd.slice(6, 8));
  const date = new Date(y, m - 1, d);
  return `${m}월 ${d}일 (${WEEKDAY_LABELS[date.getDay()]})`;
}

function extractRows(data) {
  if (!data) return [];
  if (Array.isArray(data.mealServiceDietInfo)) {
    const rowBlock = data.mealServiceDietInfo.find((block) => Array.isArray(block.row));
    return rowBlock ? rowBlock.row : [];
  }
  return [];
}

function parseDishes(ddishNm) {
  return ddishNm
    .split("<br/>")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const match = line.match(/^(.*?)\s*\(([0-9.]+)\)\s*$/);
      if (match) {
        const name = match[1].trim();
        const codes = match[2]
          .split(".")
          .map((n) => Number(n.trim()))
          .filter((n) => Number.isInteger(n) && ALLERGY_MAP[n]);
        return { name, codes };
      }
      return { name: line, codes: [] };
    });
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// ====== 알레르기 설정 ======
function loadMyAllergies() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr.map(Number) : []);
  } catch {
    return new Set();
  }
}

function saveMyAllergies(set) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
}

function buildAllergyCheckboxes() {
  els.allergyList.innerHTML = Object.entries(ALLERGY_MAP)
    .map(
      ([code, name]) => `
        <label class="allergy-item">
          <input type="checkbox" value="${code}" ${myAllergies.has(Number(code)) ? "checked" : ""} />
          ${code}. ${escapeHtml(name)}
        </label>
      `
    )
    .join("");
}

function openSettingsModal() {
  buildAllergyCheckboxes();
  els.settingsModal.classList.remove("hidden");
}

function closeSettingsModal() {
  els.settingsModal.classList.add("hidden");
}

function saveSettingsModal() {
  const checked = els.allergyList.querySelectorAll("input[type=checkbox]:checked");
  myAllergies = new Set([...checked].map((cb) => Number(cb.value)));
  saveMyAllergies(myAllergies);
  closeSettingsModal();
  if (viewMode === "week") {
    loadWeekMeals();
  } else {
    loadMeals();
  }
}

// ====== QR코드 ======
function setupQrCode() {
  const pageUrl = window.location.href;
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
    pageUrl
  )}`;
  els.qrImage.src = qrApiUrl;
  els.qrUrl.textContent = pageUrl;
}
