const STAGES = [
  {
    id: 1, title: '土地准备', icon: '📐',
    bullets: ['测量放线 Survey', '场地平整 Grading', '开挖地基 Excavation'],
    desc: '根据建筑图纸确定房屋位置，完成场地平整和基坑开挖。',
    bg: '#fdf2e6', accent: '#c9863c',
  },
  {
    id: 2, title: '地基施工', icon: '🧱',
    bullets: ['混凝土基础 Footing', '地下室墙体 Foundation Wall', '防水层 Waterproofing', '排水系统 Weeping Tile'],
    desc: '浇筑混凝土基础，建立地下室墙体，做好防水和排水，抵御冻土和地下水。',
    bg: '#eceff2', accent: '#7d8a99',
  },
  {
    id: 3, title: '木结构主体', icon: '🪵',
    bullets: ['地梁系统 Floor Joists', '承重墙 Walls', '楼板系统 Subfloor', '屋架系统 Roof Trusses'],
    desc: '工厂预制木材和龙架运至现场组装，形成坚固的主体结构。',
    bg: '#f6ecd9', accent: '#b9824f',
  },
  {
    id: 4, title: '房屋封闭（防风雨）', icon: '🏠',
    bullets: ['OSB结构板', '防水透气膜 House Wrap', '门窗安装', '屋面防水及沥青瓦'],
    desc: '完成外墙结构板、门窗、防水透气膜和屋面工程，使建筑达到防风雨状态。',
    bg: '#e9eff6', accent: '#5b7fa6',
  },
  {
    id: 5, title: '机电安装（粗装）', icon: '🔌',
    bullets: ['电气 Electrical', '给排水 Plumbing', '暖通 HVAC', '燃气 Gas'],
    desc: '在墙体和楼板封闭前完成所有管线和线路的预埋安装。',
    bg: '#fdf6e0', accent: '#d9a514',
  },
  {
    id: 6, title: '保温施工', icon: '🧊',
    bullets: ['墙体保温 R22-R24', '阁楼保温 R50-R60'],
    desc: '安装墙体和阁楼保温材料，提升能效，适应寒冷气候。',
    bg: '#e6f4fb', accent: '#5fb3d9',
  },
  {
    id: 7, title: '石膏板安装', icon: '🪚',
    bullets: ['石膏板安装 Drywall', '接缝处理 Taping', '打磨 Sanding'],
    desc: '安装石膏板，处理接缝并打磨平整，为后续装修做准备。',
    bg: '#f0f1f3', accent: '#9aa5b1',
  },
  {
    id: 8, title: '室内装修', icon: '🛋️',
    bullets: ['地板 Flooring', '橱柜 Cabinets', '油漆 Painting', '卫浴 Bathroom', '灯具 Lighting'],
    desc: '完成地板、橱柜、油漆、卫浴和灯具等全部室内装修工程。',
    bg: '#faf1e3', accent: '#c2884a',
  },
  {
    id: 9, title: '外立面施工', icon: '🏡',
    bullets: ['Vinyl Siding 挂板', 'Fiber Cement 纤维水泥板', 'Brick 砖', 'Stone Veneer 文化石'],
    desc: '安装外墙装饰材料，提升美观性和耐久性。',
    bg: '#edf3ed', accent: '#7a9b76',
  },
  {
    id: 10, title: '验收入住', icon: '🔑',
    bullets: ['政府验收 Inspection', '领取入住许可 Occupancy Permit', '入住新家'],
    desc: '通过验收后，取得入住许可，完成交房，正式入住新家。',
    bg: '#fdf6e0', accent: '#e0b13c',
  },
];

const board = document.getElementById('board');
const timeline = document.getElementById('timeline');
const weekLabel = document.getElementById('weekLabel');
const newWeekBtn = document.getElementById('newWeekBtn');
const deleteWeekBtn = document.getElementById('deleteWeekBtn');
const exportBtn = document.getElementById('exportBtn');
const importInput = document.getElementById('importInput');

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

// serverAvailable: 是否能连接到 server.js 提供的 /api/data 接口
// - true  : 正常读写，多人实时共享
// - false : 纯静态托管场景，只能读到部署时打包的 board-data.json 快照，
//           本地仍可拖拽/编辑，但保存会静默失败、刷新后丢失
let serverAvailable = true;

async function loadData() {
  try {
    const res = await fetch('/api/data');
    if (!res.ok) throw new Error('加载失败');
    serverAvailable = true;
    return await res.json();
  } catch {
    serverAvailable = false;
    // 退回读取静态打包的数据文件作为只读快照
    try {
      const res = await fetch('board-data.json');
      if (!res.ok) throw new Error('快照不存在');
      return await res.json();
    } catch {
      return {};
    }
  }
}

