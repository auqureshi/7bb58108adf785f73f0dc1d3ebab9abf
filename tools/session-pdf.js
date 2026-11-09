/* Build a shareable PDF of the current session from the app's own data.
   Usage: node tools/session-pdf.js <output.pdf>
   Reads app/js/{body,exercises,session}.js, photos from app/img, fonts from tools/fonts. Needs Playwright. */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { chromium } = require('playwright');

const ROOT = path.resolve(__dirname, '..');
const out = path.resolve(process.argv[2] || path.join(ROOT, 'shared', 'session.pdf'));
const ctx = { window: {} };
vm.createContext(ctx);
['body.js', 'exercises.js', 'session.js'].forEach(f => vm.runInContext(fs.readFileSync(path.join(ROOT, 'app/js', f), 'utf8'), ctx));
const { BODY, EXERCISES: EX, SESSION: S, ATHLETES, PROGRESS: PR } = ctx.window;
const ATH = S.athletes ? ATHLETES.filter(a => S.athletes.includes(a.id)) : ATHLETES;
const solo = ATH.length === 1;
const file = p => 'file://' + path.join(ROOT, p);
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const MUSCLE = {
  quadriceps: 'Quads', gluteal: 'Glutes', hamstring: 'Hamstrings', adductor: 'Inner thighs', calves: 'Calves',
  abs: 'Abs', obliques: 'Obliques', 'lower-back': 'Lower back', 'upper-back': 'Upper back & lats', trapezius: 'Traps',
  chest: 'Chest', 'front-deltoids': 'Front shoulders', 'back-deltoids': 'Rear shoulders', biceps: 'Biceps',
  triceps: 'Triceps', forearm: 'Forearms & grip', neck: 'Neck'
};
const polyMuscle = k => (k === 'abductors' ? 'adductor' : (k === 'left-soleus' || k === 'right-soleus') ? 'calves' : k);

function body(view, w) {
  const polys = BODY[view].map(it => {
    const m = polyMuscle(it.m);
    const inert = ['head', 'knees'].includes(it.m) || (it.m === 'neck' && !w[m]);
    const v = inert ? 0 : (w[m] || 0);
    const fill = inert ? '#d9dde3' : v ? `color-mix(in oklab, var(--heat) ${Math.round(Math.max(0.2, v) * 100)}%, #e6e9ee)` : '#e6e9ee';
    return it.p.map(pts => `<polygon points="${pts}" fill="${fill}" stroke="#fff" stroke-width=".6"/>`).join('');
  }).join('');
  return `<figure><svg viewBox="0 0 100 200">${polys}</svg><figcaption>${view === 'anterior' ? 'Front' : 'Back'}</figcaption></figure>`;
}
const items = S.blocks.flatMap(b => b.items);
const heat = (() => {
  const w = {};
  const add = (id, n) => { const e = EX[id]; if (!e) return; e.primary.forEach(m => { w[m] = (w[m] || 0) + n; }); e.secondary.forEach(m => { w[m] = (w[m] || 0) + n * 0.4; }); };
  items.forEach(i => add(i.ex, i.sets)); add(S.finisher.ex, 2);
  const max = Math.max(...Object.values(w)); Object.keys(w).forEach(k => { w[k] /= max; }); return w;
})();
const top = Object.keys(heat).sort((a, b) => heat[b] - heat[a]).slice(0, 6);

const tipsFor = it => ATH.map(a => {
  const parts = [];
  if (it.start && it.start[a.id]) parts.push(`Start around ${esc(it.start[a.id])}${/^\d/.test(it.start[a.id]) ? ' kg' : ''}`);
  if (it.tip && it.tip[a.id]) parts.push(esc(it.tip[a.id]));
  if (it.past && it.past[a.id]) parts.push(esc(it.past[a.id]));
  return parts.length ? `<p class="tip"><b>${solo ? 'Your start' : esc(a.name)}:</b> ${parts.join('. ')}.</p>` : '';
}).join('');

