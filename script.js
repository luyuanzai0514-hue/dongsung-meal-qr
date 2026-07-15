// ====== 설정값 (필요하면 여기만 수정하세요) ======
const CONFIG = {
  ATPT_OFCDC_SC_CODE: "B10", // 서울특별시교육청
  SD_SCHUL_CODE: "7010155", // 동성고등학교
};

// 설문(구글폼 등) 링크. 만들었다면 이 값을 실제 주소로 바꾸세요.
const FEEDBACK_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSc9eFweJns7M0HuS3N2dBDx8uKk9afu00E7-dee7DY2oc-c_Q/viewform?usp=publish-editor";

const ALLERGY_MAP = {
  ko: {
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
  },
  ru: {
    1: "Яйца",
    2: "Молоко",
    3: "Гречиха",
    4: "Арахис",
    5: "Соя",
    6: "Пшеница",
    7: "Скумбрия",
    8: "Крабы",
    9: "Креветки",
    10: "Свинина",
    11: "Персик",
    12: "Томаты",
    13: "Сульфиты",
    14: "Грецкий орех",
    15: "Курица",
    16: "Говядина",
    17: "Кальмар",
    18: "Моллюски (устрицы, морское ушко, мидии и т.д.)",
    19: "Кедровые орехи",
  },
};

const MEAL_TYPE_MAP = {
  ru: {
    "조식": "Завтрак",
    "중식": "Обед",
    "석식": "Ужин",
  },
};

const WEEKDAY_LABELS = {
  ko: ["일", "월", "화", "수", "목", "금", "토"],
  ru: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
};

const MONTH_LABELS_RU = [
  "янв.", "февр.", "март", "апр.", "май", "июнь",
  "июль", "авг.", "сент.", "окт.", "нояб.", "дек.",
];

const TRANSLATIONS = {
  ko: {
    pageTitle: "동성고등학교 급식 알리미",
    headerTitle: "🍽️ 동성고등학교 급식 알리미",
    settingsBtn: "⚙️ 알레르기 설정",
    langBtnLabel: "RU",
    dayViewBtn: "하루씩 보기",
    weekViewBtn: "이번 주 보기 (~수요일)",
    prevDayBtn: "◀ 어제",
    nextDayBtn: "내일 ▶",
    todayBtn: "오늘",
    qrTitle: "이 페이지 QR코드",
    qrAlt: "현재 페이지 접속 QR코드",
    feedbackTitle: "💬 의견 남기기",
    feedbackDesc: "사용하면서 불편한 점이나 개선 아이디어가 있다면 아래 설문에 남겨주세요.",
    feedbackBtn: "설문 참여하기",
    modalTitle: "내 알레르기 정보 설정",
    modalDesc: "해당하는 항목을 체크하면, 급식 메뉴에 포함된 경우 빨간색으로 표시돼요.",
    saveBtn: "저장",
    closeBtn: "닫기",
    footer: "급식 데이터 출처: 나이스(NEIS) 교육정보 개방 포털 · 서울특별시교육청 동성고등학교",
    loadingDay: "급식 정보를 불러오는 중입니다...",
    loadingWeek: "이번 주 급식 정보를 불러오는 중입니다...",
    errorLoad: "급식 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.",
    emptyDay: "이 날짜에는 등록된 급식 정보가 없어요. (주말/방학/휴업일일 수 있어요)",
    emptyWeek: "오늘부터 이번 주 수요일까지 등록된 급식 정보가 없어요.",
    allergyWarning: "⚠️ 급식에 내가 설정한 알레르기 유발 식재료가 포함되어 있어요. 메뉴를 확인해 주세요.",
    mealDefault: "급식",
  },
  ru: {
    pageTitle: "Тонсон — школьное меню",
    headerTitle: "🍽️ Школьное питание Тонсон",
    settingsBtn: "⚙️ Аллергены",
    langBtnLabel: "KO",
    dayViewBtn: "По дням",
    weekViewBtn: "На этой неделе (до среды)",
    prevDayBtn: "◀ Вчера",
    nextDayBtn: "Завтра ▶",
    todayBtn: "Сегодня",
    qrTitle: "QR-код этой страницы",
    qrAlt: "QR-код для перехода на эту страницу",
    feedbackTitle: "💬 Оставить отзыв",
    feedbackDesc: "Если у вас есть неудобства или идеи по улучшению, поделитесь ими в опросе ниже.",
    feedbackBtn: "Пройти опрос",
    modalTitle: "Настройка моих аллергенов",
    modalDesc: "Отметьте нужные пункты — соответствующие ингредиенты в меню будут выделены красным.",
    saveBtn: "Сохранить",
    closeBtn: "Закрыть",
    footer: "Источник данных о питании: открытый портал NEIS · Департамент образования Сеула, школа Тонсон",
    loadingDay: "Загрузка информации о питании...",
    loadingWeek: "Загрузка информации о питании на неделю...",
    errorLoad: "Не удалось загрузить информацию о питании. Попробуйте ещё раз позже.",
    emptyDay: "На эту дату нет данных о питании. (возможно, выходной/каникулы/нерабочий день)",
    emptyWeek: "Нет данных о питании с сегодняшнего дня до среды этой недели.",
    allergyWarning: "⚠️ В меню есть ингредиенты, которые вы отметили как аллергены. Проверьте меню.",
    mealDefault: "Питание",
  },
};

const LANG_STORAGE_KEY = "dongsung-meal-lang";
const STORAGE_KEY = "dongsung-meal-my-allergies";

const els = {};

let selectedDate = new Date();
let myAllergies = loadMyAllergies();
let viewMode = "day"; // "day" | "week"
let currentLang = loadLang(); // "ko" | "ru"

