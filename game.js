/* ============================================================
   艾瑟兰编年史 · Aetheran Chronicles
   日式西幻 · 模拟人生类文字冒险
   ============================================================ */
'use strict';

/* ---------- 工具 ---------- */
const $ = id => document.getElementById(id);
const rand = n => Math.floor(Math.random() * n);
const pick = arr => arr[rand(arr.length)];
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ---------- 种族定义 ---------- */
const RACES = [
  {
    id:'human', name:'人类', cost:0, icon:'🗡',
    desc:'寿命最短，却最渴望活着。没有天赋异禀，只有无穷的野心与适应力。',
    bonus:'全属性成长均衡 · 学习速度 +20% · 寿命 70~90',
    lifespans:[70,90],
    mods:{gold:0,mag:0,int:0,phy:0},
    growth:{gold:1,mag:1,int:1,phy:1},
    path:'凡人之路',
    pathDesc:'没有神明眷顾，每一步都靠自己挣。'
  },
  {
    id:'elf', name:'精灵', cost:4, icon:'🏹',
    desc:'森林的长子，千年寿命让他们看尽人间。优雅、孤高，也容易寂寞。',
    bonus:'魔法 +3 · 智力 +2 · 寿命 800~1200 · 自然亲和',
    lifespans:[800,1200],
    mods:{gold:0,mag:3,int:2,phy:0},
    growth:{gold:1,mag:2,int:2,phy:1},
    path:'月桂之路',
    pathDesc:'精灵的宿命是守望，也是告别。'
  },
  {
    id:'dwarf', name:'矮人', cost:3, icon:'🔨',
    desc:'群山之下的工匠，胡子里藏着烈酒与誓言。记仇，也记恩。',
    bonus:'体魄 +4 · 家底 +2 · 寿命 250~350 · 锻造精通',
    lifespans:[250,350],
    mods:{gold:2,mag:0,int:0,phy:4},
    growth:{gold:2,mag:0,int:1,phy:2},
    path:'熔炉之路',
    pathDesc:'一锤一锤，把名字敲进石头里。'
  },
  {
    id:'orc', name:'兽人', cost:2, icon:'🪓',
    desc:'被文明排斥的种族，用獠牙和肌肉在夹缝里杀出一条血路。',
    bonus:'体魄 +6 · 魔法 -2 · 寿命 50~70 · 战斗狂怒',
    lifespans:[50,70],
    mods:{gold:0,mag:-2,int:-1,phy:6},
    growth:{gold:1,mag:0,int:0,phy:3},
    path:'血牙之路',
    pathDesc:'弱者没有资格谈尊严。'
  },
  {
    id:'halfling', name:'半身人', cost:1, icon:'🍀',
    desc:'小小的个子，大大的运气。天生擅长在灾难里活下来。',
    bonus:'家底 +3 · 幸运加成 · 寿命 100~150 · 潜行精通',
    lifespans:[100,150],
    mods:{gold:3,mag:1,int:1,phy:-1},
    growth:{gold:2,mag:1,int:1,phy:0},
    path:'幸运之路',
    pathDesc:'活着本身就是一种胜利。'
  },
  {
    id:'dragon', name:'龙裔', cost:12, icon:'🐉',
    desc:'远古巨龙的末裔，血液里流淌着毁灭与荣耀。傲慢是刻在骨子里的。',
    bonus:'全属性 +2 · 龙鳞护体 · 寿命 2000~3000 · 龙威',
    lifespans:[2000,3000],
    mods:{gold:2,mag:2,int:2,phy:2},
    growth:{gold:1,mag:2,int:1,phy:2},
    path:'龙血之路',
    pathDesc:'你的血统既是祝福，也是诅咒。'
  },
  {
    id:'demon', name:'魔族', cost:10, icon:'😈',
    desc:'深渊的居民，被光明诸神诅咒的种族。契约与欲望是他们的语言。',
    bonus:'魔法 +5 · 智力 +2 · 寿命 500~800 · 契约之力',
    lifespans:[500,800],
    mods:{gold:1,mag:5,int:2,phy:0},
    growth:{gold:1,mag:3,int:2,phy:1},
    path:'深渊之路',
    pathDesc:'力量从来都有代价，你付得起吗？'
  },
  {
    id:'angel', name:'天使', cost:10, icon:'✨',
    desc:'天界的使者，背负着神谕降临人间。圣洁之下，也有不为人知的挣扎。',
    bonus:'魔法 +4 · 体魄 +2 · 寿命 1000~1500 · 圣光治愈',
    lifespans:[1000,1500],
    mods:{gold:0,mag:4,int:1,phy:2},
    growth:{gold:1,mag:2,int:2,phy:2},
    path:'圣光之路',
    pathDesc:'神的旨意，和你自己的心意，哪个更重要？'
  },
  {
    id:'undead', name:'亡灵', cost:8, icon:'💀',
    desc:'从死亡中归来的人，不再需要呼吸，也不再被世界接纳。',
    bonus:'体魄 +3 · 魔法 +3 · 寿命 不死 · 亡灵之躯',
    lifespans:[9999,9999],
    mods:{gold:-1,mag:3,int:1,phy:3},
    growth:{gold:0,mag:2,int:1,phy:2},
    path:'不朽之路',
    pathDesc:'你已经死过一次了，还怕什么？'
  },
  {
    id:'fae', name:'妖精', cost:6, icon:'🦋',
    desc:'诞生于梦境与月光的生灵，情绪就是魔法，任性就是天性。',
    bonus:'魔法 +4 · 家底 -1 · 寿命 300~500 · 幻术精通',
    lifespans:[300,500],
    mods:{gold:-1,mag:4,int:1,phy:0},
    growth:{gold:1,mag:3,int:1,phy:1},
    path:'梦境之路',
    pathDesc:'现实太无聊了，不如做梦吧。'
  }
];

/* ---------- 天赋定义 ---------- */
const TALENTS = [
  {id:'noble', name:'贵族血脉', cost:3, desc:'家底 +3，社交场合更受尊重', effect:{gold:3}},
  {id:'genius', name:'天生聪慧', cost:3, desc:'智力 +3，学习技能更快', effect:{int:3}},
  {id:'strong', name:'天生神力', cost:3, desc:'体魄 +3，战斗伤害提升', effect:{phy:3}},
  {id:'mana', name:'魔力充沛', cost:3, desc:'魔法 +3，施法消耗降低', effect:{mag:3}},
  {id:'lucky', name:'幸运星', cost:2, desc:'所有掷骰 +2 修正', effect:{luck:2}},
  {id:'charm', name:'天生丽质', cost:2, desc:'社交成功率 +15%', effect:{charm:15}},
  {id:'ironbody', name:'钢铁之躯', cost:2, desc:'受伤减免 30%', effect:{defense:30}},
  {id:'quick', name:'身手敏捷', cost:2, desc:'逃跑与闪避成功率 +20%', effect:{dodge:20}},
  {id:'scholar', name:'博学多识', cost:2, desc:'知识类检定 +3', effect:{knowledge:3}},
  {id:'silver', name:'银舌', cost:2, desc:'说服与欺骗 +3', effect:{persuade:3}},
  {id:'healer', name:'生命亲和', cost:2, desc:'治疗效果 +50%', effect:{heal:50}},
  {id:'curse', name:'被诅咒者', cost:-3, desc:'家底 -2，魔法 +2，命运多舛', effect:{gold:-2,mag:2}},
  {id:'orphan', name:'孤儿', cost:-2, desc:'家底 -2，体魄 +2，从苦难中长大', effect:{gold:-2,phy:2}},
  {id:'fragile', name:'体弱多病', cost:-2, desc:'体魄 -2，智力 +2', effect:{phy:-2,int:2}},
  {id:'magicseal', name:'魔力封印', cost:-3, desc:'魔法 -3，体魄 +3', effect:{mag:-3,phy:3}},
  {id:'destiny', name:'天命之人', cost:5, desc:'主线剧情触发率提升，关键掷骰 +3', effect:{destiny:3}},
  {id:'immortal', name:'不死之身', cost:6, desc:'濒死时有 40% 概率复活一次', effect:{revive:40}},
  {id:'rich', name:'富可敌国', cost:5, desc:'家底 +6', effect:{gold:6}},
  {id:'battle', name:'战斗天才', cost:4, desc:'战斗检定 +4', effect:{battle:4}},
  {id:'arcane', name:'奥术亲和', cost:4, desc:'魔法检定 +4', effect:{arcane:4}},
];