const box = n => Array.from({ length: n }, (_, i) => `<span class="box">${i + 1}</span>`).join('');
function card(it) {
  const e = EX[it.ex];
  const photos = e.img === false ? '' : `<div class="photos"><figure><img src="${file(`app/img/${it.ex}-0.jpg`)}"><figcaption>Start</figcaption></figure><figure><img src="${file(`app/img/${it.ex}-1.jpg`)}"><figcaption>Finish</figcaption></figure></div>`;
  const variants = it.variants ? `<p class="variants"><b>Options:</b> ${it.variants.map(esc).join(' · ')}</p>` : '';
  const logLine = ATH.map(a => `<div class="logline"><span class="who">${esc(a.name)}</span><span class="lbl">Sets</span>${box(it.sets)}${it.noWeight ? '<span class="lbl">Option</span><span class="blank wide"></span>' : '<span class="lbl">kg</span><span class="blank"></span>'}<span class="lbl">Felt</span><span class="feel">Easy · Right · Heavy</span></div>`).join('');
  return `<article class="card">
    ${photos}
    <div class="cbody">
      <div class="ctop"><span class="code">${it.code}</span><h4>${esc(e.name)}</h4></div>
      <p class="rx"><span class="big">${it.sets} × ${esc(it.reps)}</span><span class="rpe">RPE ${esc(it.rpe)}</span></p>
      <div class="chips">${e.primary.map(m => `<span class="chip p">${MUSCLE[m]}</span>`).join('')}${e.secondary.slice(0, 2).map(m => `<span class="chip">${MUSCLE[m]}</span>`).join('')}</div>
      ${tipsFor(it)}${variants}
      <ol class="cues">${e.cues.slice(0, 4).map(c => `<li>${esc(c)}</li>`).join('')}</ol>
      ${e.mistakes && e.mistakes[0] ? `<p class="avoid"><b>Avoid:</b> ${esc(e.mistakes[0])}.</p>` : ''}
      ${logLine}
    </div>
  </article>`;
}
function block(b) {
  return `<section class="block">
    <div class="keep"><header class="bhead"><span class="letter">${b.id}</span><div><h3>Block ${b.id} · ${esc(b.format)}</h3><p>${b.rounds} rounds · ~${b.minutes} min · rest ${b.rest} s</p></div></header>
    <p class="how">${esc(b.how)}${b.note ? ` <b>${esc(b.note)}</b>` : ''}</p>
    ${card(b.items[0])}</div>
    ${b.items.slice(1).map(card).join('')}
  </section>`;
}
const row = (it, kind) => {
  const e = EX[it.ex];
  return `<div class="row"><img src="${file(`app/img/${it.ex}-0.jpg`)}"><div><b>${esc(e.name)}</b><span>${esc(it.dose)}</span><em>${esc(e.cues[0])}</em></div><span class="tick"></span></div>`;
};

const F = S.finisher;
let finisher;
if (F.type === 'intervals') {
  const seg = F.segments.map(g => `<span class="chip${g.rest ? '' : ' p'}">${g.secs} s ${esc(g.label)}</span>`).join('');
  const totalRounds = F.sets * F.rounds;
  const mins = Math.round((F.sets * F.rounds * F.segments.reduce((s, g) => s + g.secs, 0) + (F.sets - 1) * (F.setRest || 0)) / 60);
  finisher = `<section class="block fin"><header class="bhead"><span class="letter">F</span><div><h3>Finisher · ${esc(F.name)}</h3><p>~${mins} min · RPE ${esc(F.rpe)}</p></div></header>
    <div class="finbody">${EX[F.ex].img === false ? '' : `<div class="photos small"><figure><img src="${file(`app/img/${F.ex}-0.jpg`)}"></figure><figure><img src="${file(`app/img/${F.ex}-1.jpg`)}"></figure></div>`}
    <div><p class="how">${esc(F.how)}</p><div class="chips">${seg}${F.sets > 1 ? `<span class="chip">× ${F.rounds} = 1 set · ${F.sets} sets</span>` : `<span class="chip">× ${F.rounds} rounds</span>`}</div>
    <p class="tip"><b>Pace:</b> ${esc(F.pace)} ${esc(F.alt)}</p>
    <div class="logline"><span class="lbl">Rounds done</span>${box(totalRounds)}</div>
    <ol class="cues">${EX[F.ex].cues.slice(0, 3).map(c => `<li>${esc(c)}</li>`).join('')}</ol></div></div></section>`;
} else {
  finisher = `<section class="block fin"><header class="bhead"><span class="letter">F</span><div><h3>Finisher · ${esc(F.name)}</h3><p>RPE ${esc(F.rpe)}</p></div></header><p class="how">${esc(F.how)} ${esc(F.pace)}</p></section>`;
}

