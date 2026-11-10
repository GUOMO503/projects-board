const STAGES = [
  {
    id: 1, icon: '📐', bg: '#fdf2e6', accent: '#c9863c',
    zh: { title: '土地准备', bullets: ['测量放线', '场地平整', '开挖地基'], desc: '根据建筑图纸确定房屋位置，完成场地平整和基坑开挖。' },
    en: { title: 'Site Prep', bullets: ['Survey', 'Grading', 'Excavation'], desc: 'Locate the house per drawings; grade the site and excavate the foundation.' },
  },
  {
    id: 2, icon: '🧱', bg: '#eceff2', accent: '#7d8a99',
    zh: { title: '地基施工', bullets: ['混凝土基础', '地下室墙体', '防水层', '排水系统'], desc: '浇筑混凝土基础，建立地下室墙体，做好防水和排水，抵御冻土和地下水。' },
    en: { title: 'Foundation', bullets: ['Footing', 'Foundation Wall', 'Waterproofing', 'Weeping Tile'], desc: 'Pour concrete footings and foundation walls; apply waterproofing and drainage.' },
  },
  {
    id: 3, icon: '🪵', bg: '#f6ecd9', accent: '#b9824f',
    zh: { title: '木结构主体', bullets: ['地梁系统', '承重墙', '楼板系统', '屋架系统'], desc: '工厂预制木材和龙架运至现场组装，形成坚固的主体结构。' },
    en: { title: 'Framing', bullets: ['Floor Joists', 'Walls', 'Subfloor', 'Roof Trusses'], desc: 'Assemble prefabricated lumber and trusses on site to form the structural frame.' },
  },
  {
    id: 4, icon: '🏠', bg: '#e9eff6', accent: '#5b7fa6',
    zh: { title: '房屋封闭', bullets: ['OSB结构板', '防水透气膜', '门窗安装', '屋面防水及沥青瓦'], desc: '完成外墙结构板、门窗、防水透气膜和屋面工程，使建筑达到防风雨状态。' },
    en: { title: 'Weatherproofing', bullets: ['OSB Sheathing', 'House Wrap', 'Windows & Doors', 'Roofing'], desc: 'Install sheathing, house wrap, windows, doors and roofing to make the building weather-tight.' },
  },
  {
    id: 5, icon: '🏡', bg: '#edf3ed', accent: '#7a9b76',
    zh: { title: '外立面施工', bullets: ['挂板', '纤维水泥板', '砖', '文化石'], desc: '安装外墙装饰材料，提升美观性和耐久性。' },
    en: { title: 'Exterior Cladding', bullets: ['Vinyl Siding', 'Fiber Cement', 'Brick', 'Stone Veneer'], desc: 'Install exterior cladding materials for aesthetics and durability.' },
  },
  {
    id: 6, icon: '🔌', bg: '#fdf6e0', accent: '#d9a514',
    zh: { title: '机电安装', bullets: ['电气', '给排水', '暖通', '燃气'], desc: '在墙体和楼板封闭前完成所有管线和线路的预埋安装。' },
    en: { title: 'Rough-in MEP', bullets: ['Electrical', 'Plumbing', 'HVAC', 'Gas'], desc: 'Run all rough-in wiring, pipes and ducts before walls are closed.' },
  },
  {
    id: 7, icon: '🧊', bg: '#e6f4fb', accent: '#5fb3d9',
    zh: { title: '保温施工', bullets: ['墙体保温 R22-R24', '阁楼保温 R50-R60'], desc: '安装墙体和阁楼保温材料，提升能效，适应寒冷气候。' },
    en: { title: 'Insulation', bullets: ['Wall R22-R24', 'Attic R50-R60'], desc: 'Install wall and attic insulation for energy efficiency in cold climate.' },
  },
  {
    id: 8, icon: '🪚', bg: '#f0f1f3', accent: '#9aa5b1',
    zh: { title: '石膏板安装', bullets: ['石膏板安装', '接缝处理', '打磨'], desc: '安装石膏板，处理接缝并打磨平整，为后续装修做准备。' },
    en: { title: 'Drywall', bullets: ['Drywall', 'Taping', 'Sanding'], desc: 'Hang drywall, tape joints and sand smooth in preparation for finishing.' },
  },
  {
    id: 9, icon: '🛋️', bg: '#faf1e3', accent: '#c2884a',
    zh: { title: '室内装修', bullets: ['地板', '橱柜', '油漆', '卫浴', '灯具'], desc: '完成地板、橱柜、油漆、卫浴和灯具等全部室内装修工程。' },
    en: { title: 'Interior Finishing', bullets: ['Flooring', 'Cabinets', 'Painting', 'Bathroom', 'Lighting'], desc: 'Complete all interior finishes: flooring, cabinets, paint, bathrooms and lighting.' },
  },
  {
    id: 10, icon: '🔑', bg: '#fdf6e0', accent: '#e0b13c',
    zh: { title: '验收入住', bullets: ['政府验收', '领取入住许可', '入住新家'], desc: '通过验收后，取得入住许可，完成交房，正式入住新家。' },
    en: { title: 'Occupancy', bullets: ['Inspection', 'Occupancy Permit', 'Move In'], desc: 'Pass inspections, obtain occupancy permit and hand over the keys.' },
  },
];