/* ---------- 属性说明 ---------- */
const ATTR_INFO = {
  gold:{name:'家底', desc:'财富与人脉，影响消费、经商、贿赂'},
  mag:{name:'魔法', desc:'魔力与法术天赋，影响施法、感知'},
  int:{name:'智力', desc:'学识与谋略，影响研究、解谜、谈判'},
  phy:{name:'体魄', desc:'力量与耐力，影响战斗、生存、劳作'}
};

/* ============================================================
   角色状态
   ============================================================ */
function newChar(){
  return {
    name:'无名者', race:null, raceId:'', age:16, alive:true,
    gold:0, mag:0, int:0, phy:0,
    hp:100, maxHp:100, mp:50, maxMp:50,
    talents:[], flags:{}, log:[],
    title:'', reputation:0, karma:0,
    gender:'', spouse:null, spouseGender:'', children:0, friends:[], enemies:[],
    job:'', money:0, home:'',
    mainStage:0, subStage:{}, eventCount:0,
    birthYear:0, lifespans:[70,90],
    deathReason:'', epitaph:'',
    luck:0, charm:0, defense:0, dodge:0, knowledge:0,
    persuade:0, heal:0, destiny:0, revive:0, battle:0, arcane:0,
    usedRevive:false, seed:Date.now()
  };
}

/* ---------- 骰子 ---------- */
function rollD20(){
  const r = rand(20)+1;
  return r;
}
function check(c, attr, dc, extraBonus){
  // attr: 'gold'|'mag'|'int'|'phy' 或直接数值
  let base = typeof attr === 'number' ? attr : (c[attr]||0);
  let bonus = Math.floor(base/2) + (extraBonus||0) + (c.luck||0);
  const d = rollD20();
  const total = d + bonus;
  return {dice:d, bonus, total, dc, success: total >= dc, crit: d===20, fumble: d===1};
}

/* ---------- 存档 ---------- */
const SAVE_KEY = 'aetheran_saves_v1';
const AUTO_KEY = 'aetheran_auto_v1';

function loadSaves(){
  try{ return JSON.parse(localStorage.getItem(SAVE_KEY)) || []; }catch(e){ return []; }
}
function writeSaves(list){
  try{ localStorage.setItem(SAVE_KEY, JSON.stringify(list)); }catch(e){}
}
function autoSave(c){
  try{ localStorage.setItem(AUTO_KEY, JSON.stringify(c)); }catch(e){}
}
function loadAuto(){
  try{ return JSON.parse(localStorage.getItem(AUTO_KEY)); }catch(e){ return null; }
}

/* ============================================================
   游戏主对象
   ============================================================ */