let saveInFlight = null;
function saveData() {
  if (!serverAvailable) return;
  saveInFlight = fetch('/api/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(allData),
  }).catch((err) => {
    serverAvailable = false;
    console.error('保存失败:', err);
    renderWeekLabel();
  });
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
  renderWeekLabel();
  renderBoard();
  renderTimeline();
}

function renderWeekLabel() {
  const thisWeek = getISOWeekKey(new Date());
  const weekText = currentWeek
    ? `当前查看：${currentWeek}${currentWeek === thisWeek ? '（本周）' : ''}`
    : '暂无数据，请点击“新建本周”';
  weekLabel.textContent = serverAvailable
    ? weekText
    : `${weekText} ｜ 未连接到服务器，当前为只读快照，所做修改不会保存`;
  deleteWeekBtn.disabled = !currentWeek;
}

function renderBoard() {
  board.innerHTML = '';
  const projects = currentWeek ? (allData[currentWeek] || []) : [];

  for (const stage of STAGES) {
    const card = document.createElement('section');
    card.className = 'stage-card';
    card.style.setProperty('--stage-bg', stage.bg);
    card.style.setProperty('--stage-accent', stage.accent);
    card.dataset.icon = stage.icon || '';

    const header = document.createElement('div');
    header.className = 'stage-header';
    header.innerHTML = `
      <span class="stage-number">${stage.id}</span>
      <span class="stage-title">${stage.title}</span>
    `;
    const addBtn = document.createElement('button');
    addBtn.className = 'add-card-btn';
    addBtn.textContent = '+ 新建卡片';
    addBtn.disabled = !currentWeek;
    addBtn.addEventListener('click', () => openCardDialog({ mode: 'add', stageId: stage.id }));
    header.appendChild(addBtn);
    card.appendChild(header);

    if (stage.bullets && stage.bullets.length) {
      const bullets = document.createElement('div');
      bullets.className = 'stage-bullets';
      bullets.innerHTML = stage.bullets.map((b) => `<span>● ${escapeHtml(b)}</span>`).join('');
      card.appendChild(bullets);
    }

    if (stage.desc) {
      const desc = document.createElement('div');
      desc.className = 'stage-desc';
      desc.textContent = stage.desc;
      card.appendChild(desc);
    }


    const list = document.createElement('div');
    list.className = 'pin-list';
    list.dataset.stageId = stage.id;
    attachDropEvents(list);
    card.appendChild(list);

    const stageProjects = projects.filter((p) => p.stageId === stage.id);
    if (stageProjects.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'pin-empty';
      empty.textContent = '暂无项目';
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
  el.draggable = true;
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

  const editBtn = document.createElement('button');
  editBtn.className = 'pin-edit-btn';
  editBtn.textContent = '✎';
  editBtn.title = '编辑';
  editBtn.addEventListener('click', () => openCardDialog({ mode: 'edit', project }));
  top.appendChild(editBtn);

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
    for (const src of project.photos) {
      const img = document.createElement('img');
      img.src = src;
      img.addEventListener('click', () => openPhotoDialog(src));
      photos.appendChild(img);
    }
    el.appendChild(photos);
  }

  el.addEventListener('dragstart', () => el.classList.add('dragging'));
  el.addEventListener('dragend', () => {
    el.classList.remove('dragging');
    syncOrderFromDOM();
  });

  return el;
}

function renderTimeline() {
  timeline.innerHTML = '';
  const weeks = Object.keys(allData).sort();

  if (weeks.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'timeline-empty';
    empty.textContent = '暂无历史快照，请点击“新建本周”创建第一个快照';
    timeline.appendChild(empty);
    return;
  }

  const thisWeek = getISOWeekKey(new Date());

  for (const week of weeks) {
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.textContent = week + (week === thisWeek ? '（本周）' : '');
    if (week === currentWeek) item.classList.add('active');
    item.addEventListener('click', () => {
      currentWeek = week;
      renderAll();
    });
    timeline.appendChild(item);
  }
}

/* ---------- 拖拽 ---------- */

function attachDropEvents(list) {
  list.addEventListener('dragover', (e) => {
    e.preventDefault();
    list.classList.add('drag-over');
    const dragging = document.querySelector('.pin-card.dragging');
    if (!dragging) return;

    // 如果列表当前只有“暂无项目”占位，先清空
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
  // 重新渲染以恢复空区块的“暂无项目”提示等
  renderBoard();
}

/* ---------- 卡片新建/编辑对话框 ---------- */

function openCardDialog({ mode, stageId, project }) {
  editingProjectId = mode === 'edit' ? project.id : null;
  pendingPhotos = mode === 'edit' ? [...(project.photos || [])] : [];

  dialogTitle.textContent = mode === 'edit' ? '编辑项目卡片' : '新建项目卡片';
  fieldName.value = mode === 'edit' ? project.name : '';
  fieldSummary.value = mode === 'edit' ? (project.summary || '') : '';
  fieldLink.value = mode === 'edit' ? (project.link || '') : '';
  fieldPhotos.value = '';

  fieldStage.innerHTML = STAGES.map(
    (s) => `<option value="${s.id}">${s.id}. ${s.title}</option>`
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
    removeBtn.title = '移除照片';
    removeBtn.addEventListener('click', () => {
      pendingPhotos.splice(idx, 1);
      renderPhotoPreview();
    });
    wrap.appendChild(removeBtn);

    photoPreview.appendChild(wrap);
  });
}

fieldPhotos.addEventListener('change', () => {
  const files = [...fieldPhotos.files];
  let remaining = files.length;
  if (remaining === 0) return;
  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = () => {
      pendingPhotos.push(reader.result);
      remaining -= 1;
      if (remaining === 0) {
        renderPhotoPreview();
        fieldPhotos.value = '';
      }
    };
    reader.readAsDataURL(file);
  });
});

