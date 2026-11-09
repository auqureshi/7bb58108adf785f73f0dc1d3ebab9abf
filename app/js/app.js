/* The Comeback: session app. Vanilla JS + Motion (motion.dev) for animation. */
(function () {
  'use strict';

  var M = window.Motion || null;
  var RM = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var EX = window.EXERCISES, S = window.SESSION, PLAN = window.PLAN, PR = window.PROGRESS;
  var ALL_ATH = window.ATHLETES, BODY = window.BODY;
  var ATH = S.athletes ? ALL_ATH.filter(function (a) { return S.athletes.indexOf(a.id) > -1; }) : ALL_ATH;
  var athletesOf = function (sess) { return sess.athletes ? ALL_ATH.filter(function (a) { return sess.athletes.indexOf(a.id) > -1; }) : ALL_ATH; };

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var athName = function (id) { return (ALL_ATH.filter(function (a) { return a.id === id; })[0] || {}).name || id; };
  var other = function (id) { return id === ALL_ATH[0].id ? ALL_ATH[1].id : ALL_ATH[0].id; };

  var MUSCLE = {
    quadriceps: 'Quads', gluteal: 'Glutes', hamstring: 'Hamstrings', adductor: 'Inner thighs', calves: 'Calves',
    abs: 'Abs', obliques: 'Obliques', 'lower-back': 'Lower back', 'upper-back': 'Upper back & lats', trapezius: 'Traps',
    chest: 'Chest', 'front-deltoids': 'Front shoulders', 'back-deltoids': 'Rear shoulders', biceps: 'Biceps',
    triceps: 'Triceps', forearm: 'Forearms & grip', neck: 'Neck'
  };
  var GOAL = { strong: 'Strong', lean: 'Lean', functional: 'Functional', mobility: 'Mobility' };
  var polyMuscle = function (k) {
    if (k === 'abductors') return 'adductor';
    if (k === 'left-soleus' || k === 'right-soleus') return 'calves';
    return k;
  };

  /* ---------- State (one viewer's browser only) ---------- */
  var KEY = 'comeback:' + S.id;
  var state = (function () {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  })();
  state.log = state.log || {};
  state.warm = state.warm || {};
  state.cool = state.cool || {};
  state.relay = state.relay || { starter: ATH[0].id, t0: null, splits: [] };
  state.timer = state.timer || { t0: null, stopped: null, done: false };
  state.wrap = state.wrap || {};
  ATH.forEach(function (a) { state.wrap[a.id] = state.wrap[a.id] || { hard: 6, hurt: '' }; });
  state.notes = state.notes || '';
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* storage unavailable */ } }
  function L(code, ath) {
    state.log[code] = state.log[code] || {};
    state.log[code][ath] = state.log[code][ath] || { w: '', sets: [], feel: '', v: 0 };
    return state.log[code][ath];
  }

  var ui = { view: 'today', filter: 'all', pick: null };

  /* ---------- Motion helpers ---------- */
  function anim(el, kf, opts) {
    if (!M || RM || !el || (el.length === 0)) return null;
    try { return M.animate(el, kf, opts || {}); } catch (e) { return null; }
  }
  function revealIn(root) {
    if (!M || RM) return;
    var els = $$('[data-rise]', root);
    if (els.length) anim(els, { opacity: [0, 1], y: [14, 0] }, { duration: 0.45, delay: M.stagger(0.05), ease: [0.22, 1, 0.36, 1] });
  }

  /* ---------- Body map ---------- */
  function bodySVG(view, weights, pick) {
    var label = view === 'anterior' ? 'Front' : 'Back';
    var polys = BODY[view].map(function (it) {
      var mk = polyMuscle(it.m);
      var inert = it.m === 'head' || it.m === 'knees' || (it.m === 'neck' && !weights[mk] && !pick);
      var w = inert ? 0 : (weights[mk] || 0);
      var cls = 'mus' + (inert ? ' inert' : '') + (w > 0 ? ' on' : '') + (pick && ui.pick === mk ? ' sel' : '');
      var pct = Math.round(Math.max(0.18, w) * 100);
      return it.p.map(function (pts) {
        return '<polygon points="' + pts + '" class="' + cls + '" data-m="' + mk + '" style="--pct:' + pct + '%"' +
          (pick && !inert ? ' data-pick="' + mk + '"' : '') + '><title>' + esc(MUSCLE[mk] || mk) + '</title></polygon>';
      }).join('');
    }).join('');
    return '<figure><svg viewBox="0 0 100 200" class="body" role="img" aria-label="' + label + ' view">' + polys + '</svg><figcaption>' + label + '</figcaption></figure>';
  }
  function bodyMap(weights, opts) {
    opts = opts || {};
    return '<div class="bodymap' + (opts.lg ? ' lg' : '') + (opts.pick ? ' pick' : '') + '">' +
      bodySVG('anterior', weights, opts.pick) + bodySVG('posterior', weights, opts.pick) + '</div>';
  }
  function exWeights(e) {
    var w = {};
    e.secondary.forEach(function (m) { w[m] = 0.42; });
    e.primary.forEach(function (m) { w[m] = 1; });
    return w;
  }
  function sessionHeat() {
    var w = {};
    function add(id, sets) {
      var e = EX[id]; if (!e) return;
      e.primary.forEach(function (m) { w[m] = (w[m] || 0) + sets; });
      e.secondary.forEach(function (m) { w[m] = (w[m] || 0) + sets * 0.4; });
    }
    S.blocks.forEach(function (b) { b.items.forEach(function (i) { add(i.ex, i.sets); }); });
    add(S.finisher.ex, 2);
    var max = Math.max.apply(null, Object.keys(w).map(function (k) { return w[k]; }));
    Object.keys(w).forEach(function (k) { w[k] = w[k] / max; });
    return w;
  }

  /* ---------- Demo (two-frame motion) ---------- */
  var TALL = ['split-squat', 'trap-bar-deadlift', 'landmine-rotation'];
  function demo(id, opts) {
    opts = opts || {};
    var e = EX[id];
    var tagName = opts.button ? 'button' : 'div';
    var attrs = opts.button ? ' type="button" data-open="' + id + '" aria-label="How to do ' + esc(e.name) + '"' : '';
    if (e.img === false) {
      return '<' + tagName + ' class="demo noimg"' + attrs + '>' + bodyMap(exWeights(e)) +
        '<span class="tag">' + esc(e.pattern) + '</span>' + (opts.button ? '<span class="play">How to</span>' : '') + '</' + tagName + '>';
    }
    var tall = TALL.indexOf(id) > -1 ? ' tall' : '';
    return '<' + tagName + ' class="demo' + tall + '" data-demo' + attrs + '>' +
      '<img src="img/' + id + '-0.jpg" alt="' + esc(e.name) + ': start position" loading="lazy" width="560" height="373">' +
      '<img class="f1" src="img/' + id + '-1.jpg" alt="" aria-hidden="true" loading="lazy" width="560" height="373">' +
      '<span class="tag t0">Start</span><span class="tag t1">Finish</span>' +
      (opts.button ? '<span class="play">How to</span>' : '') +
      '</' + tagName + '>';
  }
  function wireDemos(root) {
    $$('[data-demo]:not([data-wired])', root).forEach(function (el) {
      el.setAttribute('data-wired', '1');
      if (!M || RM) {
        el.classList.add('static');
        if (el.tagName !== 'BUTTON' && !el.closest('button')) el.addEventListener('click', function () { el.classList.toggle('show1'); });
        return;
      }
      var f1 = $('.f1', el), t0 = $('.t0', el), t1 = $('.t1', el);
      var o = { duration: 2.8, repeat: Infinity, ease: 'easeInOut', times: [0, 0.38, 0.5, 0.88, 1] };
      M.inView(el, function () {
        var a = M.animate(f1, { opacity: [0, 0, 1, 1, 0] }, o);
        var b = M.animate(t1, { opacity: [0, 0, 1, 1, 0] }, o);
        var c = M.animate(t0, { opacity: [1, 1, 0, 0, 1] }, o);
        return function () { a.stop(); b.stop(); c.stop(); };
      }, { amount: 0.25 });
    });
  }

  /* ---------- Small builders ---------- */
  function muscleChips(e, max) {
    var p = e.primary.map(function (m) { return '<span class="chip m p">' + esc(MUSCLE[m]) + '</span>'; });
    var s = e.secondary.slice(0, max == null ? 3 : max).map(function (m) { return '<span class="chip m">' + esc(MUSCLE[m]) + '</span>'; });
    return '<div class="chips">' + p.concat(s).join('') + '</div>';
  }
  var CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="#120806" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  var FEEL = [
    { k: 'easy', t: 'Easy', s: '5+ left', a: 'Go up a step next set.' },
    { k: 'right', t: 'Right', s: '3–4 left', a: 'Perfect. This is your number.' },
    { k: 'heavy', t: 'Heavy', s: '0–2 left', a: 'Drop a step next set.' }
  ];
  function todayItems() {
    var list = [];
    S.blocks.forEach(function (b) { b.items.forEach(function (i) { list.push(i); }); });
    return list;
  }
  function itemFor(exId) { return todayItems().filter(function (i) { return i.ex === exId; })[0]; }
  function todayIds() {
    var ids = {};
    todayItems().forEach(function (i) { ids[i.ex] = 1; });
    S.warmup.items.concat(S.cooldown.items).forEach(function (i) { ids[i.ex] = 1; });
    ids[S.finisher.ex] = 1;
    return ids;
  }

  /* ---------- TODAY ---------- */
  function renderToday() {
    var heat = sessionHeat();
    var top = Object.keys(heat).sort(function (a, b) { return heat[b] - heat[a]; }).slice(0, 6);
    var h = '';
    h += '<div class="wrap">';
    h += '<div class="hero">' +
      '<p class="eyebrow" data-rise>Week ' + S.week + ' · Session ' + S.num + ' · <b>' + esc(S.dateLabel) + '</b></p>' +
      '<h1 data-rise>' + esc(S.title) + '</h1>' +
      '<div class="chips" data-rise><span class="chip hot">' + esc(S.type) + '</span><span class="chip">' + esc(S.template) + '</span><span class="chip">' + esc(S.phase) + '</span><span class="chip">~' + S.minutes + ' min</span><span class="chip">RPE ' + esc(S.rpe) + ' all session</span></div>' +
      '<p class="brief" data-rise>' + esc(S.brief) + '</p>' +
      '<ol class="jobs" data-rise>' + S.jobs.map(function (j) { return '<li>' + esc(j) + '</li>'; }).join('') + '</ol>' +
      (S.note ? '<p class="lead" data-rise>' + esc(S.note) + '</p>' : '') +
      '</div>';
    var pc = pastCards();
    if (pc) h += '<div class="sec">' + pc + '</div>';

    h += '<div class="sec"><div class="grid2">' +
      '<div class="card" data-rise><h3>What today works</h3><p class="muted small" style="margin:2px 0 12px">Brighter means more sets for that muscle.</p>' +
      '<div class="heatwrap">' + bodyMap(heat) +
      '<ul class="heat-list">' + top.map(function (m) {
        return '<li><span>' + esc(MUSCLE[m]) + '</span><span class="bar"><span style="width:' + Math.round(heat[m] * 100) + '%"></span></span></li>';
      }).join('') + '</ul></div></div>' +
      '<div class="card" data-rise><h3>Find your weight</h3><p class="muted small" style="margin:2px 0 12px">After every set, ask: how many more good reps could I have done?</p>' +
      '<div class="cal"><div class="up"><b>5+</b><span>Too light. Go up one step.</span></div>' +
      '<div class="stay"><b>3–4</b><span>Perfect. Stay. This is RPE 6–7, and it’s your number.</span></div>' +
      '<div class="down"><b>0–2</b><span>Too heavy. Drop a step.</span></div></div>' +
      '<p class="muted small" style="margin-top:12px">Tap <b>Easy</b>, <b>Right</b> or <b>Heavy</b> under each exercise and the app tells you what to do next.</p></div>' +
      '</div></div>';

    // Warm-up
    h += '<div class="sec" id="warmup"><div class="sec-head"><h2>Warm-up</h2><span class="meta">' + S.warmup.minutes + ' min' + (ATH.length > 1 ? ' · together' : '') + '</span></div>' +
      '<p class="lead"><b>First:</b> ' + esc(S.warmup.cardio) + ' <b>Then:</b> one round of the moves below' + (ATH.length > 1 ? ', following each other' : '') + '.</p>' +
      '<div class="rows">' + S.warmup.items.map(function (it, i) { return checkRow('warm', i, it); }).join('') + '</div></div>';

    // Blocks
    S.blocks.forEach(function (b) { h += renderBlock(b); });

    // Finisher
    h += S.finisher.type === 'intervals' ? renderTimer() : renderRelay();

    // Cool-down
    h += '<div class="sec" id="cooldown"><div class="sec-head"><h2>Cool-down</h2><span class="meta">' + S.cooldown.minutes + ' min</span></div>' +
      '<div class="rows">' + S.cooldown.items.map(function (it, i) { return checkRow('cool', i, it); }).join('') + '</div>' +
      '<p class="lead">' + esc(S.cooldown.extra) + '</p></div>';

    // Wrap-up
    h += '<div class="sec" id="wrapup"><div class="sec-head"><h2>Report to coach</h2><span class="meta">30 seconds</span></div>' +
      '<div class="wrapup">' + ATH.map(function (a) {
        var wv = state.wrap[a.id];
        return '<div class="log ' + a.id + '"><span class="nm">' + esc(a.name) + '</span><div style="display:grid;gap:8px">' +
          '<label class="lbl" for="hard-' + a.id + '">How hard was it overall? (1–10)</label>' +
          '<div class="range"><input type="range" min="1" max="10" id="hard-' + a.id + '" data-hard="' + a.id + '" value="' + esc(wv.hard) + '"><output class="num" id="hard-out-' + a.id + '">' + esc(wv.hard) + '</output></div>' +
          '<label class="lbl" for="hurt-' + a.id + '">Anything pinch or hurt?</label>' +
          '<input class="field" id="hurt-' + a.id + '" data-hurt="' + a.id + '" placeholder="Nothing" value="' + esc(wv.hurt) + '">' +
          '</div></div>';
      }).join('') +
      '<label class="lbl" for="notes">Anything else for the coach</label>' +
      '<textarea class="field" id="notes" data-notes placeholder="e.g. gym was busy, used the leg press instead of goblet squats">' + esc(state.notes) + '</textarea>' +
      '<div class="btns"><button class="btn go big" type="button" data-report>Build my report</button></div>' +
      '<p class="muted small">This puts your weights, sets, how each lift felt and your relay time into one message. Copy it and paste it into the chat. The coach logs it and plans Session 2.</p>' +
      '</div></div>';

    // Extras
    h += '<div class="sec">' +
      '<details class="card"><summary>Short on time? Plan B</summary><p style="margin-top:10px">' + esc(S.planB) + '</p></details>' +
      '<details class="card"><summary>Equipment taken? Swaps</summary><table class="swaps"><tbody>' +
      S.swaps.map(function (s) { return '<tr><td>' + esc(s[0]) + '</td><td>' + esc(s[1]) + '</td></tr>'; }).join('') + '</tbody></table></details>' +
      '<div class="card"><h3>The next 48 hours</h3><ul class="list" style="margin-top:8px">' + S.after.map(function (a) { return '<li>' + esc(a) + '</li>'; }).join('') + '</ul></div>' +
      '<div class="card"><h3>Next up</h3><p style="margin-top:6px">' + esc(S.next) + '</p></div>' +
      '</div>';

    h += credits() + '</div>';
    return h;
  }

  function checkRow(kind, i, it) {
    var e = EX[it.ex];
    var on = !!state[kind][i];
    return '<div class="row' + (on ? ' done' : '') + '">' +
      '<button class="thumb" type="button" data-open="' + it.ex + '" aria-label="How to do ' + esc(e.name) + '"><img src="img/' + it.ex + '-0.jpg" alt="" loading="lazy"></button>' +
      '<div><button class="name" type="button" data-open="' + it.ex + '">' + esc(e.name) + '</button><span class="dose">' + esc(it.dose) + '</span></div>' +
      '<button class="tick" type="button" data-check="' + kind + '" data-i="' + i + '" aria-pressed="' + on + '" aria-label="Mark ' + esc(e.name) + ' done">' + CHECK + '</button>' +
      '</div>';
  }

  function renderBlock(b) {
    var a0 = ATH[0], a1 = ATH[1];
    var flow = '';
    if (b.format === 'Swap Stations' && b.items.length === 2 && ATH.length === 2) {
      var i0 = b.items[0], i1 = b.items[1];
      var n0 = EX[i0.ex].name, n1 = EX[i1.ex].name;
      flow = '<div class="flow" aria-label="Round flow">' +
        '<div class="lane ' + a0.id + '"><b>' + esc(a0.name) + '</b><span class="steps"><span>' + i0.code + ' ' + esc(n0) + '</span>→<span>' + i1.code + ' ' + esc(n1) + '</span>→ rest</span></div>' +
        '<div class="lane ' + a1.id + '"><b>' + esc(a1.name) + '</b><span class="steps"><span>' + i1.code + ' ' + esc(n1) + '</span>→<span>' + i0.code + ' ' + esc(n0) + '</span>→ rest</span></div>' +
        '</div>';
    }
    var h = '<div class="sec" id="block-' + b.id + '"><article class="block" data-rise>' +
      '<header class="block-head"><span class="letter" aria-hidden="true">' + b.id + '</span><div><h3>Block ' + b.id + ' · ' + esc(b.format) + '</h3>' +
      '<p class="meta">' + b.rounds + ' rounds · ~' + b.minutes + ' min · rest ' + b.rest + ' s</p></div></header>' +
      flow +
      '<p class="block-note">' + esc(b.how) + (b.note ? ' <strong>' + esc(b.note) + '</strong>' : '') + '</p>' +
      '<div class="items">' + b.items.map(renderItem).join('') + '</div>' +
      '</article></div>';
    return h;
  }

  function renderItem(it) {
    var e = EX[it.ex];
    var logs = ATH.map(function (a) {
      var l = L(it.code, a.id);
      var sets = '';
      for (var s = 0; s < it.sets; s++) {
        var on = !!l.sets[s];
        sets += '<button class="set" type="button" data-set="' + it.code + '" data-ath="' + a.id + '" data-s="' + s + '" aria-pressed="' + on + '" aria-label="' + esc(a.name) + ' set ' + (s + 1) + ' done">' + (s + 1) + '</button>';
      }
      var feel = FEEL.map(function (f) {
        return '<button type="button" data-feel="' + f.k + '" data-code="' + it.code + '" data-ath="' + a.id + '" aria-pressed="' + (l.feel === f.k) + '">' + f.t + '<small>' + f.s + '</small></button>';
      }).join('');
      var adv = (FEEL.filter(function (f) { return f.k === l.feel; })[0] || {}).a || '';
      var variants = it.variants ? '<label class="sr" for="v-' + it.code + '-' + a.id + '">' + esc(a.name) + ' variation</label><select id="v-' + it.code + '-' + a.id + '" data-variant="' + it.code + '" data-ath="' + a.id + '">' +
        it.variants.map(function (v, vi) { return '<option value="' + vi + '"' + (l.v === vi ? ' selected' : '') + '>' + esc(v) + '</option>'; }).join('') + '</select>' : '';
      return '<div class="log ' + a.id + '"><span class="nm">' + esc(a.name) + '</span>' +
        (it.noWeight ? '<span></span>' :
        '<label class="wbox"><span class="sr">' + esc(a.name) + ' weight for ' + esc(e.name) + '</span><input id="w-' + it.code + '-' + a.id + '" data-w="' + it.code + '" data-ath="' + a.id + '" inputmode="decimal" autocomplete="off" placeholder="' + esc(/^\d/.test((it.start && it.start[a.id]) || '') ? it.start[a.id] : '—') + '" value="' + esc(l.w) + '"><span>kg</span></label>') +
        '<div class="sets">' + sets + '</div>' + variants +
        '<div class="feel" role="group" aria-label="' + esc(a.name) + ': how did it feel?">' + feel + '</div>' +
        '<p class="advice" id="adv-' + it.code + '-' + a.id + '">' + esc(adv) + '</p>' + pastLine(it, a.id) +
        '</div>';
    }).join('');
    return '<div class="item" id="item-' + it.code + '">' +
      '<div class="item-main">' + demo(it.ex, { button: true }) +
      '<div><div class="item-top"><span class="code">' + it.code + '</span><h4>' + esc(e.name) + '</h4></div>' +
      '<p class="rx"><span class="big num">' + it.sets + ' × ' + esc(it.reps) + '</span><span class="rpe">RPE ' + esc(it.rpe) + '</span><span class="hint">' + esc(it.unit) + '</span></p>' +
      muscleChips(e, 2) +
      '<p class="cue1">' + esc(e.cues[0]) + '. ' + esc(e.cues[e.cues.length - 1]) + '.</p>' +
      '<button class="more" type="button" data-open="' + it.ex + '">How to do it, and why →</button>' +
      '</div></div>' +
      '<div class="logs">' + logs + '</div>' +
      '</div>';
  }

  function pastLine(it, aid) {
    var st = it.start && it.start[aid], p = it.past && it.past[aid], tip = it.tip && it.tip[aid];
    var parts = [];
    if (st) parts.push('Start around <b>' + esc(st) + (/^\d/.test(st) ? ' kg' : '') + '</b>');
    if (p) parts.push(esc(p));
    if (tip) parts.push(esc(tip));
    return parts.length ? '<p class="past">' + parts.join(' · ') + '</p>' : '';
  }

  /* ---------- Relay ---------- */
  function fmt(ms) {
    if (ms == null || isNaN(ms)) return '0:00.0';
    var t = Math.max(0, ms), m = Math.floor(t / 60000), s = Math.floor((t % 60000) / 1000), d = Math.floor((t % 1000) / 100);
    return m + ':' + (s < 10 ? '0' : '') + s + '.' + d;
  }
  function legAthR(R, i) { return i % 2 === 0 ? R.starter : other(R.starter); }
  function legAth(i) { return legAthR(state.relay, i); }
  function renderRelay() {
    var F = S.finisher;
    return '<div class="sec" id="finisher"><div class="sec-head"><h2>Finisher</h2><span class="meta">~8 min · RPE ' + esc(F.rpe) + '</span></div>' +
      '<div class="relay" data-rise>' +
      '<div style="display:grid;grid-template-columns:1fr auto;gap:12px;align-items:start">' +
      '<div><p class="eyebrow">' + esc(F.name) + ' · ' + F.legs + ' × ' + esc(F.leg) + '</p><p class="small" style="margin-top:4px">' + esc(F.how) + '</p></div>' +
      '<button class="thumb" type="button" data-open="' + F.ex + '" style="width:72px;aspect-ratio:1;border-radius:10px;overflow:hidden;border:0;padding:0" aria-label="How to row"><img src="img/' + F.ex + '-0.jpg" alt="" style="width:100%;height:100%;object-fit:cover"></button>' +
      '</div>' +
      '<div class="clock num" id="clock" aria-live="off">0:00.0</div>' +
      '<p class="turn" id="turn" aria-live="polite"></p>' +
      '<div class="legs" id="legs"></div>' +
      '<div class="btns" id="relay-btns"></div>' +
      '<p class="muted small">' + esc(F.pace) + ' ' + esc(F.alt) + '</p>' +
      '</div></div>';
  }
  var relayRaf = 0;
  function relayUpdate() {
    var R = state.relay, F = S.finisher;
    var clock = $('#clock'); if (!clock) return;
    var n = R.splits.length, done = n >= F.legs, running = R.t0 && !done;
    var total = done ? R.splits[F.legs - 1] : (R.t0 ? Date.now() - R.t0 : 0);
    clock.textContent = fmt(total);
    var turn = $('#turn');
    if (!R.t0) {
      var st = R.starter;
      turn.className = 'turn ' + st;
      turn.innerHTML = '<b>' + esc(athName(st)) + '</b> rows first. Then tag ' + esc(athName(other(st))) + '. ' +
        '<span class="seg" role="group" aria-label="Who starts" style="margin-left:6px">' + ATH.map(function (a) {
          return '<button type="button" data-starter="' + a.id + '" aria-pressed="' + (st === a.id) + '">' + esc(a.name) + '</button>';
        }).join('') + '</span>';
    } else if (done) {
      turn.className = 'turn';
      turn.innerHTML = 'Done! Total <b style="color:var(--heat)">' + fmt(total) + '</b>. Log it and beat it in a few weeks.';
    } else {
      var who = legAth(n);
      turn.className = 'turn ' + who;
      turn.innerHTML = 'Rowing now: <b>' + esc(athName(who)) + '</b> · leg ' + (n + 1) + ' of ' + F.legs + ' · ' + esc(F.leg);
    }
    var legs = '';
    for (var i = 0; i < F.legs; i++) {
      var a = legAth(i), prev = i ? R.splits[i - 1] : 0;
      var cls = 'leg ' + a + (i < n ? ' done' : '') + (running && i === n ? ' now' : '');
      var txt = i < n ? fmt(R.splits[i] - prev).replace(/^0:/, ':') : (running && i === n ? '…' : '—');
      legs += '<div class="' + cls + '"><i>' + esc(athName(a)) + '</i>' + txt + '</div>';
    }
    $('#legs').innerHTML = legs;
    var btns = '';
    if (!R.t0) btns = '<button class="btn go big" type="button" data-relay="start">Start relay</button>';
    else if (!done) btns = '<button class="btn go big" type="button" data-relay="tag">Tag ' + esc(athName(legAth(n + 1))) + (n + 1 === F.legs ? ': finish' : '') + '</button><button class="btn" type="button" data-relay="undo"' + (n ? '' : ' disabled') + '>Undo tag</button><button class="btn" type="button" data-relay="reset">Reset</button>';
    else btns = '<button class="btn" type="button" data-relay="reset">Reset relay</button>';
    var bw = $('#relay-btns');
    if (bw.getAttribute('data-k') !== (R.t0 ? 1 : 0) + ':' + n + ':' + done) { bw.innerHTML = btns; bw.setAttribute('data-k', (R.t0 ? 1 : 0) + ':' + n + ':' + done); }
    cancelAnimationFrame(relayRaf);
    if (running) relayRaf = requestAnimationFrame(relayTick);
  }
  function relayTick() {
    var R = state.relay;
    var c = $('#clock');
    if (c && R.t0 && R.splits.length < S.finisher.legs) {
      c.textContent = fmt(Date.now() - R.t0);
      relayRaf = requestAnimationFrame(relayTick);
    }
  }

  /* ---------- Interval timer (boxing rounds, intervals) ---------- */
  var tl = null, timerRaf = 0, timerAC = null, LEAD = 3000;
  function timeline() {
    if (tl) return tl;
    var F = S.finisher, out = [], t = 0;
    for (var s = 0; s < F.sets; s++) {
      for (var r = 0; r < F.rounds; r++) {
        for (var k = 0; k < F.segments.length; k++) {
          var g = F.segments[k];
          out.push({ label: g.label, rest: !!g.rest, start: t, secs: g.secs, set: s + 1, round: r + 1 });
          t += g.secs * 1000;
        }
      }
      if (s < F.sets - 1 && F.setRest) { out.push({ label: 'Rest between sets', rest: true, start: t, secs: F.setRest, set: s + 1, round: F.rounds }); t += F.setRest * 1000; }
    }
    while (out.length && out[out.length - 1].rest) { t -= out.pop().secs * 1000; }
    tl = { segs: out, total: t };
    return tl;
  }
  function fmtS(ms) { var x = Math.max(0, Math.ceil(ms / 1000)); return Math.floor(x / 60) + ':' + (x % 60 < 10 ? '0' : '') + (x % 60); }
  function renderTimer() {
    var F = S.finisher, T = timeline();
    return '<div class="sec" id="finisher"><div class="sec-head"><h2>Finisher</h2><span class="meta">~' + Math.round(T.total / 60000) + ' min · RPE ' + esc(F.rpe) + '</span></div>' +
      '<div class="relay timer" id="timer" data-rise>' +
      '<div style="display:grid;grid-template-columns:1fr auto;gap:12px;align-items:start">' +
      '<div><p class="eyebrow">' + esc(F.name) + ' · ' + F.sets + ' sets × ' + F.rounds + ' rounds</p><p class="small" style="margin-top:4px">' + esc(F.how) + '</p></div>' +
      '<button class="more" type="button" data-open="' + F.ex + '" style="margin:0">How to →</button></div>' +
      '<div class="tl-plan">' + F.segments.map(function (g) { return '<span class="chip' + (g.rest ? '' : ' hot') + '">' + g.secs + ' s ' + esc(g.label) + '</span>'; }).join('') +
      '<span class="chip">× ' + F.rounds + ' = 1 set</span>' + (F.setRest ? '<span class="chip">' + F.setRest + ' s between sets</span>' : '') + '</div>' +
      '<p class="tl-phase" id="tl-phase">Ready</p>' +
      '<div class="clock num" id="tl-clock">' + fmtS(T.segs[0].secs * 1000) + '</div>' +
      '<div class="tl-bar" aria-hidden="true"><span id="tl-fill"></span></div>' +
      '<p class="turn" id="tl-meta" aria-live="polite"></p>' +
      '<div class="btns" id="tl-btns"></div>' +
      '<p class="muted small">' + esc(F.pace) + ' ' + esc(F.alt) + '</p>' +
      '</div></div>';
  }
  function timerUpdate() {
    var T = timeline(), F = S.finisher, st = state.timer, box = $('#timer');
    if (!box) return;
    var phase = $('#tl-phase'), clock = $('#tl-clock'), fill = $('#tl-fill'), meta = $('#tl-meta');
    var running = !!st.t0 && !st.done;
    var e = running ? Date.now() - st.t0 : 0;
    if (running && e >= T.total) { st.done = true; st.t0 = null; save(); running = false; }
    var label, left, pct = 0, cls = '', metaTxt;
    if (st.done) {
      label = 'Done!'; left = 0; pct = 100; cls = 'fin'; metaTxt = 'All ' + F.sets + ' sets finished. Great work, both of you.';
    } else if (!running) {
      label = st.stopped ? 'Stopped' : 'Ready'; left = T.segs[0].secs * 1000;
      metaTxt = st.stopped ? 'Stopped in set ' + st.stopped.set + ' of ' + F.sets + '. Start again whenever you’re ready.' : 'Press start, then you get 3 seconds to get in your stance.';
    } else if (e < 0) {
      label = 'Get ready'; left = -e; cls = 'rest'; metaTxt = 'First up: ' + T.segs[0].label;
    } else {
      var i = 0; while (i < T.segs.length - 1 && T.segs[i + 1].start <= e) i++;
      var g = T.segs[i], into = e - g.start, nx = T.segs[i + 1];
      label = g.label; left = g.secs * 1000 - into; pct = Math.min(100, into / (g.secs * 10)); cls = g.rest ? 'rest' : 'work';
      metaTxt = 'Set ' + g.set + ' of ' + F.sets + ' · Round ' + g.round + ' of ' + F.rounds + (nx ? ' · Next: ' + nx.label : ' · Last one!');
      if (box.getAttribute('data-seg') !== String(i)) { box.setAttribute('data-seg', String(i)); anim(phase, { scale: [1.15, 1], opacity: [0.4, 1] }, { duration: 0.3 }); }
    }
    box.className = 'relay timer ' + cls;
    if (phase.textContent !== label) phase.textContent = label;
    clock.textContent = fmtS(left);
    fill.style.width = pct + '%';
    if (meta.textContent !== metaTxt) meta.textContent = metaTxt;
    var key = running ? 'run' : (st.done ? 'done' : (st.stopped ? 'stopped' : 'idle'));
    var bw = $('#tl-btns');
    if (bw.getAttribute('data-k') !== key) {
      bw.setAttribute('data-k', key);
      bw.innerHTML = running ? '<button class="btn big" type="button" data-timer="stop">Stop</button>' :
        '<button class="btn go big" type="button" data-timer="start">' + (key === 'idle' ? 'Start ' + esc(F.name) : 'Start again') + '</button>';
    }
    cancelAnimationFrame(timerRaf);
    if (running) timerRaf = requestAnimationFrame(timerUpdate);
  }
  function timerBeeps(T) {
    try {
      var AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
      if (timerAC) { try { timerAC.close(); } catch (e0) { /* ignore */ } }
      var ac = new AC(); timerAC = ac;
      var base = ac.currentTime + LEAD / 1000;
      var beep = function (at, f, d) {
        var o = ac.createOscillator(), g = ac.createGain(); o.type = 'sine'; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, at); g.gain.exponentialRampToValueAtTime(0.28, at + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, at + d);
        o.connect(g); g.connect(ac.destination); o.start(at); o.stop(at + d + 0.02);
      };
      [3, 2, 1].forEach(function (n) { beep(base - n, 660, 0.12); });
      T.segs.forEach(function (g) { var at = base + g.start / 1000; if (g.rest) beep(at, 523, 0.3); else { beep(at, 988, 0.12); beep(at + 0.16, 988, 0.12); } });
      var end = base + T.total / 1000; [0, 0.2, 0.4].forEach(function (d) { beep(end + d, 1175, 0.15); });
    } catch (e) { timerAC = null; }
  }
  function timerStart() {
    var st = state.timer;
    st.t0 = Date.now() + LEAD; st.done = false; st.stopped = null; save();
    timerBeeps(timeline());
    timerUpdate();
  }
  function timerStop() {
    var st = state.timer, T = timeline();
    if (st.t0) {
      var e = Date.now() - st.t0, i = 0;
      while (i < T.segs.length - 1 && T.segs[i + 1].start <= e) i++;
      st.stopped = { set: e < 0 ? 1 : T.segs[i].set };
    }
    st.t0 = null; save();
    if (timerAC) { try { timerAC.close(); } catch (e1) { /* ignore */ } timerAC = null; }
    timerUpdate();
  }

  /* ---------- Rest timer ---------- */
  var rest = { on: false, end: 0, raf: 0, ctl: null, ac: null };
  var CIRC = 2 * Math.PI * 30;
  function restStop() {
    rest.on = false; cancelAnimationFrame(rest.raf);
    if (rest.ctl) { try { rest.ctl.stop(); } catch (e) { /* ignore */ } }
    if (rest.ac) { try { rest.ac.close(); } catch (e) { /* ignore */ } rest.ac = null; }
    var ring = $('#rest-ring'); ring.style.strokeDashoffset = CIRC;
    $('#rest').classList.remove('on');
    $('#rest-label').innerHTML = 'Rest<small>60 s</small>';
    $('#rest').setAttribute('aria-label', 'Start a 60 second rest timer');
  }
  function restStart(sec) {
    rest.on = true; rest.end = Date.now() + sec * 1000;
    var btn = $('#rest'), ring = $('#rest-ring');
    btn.classList.add('on');
    btn.setAttribute('aria-label', 'Rest timer running. Tap to stop.');
    ring.style.strokeDasharray = CIRC;
    if (M && !RM) rest.ctl = M.animate(ring, { strokeDashoffset: [0, CIRC] }, { duration: sec, ease: 'linear' });
    else ring.style.strokeDashoffset = 0;
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (AC) {
        var ac = new AC(); rest.ac = ac;
        var t = ac.currentTime + sec;
        [0, 0.22, 0.44].forEach(function (d, i) {
          var o = ac.createOscillator(), g = ac.createGain();
          o.frequency.value = i === 2 ? 1175 : 880; o.type = 'sine';
          g.gain.setValueAtTime(0.0001, t + d); g.gain.exponentialRampToValueAtTime(0.25, t + d + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + d + 0.18);
          o.connect(g); g.connect(ac.destination); o.start(t + d); o.stop(t + d + 0.2);
        });
      }
    } catch (e) { rest.ac = null; }
    (function tick() {
      var left = Math.ceil((rest.end - Date.now()) / 1000);
      if (left <= 0) {
        $('#rest-label').innerHTML = 'Go!';
        anim(btn, { scale: [1, 1.18, 1] }, { duration: 0.5 });
        setTimeout(function () { if (rest.end <= Date.now()) restStop(); }, 1600);
        return;
      }
      $('#rest-label').textContent = left;
      rest.raf = requestAnimationFrame(tick);
    })();
  }

  /* ---------- Report ---------- */
  var PAST = window.PAST_SESSIONS || [];
  function stL(st, code, ath) {
    st.log = st.log || {}; st.log[code] = st.log[code] || {};
    st.log[code][ath] = st.log[code][ath] || { w: '', sets: [], feel: '', v: 0 };
    return st.log[code][ath];
  }
  function itemsOf(sess) { var list = []; sess.blocks.forEach(function (b) { b.items.forEach(function (i) { list.push(i); }); }); return list; }
  function finisherReport(sess, st) {
    var F = sess.finisher, N = F.name.toUpperCase();
    if (F.type === 'intervals') {
      var T = st.timer || {};
      if (T.done) return N + ': all ' + F.sets + ' sets done';
      if (T.stopped) return N + ': stopped in set ' + T.stopped.set + ' of ' + F.sets;
      return N + ': not done';
    }
    var R = st.relay || { splits: [], starter: ALL_ATH[0].id };
    if (!R.splits || !R.splits.length) return N + ': not timed';
    var parts = R.splits.map(function (t, i) { return athName(legAthR(R, i)) + ' ' + fmt(t - (i ? R.splits[i - 1] : 0)); });
    return N + ': ' + (R.splits.length >= F.legs ? fmt(R.splits[F.legs - 1]) + ' total' : R.splits.length + '/' + F.legs + ' legs') + ' (' + parts.join(', ') + ')';
  }
  function reportFor(sess, st) {
    var lines = [];
    lines.push('THE COMEBACK · Week ' + sess.week + ' Session ' + sess.num + ' · ' + sess.type + ' · ' + sess.dateLabel);
    athletesOf(sess).forEach(function (a) {
      lines.push(''); lines.push(a.name.toUpperCase());
      itemsOf(sess).forEach(function (it) {
        var l = stL(st, it.code, a.id), e = EX[it.ex] || { name: it.ex };
        var name = it.variants ? it.variants[l.v || 0] : e.name;
        var w = String(l.w || '').trim(), unit = it.unit || 'kg';
        var blank = (unit.match(/blank = ([^)]*)\)/) || [])[1];
        var sets = (l.sets || []).filter(Boolean).length;
        var feel = (FEEL.filter(function (f) { return f.k === l.feel; })[0] || {});
        var wt = it.noWeight ? '' : (w ? w + ' ' + unit.replace(/\s*\(blank[^)]*\)/, '').replace('kg per hand', 'kg/hand') : (it.variants && blank ? '' : (blank || 'no weight logged')));
        lines.push('- ' + it.code + ' ' + name + ': ' + (wt ? wt + ' · ' : '') + sets + '/' + it.sets + ' sets of ' + it.reps + (feel.t ? ' · felt ' + feel.t.toLowerCase() + ' (' + feel.s + ')' : ''));
      });
      var wv = (st.wrap && st.wrap[a.id]) || { hard: '?', hurt: '' };
      lines.push('- Overall: ' + wv.hard + '/10 · Hurt: ' + (String(wv.hurt || '').trim() || 'nothing'));
    });
    lines.push(''); lines.push(finisherReport(sess, st));
    var cnt = function (o) { o = o || {}; return Object.keys(o).filter(function (k) { return o[k]; }).length; };
    lines.push('Warm-up: ' + cnt(st.warm) + '/' + sess.warmup.items.length + ' · Cool-down: ' + cnt(st.cool) + '/' + sess.cooldown.items.length);
    if (String(st.notes || '').trim()) { lines.push(''); lines.push('Notes: ' + st.notes.trim()); }
    return lines.join('\n');
  }
  function reportText() { return reportFor(S, state); }
  function loadState(id) { try { return JSON.parse(localStorage.getItem('comeback:' + id)) || null; } catch (e) { return null; } }
  function hasData(st) {
    if (!st || st.hidden) return false;
    var any = false;
    Object.keys(st.log || {}).forEach(function (c) {
      Object.keys(st.log[c] || {}).forEach(function (a) {
        var l = st.log[c][a] || {};
        if (String(l.w || '').trim() || (l.sets || []).some(Boolean) || l.feel) any = true;
      });
    });
    return any || !!(st.relay && st.relay.splits && st.relay.splits.length) || !!(st.timer && (st.timer.done || st.timer.stopped));
  }
  function pastCards() {
    return PAST.filter(function (p) { return hasData(loadState(p.id)); }).map(function (p) {
      return '<div class="card pastcard" data-rise><div><p class="eyebrow">Report not sent yet</p><h3>Session ' + p.num + ' · ' + esc(p.title) + '</h3>' +
        '<p class="small muted" style="margin-top:4px">Your logs from ' + esc(p.dateLabel) + ' are still saved on this phone. Send them so the coach can set your next weights.</p></div>' +
        '<div class="btns"><button class="btn go" type="button" data-past-report="' + p.id + '">Build Session ' + p.num + ' report</button>' +
        '<button class="btn" type="button" data-past-hide="' + p.id + '">Already sent</button></div></div>';
    }).join('');
  }
  function openReport(text, title) {
    var body = $('#sheet-body');
    body.innerHTML = '<p class="eyebrow">Report to coach</p><h2 id="sheet-title">' + esc(title || 'Your session report') + '</h2>' +
      '<p class="muted">Copy this and paste it into your chat with the coach.</p>' +
      '<label class="sr" for="report">Session report</label><textarea class="field report" id="report" readonly>' + esc(text || reportText()) + '</textarea>' +
      '<div class="btns"><button class="btn go big" type="button" data-copy>Copy report</button></div><p class="toast" id="toast" aria-live="polite"></p>';
    showSheet();
  }

  /* ---------- Exercise sheet ---------- */
  function openMove(id) {
    var e = EX[id]; if (!e) return;
    var it = itemFor(id);
    var inWarm = S.warmup.items.concat(S.cooldown.items).filter(function (x) { return x.ex === id; })[0];
    var rxToday = it ? ('Today: ' + it.sets + ' × ' + it.reps + ' at RPE ' + it.rpe) : (inWarm ? 'Today: ' + inWarm.dose : (S.finisher.ex === id ? 'Today: ' + S.finisher.name + (S.finisher.type === 'intervals' ? ', ' + S.finisher.sets + ' sets × ' + S.finisher.rounds + ' rounds' : ', ' + S.finisher.legs + ' × ' + S.finisher.leg) : ''));
    var body = $('#sheet-body');
    body.innerHTML =
      '<div>' + demo(id) + '</div>' +
      '<div style="display:grid;gap:10px"><p class="eyebrow">' + esc(e.pattern) + ' · ' + esc(e.equipment) + '</p><h2 id="sheet-title">' + esc(e.name) + '</h2>' +
      '<div class="goals">' + e.goals.map(function (g) { return '<span class="goal">' + GOAL[g] + '</span>'; }).join('') + '</div></div>' +
      (rxToday ? '<p class="today-rx">' + esc(rxToday) + '</p>' : '') +
      '<section><h3>Muscles it works</h3><div class="mgrid">' + bodyMap(exWeights(e), { lg: true }) +
      '<div class="mlist"><div><p class="lbl">Main</p><div class="chips">' + e.primary.map(function (m) { return '<span class="chip m p">' + esc(MUSCLE[m]) + '</span>'; }).join('') + '</div></div>' +
      (e.secondary.length ? '<div><p class="lbl">Also working</p><div class="chips">' + e.secondary.map(function (m) { return '<span class="chip m">' + esc(MUSCLE[m]) + '</span>'; }).join('') + '</div></div>' : '') +
      '<div class="legend"><span style="--c:var(--heat)">Main</span><span style="--c:color-mix(in oklab,var(--heat) 42%,var(--body))">Also working</span></div></div></div></section>' +
      '<section><h3>What it does</h3><p>' + esc(e.what) + '</p></section>' +
      '<section><h3>Why it’s good for you</h3><p>' + esc(e.why) + '</p></section>' +
      '<section><h3>How to do it</h3><ol class="cues">' + e.cues.map(function (c) { return '<li>' + esc(c) + '</li>'; }).join('') + '</ol></section>' +
      (e.predrag ? '<section class="quote"><h3>From Ali\u2019s sessions with Predrag</h3><p>' + esc(e.predrag) + '</p></section>' : '') +
      (e.mistakes && e.mistakes.length ? '<section><h3>Common mistakes</h3><ul class="bad">' + e.mistakes.map(function (c) { return '<li>' + esc(c) + '</li>'; }).join('') + '</ul></section>' : '') +
      '<section class="scale"><div class="card easy"><h4>Make it easier</h4><p class="small">' + esc(e.easier) + '</p></div><div class="card hard"><h4>Make it harder</h4><p class="small">' + esc(e.harder) + '</p></div></section>' +
      '<section><h3>In real life</h3><p>' + esc(e.life) + '</p></section>';
    showSheet();
    wireDemos(body);
    if (M && !RM) {
      var on = $$('.mus.on', body);
      anim(on, { opacity: [0, 1] }, { duration: 0.35, delay: M.stagger(0.025, { startDelay: 0.15 }) });
    }
  }
  var lastFocus = null;
  function showSheet() {
    var sh = $('#sheet'), bd = $('#backdrop');
    if (!sh.classList.contains('open')) lastFocus = document.activeElement;
    sh.classList.add('open'); bd.classList.add('open');
    $('#sheet-body').scrollTop = 0;
    document.body.style.overflow = 'hidden';
    anim(sh, { y: ['100%', '0%'] }, { type: 'spring', bounce: 0.12, duration: 0.5 });
    anim(bd, { opacity: [0, 1] }, { duration: 0.25 });
    setTimeout(function () { var x = $('.x', sh); if (x) x.focus({ preventScroll: true }); }, 30);
  }
  function hideSheet() {
    var sh = $('#sheet'), bd = $('#backdrop');
    if (!sh.classList.contains('open')) return;
    var done = function () { sh.classList.remove('open'); bd.classList.remove('open'); document.body.style.overflow = ''; $('#sheet-body').innerHTML = ''; };
    var a = anim(sh, { y: ['0%', '100%'] }, { duration: 0.22, ease: 'easeIn' });
    anim(bd, { opacity: [1, 0] }, { duration: 0.22 });
    if (a && typeof a.then === 'function') { a.then(done, done); setTimeout(done, 400); } else done();
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
  }

  /* ---------- MOVES ---------- */
  var FILTERS = [
    { k: 'all', t: 'All' }, { k: 'today', t: 'Today' }, { k: 'strength', t: 'Strength' },
    { k: 'core', t: 'Core' }, { k: 'power', t: 'Power & engine' }, { k: 'mobility', t: 'Warm-up & stretch' }
  ];
  function movesList() {
    var ids = todayIds();
    return Object.keys(EX).filter(function (id) {
      var e = EX[id], f = ui.filter;
      if (ui.pick && e.primary.indexOf(ui.pick) < 0 && e.secondary.indexOf(ui.pick) < 0) return false;
      if (f === 'all') return true;
      if (f === 'today') return !!ids[id];
      if (f === 'strength') return e.kind === 'strength';
      if (f === 'core') return e.kind === 'core';
      if (f === 'power') return e.kind === 'power' || e.kind === 'engine';
      if (f === 'mobility') return e.kind === 'warmup' || e.kind === 'cooldown';
      return true;
    }).sort(function (a, b) {
      if (!ui.pick) return 0;
      return (EX[b].primary.indexOf(ui.pick) > -1) - (EX[a].primary.indexOf(ui.pick) > -1);
    });
  }
  function renderMoves() {
    var w = {}; if (ui.pick) w[ui.pick] = 1;
    return '<div class="wrap wide"><div class="hero"><p class="eyebrow" data-rise>' + Object.keys(EX).length + ' moves in your program</p>' +
      '<h1 data-rise>Moves</h1></div>' +
      '<div class="sec"><div class="card picker" data-rise>' + bodyMap(w, { pick: true, lg: true }) +
      '<div style="display:grid;gap:10px"><h3>Tap a muscle</h3><p class="muted">See every exercise in your program that works it. Tap it again to clear.</p>' +
      '<p id="pick-label" class="today-rx" style="justify-self:start"' + (ui.pick ? '' : ' hidden') + '>' + (ui.pick ? 'Showing: ' + esc(MUSCLE[ui.pick]) : '') + '</p></div></div>' +
      '<div class="filters" role="group" aria-label="Filter moves">' + FILTERS.map(function (f) {
        return '<button type="button" data-filter="' + f.k + '" aria-pressed="' + (ui.filter === f.k) + '">' + f.t + '</button>';
      }).join('') + '</div>' +
      '<div class="lib" id="lib">' + libTiles() + '</div></div>' + credits() + '</div>';
  }
  function libTiles() {
    var ids = todayIds();
    var list = movesList();
    if (!list.length) return '<p class="empty">No moves match. Clear the muscle or pick another filter.</p>';
    return list.map(function (id) {
      var e = EX[id];
      return '<button class="tile" type="button" data-open="' + id + '">' + demo(id) +
        '<div class="tb"><p class="pt">' + esc(e.pattern) + (ids[id] ? ' · <span class="today-dot">In today’s session</span>' : '') + '</p><h3>' + esc(e.name) + '</h3>' + muscleChips(e, 2) + '</div></button>';
    }).join('');
  }
  function refreshLib() {
    var lib = $('#lib'); if (!lib) return;
    lib.innerHTML = libTiles();
    wireDemos(lib);
    anim($$('.tile', lib), { opacity: [0, 1], y: [10, 0] }, { duration: 0.3, delay: M ? M.stagger(0.03) : 0 });
    $$('[data-filter]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-filter') === ui.filter)); });
    $$('#view-moves .mus').forEach(function (p) {
      var on = p.getAttribute('data-m') === ui.pick;
      p.classList.toggle('sel', on);
    });
    var pl = $('#pick-label');
    if (pl) { pl.hidden = !ui.pick; pl.textContent = ui.pick ? 'Showing: ' + MUSCLE[ui.pick] : ''; }
  }

  /* ---------- PLAN ---------- */
  function renderPlan() {
    var P = PLAN;
    var h = '<div class="wrap wide"><div class="hero"><p class="eyebrow" data-rise>7 Nov 2026 → 7 Feb 2027</p><h1 data-rise>The 13 weeks</h1>' +
      '<p class="brief" data-rise>Lean, strong and functional, built in phases. Each week is a little harder than the last, and the coach adjusts it from your logs.</p></div>';
    h += '<div class="sec"><div class="weeks" data-rise><ol>' + P.weeks.map(function (w) {
      return '<li class="wk ph-' + w.phase + (w.w === P.currentWeek ? ' now' : '') + '"><b>W' + w.w + '</b><span>' + esc(w.dates) + '</span>' +
        (w.w === P.currentWeek ? '<em style="color:var(--heat)">You are here</em>' : (w.note ? '<em>' + esc(w.note) + '</em>' : '')) + '</li>';
    }).join('') + '</ol></div>' +
      '<div class="phases">' + Object.keys(P.phases).map(function (k) {
        var p = P.phases[k];
        return '<div class="card phase ph-' + k + '" data-rise><p class="wks">Week ' + esc(p.weeks) + '</p><h3>' + esc(p.name) + '</h3><p>' + esc(p.feel) + '</p><p class="rx2 small">' + esc(p.rx) + '</p></div>';
      }).join('') + '</div></div>';
    h += '<div class="sec"><div class="sec-head"><h2>Scoreboard</h2><span class="meta">updated ' + esc(PR.updated) + '</span></div>' +
      '<div class="score"><div class="card ali"><span class="lbl">Ali · sessions</span><b>' + PR.sessions.ali + '</b><span class="small muted">Target ' + esc(P.targets.ali) + '</span></div>' +
      '<div class="card aamna"><span class="lbl">Aamna · sessions</span><b>' + PR.sessions.aamna + '</b><span class="small muted">Target ' + esc(P.targets.aamna) + '</span></div>' +
      '<div class="card"><span class="lbl">Together</span><b>' + PR.sessions.together + '</b><span class="small muted">' + esc(P.targets.min) + '</span></div></div>' +
      '<p class="lead">Next milestone: <b>' + esc(PR.nextMilestone) + '</b></p>' +
      (PR.history ? '<p class="lead">' + esc(PR.history) + '</p>' : '') + '</div>';
    h += '<div class="sec"><div class="grid2"><div class="card"><h3>Rules of the comeback</h3><ol class="rules" style="margin-top:10px">' +
      ['Showing up beats being perfect. Never miss twice.', 'Leave reps in the tank for the first 3 weeks.', 'Log everything. It takes 30 seconds.', 'Compete with your last session, not with each other.', 'Protein at every meal, walk every day, sleep 7+ hours.', 'Soreness is fine. Pain is not: swap the move and tell the coach.']
        .map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ol></div>' +
      '<div class="card"><h3>RPE: how hard a set was</h3><div class="rpe" style="margin-top:10px">' +
      [[10, '0 left', 'Absolute max'], [9, '1 left', 'Maybe one more'], [8, '2 left', 'Hard, two clean reps left'], [7, '3 left', 'Challenging but crisp'], [6, '4 left', 'Moderate. Today’s target']]
        .map(function (r, i) { return '<div style="--a:' + (48 - i * 10) + '%"><b>' + r[0] + '</b><span>' + r[1] + '</span><span>' + r[2] + '</span></div>'; }).join('') +
      '</div></div></div></div>';
    h += '<div class="sec"><div class="card"><h3>The other 23 hours</h3><table class="levers" style="margin-top:8px"><tbody>' +
      [['Protein', '1.6–2.2 g per kg of bodyweight a day, about 30–40 g a meal', 'Keeps and builds muscle while you lean out'],
       ['Calories', 'A modest deficit (~300–500 kcal a day). Aim to lose about 0.5% of bodyweight a week', 'Crash diets wreck strength and consistency'],
       ['Steps', '8–10k a day', 'The most underrated fat-loss tool. Walk together'],
       ['Sleep', '7–9 hours', 'Recovery, appetite and strength all depend on it'],
       ['Creatine', 'Optional: 3–5 g monohydrate daily', 'Well researched for strength in men and women']]
        .map(function (r) { return '<tr><td>' + r[0] + '</td><td>' + r[1] + '</td><td class="muted">' + r[2] + '</td></tr>'; }).join('') +
      '</tbody></table></div></div>';
    return h + credits() + '</div>';
  }

  function credits() {
    return '<p class="credits">Exercise photos: <a href="https://github.com/yuhonas/free-exercise-db">Free Exercise DB</a> (public domain). Muscle map: <a href="https://github.com/giavinh79/react-body-highlighter">react-body-highlighter</a> (MIT, © 2020 GV79). Animation: <a href="https://motion.dev">Motion</a>. Logs are saved in this browser only.</p>';
  }

  /* ---------- Router ---------- */
  var rendered = {};
  function show(view) {
    ui.view = view;
    ['today', 'moves', 'plan'].forEach(function (v) {
      var el = $('#view-' + v);
      if (v === view && !rendered[v]) {
        el.innerHTML = v === 'today' ? renderToday() : v === 'moves' ? renderMoves() : renderPlan();
        rendered[v] = true;
        wireDemos(el);
        if (v === 'today') { if (S.finisher.type === 'intervals') timerUpdate(); else relayUpdate(); }
      }
      el.classList.toggle('on', v === view);
    });
    $$('.tab').forEach(function (t) {
      if (t.getAttribute('data-tab') === view) t.setAttribute('aria-current', 'page'); else t.removeAttribute('aria-current');
    });
    $('#rest').style.display = view === 'today' ? '' : 'none';
    revealIn($('#view-' + view));
  }
  function route() {
    var h = (location.hash || '').replace(/^#/, '');
    if (h.indexOf('move-') === 0) {
      if (!rendered[ui.view]) show(ui.view);
      openMove(h.slice(5));
      return;
    }
    hideSheet();
    var v = ['today', 'moves', 'plan'].indexOf(h) > -1 ? h : 'today';
    if (v !== ui.view || !rendered[v]) { show(v); window.scrollTo(0, 0); }
  }
  function closeSheetNav() {
    if ((location.hash || '').indexOf('#move-') === 0) {
      try { history.replaceState(null, '', '#' + ui.view); } catch (e) { /* ignore */ }
    }
    hideSheet();
  }

  /* ---------- Events ---------- */
  document.addEventListener('click', function (ev) {
    var t = ev.target.closest('button, a, polygon');
    if (!t) { if (ev.target.id === 'backdrop') closeSheetNav(); return; }
    var d = t.dataset || {};
    if (t.tagName.toLowerCase() === 'polygon') {
      var m = t.getAttribute('data-pick'); if (!m) return;
      ui.pick = ui.pick === m ? null : m;
      refreshLib();
      return;
    }
    if (d.open) { location.hash = 'move-' + d.open; return; }
    if (d.close !== undefined && t.hasAttribute('data-close')) { closeSheetNav(); return; }
    if (d.set) {
      var l = L(d.set, d.ath), s = +d.s;
      l.sets[s] = !l.sets[s]; save();
      t.setAttribute('aria-pressed', String(!!l.sets[s]));
      if (l.sets[s]) anim(t, { scale: [0.8, 1.15, 1] }, { duration: 0.35 });
      return;
    }
    if (d.feel) {
      var lf = L(d.code, d.ath);
      lf.feel = lf.feel === d.feel ? '' : d.feel; save();
      $$('[data-feel][data-code="' + d.code + '"][data-ath="' + d.ath + '"]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-feel') === lf.feel)); });
      var adv = $('#adv-' + d.code + '-' + d.ath);
      adv.textContent = (FEEL.filter(function (f) { return f.k === lf.feel; })[0] || {}).a || '';
      if (lf.feel) anim(adv, { opacity: [0, 1], x: [-6, 0] }, { duration: 0.25 });
      return;
    }
    if (d.check) {
      var k = d.check, i = d.i;
      state[k][i] = !state[k][i]; save();
      t.setAttribute('aria-pressed', String(!!state[k][i]));
      t.closest('.row').classList.toggle('done', !!state[k][i]);
      if (state[k][i]) anim(t, { scale: [0.7, 1.15, 1] }, { duration: 0.35 });
      return;
    }
    if (d.starter) { state.relay.starter = d.starter; save(); relayUpdate(); return; }
    if (d.relay) {
      var R = state.relay;
      if (d.relay === 'start') { R.t0 = Date.now(); R.splits = []; }
      else if (d.relay === 'tag') { R.splits.push(Date.now() - R.t0); anim($('#clock'), { scale: [1.04, 1] }, { duration: 0.25 }); }
      else if (d.relay === 'undo') { R.splits.pop(); }
      else if (d.relay === 'reset') { R.t0 = null; R.splits = []; }
      save(); relayUpdate(); return;
    }
    if (d.timer) { if (d.timer === 'start') timerStart(); else timerStop(); return; }
    if (d.pastReport) {
      var ps = PAST.filter(function (p) { return p.id === d.pastReport; })[0];
      if (ps) openReport(reportFor(ps, loadState(ps.id) || {}), 'Session ' + ps.num + ' report');
      return;
    }
    if (d.pastHide) {
      var hs = loadState(d.pastHide) || {}; hs.hidden = true;
      try { localStorage.setItem('comeback:' + d.pastHide, JSON.stringify(hs)); } catch (e2) { /* ignore */ }
      var card = t.closest('.pastcard'); if (card) card.remove();
      return;
    }
    if (t.id === 'rest') { if (rest.on) restStop(); else restStart(60); return; }
    if (d.report !== undefined && t.hasAttribute('data-report')) { openReport(); return; }
    if (t.hasAttribute('data-copy')) {
      var ta = $('#report'), toast = $('#toast');
      var fallback = function () { ta.focus(); ta.select(); toast.textContent = 'Copying isn’t allowed here. The text is selected: copy it with your keyboard, or press and hold to copy.'; };
      try {
        navigator.clipboard.writeText(ta.value).then(function () { toast.textContent = 'Copied. Paste it into the chat with your coach.'; }, fallback);
      } catch (e) { fallback(); }
      return;
    }
    if (d.filter) { ui.filter = d.filter; refreshLib(); return; }
  });
  document.addEventListener('input', function (ev) {
    var t = ev.target, d = t.dataset || {};
    if (d.w) { L(d.w, d.ath).w = t.value; save(); }
    else if (d.hard) { state.wrap[d.hard].hard = t.value; $('#hard-out-' + d.hard).textContent = t.value; save(); }
    else if (d.hurt) { state.wrap[d.hurt].hurt = t.value; save(); }
    else if (t.hasAttribute('data-notes')) { state.notes = t.value; save(); }
  });
  document.addEventListener('change', function (ev) {
    var t = ev.target, d = t.dataset || {};
    if (d.variant) { L(d.variant, d.ath).v = +t.value; save(); }
  });
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape' && $('#sheet').classList.contains('open')) closeSheetNav();
  });
  window.addEventListener('hashchange', route);
  route();
})();