/* ---------- 语言 ---------- */

let lang = (() => { const v = localStorage.getItem('lang'); return v === 'zh' || v === 'en' ? v : 'bilingual'; })();

const UI = {
  pageTitle:    { zh: '施工阶段看板', en: 'Construction Stage Board' },
  newWeek:      { zh: '新建本周', en: 'New Week' },
  deleteWeek:   { zh: '删除本周', en: 'Delete' },
  export:       { zh: '导出本周', en: 'Export' },
  import:       { zh: '导入本周', en: 'Import' },
  addCard:      { zh: '+ 新建卡片', en: '+ Add Card' },
  noProjects:   { zh: '暂无项目', en: 'No projects' },
  thisWeek:     { zh: '（本周）', en: ' (This Week)', bi: '（本周 This Week）' },
  noData:       { zh: '暂无数据 — 点击「新建本周」', en: 'No data — click "New Week"' },
  offline:      { zh: '⚠ 离线 — 修改未保存', en: '⚠ Offline — changes not saved', bi: '⚠ Offline — changes not saved 未连接' },
  newCardTitle: { zh: '新建项目卡片', en: 'New Card', bi: '新建项目卡片 New Card' },
  editCardTitle:{ zh: '编辑项目卡片', en: 'Edit Card', bi: '编辑项目卡片 Edit Card' },
  labelName:    { zh: '项目名称', en: 'Name' },
  labelSummary: { zh: '本周摘要', en: 'Weekly Update' },
  phSummary:    { zh: '一句话描述本周进展', en: 'Weekly progress note', bi: '一句话描述本周进展 / Weekly progress note' },
  labelLink:    { zh: '项目链接（可选）', en: 'Link (optional)', bi: '项目链接 Link（可选 optional）' },
  labelStage:   { zh: '所属阶段', en: 'Stage' },
  labelPhotos:  { zh: '照片', en: 'Photos' },
  deleteCard:   { zh: '删除卡片', en: 'Delete', bi: '删除卡片 Delete' },
  cancel:       { zh: '取消', en: 'Cancel', bi: '取消 Cancel' },
  save:         { zh: '保存', en: 'Save', bi: '保存 Save' },
};

function s(key) {
  const e = UI[key];
  if (!e) return key;
  if (lang === 'zh') return e.zh;
  if (lang === 'en') return e.en;
  return e.bi ?? `${e.zh} ${e.en}`;
}

function stageText(stage) {
  const zh = stage.zh, en = stage.en;
  if (lang === 'zh') return { title: zh.title, bullets: zh.bullets, desc: zh.desc };
  if (lang === 'en') return { title: en.title, bullets: en.bullets, desc: en.desc };
  return {
    title: `${zh.title} ${en.title}`,
    bullets: zh.bullets.map((b, i) => `${b} ${en.bullets[i]}`),
    desc: `${zh.desc}${en.desc}`,
  };
}

function applyLang() {
  document.title = s('pageTitle');
  document.querySelector('.page-header h1').textContent = s('pageTitle');
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = s(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = s(el.dataset.i18nPh); });
  const langSelect = document.getElementById('langSelect');
  if (langSelect) langSelect.value = lang;
  renderAll();
}

