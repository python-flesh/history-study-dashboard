const STORAGE_KEY = "muc-history-dashboard-v1";

const subjectMeta = {
  history: { label: "历史专业课", color: "var(--history)" },
  english: { label: "英语一", color: "var(--english)" },
  politics: { label: "政治", color: "var(--politics)" },
  general: { label: "其他", color: "var(--general)" },
};

const monthNames = [
  "一月",
  "二月",
  "三月",
  "四月",
  "五月",
  "六月",
  "七月",
  "八月",
  "九月",
  "十月",
  "十一月",
  "十二月",
];

const weekdayNames = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
const weekdayShort = ["日", "一", "二", "三", "四", "五", "六"];

const junePlan = [
  {
    index: "01",
    range: "6月1日 - 6月7日",
    title: "搭框架，先跑起来",
    items: [
      "历史：长孙博中国古代史，先推进先秦至秦汉；建立朝代整理模板。",
      "英语：真题阅读精读 6 篇，开始按五类错因做标记。",
      "政治：启动精讲与肖 1000 题，单选、多选正确率分开记录。",
      "周末：检查实际耗时，避免把日程排得过满。",
    ],
  },
  {
    index: "02",
    range: "6月8日 - 6月14日",
    title: "按模板持续推进",
    items: [
      "历史：推进魏晋南北朝至隋唐；整理制度沿革和民族关系。",
      "英语：真题阅读精读 6 篇；归纳反复出现的词汇和长难句。",
      "政治：按章节继续肖 1000 题；订正时写明多选题错因。",
      "输出：完成文言文翻译、史料题提纲、论述题提纲各 1 次。",
    ],
  },
  {
    index: "03",
    range: "6月15日 - 6月21日",
    title: "开始做纵向比较",
    items: [
      "历史：推进宋元；比较中央与地方权力、赋税制度和民族关系变化。",
      "英语：真题阅读精读 6 篇；周末回看本月错题。",
      "政治：争取达到首轮约四成进度；集中整理一个大模块的易混点。",
      "选择题：视情况购入刷题 APP，用零散时间补充练习。",
    ],
  },
  {
    index: "04",
    range: "6月22日 - 6月30日",
    title: "收束中国古代史",
    items: [
      "历史：推进明清并完成中国古代史首轮回顾；补齐四类专题表格。",
      "英语：保持每日单词与阅读；总结六月最常见的两个失分原因。",
      "政治：首轮进度达到约一半，为七月底完成第一遍留出空间。",
      "复盘：为七月确定中国近现代史和世界古代史的推进顺序。",
    ],
  },
];

const routePlan = [
  {
    month: "06",
    kicker: "建立节奏",
    title: "中国古代史为主，三科同时启动",
    items: [
      "历史：以长孙博教材搭建中国古代史时间线和专题框架。",
      "英语：每天单词与真题精读，先把阅读错误原因看清。",
      "政治：精讲配合肖 1000 题，开始第一轮。",
    ],
  },
  {
    month: "07",
    kicker: "完成首轮的一大段",
    title: "中国近现代史 + 世界古代史",
    items: [
      "历史：阶段化掌握中国近现代史；世界古代史按地域梳理。",
      "英语：继续真题阅读与长难句，保持每周复盘。",
      "政治：七月底完成肖 1000 题第一轮。",
    ],
  },
  {
    month: "08",
    kicker: "一轮收束",
    title: "世界近现代史 + 全科补漏",
    items: [
      "历史：围绕资本主义发展、世界体系和国际格局完成世界近现代史。",
      "英语：加入翻译与新题型，二刷阅读错题。",
      "政治：二刷错题和薄弱章节，重点处理多选题。",
    ],
  },
  {
    month: "09",
    kicker: "输出强化",
    title: "系统练习史料题和论述题",
    items: [
      "历史：开始完整论述题训练，形成自己的表达和论证素材。",
      "英语：限时完成阅读模块，补完形、新题型和翻译。",
      "政治：做历年真题和不同老师的模拟练习题。",
    ],
  },
  {
    month: "10",
    kicker: "记忆成型",
    title: "框架背诵与作文训练",
    items: [
      "历史：专题背诵、名词解释、史料题和论述题滚动训练。",
      "英语：每周练习大小作文各 1 篇，整理可复用表达。",
      "政治：加入冲刺背诵手册，保持选择题手感。",
    ],
  },
  {
    month: "11",
    kicker: "模拟提速",
    title: "整套训练与肖八",
    items: [
      "历史：按考试节奏完成模拟，查缺补漏。",
      "英语：每周完成 1 套模拟，集中修补短板。",
      "政治：肖八重点做选择题，主观题看思路；同步复习时政。",
    ],
  },
  {
    month: "12",
    kicker: "稳定落地",
    title: "预留真题模拟与肖四背诵",
    items: [
      "历史：回看高频专题和易错点，维持输出手感。",
      "英语：使用预留真题完整模拟，复习作文框架和错词。",
      "政治：肖四选择题全部完成，主观题集中背诵。",
    ],
  },
];