cancelBtn.addEventListener('click', () => cardDialog.close());

deleteCardBtn.addEventListener('click', () => {
  if (!editingProjectId) return;
  if (!confirm('确定删除这张项目卡片吗？')) return;
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

function openPhotoDialog(src) {
  photoDialogImg.src = src;
  photoDialog.showModal();
}
photoDialog.addEventListener('click', () => photoDialog.close());

/* ---------- 周操作 ---------- */

newWeekBtn.addEventListener('click', () => {
  const thisWeek = getISOWeekKey(new Date());
  if (!allData[thisWeek]) {
    const weeks = Object.keys(allData).sort();
    const lastWeek = weeks[weeks.length - 1];
    const base = lastWeek ? allData[lastWeek] : [];
    // 深拷贝上一周数据作为本周起点，方便在此基础上调整阶段
    allData[thisWeek] = JSON.parse(JSON.stringify(base)).map((p) => ({ ...p, id: uid() }));
    saveData();
  }
  currentWeek = thisWeek;
  renderAll();
});

deleteWeekBtn.addEventListener('click', () => {
  if (!currentWeek) return;
  if (!confirm(`确定删除快照 ${currentWeek} 吗？此操作不可恢复。`)) return;
  delete allData[currentWeek];
  saveData();
  const weeks = Object.keys(allData).sort();
  currentWeek = weeks[weeks.length - 1] || null;
  renderAll();
});

/* ---------- 导出/导入 ---------- */

exportBtn.addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(allData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `stage-board-${getISOWeekKey(new Date())}.json`;
  a.click();
  URL.revokeObjectURL(url);
});

importInput.addEventListener('change', () => {
  const file = importInput.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);
      if (typeof imported !== 'object' || imported === null) throw new Error('格式错误');
      if (!confirm('导入将覆盖当前所有本地数据，确定继续吗？')) return;
      allData = imported;
      saveData();
      const weeks = Object.keys(allData).sort();
      currentWeek = weeks[weeks.length - 1] || null;
      renderAll();
    } catch (err) {
      alert('导入失败：文件不是有效的 JSON');
    } finally {
      importInput.value = '';
    }
  };
  reader.readAsText(file);
});

/* ---------- 多人实时同步 ---------- */

const POLL_INTERVAL = 4000;

function pickCurrentWeek() {
  const weeks = Object.keys(allData).sort();
  const thisWeek = getISOWeekKey(new Date());
  return allData[thisWeek] ? thisWeek : (weeks[weeks.length - 1] || null);
}

function startPolling() {
  setInterval(async () => {
    if (!serverAvailable) return; // 纯静态托管：没有后端可轮询，保留本地内存中的编辑
    // 弹窗打开时（正在编辑）暂不刷新，避免打断输入
    if (cardDialog.open || photoDialog.open) return;
    const fresh = await loadData();
    if (!serverAvailable) return; // 轮询途中服务器变得不可用，放弃这次结果
    if (JSON.stringify(fresh) === JSON.stringify(allData)) return;
    allData = fresh;
    if (!currentWeek || !allData[currentWeek]) {
      currentWeek = pickCurrentWeek();
    }
    renderAll();
  }, POLL_INTERVAL);
}

/* ---------- 初始化 ---------- */

(async function init() {
  allData = await loadData();
  currentWeek = pickCurrentWeek();
  renderAll();
  startPolling();
})();