const board = document.getElementById('board');
const weekSelect = document.getElementById('weekSelect');
const serverStatus = document.getElementById('serverStatus');
const newWeekBtn = document.getElementById('newWeekBtn');
const deleteWeekBtn = document.getElementById('deleteWeekBtn');
const exportBtn = document.getElementById('exportBtn');
const importInput = document.getElementById('importInput');

const isAdmin = new URLSearchParams(location.search).has('edit');

const cardDialog = document.getElementById('cardDialog');
const cardForm = document.getElementById('cardForm');
const dialogTitle = document.getElementById('dialogTitle');
const fieldName = document.getElementById('fieldName');
const fieldSummary = document.getElementById('fieldSummary');
const fieldLink = document.getElementById('fieldLink');
const fieldStage = document.getElementById('fieldStage');
const fieldPhotos = document.getElementById('fieldPhotos');
const photoPreview = document.getElementById('photoPreview');
const deleteCardBtn = document.getElementById('deleteCardBtn');
const cancelBtn = document.getElementById('cancelBtn');

const photoDialog = document.getElementById('photoDialog');
const photoDialogImg = document.getElementById('photoDialogImg');

let allData = {};
let allWeeks = [];   // sorted week keys, populated via shallow load
let currentWeek = null;
let editingProjectId = null; // null = 新建
let pendingPhotos = []; // dataURL 数组，编辑中的照片列表

function getISOWeekKey(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = (d.getUTCDay() + 6) % 7;
  d.setUTCDate(d.getUTCDate() - dayNum + 3);
  const firstThursday = new Date(Date.UTC(d.getUTCFullYear(), 0, 4));
  const week = 1 + Math.round(((d - firstThursday) / 86400000 - 3 + ((firstThursday.getUTCDay() + 6) % 7)) / 7);
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}

// 数据存储在 Firebase Realtime Database，所有人共享同一份数据
const FIREBASE_URL = 'https://projects-board-28ac0-default-rtdb.firebaseio.com';
const DATA_URL = `${FIREBASE_URL}/board.json`;

let serverAvailable = true;
let lastSaveTime = 0;
let saveInFlight = false;
let initialLoadOk = false; // 初始加载成功前禁止写入，避免用残缺本地数据覆盖云端

async function loadWeekList() {
  try {
    const res = await fetch(`${FIREBASE_URL}/board.json?shallow=true`, { cache: 'no-store' });
    if (!res.ok) throw new Error('加载失败');
    serverAvailable = true;
    const data = await res.json();
    return data ? Object.keys(data).sort() : [];
  } catch (err) {
    serverAvailable = false;
    console.error('周列表加载失败:', err);
    return [];
  }
}

async function loadWeekData(week) {
  try {
    const res = await fetch(`${FIREBASE_URL}/board/${week}.json`, { cache: 'no-store' });
    if (!res.ok) throw new Error('加载失败');
    serverAvailable = true;
    const data = await res.json();
    const raw = data || [];
    return Array.isArray(raw) ? raw : Object.values(raw);
  } catch (err) {
    serverAvailable = false;
    console.error(`${week} 加载失败:`, err);
    return null;
  }
}