let state = loadState();
let selectedDate = toDateKey(new Date());

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return stored && stored.days && stored.reviews ? stored : { days: {}, reviews: {} };
  } catch {
    return { days: {}, reviews: {} };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function fromDateKey(key) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function moveDate(key, amount) {
  const date = fromDateKey(key);
  date.setDate(date.getDate() + amount);
  return toDateKey(date);
}

function formatChineseDate(key) {
  const date = fromDateKey(key);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 · ${weekdayNames[date.getDay()]}`;
}

function getDefaultTasks(key) {
  const date = fromDateKey(key);
  const weekday = date.getDay();
  const topicRotation = ["政治制度", "赋税改革", "民族关系", "文化"];
  const topic = topicRotation[(date.getDate() - 1) % topicRotation.length];
  const isSunday = weekday === 0;
  const historyOutput = {
    2: "文言文翻译：完成 1 段并核对关键词",
    4: "史料分析：为 1 道题写出答题提纲",
    6: "论述训练：为 1 道题写出三级提纲",
  };

  return [
    makeTask("history", isSunday ? "本周历史补漏：复述时间线并补齐薄弱处" : "长孙博教材：按时间顺序推进并标记关键史实", isSunday ? 90 : 150),
    makeTask("history", isSunday ? "本周专题回顾：检查整理表是否完整" : `专题梳理：${topic}，记录沿袭、变化与横向比较`, 90),
    makeTask("history", historyOutput[weekday] || "历史复盘：背诵当日框架并口头复述", historyOutput[weekday] ? 45 : 60),
    makeTask("english", "单词复习：巩固高频词与前一天生词", 40),
    makeTask("english", isSunday ? "英语周复盘：回看阅读错因和高频生词" : "真题阅读：精读 1 篇，标记错因并拆解长难句", isSunday ? 60 : 75),
    makeTask("politics", isSunday ? "政治周复盘：整理易混点与多选题错因" : "精讲教材 + 肖 1000 题：推进当前章节", isSunday ? 60 : 75),
    makeTask("politics", "政治订正：错题回看教材，单独标注多选题原因", 20),
  ];
}

function makeTask(subject, title, minutes, custom = false) {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    subject,
    title,
    minutes,
    done: false,
    custom,
  };
}

function ensureDay(key) {
  if (!state.days[key]) {
    state.days[key] = {
      tasks: getDefaultTasks(key),
      note: "",
      checkedIn: false,
    };
    saveState();
  }
  return state.days[key];
}

function dayStats(key) {
  const day = state.days[key];
  if (!day || !day.tasks.length) {
    return { total: 0, done: 0, percent: 0, completedMinutes: 0 };
  }
  const doneTasks = day.tasks.filter((task) => task.done);
  return {
    total: day.tasks.length,
    done: doneTasks.length,
    percent: Math.round((doneTasks.length / day.tasks.length) * 100),
    completedMinutes: doneTasks.reduce((sum, task) => sum + Number(task.minutes || 0), 0),
  };
}

function calculateStreak() {
  let cursor = new Date();
  const todayKey = toDateKey(cursor);
  if (!state.days[todayKey]?.checkedIn) {
    cursor.setDate(cursor.getDate() - 1);
  }

  let streak = 0;
  while (state.days[toDateKey(cursor)]?.checkedIn) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function getWeekStart(key) {
  const date = fromDateKey(key);
  const diff = date.getDay() === 0 ? -6 : 1 - date.getDay();
  date.setDate(date.getDate() + diff);
  return date;
}

function weekStats(key) {
  const start = getWeekStart(key);
  let total = 0;
  let done = 0;
  for (let offset = 0; offset < 7; offset += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + offset);
    const stats = dayStats(toDateKey(date));
    total += stats.total;
    done += stats.done;
  }
  return total ? Math.round((done / total) * 100) : 0;
}

function renderToday() {
  const day = ensureDay(selectedDate);
  const stats = dayStats(selectedDate);
  const date = fromDateKey(selectedDate);

  document.querySelector("#heroMonth").textContent = monthNames[date.getMonth()];
  document.querySelector("#heroDay").textContent = String(date.getDate()).padStart(2, "0");
  document.querySelector("#selectedDateButton").textContent = formatChineseDate(selectedDate);
  document.querySelector("#streakValue").textContent = calculateStreak();
  document.querySelector("#completionValue").textContent = stats.percent;
  document.querySelector("#completedMinutes").textContent = stats.completedMinutes;
  document.querySelector("#weekCompletionValue").textContent = weekStats(selectedDate);
  document.querySelector("#taskProgressText").textContent = `${stats.done} / ${stats.total}`;
  document.querySelector("#taskProgressBar").style.width = `${stats.percent}%`;
  document.querySelector("#dailyNote").value = day.note || "";

  renderWeekStrip();
  renderTaskGroups(day.tasks);
  renderCheckin(day);
}

function renderWeekStrip() {
  const container = document.querySelector("#weekStrip");
  const start = getWeekStart(selectedDate);
  container.innerHTML = "";

  for (let offset = 0; offset < 7; offset += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + offset);
    const key = toDateKey(date);
    const stats = dayStats(key);
    const day = state.days[key];
    const button = document.createElement("button");
    button.type = "button";
    button.className = `day-chip${key === selectedDate ? " selected" : ""}`;
    button.dataset.date = key;
    button.setAttribute("aria-label", formatChineseDate(key));
    const dotClass = day?.checkedIn || stats.percent === 100 ? "done" : stats.percent > 0 ? "started" : "";
    button.innerHTML = `
      <small>${weekdayShort[date.getDay()]}</small>
      <strong>${String(date.getDate()).padStart(2, "0")}</strong>
      <span class="day-dot ${dotClass}"></span>
    `;
    container.append(button);
  }
}

function renderTaskGroups(tasks) {
  const container = document.querySelector("#taskGroups");
  container.innerHTML = "";

  Object.entries(subjectMeta).forEach(([subject, meta]) => {
    const subjectTasks = tasks.filter((task) => task.subject === subject);
    if (!subjectTasks.length) return;

    const group = document.createElement("section");
    group.className = "task-group";
    group.innerHTML = `
      <h4 class="task-group-title">
        <span class="subject-dot" style="background:${meta.color}"></span>
        ${meta.label}
      </h4>
      <div class="task-list"></div>
    `;

    const list = group.querySelector(".task-list");
    subjectTasks.forEach((task) => {
      const item = document.createElement("div");
      item.className = `task-item${task.done ? " done" : ""}`;
      item.innerHTML = `
        <input type="checkbox" data-task-id="${task.id}" ${task.done ? "checked" : ""} aria-label="${escapeHtml(task.title)}" />
        <span class="task-title">${escapeHtml(task.title)}</span>
        <span class="task-minutes">${task.minutes} 分钟</span>
        ${task.custom ? `<button class="delete-task" type="button" data-delete-task="${task.id}" aria-label="删除任务">×</button>` : ""}
      `;
      list.append(item);
    });

    container.append(group);
  });
}

function renderCheckin(day) {
  const status = document.querySelector("#checkinStatus");
  const button = document.querySelector("#checkinButton");
  if (day.checkedIn) {
    status.textContent = "今天已经完成打卡。稳稳地收工。";
    status.classList.add("checked-in");
    button.textContent = "取消今日打卡";
  } else {
    status.textContent = "完成任务后，记得给今天盖个章。";
    status.classList.remove("checked-in");
    button.textContent = "完成今日打卡";
  }
}

function renderJunePlan() {
  document.querySelector("#junePlan").innerHTML = junePlan
    .map(
      (week) => `
        <article class="week-plan-card">
          <div class="week-card-header">
            <span class="week-index">${week.index}</span>
            <span class="week-range">${week.range}</span>
          </div>
          <h3>${week.title}</h3>
          <ul>${week.items.map((item) => `<li>${item}</li>`).join("")}</ul>
        </article>
      `,
    )
    .join("");
}

function renderRoutePlan() {
  document.querySelector("#routeTimeline").innerHTML = routePlan
    .map(
      (stage) => `
        <article class="timeline-item">
          <div>
            <p class="timeline-month">${stage.month} 月</p>
            <p class="timeline-kicker">${stage.kicker}</p>
          </div>
          <div>
            <h3>${stage.title}</h3>
            <ul>${stage.items.map((item) => `<li>${item}</li>`).join("")}</ul>
          </div>
        </article>
      `,
    )
    .join("");
}

function getCurrentWeekValue() {
  const now = new Date();
  const date = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  const day = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
  return `${date.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

function renderReviewHistory() {
  const container = document.querySelector("#reviewHistory");
  const reviews = Object.values(state.reviews).sort((a, b) => b.week.localeCompare(a.week));
  if (!reviews.length) {
    container.innerHTML = `<p class="empty-state">还没有复盘记录。第一周结束后，再来写下真实感受。</p>`;
    return;
  }
  container.innerHTML = reviews
    .map(
      (review) => `
        <article class="review-entry">
          <div class="review-entry-heading">
            <h4>${escapeHtml(review.week)}</h4>
            <button class="delete-task" type="button" data-delete-review="${escapeHtml(review.week)}">删除</button>
          </div>
          ${review.wins ? `<p><strong>做得不错：</strong>${escapeHtml(review.wins)}</p>` : ""}
          ${review.problems ? `<p><strong>需要解决：</strong>${escapeHtml(review.problems)}</p>` : ""}
          ${review.next ? `<p><strong>下周调整：</strong>${escapeHtml(review.next)}</p>` : ""}
        </article>
      `,
    )
    .join("");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach((item) => item.classList.remove("active"));
    document.querySelectorAll(".view").forEach((view) => view.classList.remove("active"));
    button.classList.add("active");
    document.querySelector(`#view-${button.dataset.view}`).classList.add("active");
  });
});