function loadLang() {
  const saved = localStorage.getItem(LANG_STORAGE_KEY);
  return saved === "ru" ? "ru" : "ko";
}

function t(key) {
  return TRANSLATIONS[currentLang][key] ?? TRANSLATIONS.ko[key] ?? key;
}

function applyLanguage() {
  document.documentElement.lang = currentLang === "ru" ? "ru" : "ko";
  document.title = t("pageTitle");

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.getAttribute("data-i18n"));
  });
  document.querySelectorAll("[data-i18n-attr-alt]").forEach((node) => {
    node.setAttribute("alt", t(node.getAttribute("data-i18n-attr-alt")));
  });

  if (els.langBtn) els.langBtn.textContent = t("langBtnLabel");
}

function setLanguage(lang) {
  currentLang = lang === "ru" ? "ru" : "ko";
  localStorage.setItem(LANG_STORAGE_KEY, currentLang);
  applyLanguage();
  buildAllergyCheckboxes();
  if (viewMode === "week") {
    loadWeekMeals();
  } else {
    loadMeals();
  }
}

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
  els.langBtn = document.getElementById("langBtn");

  els.langBtn.addEventListener("click", () => {
    setLanguage(currentLang === "ko" ? "ru" : "ko");
  });

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

  applyLanguage();
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
  els.mealContainer.innerHTML = `<p class="loading">${escapeHtml(t("loadingDay"))}</p>`;
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
    els.mealContainer.innerHTML = `<p class="error">${escapeHtml(t("errorLoad"))}</p>`;
  }
}

function renderMeals(data) {
  const rows = extractRows(data);

  if (!rows || rows.length === 0) {
    els.mealContainer.innerHTML = `<p class="empty">${escapeHtml(t("emptyDay"))}</p>`;
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
  applyDishTranslations();
}

async function loadWeekMeals() {
  els.mealContainer.innerHTML = `<p class="loading">${escapeHtml(t("loadingWeek"))}</p>`;
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
    els.mealContainer.innerHTML = `<p class="error">${escapeHtml(t("errorLoad"))}</p>`;
  }
}

function renderWeekMeals(data) {
  const rows = extractRows(data);

  if (!rows || rows.length === 0) {
    els.mealContainer.innerHTML = `<p class="empty">${escapeHtml(t("emptyWeek"))}</p>`;
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
  applyDishTranslations();
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
      return `<li class="${isWarn ? "warn" : ""}"><span class="dish-name" data-ko-name="${escapeHtml(
        dish.name
      )}">${escapeHtml(dish.name)}</span>${codeText}${isWarn ? " ⚠️" : ""}</li>`;
    })
    .join("");

  const html = `
    <article class="meal-card">
      <h3>${escapeHtml(translateMealType(row.MMEAL_SC_NM) || t("mealDefault"))}</h3>
      <ul class="dish-list">${dishItemsHtml}</ul>
      <p class="meal-meta">${escapeHtml(row.CAL_INFO || "")}</p>
    </article>
  `;

  return { html, warn };
}

function translateMealType(name) {
  if (!name) return name;
  const map = MEAL_TYPE_MAP[currentLang];
  return (map && map[name]) || name;
}

// ====== 급식 메뉴 이름 러시아어 번역 ======
const DISH_TR_STORAGE_KEY = "dongsung-meal-dish-tr-ru";
const dishTranslationCache = loadDishTranslationCache();

function loadDishTranslationCache() {
  try {
    const raw = localStorage.getItem(DISH_TR_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveDishTranslationCache() {
  try {
    localStorage.setItem(DISH_TR_STORAGE_KEY, JSON.stringify(dishTranslationCache));
  } catch {
    // 저장 공간 부족 등은 무시
  }
}

async function translateDishName(koName) {
  if (dishTranslationCache[koName]) return dishTranslationCache[koName];

  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
    koName
  )}&langpair=ko|ru`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  const translated = data?.responseData?.translatedText;
  if (!translated) throw new Error("no translation");

  dishTranslationCache[koName] = translated;
  saveDishTranslationCache();
  return translated;
}

async function applyDishTranslations() {
  if (currentLang !== "ru") return;

  const spans = [...els.mealContainer.querySelectorAll(".dish-name[data-ko-name]")];
  const uniqueNames = [...new Set(spans.map((el) => el.getAttribute("data-ko-name")))];

  await Promise.all(
    uniqueNames.map(async (name) => {
      try {
        await translateDishName(name);
      } catch (err) {
        console.error("dish translation failed:", name, err);
      }
    })
  );

  spans.forEach((el) => {
    const koName = el.getAttribute("data-ko-name");
    const translated = dishTranslationCache[koName];
    if (translated) el.textContent = translated;
  });
}

function showAllergyWarning(anyWarn) {
  if (anyWarn && myAllergies.size > 0) {
    els.allergyWarning.textContent = t("allergyWarning");
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

function formatYmdLabel(ymd) {
  const y = Number(ymd.slice(0, 4));
  const m = Number(ymd.slice(4, 6));
  const d = Number(ymd.slice(6, 8));
  const date = new Date(y, m - 1, d);
  const weekday = WEEKDAY_LABELS[currentLang][date.getDay()];

  if (currentLang === "ru") {
    return `${d} ${MONTH_LABELS_RU[m - 1]} (${weekday})`;
  }
  return `${m}월 ${d}일 (${weekday})`;
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
          .filter((n) => Number.isInteger(n) && ALLERGY_MAP.ko[n]);
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
  els.allergyList.innerHTML = Object.entries(ALLERGY_MAP[currentLang])
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