async function saveData() {
  if (!initialLoadOk) {
    console.error('拒绝保存：初始数据未加载成功，避免用残缺数据覆盖云端 / Save blocked: initial load not confirmed');
    serverAvailable = false;
    renderWeekSelect();
    return;
  }
  if (!currentWeek) return;
  lastSaveTime = Date.now();
  saveInFlight = true;
  try {
    const res = await fetch(`${FIREBASE_URL}/board/${currentWeek}.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(allData[currentWeek]),
    });
    if (!res.ok) throw new Error('保存失败');
    serverAvailable = true;
  } catch (err) {
    serverAvailable = false;
    console.error('保存失败:', err);
    renderWeekSelect();
  } finally {
    saveInFlight = false;
    lastSaveTime = Date.now();
  }
}

async function deleteWeekFromFirebase(week) {
  lastSaveTime = Date.now();
  saveInFlight = true;
  try {
    const res = await fetch(`${FIREBASE_URL}/board/${week}.json`, { method: 'DELETE' });
    if (!res.ok) throw new Error('删除失败');
    serverAvailable = true;
  } catch (err) {
    serverAvailable = false;
    console.error('删除失败:', err);
    renderWeekSelect();
  } finally {
    saveInFlight = false;
    lastSaveTime = Date.now();
  }
}

function uid() {
  return 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = String(str ?? '');
  return div.innerHTML;
}

/* ---------- 渲染 ---------- */

function renderAll() {
  renderWeekSelect();
  renderBoard();
}

function renderWeekSelect() {
  const thisWeek = getISOWeekKey(new Date());
  const weeks = allWeeks;
  weekSelect.innerHTML = weeks.length
    ? weeks.map((w) => `<option value="${w}">${w}${w === thisWeek ? s('thisWeek') : ''}</option>`).join('')
    : `<option value="">${s('noData')}</option>`;
  if (currentWeek) weekSelect.value = currentWeek;
  weekSelect.disabled = weeks.length === 0;
  newWeekBtn.disabled = !initialLoadOk;
  deleteWeekBtn.disabled = !currentWeek || !initialLoadOk;
  serverStatus.textContent = serverAvailable ? '' : s('offline');
}

function renderBoard() {
  board.innerHTML = '';
  const raw = currentWeek ? (allData[currentWeek] || []) : [];
  const projects = Array.isArray(raw) ? raw : Object.values(raw);

  for (const stage of STAGES) {
    const card = document.createElement('section');
    card.className = 'stage-card';
    card.style.setProperty('--stage-bg', stage.bg);
    card.style.setProperty('--stage-accent', stage.accent);
    card.dataset.icon = stage.icon || '';

    const { title, bullets, desc } = stageText(stage);
    const header = document.createElement('div');
    header.className = 'stage-header';
    header.innerHTML = `
      <span class="stage-number">${stage.id}</span>
      <span class="stage-title">${title}</span>
    `;
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'stage-toggle';
    toggleBtn.textContent = '▸';
    toggleBtn.title = '展开/折叠 Expand/Collapse';
    header.appendChild(toggleBtn);

    if (isAdmin) {
      const addBtn = document.createElement('button');
      addBtn.className = 'add-card-btn';
      addBtn.textContent = s('addCard');
      addBtn.disabled = !currentWeek;
      addBtn.addEventListener('click', () => openCardDialog({ mode: 'add', stageId: stage.id }));
      header.appendChild(addBtn);
    }
    card.appendChild(header);

    const infoWrap = document.createElement('div');
    infoWrap.className = 'stage-info';

    if (bullets.length) {
      const bulletsEl = document.createElement('div');
      bulletsEl.className = 'stage-bullets';
      bulletsEl.innerHTML = bullets.map((b) => `<span>● ${escapeHtml(b)}</span>`).join('');
      infoWrap.appendChild(bulletsEl);
    }

    if (desc) {
      const descEl = document.createElement('div');
      descEl.className = 'stage-desc';
      descEl.textContent = desc;
      infoWrap.appendChild(descEl);
    }

    const lsKey = `stageOpen_${stage.id}`;
    if (localStorage.getItem(lsKey) === '1') {
      infoWrap.classList.add('open');
      toggleBtn.classList.add('open');
    }
    toggleBtn.addEventListener('click', () => {
      const open = infoWrap.classList.toggle('open');
      toggleBtn.classList.toggle('open', open);
      try { localStorage.setItem(lsKey, open ? '1' : '0'); } catch (_) {}
    });

    card.appendChild(infoWrap);


    const list = document.createElement('div');
    list.className = 'pin-list';
    list.dataset.stageId = stage.id;
    attachDropEvents(list);
    card.appendChild(list);

    const stageProjects = projects.filter((p) => p.stageId === stage.id);
    if (stageProjects.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'pin-empty';
      empty.textContent = s('noProjects');
      list.appendChild(empty);
    } else {
      for (const p of stageProjects) {
        list.appendChild(buildPinCard(p));
      }
    }

    board.appendChild(card);
  }
}

function buildPinCard(project) {
  const el = document.createElement('div');
  el.className = 'pin-card';
  el.draggable = isAdmin;
  el.dataset.id = project.id;

  const top = document.createElement('div');
  top.className = 'pin-top';

  const nameWrap = document.createElement('div');
  nameWrap.className = 'pin-name';
  if (project.link) {
    nameWrap.innerHTML = `<a href="${escapeHtml(project.link)}" target="_blank" rel="noopener noreferrer">${escapeHtml(project.name)}</a>`;
  } else {
    nameWrap.textContent = project.name;
  }
  top.appendChild(nameWrap);

  if (isAdmin) {
    const editBtn = document.createElement('button');
    editBtn.className = 'pin-edit-btn';
    editBtn.textContent = '✎';
    editBtn.title = '编辑 Edit';
    editBtn.addEventListener('click', () => openCardDialog({ mode: 'edit', project }));
    top.appendChild(editBtn);
  }

  el.appendChild(top);

  if (project.summary) {
    const summary = document.createElement('div');
    summary.className = 'pin-summary';
    summary.textContent = project.summary;
    el.appendChild(summary);
  }

  if (project.photos && project.photos.length) {
    const photos = document.createElement('div');
    photos.className = 'pin-photos';
    project.photos.forEach((src, idx) => {
      const img = document.createElement('img');
      img.src = src;
      img.addEventListener('click', () => openPhotoDialog(project.photos, idx));
      photos.appendChild(img);
    });
    el.appendChild(photos);
  }

  el.addEventListener('dragstart', () => el.classList.add('dragging'));
  el.addEventListener('dragend', () => {
    el.classList.remove('dragging');
    syncOrderFromDOM();
  });

  return el;
}


weekSelect.addEventListener('change', async () => {
  const selected = weekSelect.value;
  currentWeek = selected || null;
  if (currentWeek && !allData[currentWeek]) {
    serverStatus.textContent = '…';
    const data = await loadWeekData(currentWeek);
    if (data !== null) allData[currentWeek] = data;
    serverStatus.textContent = serverAvailable ? '' : s('offline');
  }
  renderBoard();
});

/* ---------- 拖拽 ---------- */

function attachDropEvents(list) {
  list.addEventListener('dragover', (e) => {
    e.preventDefault();
    list.classList.add('drag-over');
    const dragging = document.querySelector('.pin-card.dragging');
    if (!dragging) return;

    // 如果列表当前只有“暂无项目"占位，先清空
    const placeholder = list.querySelector('.pin-empty');
    if (placeholder) placeholder.remove();

    const after = getDragAfterElement(list, e.clientY);
    if (after == null) {
      list.appendChild(dragging);
    } else {
      list.insertBefore(dragging, after);
    }
  });

  list.addEventListener('dragleave', () => list.classList.remove('drag-over'));

  list.addEventListener('drop', (e) => {
    e.preventDefault();
    list.classList.remove('drag-over');
  });
}

function getDragAfterElement(container, y) {
  const els = [...container.querySelectorAll('.pin-card:not(.dragging)')];
  return els.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset, element: child };
    }
    return closest;
  }, { offset: Number.NEGATIVE_INFINITY, element: null }).element;
}

// 拖拽结束后，根据 DOM 当前顺序和所属区块重建数据数组
function syncOrderFromDOM() {
  if (!currentWeek) return;
  const projects = allData[currentWeek] || [];
  const byId = new Map(projects.map((p) => [p.id, p]));
  const newOrder = [];

  for (const list of board.querySelectorAll('.pin-list')) {
    const stageId = Number(list.dataset.stageId);
    for (const cardEl of list.querySelectorAll('.pin-card')) {
      const p = byId.get(cardEl.dataset.id);
      if (!p) continue;
      p.stageId = stageId;
      newOrder.push(p);
    }
  }

  allData[currentWeek] = newOrder;
  saveData();
  // 重新渲染以恢复空区块的“暂无项目"提示等
  renderBoard();
}

/* ---------- 卡片新建/编辑对话框 ---------- */

function openCardDialog({ mode, stageId, project }) {
  editingProjectId = mode === 'edit' ? project.id : null;
  pendingPhotos = mode === 'edit' ? [...(project.photos || [])] : [];

  dialogTitle.textContent = s(mode === 'edit' ? 'editCardTitle' : 'newCardTitle');
  fieldName.value = mode === 'edit' ? project.name : '';
  fieldSummary.value = mode === 'edit' ? (project.summary || '') : '';
  fieldLink.value = mode === 'edit' ? (project.link || '') : '';
  fieldPhotos.value = '';

  fieldStage.innerHTML = STAGES.map(
    (st) => `<option value="${st.id}">${st.id}. ${stageText(st).title}</option>`
  ).join('');
  fieldStage.value = String(mode === 'edit' ? project.stageId : stageId);

  deleteCardBtn.hidden = mode !== 'edit';

  renderPhotoPreview();
  cardDialog.showModal();
}

function renderPhotoPreview() {
  photoPreview.innerHTML = '';
  pendingPhotos.forEach((src, idx) => {
    const wrap = document.createElement('div');
    wrap.className = 'thumb-wrap';

    const img = document.createElement('img');
    img.src = src;
    wrap.appendChild(img);

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'remove-photo';
    removeBtn.textContent = '×';
    removeBtn.title = '移除照片 Remove';
    removeBtn.addEventListener('click', () => {
      pendingPhotos.splice(idx, 1);
      renderPhotoPreview();
    });
    wrap.appendChild(removeBtn);

    photoPreview.appendChild(wrap);
  });
}

function compressImage(file, maxPx = 1200, quality = 0.75) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxPx / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

fieldPhotos.addEventListener('change', async () => {
  const files = [...fieldPhotos.files];
  if (files.length === 0) return;
  const compressed = await Promise.all(files.map((f) => compressImage(f)));
  pendingPhotos.push(...compressed);
  renderPhotoPreview();
  fieldPhotos.value = '';
});

cancelBtn.addEventListener('click', () => cardDialog.close());

deleteCardBtn.addEventListener('click', () => {
  if (!editingProjectId) return;
  const _delMsg = lang === 'zh' ? '确定删除这张项目卡片吗？' : lang === 'en' ? 'Delete this card?' : '确定删除这张项目卡片吗？\nDelete this card?';
  if (!confirm(_delMsg)) return;
  allData[currentWeek] = (allData[currentWeek] || []).filter((p) => p.id !== editingProjectId);
  saveData();
  cardDialog.close();
  renderBoard();
});

cardForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = fieldName.value.trim();
  if (!name) return;

  const data = {
    name,
    summary: fieldSummary.value.trim(),
    link: fieldLink.value.trim(),
    stageId: Number(fieldStage.value),
    photos: pendingPhotos,
  };

  if (!allData[currentWeek]) allData[currentWeek] = [];

  if (editingProjectId) {
    const p = allData[currentWeek].find((x) => x.id === editingProjectId);
    Object.assign(p, data);
  } else {
    allData[currentWeek].push({ id: uid(), ...data });
  }

  saveData();
  cardDialog.close();
  renderBoard();
});

/* ---------- 照片大图 ---------- */

const photoPrev = document.getElementById('photoPrev');
const photoNext = document.getElementById('photoNext');
const photoCounter = document.getElementById('photoCounter');
let galleryList = [];
let galleryIndex = 0;

function showGalleryPhoto() {
  photoDialogImg.src = galleryList[galleryIndex];
  const multi = galleryList.length > 1;
  photoPrev.hidden = !multi;
  photoNext.hidden = !multi;
  photoCounter.textContent = multi ? `${galleryIndex + 1} / ${galleryList.length}` : '';
}

function stepGallery(delta) {
  if (galleryList.length < 2) return;
  galleryIndex = (galleryIndex + delta + galleryList.length) % galleryList.length;
  showGalleryPhoto();
}

function openPhotoDialog(list, index) {
  galleryList = list;
  galleryIndex = index;
  showGalleryPhoto();
  photoDialog.showModal();
}

const MAX_ZOOM = 6;
let zoom = { s: 1, x: 0, y: 0 };

function applyZoom() {
  photoDialogImg.style.transform = `translate(${zoom.x}px, ${zoom.y}px) scale(${zoom.s})`;
  photoDialogImg.style.cursor = zoom.s > 1 ? 'grab' : 'zoom-in';
}
function resetZoom() {
  zoom = { s: 1, x: 0, y: 0 };
  applyZoom();
}
function setZoom(s) {
  zoom.s = Math.min(MAX_ZOOM, Math.max(1, s));
  if (zoom.s === 1) { zoom.x = 0; zoom.y = 0; }
  applyZoom();
}

photoDialogImg.addEventListener('load', resetZoom);
photoDialog.addEventListener('close', resetZoom);
photoDialog.addEventListener('wheel', (e) => {
  e.preventDefault();
  setZoom(zoom.s * (e.deltaY < 0 ? 1.15 : 1 / 1.15));
}, { passive: false });
photoDialogImg.addEventListener('dblclick', () => setZoom(zoom.s > 1 ? 1 : 2.5));

photoPrev.addEventListener('click', () => stepGallery(-1));
photoNext.addEventListener('click', () => stepGallery(1));
document.getElementById('photoClose').addEventListener('click', () => photoDialog.close());
photoDialog.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') stepGallery(-1);
  else if (e.key === 'ArrowRight') stepGallery(1);
});

const pointers = new Map();
let gesture = null;

photoDialogImg.addEventListener('pointerdown', (e) => {
  photoDialogImg.setPointerCapture(e.pointerId);
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  gesture = {
    startX: e.clientX, startY: e.clientY, moved: false,
    startZoom: { ...zoom },
    startDist: pointers.size === 2 ? pointerDist() : 0,
  };
  if (pointers.size === 2) gesture.moved = true;
});
photoDialogImg.addEventListener('pointermove', (e) => {
  if (!pointers.has(e.pointerId) || !gesture) return;
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (pointers.size === 2) {
    if (!gesture.startDist) {
      gesture.startDist = pointerDist();
      gesture.startZoom = { ...zoom };
    }
    setZoom(gesture.startZoom.s * pointerDist() / gesture.startDist);
  } else if (zoom.s > 1) {
    const dx = e.clientX - gesture.startX, dy = e.clientY - gesture.startY;
    if (Math.abs(dx) + Math.abs(dy) > 3) gesture.moved = true;
    zoom.x = gesture.startZoom.x + dx;
    zoom.y = gesture.startZoom.y + dy;
    applyZoom();
  }
});
function endPointer(e) {
  if (!pointers.has(e.pointerId)) return;
  pointers.delete(e.pointerId);
  if (gesture && pointers.size === 0 && zoom.s === 1 && e.type === 'pointerup') {
    const dx = e.clientX - gesture.startX;
    if (Math.abs(dx) > 50 && Math.abs(e.clientY - gesture.startY) < Math.abs(dx)) {
      stepGallery(dx < 0 ? 1 : -1);
    }
  }
  if (pointers.size === 0) gesture = null;
  else gesture = { startX: 0, startY: 0, moved: true, startZoom: { ...zoom }, startDist: 0 };
}
photoDialogImg.addEventListener('pointerup', endPointer);
photoDialogImg.addEventListener('pointercancel', endPointer);

function pointerDist() {
  const [a, b] = [...pointers.values()];
  return Math.hypot(a.x - b.x, a.y - b.y) || 1;
}

photoDialog.addEventListener('click', (e) => {
  if (e.target === photoDialog) photoDialog.close();
});

/* ---------- 周操作 ---------- */

newWeekBtn.addEventListener('click', () => {
  const thisWeek = getISOWeekKey(new Date());
  if (!allWeeks.includes(thisWeek)) {
    const lastWeek = allWeeks[allWeeks.length - 1];
    const base = lastWeek ? (allData[lastWeek] || []) : [];
    // 复制上一周卡片结构作为本周起点，不带照片（避免数据膨胀）
    allData[thisWeek] = JSON.parse(JSON.stringify(base)).map((p) => ({ ...p, id: uid(), photos: [] }));
    allWeeks = [...allWeeks, thisWeek].sort();
    currentWeek = thisWeek;
    saveData();
  } else {
    currentWeek = thisWeek;
  }
  renderAll();
});

deleteWeekBtn.addEventListener('click', () => {
  if (!currentWeek) return;
  const _weekDelMsg = lang === 'zh'
    ? `确定删除快照 ${currentWeek}？此操作不可恢复。`
    : lang === 'en'
    ? `Delete snapshot ${currentWeek}? This cannot be undone.`
    : `确定删除快照 ${currentWeek}？此操作不可恢复。\nDelete snapshot ${currentWeek}? This cannot be undone.`;
  if (!confirm(_weekDelMsg)) return;
  const weekToDelete = currentWeek;
  delete allData[weekToDelete];
  allWeeks = allWeeks.filter((w) => w !== weekToDelete);
  currentWeek = allWeeks[allWeeks.length - 1] || null;
  renderAll();
  deleteWeekFromFirebase(weekToDelete);
});

/* ---------- 导出/导入 ---------- */

exportBtn.addEventListener('click', () => {
  if (!currentWeek) return alert(lang === 'zh' ? '请先选择一个周快照' : lang === 'en' ? 'Please select a week first.' : '请先选择一个周快照\nPlease select a week first.');
  const payload = { [currentWeek]: allData[currentWeek] };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `stage-board-${currentWeek}.json`;
  a.click();
  URL.revokeObjectURL(url);
});

importInput.addEventListener('change', () => {
  const file = importInput.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async () => {
    try {
      const imported = JSON.parse(reader.result);
      if (typeof imported !== 'object' || imported === null) throw new Error('格式错误 Invalid format');
      const weeks = Object.keys(imported);
      if (weeks.length === 0) throw new Error('文件中没有周数据 No week data found');
      const weekList = weeks.join('、');
      const _importMsg = lang === 'zh'
        ? `导入将覆盖以下周的数据：${weekList}，确定继续吗？`
        : lang === 'en'
        ? `Import will overwrite data for: ${weekList}. Continue?`
        : `导入将覆盖以下周的数据：${weekList}，确定继续吗？\nImport will overwrite data for: ${weekList}. Continue?`;
      if (!confirm(_importMsg)) return;
      Object.assign(allData, imported);
      allWeeks = [...new Set([...allWeeks, ...weeks])].sort();
      currentWeek = weeks[weeks.length - 1];
      renderAll();
      // 用 PATCH 只合并导入的周，不影响 Firebase 里其他周的数据
      await fetch(DATA_URL, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(imported),
      });
    } catch (err) {
      alert((lang === 'zh' ? '导入失败：' : lang === 'en' ? 'Import failed: ' : '导入失败 Import failed: ') + err.message);
    } finally {
      importInput.value = '';
    }
  };
  reader.readAsText(file);
});

/* ---------- 多人实时同步 ---------- */

const POLL_INTERVAL = 15000;

function pickCurrentWeek() {
  const thisWeek = getISOWeekKey(new Date());
  return allWeeks.includes(thisWeek) ? thisWeek : (allWeeks[allWeeks.length - 1] || null);
}

function dataChanged(fresh) {
  const freshWeeks = Object.keys(fresh).sort().join(',');
  const localWeeks = Object.keys(allData).sort().join(',');
  if (freshWeeks !== localWeeks) return true;
  for (const w of Object.keys(fresh)) {
    const fa = fresh[w] || [];
    const la = allData[w] || [];
    if (fa.length !== la.length) return true;
    for (let i = 0; i < fa.length; i++) {
      if (fa[i].id !== la[i].id || fa[i].stageId !== la[i].stageId) return true;
    }
  }
  return false;
}

function startPolling() {
  setInterval(async () => {
    if (!serverAvailable) return;
    if (document.hidden) return;
    if (cardDialog.open || photoDialog.open) return;
    if (saveInFlight) return;
    if (Date.now() - lastSaveTime < 2000) return;
    if (!currentWeek) return;
    const fresh = await loadWeekData(currentWeek);
    if (!serverAvailable || fresh === null) return;
    if (JSON.stringify(fresh) === JSON.stringify(allData[currentWeek] || [])) return;
    allData[currentWeek] = fresh;
    renderBoard();
  }, POLL_INTERVAL);
}

/* ---------- 初始化 ---------- */

(async function init() {
  // Step 1: load week list only (shallow, tiny)
  allWeeks = await loadWeekList();
  initialLoadOk = serverAvailable;
  currentWeek = pickCurrentWeek();

  // Step 2: load current week's data
  if (currentWeek) {
    const data = await loadWeekData(currentWeek);
    if (data !== null) allData[currentWeek] = data;
  }

  if (!isAdmin) {
    newWeekBtn.style.display = 'none';
    deleteWeekBtn.style.display = 'none';
    exportBtn.style.display = 'none';
    const importLabel = document.getElementById('importLabel');
    if (importLabel) importLabel.style.display = 'none';
  }

  const langSelect = document.getElementById('langSelect');
  if (langSelect) {
    langSelect.addEventListener('change', () => {
      lang = langSelect.value;
      localStorage.setItem('lang', lang);
      applyLang();
    });
  }
  applyLang();
  startPolling();
})();