document.querySelector("#previousDay").addEventListener("click", () => {
  selectedDate = moveDate(selectedDate, -1);
  renderToday();
});

document.querySelector("#nextDay").addEventListener("click", () => {
  selectedDate = moveDate(selectedDate, 1);
  renderToday();
});

document.querySelector("#backToToday").addEventListener("click", () => {
  selectedDate = toDateKey(new Date());
  renderToday();
});

document.querySelector("#weekStrip").addEventListener("click", (event) => {
  const button = event.target.closest("[data-date]");
  if (!button) return;
  selectedDate = button.dataset.date;
  renderToday();
});

document.querySelector("#taskGroups").addEventListener("change", (event) => {
  const checkbox = event.target.closest("[data-task-id]");
  if (!checkbox) return;
  const task = ensureDay(selectedDate).tasks.find((item) => item.id === checkbox.dataset.taskId);
  if (!task) return;
  task.done = checkbox.checked;
  saveState();
  renderToday();
});

document.querySelector("#taskGroups").addEventListener("click", (event) => {
  const button = event.target.closest("[data-delete-task]");
  if (!button) return;
  const day = ensureDay(selectedDate);
  day.tasks = day.tasks.filter((task) => task.id !== button.dataset.deleteTask);
  saveState();
  renderToday();
});