const glance = [['Warm-up', S.warmup.minutes], ...S.blocks.map(b => [`Block ${b.id}`, b.minutes]), [F.name, F.type === 'intervals' ? Math.round((F.sets * F.rounds * F.segments.reduce((s, g) => s + g.secs, 0)) / 60) : 8], ['Cool-down', S.cooldown.minutes]];

const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${esc(S.title)}</title><style>
@font-face { font-family: Barlow; src: url(${file('tools/fonts/barlow-latin-400-normal.woff2')}); font-weight: 400; }
@font-face { font-family: Barlow; src: url(${file('tools/fonts/barlow-latin-500-normal.woff2')}); font-weight: 500; }
@font-face { font-family: Barlow; src: url(${file('tools/fonts/barlow-latin-600-normal.woff2')}); font-weight: 600; }
@font-face { font-family: Barlow; src: url(${file('tools/fonts/barlow-latin-700-normal.woff2')}); font-weight: 700; }
@font-face { font-family: BarlowC; src: url(${file('tools/fonts/barlow-condensed-latin-700-normal.woff2')}); font-weight: 700; }
@font-face { font-family: BarlowC; src: url(${file('tools/fonts/barlow-condensed-latin-800-normal.woff2')}); font-weight: 800; }
@font-face { font-family: BarlowC; src: url(${file('tools/fonts/barlow-condensed-latin-800-italic.woff2')}); font-weight: 800; font-style: italic; }
:root { --ink: #14171c; --muted: #5b6472; --line: #e1e4e9; --tint: #f4f5f7; --heat: #e4472f; --accent2: #0f9e78; --night: #0e1117; }
* { box-sizing: border-box; }
html, body { margin: 0; }
body { font-family: Barlow, sans-serif; color: var(--ink); font-size: 10.5pt; line-height: 1.42; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
h1, h2, h3, h4 { margin: 0; font-family: BarlowC, sans-serif; text-transform: uppercase; }
p { margin: 0; }
.hero { background: var(--night); color: #eef1f5; border-radius: 14px; padding: 22px 24px 20px; display: grid; gap: 10px; }
.brand { font-family: BarlowC; font-weight: 800; letter-spacing: .12em; font-size: 10pt; display: flex; justify-content: space-between; color: #aeb7c3; }
.brand b { color: #fff; } .brand i { display: inline-block; width: 8px; height: 8px; background: var(--heat); transform: skewX(-18deg); margin-right: 6px; }
.eyebrow { font-family: BarlowC; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; font-size: 10pt; color: #aeb7c3; }
.eyebrow b { color: #ff6a52; }
.hero h1 { font-weight: 800; font-style: italic; font-size: 58pt; line-height: .88; }
.hero .chips .chip { background: #1b212b; border-color: #2a313c; color: #eef1f5; }
.hero .chips .chip.p { border-color: #ff6a52; color: #ff8a75; background: #1b212b; }
.brief { font-size: 11.5pt; color: #d6dbe2; max-width: 150mm; }
.jobs { list-style: none; padding: 0; margin: 4px 0 0; display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; counter-reset: j; }
.jobs li { counter-increment: j; background: #1b212b; border-radius: 9px; padding: 8px 9px; font-weight: 600; font-size: 9.5pt; line-height: 1.25; }
.jobs li::before { content: "0" counter(j); display: block; font-family: BarlowC; font-weight: 800; font-size: 15pt; color: #ff6a52; line-height: 1; margin-bottom: 4px; }
.chips { display: flex; flex-wrap: wrap; gap: 4px; }
.chip { border: 1px solid var(--line); border-radius: 99px; padding: 1px 8px; font-size: 8.5pt; font-weight: 600; background: #fff; }
.chip.p { border-color: #f3b2a6; background: #fdeeea; color: #b4321e; }
.sec { margin-top: 14px; }
h2 { font-weight: 800; font-size: 19pt; line-height: 1; margin-bottom: 8px; }
.note { border-left: 4px solid var(--heat); background: var(--tint); border-radius: 0 10px 10px 0; padding: 9px 12px; font-size: 10pt; }
.glance { display: grid; grid-template-columns: repeat(${glance.length}, 1fr); gap: 4px; }
.glance div { background: var(--tint); border-radius: 8px; padding: 7px 8px; border-top: 3px solid var(--heat); }
.glance b { display: block; font-family: BarlowC; font-weight: 800; font-size: 15pt; line-height: 1; }
.glance span { font-size: 8.5pt; color: var(--muted); font-weight: 600; }
.two { display: grid; grid-template-columns: 1.15fr 1fr; gap: 12px; }
.panel { border: 1px solid var(--line); border-radius: 12px; padding: 12px; }
.panel h3 { font-weight: 700; font-size: 13pt; letter-spacing: .03em; margin-bottom: 6px; }
.map { display: grid; grid-template-columns: auto 1fr; gap: 10px; align-items: center; }
.figs { display: flex; gap: 2px; }
.figs figure { margin: 0; text-align: center; } .figs svg { width: 25mm; height: auto; }
.figs figcaption { font-size: 7pt; letter-spacing: .14em; text-transform: uppercase; color: var(--muted); font-weight: 600; }
.bars { list-style: none; padding: 0; margin: 0; display: grid; gap: 5px; }
.bars li { display: grid; grid-template-columns: 26mm 1fr; gap: 6px; align-items: center; font-size: 9pt; font-weight: 600; }
.bar { height: 6px; background: #e6e9ee; border-radius: 3px; overflow: hidden; } .bar i { display: block; height: 100%; background: var(--heat); }
.cal div { display: grid; grid-template-columns: 16mm 1fr; gap: 8px; align-items: center; border-left: 4px solid var(--c); background: var(--tint); border-radius: 6px; padding: 6px 9px; margin-bottom: 5px; font-size: 9.5pt; }
.cal b { font-family: BarlowC; font-weight: 800; font-size: 14pt; }
.week { display: flex; gap: 6px; align-items: center; margin-top: 8px; font-size: 9.5pt; font-weight: 600; }
.week span { border: 1.5px solid var(--line); border-radius: 99px; padding: 2px 9px; }
.week span.done { border-color: var(--accent2); color: var(--accent2); }
.week span.today { border-color: var(--heat); background: var(--heat); color: #fff; }
.rows { display: grid; gap: 5px; }
.row { display: grid; grid-template-columns: 17mm 1fr 6mm; gap: 9px; align-items: center; border: 1px solid var(--line); border-radius: 9px; padding: 5px; break-inside: avoid; }
.row img { width: 17mm; height: 12mm; object-fit: cover; border-radius: 6px; }
.row b { font-weight: 700; margin-right: 6px; } .row span { color: var(--muted); font-weight: 600; font-size: 9pt; }
.row em { display: block; font-style: normal; font-size: 8.5pt; color: var(--muted); }
.tick { width: 5mm; height: 5mm; border: 1.5px solid #b9c0ca; border-radius: 50%; }
.lead { font-size: 9.5pt; margin-bottom: 6px; }
.block { margin-top: 14px; }
.bhead { display: grid; grid-template-columns: auto 1fr; gap: 10px; align-items: center; margin-bottom: 4px; break-after: avoid; }
.letter { font-family: BarlowC; font-weight: 800; font-style: italic; font-size: 34pt; line-height: .8; color: transparent; -webkit-text-stroke: 1.3px var(--heat); }
.bhead h3 { font-weight: 800; font-size: 15pt; line-height: 1; } .bhead p { color: var(--muted); font-size: 9pt; font-weight: 600; }
.how { font-size: 9.5pt; color: #333a44; margin-bottom: 6px; }
.card { display: grid; grid-template-columns: 78mm 1fr; gap: 12px; border: 1px solid var(--line); border-radius: 12px; padding: 10px; margin-bottom: 8px; break-inside: avoid; }
.photos { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; align-content: start; }
.photos figure { margin: 0; position: relative; }
.photos img { width: 100%; aspect-ratio: 3 / 2; object-fit: cover; border-radius: 8px; display: block; background: #eef0f3; }
.photos figcaption { position: absolute; left: 6px; bottom: 4px; font-family: BarlowC; font-weight: 700; font-size: 8pt; letter-spacing: .12em; text-transform: uppercase; color: #fff; text-shadow: 0 1px 3px rgba(0,0,0,.7); }
.photos.small { grid-template-columns: 1fr 1fr; }
.ctop { display: flex; align-items: baseline; gap: 8px; } .code { font-family: BarlowC; font-weight: 800; color: var(--heat); font-size: 12pt; }
.card h4 { font-weight: 700; font-size: 16pt; line-height: 1; }
.rx { display: flex; align-items: baseline; gap: 8px; margin: 3px 0 5px; } .rx .big { font-family: BarlowC; font-weight: 800; font-size: 20pt; line-height: 1; } .rx .rpe { color: var(--heat); font-weight: 700; font-size: 10pt; }
.tip { margin-top: 6px; font-size: 9.5pt; background: #eaf7f2; border-radius: 6px; padding: 5px 8px; } .tip b { color: #0b7a5d; }
.variants { margin-top: 5px; font-size: 9pt; }
.cues { margin: 6px 0 0; padding-left: 15px; font-size: 9.3pt; } .cues li { margin-bottom: 1px; }
.avoid { font-size: 9pt; color: #8a2a1b; margin-top: 4px; }
.logline { display: flex; align-items: center; flex-wrap: wrap; gap: 5px; margin-top: 7px; padding-top: 6px; border-top: 1px dashed var(--line); font-size: 8.5pt; }
.logline .who { font-weight: 700; color: var(--accent2); margin-right: 4px; }
.lbl { color: var(--muted); font-weight: 600; text-transform: uppercase; letter-spacing: .06em; font-size: 7.5pt; margin-left: 4px; }
.box { width: 5.5mm; height: 5.5mm; border: 1.5px solid #b9c0ca; border-radius: 50%; display: inline-grid; place-items: center; font-size: 7pt; color: #9aa2ad; font-weight: 700; }
.blank { width: 16mm; border-bottom: 1.2px solid #9aa2ad; height: 4mm; } .blank.wide { width: 30mm; }
.feel { color: var(--muted); font-weight: 600; }
.finbody { display: grid; grid-template-columns: 78mm 1fr; gap: 12px; border: 1px solid #f3b2a6; background: #fff8f6; border-radius: 12px; padding: 10px; break-inside: avoid; }
.end { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 12px; break-inside: avoid; }
table { width: 100%; border-collapse: collapse; font-size: 9pt; } td { padding: 4px 0; border-top: 1px solid var(--line); vertical-align: top; } td:first-child { font-weight: 700; padding-right: 8px; width: 34%; }
ul.list { margin: 0; padding-left: 16px; font-size: 9.5pt; } ul.list li { margin-bottom: 3px; }
.pb { break-before: page; }
.keep { break-inside: avoid; }
.foot { margin-top: 12px; font-size: 7.5pt; color: var(--muted); }
</style></head><body>
<section class="hero">
  <div class="brand"><span><i></i><b>THE COMEBACK</b></span><span>${solo ? `Plan for ${esc(ATH[0].name)}` : ATH.map(a => esc(a.name)).join(' & ')}</span></div>
  <p class="eyebrow">Week ${S.week} · Session ${S.num} · <b>${esc(S.dateLabel)}</b></p>
  <h1>${esc(S.title)}</h1>
  <div class="chips"><span class="chip p">${esc(S.type)}</span><span class="chip">~${S.minutes} min</span><span class="chip">${esc(S.phase)}</span><span class="chip">Effort: RPE ${esc(S.rpe)}, about 4 reps left in the tank</span></div>
  <p class="brief">${esc(S.brief)}</p>
  <ol class="jobs">${S.jobs.map(j => `<li>${esc(j)}</li>`).join('')}</ol>
</section>
${S.note ? `<p class="note sec">${esc(S.note)}</p>` : ''}
<div class="sec"><h2>Today at a glance</h2><div class="glance">${glance.map(g => `<div><b>${g[1]} min</b><span>${esc(g[0])}</span></div>`).join('')}</div></div>
<div class="sec two">
  <div class="panel"><h3>What today works</h3><div class="map"><div class="figs">${body('anterior', heat)}${body('posterior', heat)}</div>
    <ul class="bars">${top.map(m => `<li><span>${MUSCLE[m]}</span><span class="bar"><i style="width:${Math.round(heat[m] * 100)}%"></i></span></li>`).join('')}</ul></div></div>
  <div class="panel"><h3>How heavy?</h3><p class="lead">After every set ask: how many more good reps could I have done?</p>
    <div class="cal"><div style="--c:#3b82f6"><b>5+</b><span>Too light. Go up one step.</span></div><div style="--c:var(--heat)"><b>3–4</b><span>Perfect. Stay. This is today's effort.</span></div><div style="--c:#c9a227"><b>0–2</b><span>Too heavy. Drop a step.</span></div></div>
    ${solo ? `<div class="week"><span class="done">Sat ✓</span><span class="done">Sun ✓</span><span class="today">${esc(S.dateLabel.slice(0, 3))}: today</span><span>= Week 1 target</span></div>` : ''}
  </div>
</div>
<section class="sec"><h2>Warm-up · ${S.warmup.minutes} min</h2><p class="lead"><b>First:</b> ${esc(S.warmup.cardio)} <b>Then:</b> one round of:</p><div class="rows">${S.warmup.items.map(i => row(i)).join('')}</div></section>
${S.blocks.map(block).join('')}
${finisher}
<section class="sec" style="break-inside:avoid"><h2>Cool-down · ${S.cooldown.minutes} min</h2><div class="rows">${S.cooldown.items.map(i => row(i)).join('')}</div><p class="lead" style="margin-top:6px">${esc(S.cooldown.extra)}</p></section>
<div class="end">
  <div class="panel"><h3>Equipment taken? Swap it</h3><table>${S.swaps.map(s => `<tr><td>${esc(s[0])}</td><td>${esc(s[1])}</td></tr>`).join('')}</table></div>
  <div class="panel"><h3>Plan B</h3><p class="lead">${esc(S.planB)}</p><h3 style="margin-top:8px">Afterwards</h3><ul class="list">${S.after.map(a => `<li>${esc(a)}</li>`).join('')}</ul><p class="lead" style="margin-top:6px"><b>${esc(S.next)}</b></p></div>
</div>
<p class="foot">Soreness is normal; pain is not. Stop any exercise that gives sharp or joint pain and use its swap. Exercise photos: Free Exercise DB (public domain). Muscle map: react-body-highlighter (MIT).</p>
</body></html>`;

(async () => {
  const tmp = path.join(path.dirname(out), '.session-pdf.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(tmp, html);
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://' + tmp, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    path: out, format: 'A4', printBackground: true,
    margin: { top: '12mm', bottom: '14mm', left: '12mm', right: '12mm' },
    displayHeaderFooter: true, headerTemplate: '<span></span>',
    footerTemplate: `<div style="width:100%;font-size:7px;color:#8a929d;padding:0 12mm;display:flex;justify-content:space-between;font-family:sans-serif"><span>The Comeback · ${esc(S.title)} · ${esc(S.dateLabel)}</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`
  });
  await browser.close();
  fs.unlinkSync(tmp);
  console.log('PDF written:', out);
})();