const Game = {
  c:null,
  stage:'title',      // title | race | talent | attr | play | dead
  pending:null,       // 当前等待的选择
  tempPoints:0,
  tempTalents:[],
  tempRace:null,
  tempAttrs:{gold:0,mag:0,int:0,phy:0},

  /* ---------- 界面 ---------- */
  clearStage(){ $('stage').innerHTML=''; },
  clearChoices(){ $('choices').innerHTML=''; },

  para(text, cls){
    const p = document.createElement('p');
    p.className = 'para ' + (cls||'narr');
    p.innerHTML = text;
    $('stage').appendChild(p);
    $('stage').scrollTop = $('stage').scrollHeight;
    return p;
  },
  chapter(title){
    this.para('◆ ' + title + ' ◆', 'chapter');
  },
  choice(label, fn, opts){
    opts = opts || {};
    const b = document.createElement('button');
    b.className = 'choice' + (opts.cls ? ' '+opts.cls : '') + (opts.locked ? ' locked' : '');
    let html = '<span class="t">' + label + '</span>';
    if(opts.req) html += '<span class="req ' + (opts.reqOk ? 'ok':'no') + '">' + opts.req + '</span>';
    b.innerHTML = html;
    if(!opts.locked) b.onclick = fn;
    $('choices').appendChild(b);
    $('choices').scrollTop = 0;
    return b;
  },
  clearAll(){ this.clearStage(); this.clearChoices(); },

  updateHud(){
    const c = this.c;
    if(!c) return;
    $('hud').style.display = 'block';
    const gsym = c.gender==='男' ? ' ♂' : c.gender==='女' ? ' ♀' : c.gender==='无' ? ' ⚧' : '';
    $('hudName').textContent = c.name + gsym + ' · ' + (c.race ? c.race.name : '?');
    $('hudAge').textContent = c.alive ? (c.age + ' 岁') : '已故';
    $('stGold').textContent = c.gold;
    $('stMag').textContent = c.mag;
    $('stInt').textContent = c.int;
    $('stPhy').textContent = c.phy;
  },

  /* ---------- 弹窗 ---------- */
  modal(html, opts){
    opts = opts || {};
    const mask = document.createElement('div');
    mask.className = 'modal-mask';
    mask.innerHTML = '<div class="modal">' + html + '</div>';
    if(!opts.sticky) mask.onclick = e => { if(e.target===mask) mask.remove(); };
    $('modalRoot').appendChild(mask);
    return mask;
  },
  closeModal(){ $('modalRoot').innerHTML=''; },

  showQR(){
    this.modal(
      '<h3>☕ 请作者喝杯咖啡</h3>' +
      '<p style="text-align:center">如果这个故事陪你度过了几个夜晚，<br>不妨请作者喝一杯草莓牛奶～</p>' +
      '<img class="qr" src="qrcode.png" alt="微信收款码">' +
      '<p style="text-align:center;font-size:12px;color:var(--dim2)">长按识别 · 微信扫码</p>' +
      '<div class="btn-row"><button onclick="Game.closeModal()">关闭</button></div>'
    );
  },

  openMenu(){
    this.modal(
      '<h3>菜单</h3>' +
      '<div class="btn-row" style="flex-direction:column">' +
      '<button onclick="Game.closeModal();Game.openSave()">存档 / 读档</button>' +
      '<button onclick="Game.closeModal();Game.showStatus()">角色状态</button>' +
      '<button onclick="Game.closeModal();Game.confirmSuicide()" class="danger">结束这一生</button>' +
      '<button onclick="Game.closeModal()">继续游戏</button>' +
      '</div>'
    );
  },

  showStatus(){
    const c = this.c;
    let h = '<h3>' + esc(c.name) + '</h3>';
    h += '<div class="summary-box"><div class="sb-title">基本信息</div>';
    h += '<div class="sb-row"><span class="k">种族</span><span class="v">' + (c.race?c.race.icon+' '+c.race.name:'—') + '</span></div>';
    h += '<div class="sb-row"><span class="k">年龄</span><span class="v">' + c.age + ' 岁</span></div>';
    h += '<div class="sb-row"><span class="k">称号</span><span class="v">' + (c.title||'无') + '</span></div>';
    h += '<div class="sb-row"><span class="k">职业</span><span class="v">' + (c.job||'无') + '</span></div>';
    h += '<div class="sb-row"><span class="k">生命</span><span class="v">' + Math.round(c.hp) + '/' + c.maxHp + '</span></div>';
    h += '<div class="sb-row"><span class="k">魔力</span><span class="v">' + Math.round(c.mp) + '/' + c.maxMp + '</span></div>';
    h += '<div class="sb-row"><span class="k">声望</span><span class="v">' + c.reputation + '</span></div>';
    h += '<div class="sb-row"><span class="k">善恶</span><span class="v">' + (c.karma>20?'善良':c.karma<-20?'邪恶':'中立') + ' (' + c.karma + ')</span></div>';
    h += '</div>';
    h += '<div class="summary-box"><div class="sb-title">天赋</div>';
    if(c.talents.length===0) h += '<div class="sb-row"><span class="k">—</span></div>';
    c.talents.forEach(t=>{
      const td = TALENTS.find(x=>x.id===t);
      if(td) h += '<div class="sb-row"><span class="k">' + td.name + '</span><span class="v">' + td.desc + '</span></div>';
    });
    h += '</div>';
    if(c.spouse) h += '<div class="summary-box"><div class="sb-title">家庭</div><div class="sb-row"><span class="k">配偶</span><span class="v">' + c.spouse + '</span></div><div class="sb-row"><span class="k">子女</span><span class="v">' + c.children + ' 人</span></div></div>';
    h += '<div class="btn-row"><button onclick="Game.closeModal()">关闭</button></div>';
    this.modal(h);
  },

  openSave(){
    const saves = loadSaves();
    let h = '<h3>存档</h3>';
    if(this.c && this.c.alive){
      h += '<div class="btn-row" style="margin-bottom:14px"><button class="primary" onclick="Game.doSave()">💾 保存当前进度</button></div>';
    }
    if(saves.length===0){
      h += '<p style="text-align:center;color:var(--dim2)">还没有存档</p>';
    } else {
      saves.forEach((s,i)=>{
        h += '<div class="save-item"><div class="si-info">' +
          '<div class="si-title">' + esc(s.name) + ' · ' + esc(s.raceName) + '</div>' +
          '<div class="si-meta">' + s.age + '岁 · ' + esc(s.time) + '</div>' +
          '</div><div class="si-btns">' +
          '<button onclick="Game.doLoad(' + i + ')">读取</button>' +
          '<button class="del" onclick="Game.doDelete(' + i + ')">删除</button>' +
          '</div></div>';
      });
    }
    h += '<div class="btn-row"><button onclick="Game.closeModal()">关闭</button></div>';
    this.modal(h);
  },

  doSave(){
    const c = this.c;
    if(!c || !c.alive) return;
    const saves = loadSaves();
    const d = new Date();
    const time = d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')+' '+String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');
    saves.unshift({name:c.name, raceName:c.race?c.race.name:'?', age:c.age, time, data:JSON.parse(JSON.stringify(c))});
    if(saves.length>10) saves.length=10;
    writeSaves(saves);
    this.closeModal();
    this.toast('已保存');
  },

  doLoad(i){
    const saves = loadSaves();
    if(!saves[i]) return;
    this.c = saves[i].data;
    this.c.race = RACES.find(r=>r.id===this.c.raceId) || this.c.race;
    this.closeModal();
    this.updateHud();
    this.clearAll();
    this.para('—— 记忆回涌，你回到了那个时刻。——', 'sys');
    this.resume();
  },

  doDelete(i){
    const saves = loadSaves();
    saves.splice(i,1);
    writeSaves(saves);
    this.openSave();
  },

  toast(msg){
    const t = document.createElement('div');
    t.className = 'float-tip';
    t.style.left = '50%'; t.style.top = '50%'; t.style.transform = 'translateX(-50%)';
    t.style.color = 'var(--gold)';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(()=>t.remove(), 1200);
  },

  confirmSuicide(){
    this.modal(
      '<h3>结束这一生？</h3>' +
      '<p style="text-align:center">你将亲手终结这段旅程。<br>这个决定无法撤销。</p>' +
      '<div class="btn-row"><button onclick="Game.closeModal()">再想想</button>' +
      '<button class="danger" onclick="Game.closeModal();Game.die(\'自我了断\')">确定</button></div>'
    );
  },

  /* ---------- 启动 ---------- */
  init(){
    this.showTitle();
  },

  showTitle(){
    this.clearAll();
    $('hud').style.display = 'none';
    this.para('艾瑟兰编年史', 'chapter');
    this.para('在这片被称作「艾瑟兰」的大陆上，诸神已经沉默了千年。', 'narr');
    this.para('精灵在森林深处吟唱古老的歌谣，矮人在群山之中敲打不灭的炉火，人类在平原上建起一座又一座城邦，而更古老的种族则潜伏在阴影里，等待着某个时刻。', 'narr');
    this.para('你即将降生于此。', 'gold');
    this.para('你的一生会是什么样子？没有人知道。', 'think');
    const box = document.createElement('div');
    box.className = 'summary-box';
    box.style.margin = '18px 0';
    box.innerHTML =
      '<div class="sb-title">✦ 世界概览 ✦</div>' +
      '<div class="sb-row"><span class="k">时代</span><span class="v">诸神沉默纪 · 第 1000 年</span></div>' +
      '<div class="sb-row"><span class="k">种族</span><span class="v">10 种可降生血脉</span></div>' +
      '<div class="sb-row"><span class="k">命运</span><span class="v">由你亲手书写</span></div>' +
      '<div class="sb-row"><span class="k">终点</span><span class="v">唯有死亡</span></div>';
    $('stage').appendChild(box);
    this.choice('✨ 开始新的一生', ()=>this.startNew(), {cls:'special'});
    const auto = loadAuto();
    if(auto && auto.alive){
      this.choice('📖 继续上次的旅程（' + auto.name + ' · ' + auto.age + '岁）', ()=>{
        this.c = auto;
        this.c.race = RACES.find(r=>r.id===this.c.raceId) || this.c.race;
        this.updateHud(); this.clearAll(); this.resume();
      });
    }
    const saves = loadSaves();
    if(saves.length>0){
      this.choice('💾 读取存档', ()=>this.openSave());
    }
  },

  startNew(){
    this.c = newChar();
    this.tempPoints = 30;
    this.tempTalents = [];
    this.tempRace = null;
    this.tempAttrs = {gold:0,mag:0,int:0,phy:0};
    this.stage = 'race';
    this.showRaceSelect();
  },

  /* ============================================================
     种族选择
     ============================================================ */
  showRaceSelect(){
    this.clearAll();
    this.para('第一步 · 选择你的种族', 'chapter');
    this.para('天赋点共 <b style="color:var(--gold)">30</b> 点。种族越强大，消耗越多，剩下的点数用来塑造你的出身。', 'sys');

    const wrap = document.createElement('div');
    wrap.className = 'panel';
    wrap.innerHTML = '<div class="pts-badge">剩余天赋点 <span class="n" id="ptsLeft">30</span></div><div class="race-grid" id="raceGrid"></div>';
    $('stage').appendChild(wrap);

    const grid = $('raceGrid');
    RACES.forEach(r=>{
      const card = document.createElement('div');
      card.className = 'race-card';
      card.dataset.id = r.id;
      card.innerHTML =
        '<div class="rc-top"><span class="rc-name">' + r.icon + ' ' + r.name + '</span>' +
        '<span class="rc-cost">消耗 ' + r.cost + ' 点</span></div>' +
        '<div class="rc-desc">' + r.desc + '</div>' +
        '<div class="rc-bonus">' + r.bonus + '</div>';
      card.onclick = ()=>{
        if(r.cost > this.tempPoints) return;
        this.tempRace = r;
        document.querySelectorAll('.race-card').forEach(x=>x.classList.remove('sel'));
        card.classList.add('sel');
        this.updatePts();
        this.refreshRaceBtn();
      };
      grid.appendChild(card);
    });

    this.clearChoices();
    this.choice('← 返回', ()=>this.showTitle());
    this.choice('下一步：选择性别 →', ()=>{
      if(!this.tempRace){ this.toast('请先选择种族'); return; }
      this.tempPoints -= this.tempRace.cost;
      this.stage = 'gender';
      this.showGender();
    }, {cls:'special'});
  },

  /* ---------- 性别选择 ---------- */
  showGender(){
    this.clearAll();
    this.para('第二步 · 你的性别', 'chapter');
    this.para('性别会影响部分剧情与称呼，但不影响属性。', 'sys');
    this.para('你希望以怎样的身份降生？', 'narr');
    this.clearChoices();
    this.choice('♂ 男性', ()=>{ this.c.gender='男'; this.stage='attr'; this.showAttrAlloc(); }, {cls:'special'});
    this.choice('♀ 女性', ()=>{ this.c.gender='女'; this.stage='attr'; this.showAttrAlloc(); }, {cls:'special'});
    this.choice('⚧ 无性别 / 其他', ()=>{ this.c.gender='无'; this.stage='attr'; this.showAttrAlloc(); }, {cls:'special'});
    this.choice('🎲 跳过（随机决定）', ()=>{
      this.c.gender = pick(['男','女','无']);
      this.toast('命运替你做了选择：' + this.c.gender);
      this.stage='attr'; this.showAttrAlloc();
    });
    this.choice('← 返回', ()=>this.showRaceSelect());
  },

  updatePts(){
    const left = this.tempPoints - (this.tempRace ? this.tempRace.cost : 0);
    const el = $('ptsLeft');
    if(el) el.textContent = left;
    document.querySelectorAll('.race-card').forEach(card=>{
      const r = RACES.find(x=>x.id===card.dataset.id);
      if(r.cost > this.tempPoints) card.classList.add('locked');
      else card.classList.remove('locked');
    });
  },
  refreshRaceBtn(){},

  /* ============================================================
     属性分配
     ============================================================ */
  showAttrAlloc(){
    this.clearAll();
    this.para('第二步 · 塑造你的出身', 'chapter');
    this.para('种族：' + this.tempRace.icon + ' ' + this.tempRace.name + '（已消耗 ' + this.tempRace.cost + ' 点）', 'sys');
    this.para('把剩下的点数分配到四项属性上。每项初始为 0，最高 15。', 'narr');

    const wrap = document.createElement('div');
    wrap.className = 'panel';
    wrap.innerHTML = '<div class="pts-badge">剩余点数 <span class="n" id="attrLeft">0</span></div><div id="attrRows"></div>';
    $('stage').appendChild(wrap);

    const rows = $('attrRows');
    ['gold','mag','int','phy'].forEach(k=>{
      const info = ATTR_INFO[k];
      const row = document.createElement('div');
      row.className = 'attr-row';
      row.innerHTML =
        '<div class="an">' + info.name + '</div>' +
        '<div class="ad">' + info.desc + '</div>' +
        '<div class="ctrl"><button data-k="'+k+'" data-d="-1">−</button>' +
        '<span class="val" id="val_'+k+'">0</span>' +
        '<button data-k="'+k+'" data-d="1">+</button></div>';
      rows.appendChild(row);
    });
    rows.querySelectorAll('button').forEach(b=>{
      b.onclick = ()=>{
        const k = b.dataset.k, d = parseInt(b.dataset.d);
        const cur = this.tempAttrs[k];
        const left = this.attrLeft();
        if(d>0 && (left<=0 || cur>=15)) return;
        if(d<0 && cur<=0) return;
        this.tempAttrs[k] += d;
        $('val_'+k).textContent = this.tempAttrs[k];
        $('attrLeft').textContent = this.attrLeft();
      };
    });
    $('attrLeft').textContent = this.attrLeft();

    this.clearChoices();
    this.choice('← 返回重选种族', ()=>{
      this.tempPoints += this.tempRace.cost;
      this.tempAttrs = {gold:0,mag:0,int:0,phy:0};
      this.stage = 'race';
      this.showRaceSelect();
    });
    this.choice('下一步：选择天赋 →', ()=>{
      this.stage = 'talent';
      this.showTalentSelect();
    }, {cls:'special'});
  },

  attrLeft(){
    const used = this.tempAttrs.gold + this.tempAttrs.mag + this.tempAttrs.int + this.tempAttrs.phy;
    return this.tempPoints - this.tempRace.cost - used;
  },

  /* ============================================================
     天赋选择
     ============================================================ */
  showTalentSelect(){
    this.clearAll();
    this.para('第三步 · 天赋（可选）', 'chapter');
    this.para('天赋会消耗或返还点数。正数消耗，负数返还。可以跳过。', 'sys');

    const wrap = document.createElement('div');
    wrap.className = 'panel';
    wrap.innerHTML = '<div class="pts-badge">剩余点数 <span class="n" id="talLeft">0</span></div><div id="talList"></div>';
    $('stage').appendChild(wrap);

    const list = $('talList');
    TALENTS.forEach(t=>{
      const item = document.createElement('div');
      item.className = 'talent-item';
      item.dataset.id = t.id;
      item.innerHTML = '<div style="flex:1"><div><span class="ti-name">' + t.name + '</span>' +
        '<span class="ti-cost">' + (t.cost>=0?('−'+t.cost):('+'+(-t.cost))) + ' 点</span></div>' +
        '<div class="ti-desc">' + t.desc + '</div></div>';
      item.onclick = ()=>{
        const idx = this.tempTalents.indexOf(t.id);
        if(idx>=0){
          this.tempTalents.splice(idx,1);
          item.classList.remove('sel');
        } else {
          if(t.cost > this.talLeft()) return;
          this.tempTalents.push(t.id);
          item.classList.add('sel');
        }
        this.refreshTalLeft();
      };
      list.appendChild(item);
    });
    this.refreshTalLeft();

    this.clearChoices();
    this.choice('← 返回属性分配', ()=>{
      this.stage='attr'; this.showAttrAlloc();
    });
    this.choice('✦ 完成，降生于世', ()=>this.finishCreation(), {cls:'special'});
  },

  talLeft(){
    let used = 0;
    this.tempTalents.forEach(id=>{
      const t = TALENTS.find(x=>x.id===id);
      if(t) used += t.cost;
    });
    return this.attrLeft() - used;
  },
  refreshTalLeft(){
    const left = this.talLeft();
    const el = $('talLeft');
    if(el) el.textContent = left;
    document.querySelectorAll('.talent-item').forEach(item=>{
      const t = TALENTS.find(x=>x.id===item.dataset.id);
      const sel = this.tempTalents.indexOf(t.id)>=0;
      if(!sel && t.cost > left) item.classList.add('dis');
      else item.classList.remove('dis');
    });
  },

  /* ============================================================
     完成创建
     ============================================================ */
  finishCreation(){
    const c = this.c;
    const r = this.tempRace;
    c.race = r; c.raceId = r.id;
    c.lifespans = r.lifespans.slice();
    c.gold = this.tempAttrs.gold + r.mods.gold;
    c.mag  = this.tempAttrs.mag  + r.mods.mag;
    c.int  = this.tempAttrs.int  + r.mods.int;
    c.phy  = this.tempAttrs.phy  + r.mods.phy;
    c.talents = this.tempTalents.slice();
    c.age = 16;

    // 天赋效果
    c.talents.forEach(id=>{
      const t = TALENTS.find(x=>x.id===id);
      if(!t || !t.effect) return;
      const e = t.effect;
      if(e.gold) c.gold += e.gold;
      if(e.mag) c.mag += e.mag;
      if(e.int) c.int += e.int;
      if(e.phy) c.phy += e.phy;
      if(e.luck) c.luck += e.luck;
      if(e.charm) c.charm += e.charm;
      if(e.defense) c.defense += e.defense;
      if(e.dodge) c.dodge += e.dodge;
      if(e.knowledge) c.knowledge += e.knowledge;
      if(e.persuade) c.persuade += e.persuade;
      if(e.heal) c.heal += e.heal;
      if(e.destiny) c.destiny += e.destiny;
      if(e.revive) c.revive += e.revive;
      if(e.battle) c.battle += e.battle;
      if(e.arcane) c.arcane += e.arcane;
    });
    c.gold = Math.max(0, c.gold);
    c.mag = Math.max(0, c.mag);
    c.int = Math.max(0, c.int);
    c.phy = Math.max(0, c.phy);

    c.maxHp = 60 + c.phy * 8;
    c.hp = c.maxHp;
    c.maxMp = 30 + c.mag * 10;
    c.mp = c.maxMp;
    c.birthYear = 1000 + rand(200);

    this.stage = 'play';
    this.updateHud();
    this.clearAll();
    this.showBirth();
  },

  /* ============================================================
     出生
     ============================================================ */
  showBirth(){
    const c = this.c;
    this.para('◆ 诞生 ◆', 'chapter');
    const birthLines = {
      human:'你在一座边境小镇的农舍里呱呱坠地。母亲抱着你，父亲在门外搓着手，脸上是笨拙的笑。',
      elf:'你在月桂树的树冠间醒来。精灵的长老俯视着你，眼中是千年不变的平静：「又一个要活很久的孩子。」',
      dwarf:'你在熔炉的轰鸣声中降生。父亲用粗糙的手掌把你举起来，对着炉火发誓：「这孩子会打出最好的剑。」',
      orc:'你在血与泥里出生。部落的萨满把你举向天空，嘶吼着：「又一个战士！」',
      halfling:'你出生在一个温暖的洞府里，桌上摆着刚出炉的面包。一切都刚刚好。',
      dragon:'你破壳而出，第一眼看到的是堆积如山的金币。血脉中的记忆在燃烧——你是龙的后裔。',
      demon:'你从深渊的裂缝中爬出，四周是永恒的黑暗。但你知道，你生来就该统治这里。',
      angel:'你在天界的圣光中睁开眼。羽翼第一次展开时，整个天界都安静了一瞬。',
      undead:'你记得自己死过一次。但此刻，你又睁开了眼。为什么？没有人告诉你答案。',
      fae:'你在月光下的一朵花里诞生。蝴蝶围着你转圈，森林在为你唱歌。'
    };
    this.para(birthLines[c.raceId] || '你出生了。', 'narr');
    this.para('你的父母给你取名——', 'narr');

    this.clearChoices();
    const names = {
      human:['艾德里安','莉亚','罗兰','米娅'],
      elf:['艾尔文','希尔瓦娜','莱戈拉','月影'],
      dwarf:['索林','杜林','布洛','铁须'],
      orc:['格罗姆','萨尔','卡加','血牙'],
      halfling:['比尔博','罗茜','梅里','皮平'],
      dragon:['伊格尼斯','德拉克','阿卡娜','焰心'],
      demon:['路西法','莉莉丝','阿斯塔','深渊'],
      angel:['加百列','米迦勒','塞拉菲','圣光'],
      undead:['无眠者','灰烬','残魂','白骨'],
      fae:['提坦妮娅','奥伯龙','露娜','梦境']
    };
    const pool = names[c.raceId] || ['无名者'];
    pool.forEach(nm=>{
      this.choice('「' + nm + '」', ()=>{
        c.name = nm;
        this.updateHud();
        this.clearAll();
        this.startLife();
      });
    });
    this.choice('自己起名', ()=>{
      const m = this.modal(
        '<h3>你的名字</h3>' +
        '<input id="nameInput" style="width:100%;padding:11px;border-radius:9px;border:1px solid var(--line2);background:var(--bg2);color:var(--txt);font-size:15px;font-family:inherit" maxlength="10" placeholder="输入名字（最多10字）">' +
        '<div class="btn-row"><button onclick="Game.closeModal()">取消</button>' +
        '<button class="primary" onclick="Game.confirmName()">确定</button></div>'
      );
      setTimeout(()=>{ const i=$('nameInput'); if(i) i.focus(); },100);
    });
  },

  confirmName(){
    const v = ($('nameInput')||{}).value || '';
    const nm = v.trim().slice(0,10);
    if(!nm){ this.toast('名字不能为空'); return; }
    this.c.name = nm;
    this.closeModal();
    this.updateHud();
    this.clearAll();
    this.startLife();
  },

  /* ============================================================
     人生主循环
     ============================================================ */
  startLife(){
    const c = this.c;
    this.clearAll();
    this.para('◆ 童年 ◆', 'chapter');
    this.para('十六年过去了。', 'narr');
    this.para('你长大了。' + this.childhoodText(), 'narr');
    autoSave(c);
    this.showActions();
  },

  childhoodText(){
    const c = this.c;
    const parts = [];
    if(c.gold >= 8) parts.push('你在优渥的环境里长大，从没为吃穿发过愁。');
    else if(c.gold <= 2) parts.push('你的童年是在饥饿和寒冷中度过的，你学会了在别人看不见的地方活下去。');
    else parts.push('你的家境普通，不富裕，但也不至于挨饿。');

    if(c.mag >= 8) parts.push('你很早就发现自己能听见风的声音，能看见别人看不见的光。');
    else if(c.mag <= 2) parts.push('你对魔法一窍不通，甚至有些畏惧。');

    if(c.int >= 8) parts.push('你读过很多书，镇上的老学者说你是他见过最聪明的孩子。');
    else if(c.int <= 2) parts.push('你不太识字，但你懂得很多书本里没有的东西。');

    if(c.phy >= 8) parts.push('你比同龄人高大强壮，打架从没输过。');
    else if(c.phy <= 2) parts.push('你身体孱弱，跑几步就喘，常被欺负。');

    return parts.join('');
  },

  /* ---------- 行动菜单 ---------- */
  showActions(){
    const c = this.c;
    if(!c.alive) return;
    this.clearChoices();
    this.para('—— ' + c.age + ' 岁 ——', 'sys');

    // 主线推进
    if(this.hasMainEvent()){
      const ev = MAIN_LINES[c.raceId][c.mainStage];
      const ageOk = !ev.minAge || c.age >= ev.minAge;
      const reqTxt = ageOk ? '' : ('需要 ' + ev.minAge + ' 岁');
      this.choice('📜 【主线】' + this.mainEventTitle(), ()=>this.triggerMain(),
        {cls:'special', locked:!ageOk, req:reqTxt, reqOk:ageOk});
    }

    this.choice('🎲 探索世界（随机事件）', ()=>this.randomEvent());
    this.choice('📖 修炼 / 学习', ()=>this.trainAction());
    this.choice('💼 工作赚钱', ()=>this.workAction());
    this.choice('🍺 社交活动', ()=>this.socialAction());
    if(c.age >= 18) this.choice('🏠 个人生活', ()=>this.lifeAction());
    this.choice('⏳ 平静地度过一年', ()=>this.passYear());

    // 支线
    const sub = this.availableSub();
    if(sub) this.choice('📜 【支线】' + sub.title, ()=>this.triggerSub(sub), {cls:'special'});
  },

  passYear(){
    this.advanceAge(1);
    this.para('又是一年。日子像河水一样流过去，没什么特别的。', 'think');
    this.showActions();
  },

  advanceAge(n){
    const c = this.c;
    c.age += n;
    c.eventCount += n;
    // 自然成长
    if(c.age < 30){
      if(rand(100) < 40) c.phy++;
      if(rand(100) < 40) c.int++;
      if(rand(100) < 30) c.mag++;
      if(rand(100) < 30) c.gold++;
    } else if(c.age < 60){
      if(rand(100) < 15) c.int++;
      if(rand(100) < 10) c.gold++;
      if(rand(100) < 8) c.phy--;
    } else {
      if(rand(100) < 30) c.phy--;
      if(rand(100) < 10) c.int--;
    }
    c.phy = Math.max(0, c.phy);
    c.int = Math.max(0, c.int);
    c.gold = Math.max(0, c.gold);
    c.mag = Math.max(0, c.mag);
    c.maxHp = 60 + c.phy * 8;
    c.hp = Math.min(c.hp, c.maxHp);
    c.maxMp = 30 + c.mag * 10;
    c.mp = Math.min(c.mp, c.maxMp);
    this.updateHud();
    autoSave(c);

    // 寿终
    if(c.age >= c.lifespans[1]){
      this.die('寿终正寝');
      return true;
    }
    // 衰老死亡概率
    if(c.age >= c.lifespans[0]){
      const over = (c.age - c.lifespans[0]) / Math.max(1, c.lifespans[1]-c.lifespans[0]);
      if(rand(100) < over * 30){
        this.die('年老体衰');
        return true;
      }
    }
    return false;
  },

  /* ============================================================
     随机事件
     ============================================================ */
  randomEvent(){
    if(this.advanceAge(1)) return;
    const c = this.c;
    this.clearAll();
    // 按种族权重抽取事件
    const pool = EVENTS.concat(EVENTS_MORE).filter(e=>{
      if(e.race && e.race.indexOf(c.raceId)<0) return false;
      if(e.minAge && c.age < e.minAge) return false;
      if(e.maxAge && c.age > e.maxAge) return false;
      if(e.cond && !e.cond(c)) return false;
      return true;
    });
    if(pool.length===0){ this.para('这一年风平浪静。', 'think'); this.showActions(); return; }
    const ev = pick(pool);
    this.para('◆ ' + ev.title + ' ◆', 'chapter');
    this.renderEvent(ev);
  },

  renderEvent(ev){
    const c = this.c;
    (ev.text||[]).forEach(t=>{
      this.para(typeof t === 'function' ? t(c) : t, 'narr');
    });
    this.clearChoices();
    if(ev.choices){
      ev.choices.forEach(ch=>{
        let locked = false, reqText = '', reqOk = false;
        if(ch.req){
          const v = c[ch.req.attr] || 0;
          reqOk = v >= ch.req.val;
          locked = !reqOk;
          reqText = '需要 ' + ATTR_INFO[ch.req.attr].name + ' ≥ ' + ch.req.val + '（当前 ' + v + '）';
        }
        this.choice(ch.label, ()=>this.resolveChoice(ch), {
          locked, req:reqText, reqOk, cls:ch.cls
        });
      });
    } else {
      this.choice('继续', ()=>this.showActions());
    }
  },

  resolveChoice(ch){
    const c = this.c;
    this.clearChoices();
    if(ch.check){
      // 掷骰判定
      const r = check(c, ch.check.attr, ch.check.dc, ch.check.bonus||0);
      this.para('🎲 掷骰：<span class="dice-roll">' + r.dice + '</span> + ' + r.bonus + ' = <b>' + r.total + '</b>  vs  难度 ' + r.dc, 'dice');
      if(r.crit) this.para('大成功！命运站在你这边。', 'good');
      else if(r.fumble) this.para('大失败……事情朝着最糟的方向滑去。', 'bad');
      if(r.success){
        this.applyEffect(ch.success || {});
        if(ch.successText) this.para(ch.successText, 'good');
      } else {
        this.applyEffect(ch.fail || {});
        if(ch.failText) this.para(ch.failText, 'bad');
      }
    } else {
      if(ch.text) this.para(ch.text, 'narr');
      this.applyEffect(ch.effect || {});
    }
    if(c.alive) this.showActions();
  },

  applyEffect(e){
    const c = this.c;
    const changes = [];
    if(e.gold){ c.gold = Math.max(0, c.gold + e.gold); changes.push('家底 ' + (e.gold>0?'+':'') + e.gold); }
    if(e.mag){ c.mag = Math.max(0, c.mag + e.mag); changes.push('魔法 ' + (e.mag>0?'+':'') + e.mag); }
    if(e.int){ c.int = Math.max(0, c.int + e.int); changes.push('智力 ' + (e.int>0?'+':'') + e.int); }
    if(e.phy){ c.phy = Math.max(0, c.phy + e.phy); changes.push('体魄 ' + (e.phy>0?'+':'') + e.phy); }
    if(e.hp){ c.hp = clamp(c.hp + e.hp, 0, c.maxHp); changes.push('生命 ' + (e.hp>0?'+':'') + e.hp); }
    if(e.mp){ c.mp = clamp(c.mp + e.mp, 0, c.maxMp); changes.push('魔力 ' + (e.mp>0?'+':'') + e.mp); }
    if(e.rep){ c.reputation += e.rep; changes.push('声望 ' + (e.rep>0?'+':'') + e.rep); }
    if(e.karma){ c.karma += e.karma; }
    if(e.title){ c.title = e.title; changes.push('获得称号「' + e.title + '」'); }
    if(e.job){ c.job = e.job; changes.push('职业：' + e.job); }
    if(e.spouse){ c.spouse = e.spouse; changes.push('与 ' + e.spouse + ' 结为伴侣'); }
    if(e.child){ c.children += e.child; changes.push('子女 +' + e.child); }
    if(changes.length) this.para('【' + changes.join(' · ') + '】', 'sys');
    c.maxHp = 60 + c.phy * 8;
    c.maxMp = 30 + c.mag * 10;
    this.updateHud();
    autoSave(c);
    if(c.hp <= 0){ this.die('伤重不治'); }
  },

  /* ============================================================
     修炼 / 工作 / 社交 / 生活
     ============================================================ */
  trainAction(){
    if(this.advanceAge(1)) return;
    this.clearAll();
    this.para('◆ 修炼 ◆', 'chapter');
    this.para('你决定把这一年用在提升自己上。', 'narr');
    this.clearChoices();
    const opts = [
      {label:'📚 研读古籍（智力）', attr:'int', dc:10, eff:{int:1}},
      {label:'⚔️ 锻炼身体（体魄）', attr:'phy', dc:10, eff:{phy:1}},
      {label:'✨ 冥想修炼（魔法）', attr:'mag', dc:10, eff:{mag:1}},
      {label:'💰 学习经商（家底）', attr:'gold', dc:10, eff:{gold:1}},
    ];
    opts.forEach(o=>{
      this.choice(o.label + ' · 难度 ' + o.dc, ()=>{
        this.clearChoices();
        const r = check(this.c, o.attr, o.dc, 0);
        this.para('🎲 掷骰：' + r.dice + ' + ' + r.bonus + ' = <b>' + r.total + '</b> vs ' + r.dc, 'dice');
        if(r.success){
          this.applyEffect(o.eff);
          this.para('这一年没有白费，你感到自己变强了。', 'good');
        } else {
          this.para('你努力了，但收效甚微。', 'bad');
        }
        if(this.c.alive) this.showActions();
      });
    });
    this.choice('← 返回', ()=>this.showActions());
  },

  workAction(){
    if(this.advanceAge(1)) return;
    this.clearAll();
    this.para('◆ 工作 ◆', 'chapter');
    const c = this.c;
    this.para('你开始寻找谋生的方式。', 'narr');
    this.clearChoices();
    const jobs = [
      {label:'🧑‍🌾 务农 / 打零工', attr:'phy', dc:8, gain:2, desc:'辛苦，但稳定'},
      {label:'⚒️ 工匠学徒', attr:'phy', dc:12, gain:4, desc:'需要一定体力'},
      {label:'📜 抄写员 / 学者助手', attr:'int', dc:12, gain:4, desc:'需要一定智力'},
      {label:'🔮 魔法学徒', attr:'mag', dc:14, gain:6, desc:'需要较高魔法'},
      {label:'🗡️ 佣兵 / 冒险者', attr:'phy', dc:15, gain:8, desc:'危险，报酬高'},
    ];
    jobs.forEach(j=>{
      const v = c[j.attr] || 0;
      const locked = v < 4;
      this.choice(j.label + '（' + j.desc + '）', ()=>{
        this.clearChoices();
        const r = check(c, j.attr, j.dc, 0);
        this.para('🎲 掷骰：' + r.dice + ' + ' + r.bonus + ' = <b>' + r.total + '</b> vs ' + r.dc, 'dice');
        if(r.success){
          const gain = j.gain + Math.floor(v/3);
          this.applyEffect({gold:gain});
          this.para('你干得不错，赚到了 ' + gain + ' 枚金币。', 'good');
        } else {
          this.para('你没能胜任，只勉强糊口。', 'bad');
          this.applyEffect({gold:1});
        }
        if(this.c.alive) this.showActions();
      }, {locked, req: locked ? '需要 ' + ATTR_INFO[j.attr].name + ' ≥ 4' : '', reqOk:!locked});
    });
    this.choice('← 返回', ()=>this.showActions());
  },

  socialAction(){
    if(this.advanceAge(1)) return;
    this.clearAll();
    this.para('◆ 社交 ◆', 'chapter');
    this.para('你走进镇上的酒馆，那里总是热闹的。', 'narr');
    this.clearChoices();
    this.choice('🍺 和陌生人搭话', ()=>{
      this.clearChoices();
      const r = check(this.c, 'int', 11, this.c.charm/5);
      this.para('🎲 掷骰：' + r.dice + ' + ' + r.bonus + ' = <b>' + r.total + '</b> vs 11', 'dice');
      if(r.success){
        this.para('你们聊得很投机，成了朋友。', 'good');
        this.applyEffect({rep:1, gold:1});
      } else {
        this.para('对方觉得你很无趣，转身走了。', 'bad');
      }
      if(this.c.alive) this.showActions();
    });
    this.choice('🎭 打听消息', ()=>{
      this.clearChoices();
      const r = check(this.c, 'gold', 10, 0);
      this.para('🎲 掷骰：' + r.dice + ' + ' + r.bonus + ' = <b>' + r.total + '</b> vs 10', 'dice');
      if(r.success){
        this.para('你听到了一些有趣的传闻，也许以后用得上。', 'good');
        this.c.flags.heardRumor = true;
      } else {
        this.para('酒馆里的人对你守口如瓶。', 'bad');
      }
      if(this.c.alive) this.showActions();
    });
    this.choice('← 返回', ()=>this.showActions());
  },

  /* ---------- 自然遇见伴侣 ---------- */
  meetSomeone(){
    const c = this.c;
    this.clearAll();
    this.para('◆ 邂逅 ◆', 'chapter');
    // 异性概率 85%，同性 15%（极小但存在）
    const sameSex = (c.gender==='男'||c.gender==='女') ? (rand(100) < 15) : (rand(100) < 50);
    let targetGender;
    if(c.gender==='男') targetGender = sameSex ? '男' : '女';
    else if(c.gender==='女') targetGender = sameSex ? '女' : '男';
    else targetGender = pick(['男','女']);

    const FEM = ['艾琳','卡莲','露娜','希尔','米拉','诺亚','莉薇娅','瑟琳','薇拉','伊莎'];
    const MALE = ['亚瑟','雷恩','凯尔','伊恩','阿尔文','诺兰','塞德里克','卢卡斯','格温','奥利'];
    const nm = pick(targetGender==='女' ? FEM : MALE);
    const pronoun = targetGender==='女' ? '她' : '他';

    const scenes = [
      '在一场雨里，你们躲进了同一个屋檐下。' + pronoun + '抬头看你，笑了笑。',
      '集市上人挤人，你和一个陌生人撞了个满怀。东西撒了一地，你们同时蹲下去捡。',
      '深夜的酒馆，' + pronoun + '坐在角落里，一个人喝着闷酒。你鬼使神差地坐到了对面。',
      '你在图书馆找一本书，' + pronoun + '的手同时伸向了同一本书的同一页。',
      '旅途中，你们成了同路的伙伴。走了三天，话不多，但很舒服。',
      '一场葬礼上，所有人都走了，只剩下你们两个。' + pronoun + '说："你也不认识死者吧。"'
    ];
    this.para(pick(scenes), 'narr');
    this.para('那个人叫 <b>' + nm + '</b>，是个' + targetGender + '性。', 'sys');

    this.clearChoices();
    this.choice('💗 主动告白', ()=>{
      this.clearChoices();
      const r = check(c, 'int', 13, c.charm/4);
      this.para('🎲 掷骰：' + r.dice + ' + ' + r.bonus + ' = <b>' + r.total + '</b> vs 13', 'dice');
      if(r.success){
        c.spouseGender = targetGender;
        this.applyEffect({spouse:nm, rep:1});
        this.para(nm + '愣了一下，然后笑了。"我等这句话很久了。"', 'good');
      } else {
        this.para(nm + '沉默了一会儿，轻轻摇了摇头。"对不起。"', 'bad');
        this.para('你们还是朋友，但也就只是朋友了。', 'think');
      }
      if(this.c.alive) this.showActions();
    }, {cls:'special'});

    this.choice('😊 等对方开口', ()=>{
      this.clearChoices();
      const r = check(c, 'gold', 12, c.charm/5);
      this.para('🎲 掷骰：' + r.dice + ' + ' + r.bonus + ' = <b>' + r.total + '</b> vs 12', 'dice');
      if(r.success){
        c.spouseGender = targetGender;
        this.applyEffect({spouse:nm, rep:1});
        this.para('几天后，' + nm + '找到了你，红着脸说了一句话。你答应了。', 'good');
      } else {
        this.para('你等了很久，' + nm + '始终没有开口。后来，' + pronoun + '离开了这座城。', 'think');
      }
      if(this.c.alive) this.showActions();
    });

    this.choice('🚶 就这样吧（跳过）', ()=>{
      this.clearChoices();
      this.para('你转过身，走进了人群。有些人，注定只是路过。', 'think');
      c.flags.skipped = (c.flags.skipped||0) + 1;
      if(this.c.alive) this.showActions();
    });

    this.choice('← 返回', ()=>this.showActions());
  },

  lifeAction(){
    if(this.advanceAge(1)) return;
    this.clearAll();
    this.para('◆ 个人生活 ◆', 'chapter');
    const c = this.c;
    this.clearChoices();
    if(!c.spouse){
      this.choice('💕 出门走走（也许会遇见谁）', ()=>this.meetSomeone());
    } else {
      this.choice('👶 生育子女', ()=>{
        this.clearChoices();
        this.applyEffect({child:1, hp:-10});
        this.para('一个新的生命来到了这个世界。', 'good');
        if(this.c.alive) this.showActions();
      });
      this.choice('🏡 陪伴家人', ()=>{
        this.clearChoices();
        this.applyEffect({hp:20, rep:1});
        this.para('平静的时光，让你恢复了元气。', 'good');
        if(this.c.alive) this.showActions();
      });
    }
    this.choice('← 返回', ()=>this.showActions());
  },

  /* ============================================================
     主线剧情
     ============================================================ */
  hasMainEvent(){
    const c = this.c;
    const stage = MAIN_LINES[c.raceId];
    if(!stage) return false;
    return c.mainStage < stage.length;
  },
  mainEventTitle(){
    const c = this.c;
    const stage = MAIN_LINES[c.raceId];
    if(!stage || c.mainStage >= stage.length) return '';
    return stage[c.mainStage].title;
  },
  triggerMain(){
    const c = this.c;
    const stage = MAIN_LINES[c.raceId];
    if(!stage || c.mainStage >= stage.length) return;
    const ev = stage[c.mainStage];
    if(ev.minAge && c.age < ev.minAge){
      this.para('时机未到。你还需要再等一等。', 'think');
      return;
    }
    this.clearAll();
    this.para('◆ 主线 · ' + ev.title + ' ◆', 'chapter');
    (ev.text||[]).forEach(t=>this.para(typeof t==='function'?t(c):t, 'narr'));
    this.clearChoices();
    ev.choices.forEach(ch=>{
      let locked=false, reqText='', reqOk=false;
      if(ch.req){
        const v = c[ch.req.attr]||0;
        reqOk = v>=ch.req.val; locked=!reqOk;
        reqText = '需要 '+ATTR_INFO[ch.req.attr].name+' ≥ '+ch.req.val+'（当前 '+v+'）';
      }
      this.choice(ch.label, ()=>{
        this.clearChoices();
        if(ch.check){
          const r = check(c, ch.check.attr, ch.check.dc, ch.check.bonus||0);
          this.para('🎲 掷骰：<span class="dice-roll">'+r.dice+'</span> + '+r.bonus+' = <b>'+r.total+'</b> vs '+r.dc, 'dice');
          if(r.success){ this.applyEffect(ch.success||{}); if(ch.successText) this.para(ch.successText,'good'); }
          else { this.applyEffect(ch.fail||{}); if(ch.failText) this.para(ch.failText,'bad'); }
        } else {
          if(ch.text) this.para(ch.text,'narr');
          this.applyEffect(ch.effect||{});
        }
        c.mainStage++;
        autoSave(c);
        if(c.alive) this.showActions();
      }, {locked, req:reqText, reqOk, cls:ch.cls});
    });
  },

  /* ============================================================
     支线
     ============================================================ */
  availableSub(){
    const c = this.c;
    const list = SUBS.concat(SUBS_MORE).filter(s=>{
      if(c.subStage[s.id]) return false;
      if(s.race && s.race.indexOf(c.raceId)<0) return false;
      if(s.minAge && c.age < s.minAge) return false;
      if(s.cond && !s.cond(c)) return false;
      return true;
    });
    return list.length ? pick(list) : null;
  },
  triggerSub(sub){
    const c = this.c;
    this.clearAll();
    this.para('◆ 支线 · ' + sub.title + ' ◆', 'chapter');
    (sub.text||[]).forEach(t=>this.para(typeof t==='function'?t(c):t, 'narr'));
    this.clearChoices();
    sub.choices.forEach(ch=>{
      let locked=false, reqText='', reqOk=false;
      if(ch.req){
        const v = c[ch.req.attr]||0;
        reqOk = v>=ch.req.val; locked=!reqOk;
        reqText = '需要 '+ATTR_INFO[ch.req.attr].name+' ≥ '+ch.req.val+'（当前 '+v+'）';
      }
      this.choice(ch.label, ()=>{
        this.clearChoices();
        if(ch.check){
          const r = check(c, ch.check.attr, ch.check.dc, ch.check.bonus||0);
          this.para('🎲 掷骰：'+r.dice+' + '+r.bonus+' = <b>'+r.total+'</b> vs '+r.dc, 'dice');
          if(r.success){ this.applyEffect(ch.success||{}); if(ch.successText) this.para(ch.successText,'good'); }
          else { this.applyEffect(ch.fail||{}); if(ch.failText) this.para(ch.failText,'bad'); }
        } else {
          if(ch.text) this.para(ch.text,'narr');
          this.applyEffect(ch.effect||{});
        }
        c.subStage[sub.id] = true;
        autoSave(c);
        if(c.alive) this.showActions();
      }, {locked, req:reqText, reqOk, cls:ch.cls});
    });
  },

  /* ============================================================
     死亡
     ============================================================ */
  die(reason){
    const c = this.c;
    if(!c.alive) return;
    // 复活判定
    if(c.revive > 0 && !c.usedRevive && rand(100) < c.revive){
      c.usedRevive = true;
      c.hp = Math.floor(c.maxHp * 0.3);
      this.para('……', 'narr');
      this.para('黑暗吞没了你。但就在那一瞬间，有什么东西把你拽了回来。', 'gold');
      this.para('你猛地睁开眼，大口喘息。你还活着。', 'good');
      this.updateHud();
      autoSave(c);
      this.showActions();
      return;
    }
    c.alive = false;
    c.deathReason = reason;
    this.stage = 'dead';
    this.showDeath();
  },

  showDeath(){
    const c = this.c;
    this.clearAll();
    this.clearChoices();
    $('hud').style.display = 'none';

    this.para('◆ 终章 ◆', 'chapter');
    this.para('你的一生结束了。', 'narr');
    this.para('死因：' + c.deathReason, 'bad');

    // 评价
    let score = 0;
    score += c.gold * 2 + c.mag * 2 + c.int * 2 + c.phy * 2;
    score += c.reputation * 3;
    score += c.children * 10;
    if(c.spouse) score += 20;
    score += c.mainStage * 25;
    score += Object.keys(c.subStage).length * 10;
    score += Math.floor(c.age / 10) * 5;

    let rank, rankColor, comment;
    if(score >= 400){ rank='S'; rankColor='#ffd700'; comment='传奇。你的名字将被吟游诗人传唱千年。'; }
    else if(score >= 280){ rank='A'; rankColor='#a78bfa'; comment='伟大。你活出了许多人梦寐以求的一生。'; }
    else if(score >= 180){ rank='B'; rankColor='#6fe0e0'; comment='不凡。你留下了属于自己的痕迹。'; }
    else if(score >= 100){ rank='C'; rankColor='#7ee787'; comment='平凡。但你认真地活过了。'; }
    else if(score >= 50){ rank='D'; rankColor='#9b93c4'; comment='短暂。像一颗划过夜空的流星。'; }
    else { rank='E'; rankColor='#6d6596'; comment='匆匆。这个世界还没来得及记住你。'; }

    // 墓志铭
    const epitaphs = {
      '寿终正寝':'「他/她活到了最后一刻，然后安静地睡去。」',
      '年老体衰':'「时间是最公平的杀手。」',
      '伤重不治':'「伤口太深了，连神明也无力回天。」',
      '自我了断':'「他/她选择了自己的结局。」',
    };
    c.epitaph = epitaphs[c.deathReason] || '「这里长眠着一个曾经活过的人。」';

    let h = '<div style="text-align:center;margin:20px 0">';
    h += '<div style="font-size:64px;font-weight:900;color:' + rankColor + ';text-shadow:0 0 30px ' + rankColor + '66;line-height:1">' + rank + '</div>';
    h += '<div style="font-size:13px;color:var(--dim);margin-top:4px">人生评价</div>';
    h += '</div>';
    h += '<div class="epitaph">' + c.epitaph + '</div>';
    const gtxt = c.gender==='男' ? ' ♂ 男' : c.gender==='女' ? ' ♀ 女' : c.gender==='无' ? ' ⚧ 无' : '';
    h += '<div class="summary-box"><div class="sb-title">' + esc(c.name) + gtxt + ' · ' + (c.race?c.race.name:'?') + '</div>';
    h += '<div class="sb-row"><span class="k">享年</span><span class="v">' + c.age + ' 岁</span></div>';
    h += '<div class="sb-row"><span class="k">死因</span><span class="v">' + c.deathReason + '</span></div>';
    h += '<div class="sb-row"><span class="k">称号</span><span class="v">' + (c.title||'无') + '</span></div>';
    h += '<div class="sb-row"><span class="k">家底</span><span class="v">' + c.gold + '</span></div>';
    h += '<div class="sb-row"><span class="k">魔法</span><span class="v">' + c.mag + '</span></div>';
    h += '<div class="sb-row"><span class="k">智力</span><span class="v">' + c.int + '</span></div>';
    h += '<div class="sb-row"><span class="k">体魄</span><span class="v">' + c.phy + '</span></div>';
    h += '<div class="sb-row"><span class="k">声望</span><span class="v">' + c.reputation + '</span></div>';
    h += '<div class="sb-row"><span class="k">主线进度</span><span class="v">' + c.mainStage + ' 章</span></div>';
    h += '<div class="sb-row"><span class="k">支线完成</span><span class="v">' + Object.keys(c.subStage).length + ' 个</span></div>';
    if(c.spouse) h += '<div class="sb-row"><span class="k">配偶</span><span class="v">' + c.spouse + '</span></div>';
    h += '<div class="sb-row"><span class="k">子女</span><span class="v">' + c.children + ' 人</span></div>';
    h += '</div>';
    h += '<div style="text-align:center;color:var(--dim);font-size:13px;margin:16px 0">' + comment + '</div>';

    const div = document.createElement('div');
    div.innerHTML = h;
    $('stage').appendChild(div);

    this.clearChoices();
    this.choice('🔄 开始新的一生', ()=>{
      try{ localStorage.removeItem(AUTO_KEY); }catch(e){}
      this.showTitle();
    }, {cls:'special'});
    this.choice('💾 查看存档', ()=>this.openSave());
  },

  resume(){
    // 读档后恢复
    this.showActions();
  }
};

window.Game = Game;
document.addEventListener('DOMContentLoaded', ()=>Game.init());