document.querySelector("#addTaskForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const titleInput = document.querySelector("#newTaskTitle");
  const minutesInput = document.querySelector("#newTaskMinutes");
  const subjectInput = document.querySelector("#newTaskSubject");
  const title = titleInput.value.trim();
  if (!title) return;
  ensureDay(selectedDate).tasks.push(makeTask(subjectInput.value, title, Number(minutesInput.value) || 30, true));
  titleInput.value = "";
  saveState();
  renderToday();
});

document.querySelector("#dailyNote").addEventListener("input", (event) => {
  ensureDay(selectedDate).note = event.target.value;
  saveState();
});

document.querySelector("#checkinButton").addEventListener("click", () => {
  const day = ensureDay(selectedDate);
  day.checkedIn = !day.checkedIn;
  saveState();
  renderToday();
});

document.querySelector("#saveReview").addEventListener("click", () => {
  const week = document.querySelector("#reviewWeek").value;
  if (!week) return;
  state.reviews[week] = {
    week,
    wins: document.querySelector("#reviewWins").value.trim(),
    problems: document.querySelector("#reviewProblems").value.trim(),
    next: document.querySelector("#reviewNext").value.trim(),
  };
  saveState();
  document.querySelector("#reviewSaveStatus").textContent = "已保存。下周继续按真实情况调整。";
  renderReviewHistory();
});

document.querySelector("#reviewHistory").addEventListener("click", (event) => {
  const button = event.target.closest("[data-delete-review]");
  if (!button) return;
  delete state.reviews[button.dataset.deleteReview];
  saveState();
  document.querySelector("#reviewSaveStatus").textContent = "复盘记录已删除。";
  renderReviewHistory();
});

document.querySelector("#exportData").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `雪山书房备份-${toDateKey(new Date())}.json`;
  link.click();
  URL.revokeObjectURL(url);
});

document.querySelector("#importData").addEventListener("change", (event) => {
  const [file] = event.target.files;
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const imported = JSON.parse(reader.result);
      if (!imported.days || !imported.reviews) throw new Error("invalid data");
      state = imported;
      saveState();
      renderToday();
      renderReviewHistory();
      document.querySelector("#reviewSaveStatus").textContent = "备份已导入。";
    } catch {
      document.querySelector("#reviewSaveStatus").textContent = "导入失败：请选择由本页面导出的 JSON 备份。";
    }
  });
  reader.readAsText(file);
});

document.querySelector("#reviewWeek").value = getCurrentWeekValue();
renderJunePlan();
renderRoutePlan();
renderReviewHistory();
renderToday();
