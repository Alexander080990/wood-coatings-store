// Генератор автономного HTML-прототипа Deep Color.
// Собирает site/index.html со встроенными шрифтами (base64) и изображениями.
import { readFileSync, writeFileSync, copyFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const b64 = (file, mime) =>
  'data:' + mime + ';base64,' +
  readFileSync(file).toString('base64');

// Шрифты
const fonts = [
  ['Manrope 400 cyrillic', 'node_modules/@fontsource/manrope/files/manrope-cyrillic-400-normal.woff2'],
  ['Manrope 500 cyrillic', 'node_modules/@fontsource/manrope/files/manrope-cyrillic-500-normal.woff2'],
  ['Manrope 600 cyrillic', 'node_modules/@fontsource/manrope/files/manrope-cyrillic-600-normal.woff2'],
  ['Manrope 700 cyrillic', 'node_modules/@fontsource/manrope/files/manrope-cyrillic-700-normal.woff2'],
  ['Manrope 800 cyrillic', 'node_modules/@fontsource/manrope/files/manrope-cyrillic-800-normal.woff2'],
  ['Manrope 400 latin', 'node_modules/@fontsource/manrope/files/manrope-latin-400-normal.woff2'],
  ['Manrope 500 latin', 'node_modules/@fontsource/manrope/files/manrope-latin-500-normal.woff2'],
  ['Manrope 600 latin', 'node_modules/@fontsource/manrope/files/manrope-latin-600-normal.woff2'],
  ['Manrope 700 latin', 'node_modules/@fontsource/manrope/files/manrope-latin-700-normal.woff2'],
  ['Manrope 800 latin', 'node_modules/@fontsource/manrope/files/manrope-latin-800-normal.woff2'],
  ['Fraunces 400 latin', 'node_modules/@fontsource/fraunces/files/fraunces-latin-400-normal.woff2'],
  ['Fraunces 600 latin', 'node_modules/@fontsource/fraunces/files/fraunces-latin-600-normal.woff2'],
  ['Fraunces 700 latin', 'node_modules/@fontsource/fraunces/files/fraunces-latin-700-normal.woff2'],
]
  .map(
    ([name, file]) =>
      `@font-face { font-family: '${name.split(' ')[0]}'; font-weight: ${name.split(' ')[1]}; font-style: normal; font-display: swap; src: url(${b64(join(root, file), 'application/font-woff2')}) format('woff2'); unicode-range: ${name.includes('cyrillic') ? 'U+0400-04FF' : 'U+0000-00FF'}; }`
  )
  .join('\n');

const siteDir = join(root, 'site');
mkdirSync(join(siteDir, 'images'), { recursive: true });
for (const f of ['hero-wood.jpg', 'shade-house.jpg', 'architecture.jpg']) {
  copyFileSync(join(root, 'public', f), join(siteDir, 'images', f));
}

const heroImg = b64(join(root, 'public/hero-wood.jpg'), 'image/jpeg');
const shadeImg = b64(join(root, 'public/shade-house.jpg'), 'image/jpeg');
const archImg = b64(join(root, 'public/architecture.jpg'), 'image/jpeg');

const html = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Deep Color — Профессиональные покрытия для совершенства древесины</title>
<meta name="description" content="Deep Color — премиальные профессиональные покрытия для древесины: пропитки, грунты, лазури, масла и системы финишной защиты. Подбор оттенков, системы покрытий и каталог решений.">
<style>
${fonts}
:root{
  --bg:#14171A; --bg-deep:#0F1113; --bg-panel:#1C2022; --bg-soft:#262B2E;
  --milk:#EDE7DC; --milk-soft:#F4F0E8;
  --wood:#7C5534; --wood-walnut:#52331F; --wood-teak:#6E3B2A; --wood-oak:#C39B6F;
  --accent:#D09A6B; --accent-soft:#C98A5A;
  --muted:#9B958B; --muted-soft:#7A746C;
}
*{margin:0;padding:0;box-sizing:border-box;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--milk);font-family:'Manrope',system-ui,sans-serif;overflow-x:hidden}
img{max-width:100%;display:block}
::selection{background:var(--accent);color:var(--bg)}
::-webkit-scrollbar{width:8px}
::-webkit-scrollbar-track{background:var(--bg-deep)}
::-webkit-scrollbar-thumb{background:var(--bg-soft);border-radius:4px}
::-webkit-scrollbar-thumb:hover{background:#3a4145}

.grain{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");opacity:.04;pointer-events:none}

.display{font-family:'Fraunces',Georgia,serif}

/* ================= Navbar ================= */
header{position:fixed;top:0;left:0;right:0;z-index:50;transition:background .5s,border-color .5s}
header.scrolled{background:rgba(20,23,26,.85);backdrop-filter:blur(12px);border-bottom:1px solid rgba(255,255,255,.05)}
.nav-inner{max-width:1280px;margin:0 auto;padding:0 clamp(16px,4vw,40px);display:flex;align-items:center;justify-content:space-between;height:76px}
.brand{font-family:'Fraunces',Georgia,serif;font-size:clamp(17px,1.9vw,24px);font-weight:700;letter-spacing:clamp(.14em,.6vw,.22em);color:var(--milk);white-space:nowrap}
.nav-links{display:none;align-items:center;gap:clamp(20px,2.5vw,48px)}
@media(min-width:768px){.nav-links{display:flex}}
.nav-links a{font-size:clamp(13px,1.2vw,14px);font-weight:500;letter-spacing:.02em;color:var(--muted);transition:color .3s;text-decoration:none}
.nav-links a:hover{color:var(--milk)}
.nav-cta{display:none;border:1px solid rgba(124,85,52,.4);border-radius:999px;padding:8px 20px;font-size:14px;font-weight:600;letter-spacing:.02em;color:var(--milk);text-decoration:none;transition:.3s}
@media(min-width:768px){.nav-cta{display:inline-block}}
.nav-cta:hover{border-color:var(--accent);color:var(--accent)}
.burger{display:flex;flex-direction:column;gap:6px;background:none;border:none;cursor:pointer;padding:8px;margin-right:-8px}
@media(min-width:768px){.burger{display:none}}
.burger span{display:block;width:24px;height:2px;background:var(--milk);transition:.3s}
.burger.open span:nth-child(1){transform:translateY(8px) rotate(45deg)}
.burger.open span:nth-child(2){opacity:0}
.burger.open span:nth-child(3){transform:translateY(-8px) rotate(-45deg)}
.mobile-menu{max-height:0;overflow:hidden;transition:max-height .35s ease;background:rgba(20,23,26,.95);backdrop-filter:blur(12px)}
.mobile-menu.open{max-height:380px}
@media(min-width:768px){.mobile-menu{display:none}}
.mobile-menu a{display:block;padding:16px 24px;border-bottom:1px solid rgba(255,255,255,.05);font-size:clamp(15px,1.6vw,16px);font-weight:500;color:var(--milk);text-decoration:none}
.mobile-menu .m-cta{margin:16px 24px 24px;border:1px solid rgba(124,85,52,.4);border-radius:999px;text-align:center;padding:12px;color:var(--milk);transition:.3s}
.mobile-menu .m-cta:hover{border-color:var(--accent);color:var(--accent)}

/* ================= Hero (cinematic scene) ================= */
.hero{position:relative;min-height:100vh;display:flex;align-items:center;overflow:hidden}
.hero-bg{position:absolute;inset:-5%;z-index:0;will-change:transform}
.hero-img{width:100%;height:100%;object-fit:cover;animation:kenburns 26s ease-in-out infinite;will-change:transform}
@keyframes kenburns{
  0%{transform:scale(1.02) translate(0,0)}
  50%{transform:scale(1.13) translate(-1.6%,-1.2%)}
  100%{transform:scale(1.02) translate(0,0)}
}
.hero-vignette{position:absolute;inset:0;z-index:1;pointer-events:none;
  background:
    linear-gradient(90deg, rgba(15,17,19,.92) 0%, rgba(15,17,19,.55) 42%, rgba(15,17,19,.18) 100%),
    linear-gradient(180deg, rgba(15,17,19,.55) 0%, rgba(15,17,19,.15) 38%, rgba(15,17,19,.95) 100%);
}
.hero-glow{position:absolute;inset:-10%;z-index:1;pointer-events:none;
  background:radial-gradient(55% 45% at 72% 28%, rgba(208,154,107,.20), rgba(208,154,107,.05) 45%, transparent 70%);
  animation:glow 9s ease-in-out infinite;will-change:transform,opacity}
@keyframes glow{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:.95;transform:scale(1.08)}}
.hero-sweep{position:absolute;inset:0;z-index:1;pointer-events:none;mix-blend-mode:screen;
  background:linear-gradient(115deg, transparent 38%, rgba(237,231,220,.07) 50%, transparent 62%);
  animation:sweep 11s ease-in-out infinite}
@keyframes sweep{0%{transform:translateX(-32%)}50%{transform:translateX(32%)}100%{transform:translateX(-32%)}}
.hero-particles{position:absolute;inset:0;z-index:2;width:100%;height:100%;pointer-events:none}
.hero-content{position:relative;z-index:3;max-width:1280px;margin:0 auto;width:100%;
  padding:clamp(96px,13vh,150px) clamp(20px,5vw,40px) clamp(80px,10vh,120px)}
.hero-badge{display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(124,85,52,.3);border-radius:999px;
  padding:6px clamp(12px,1.6vw,16px);font-size:clamp(10px,1.1vw,12px);font-weight:600;letter-spacing:clamp(.16em,.8vw,.22em);
  text-transform:uppercase;color:var(--wood-oak);white-space:nowrap}
.hero-badge i{width:6px;height:6px;border-radius:50%;background:var(--accent);animation:pulse 2.4s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:1;transform:scale(1.4)}}
.hero h1{margin-top:clamp(20px,3vw,28px);font-family:'Fraunces',Georgia,serif;
  font-size:clamp(30px,6.4vw,62px);font-weight:700;line-height:1.06;color:var(--milk);
  text-wrap:balance;max-width:14ch;position:relative}
.hero h1::after{content:"";position:absolute;inset:0;pointer-events:none;
  background:linear-gradient(100deg, transparent 34%, rgba(237,231,220,.16) 50%, transparent 66%);
  transform:translateX(-130%);animation:shine 8s ease-in-out 1.4s infinite}
@keyframes shine{0%{transform:translateX(-130%)}55%{transform:translateX(130%)}100%{transform:translateX(130%)}}
.hero p{margin-top:clamp(20px,2.6vw,28px);max-width:560px;font-size:clamp(15px,1.6vw,18px);line-height:1.6;color:var(--muted)}
.hero-actions{margin-top:clamp(28px,3.6vw,40px);display:flex;flex-direction:column;gap:14px}
@media(min-width:640px){.hero-actions{flex-direction:row}}
.btn-solid,.btn-ghost{display:inline-flex;align-items:center;justify-content:center;gap:8px;border-radius:999px;
  padding:clamp(12px,1.4vw,14px) clamp(22px,2.4vw,28px);font-size:clamp(13px,1.3vw,14px);font-weight:600;
  letter-spacing:.02em;text-decoration:none;transition:.3s;white-space:nowrap}
.btn-solid{background:var(--milk);color:var(--bg)}
.btn-solid:hover{background:var(--accent);box-shadow:0 0 40px -8px rgba(208,154,107,.6)}
.btn-ghost{border:1px solid rgba(255,255,255,.2);color:var(--milk)}
.btn-ghost:hover{border-color:var(--accent);color:var(--accent)}
.hero-arrow{transition:transform .3s}
.btn-solid:hover .hero-arrow{transform:translateX(4px)}
.scroll-hint{position:absolute;bottom:clamp(20px,4vh,32px);left:50%;transform:translateX(-50%);z-index:3;
  display:flex;flex-direction:column;align-items:center;gap:8px}
.scroll-hint span{font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:var(--muted-soft)}
.scroll-wheel{width:20px;height:36px;border:1px solid rgba(255,255,255,.2);border-radius:999px;display:flex;justify-content:center;padding-top:6px}
.scroll-wheel i{width:4px;height:6px;border-radius:999px;background:rgba(237,231,220,.7);animation:scrolldot 1.8s ease-in-out infinite}
@keyframes scrolldot{0%{transform:translateY(0)}50%{transform:translateY(10px)}100%{transform:translateY(0)}}

/* ================= Entrance animations ================= */
.anim{opacity:0;transform:translateY(30px)}
.anim.in{opacity:1;transform:translateY(0);transition:opacity 1s ease,transform 1s ease}

/* ================= Shade Studio ================= */
.studio{position:relative;overflow:hidden}
.studio-bg{position:absolute;inset:0;background:var(--bg-deep)}
.studio-inner{position:relative;max-width:1280px;margin:0 auto;padding:clamp(72px,9vw,128px) clamp(20px,5vw,40px)}
.section-label{font-size:clamp(11px,1.1vw,12px);font-weight:600;letter-spacing:clamp(.16em,.8vw,.22em);text-transform:uppercase;color:var(--accent)}
.section-title{margin-top:clamp(12px,1.6vw,16px);font-family:'Fraunces',Georgia,serif;
  font-size:clamp(26px,4.4vw,52px);font-weight:700;line-height:1.1;color:var(--milk);text-wrap:balance}
.section-lead{margin-top:clamp(16px,2vw,20px);font-size:clamp(15px,1.5vw,18px);line-height:1.6;color:var(--muted);max-width:640px}
.studio-grid{margin-top:clamp(36px,4.5vw,48px);display:grid;gap:clamp(24px,3vw,48px)}
@media(min-width:1024px){.studio-grid{grid-template-columns:1fr 340px}}
.canvas-wrap{position:relative;width:100%;aspect-ratio:4/3;overflow:hidden;border-radius:16px;border:1px solid rgba(255,255,255,.05)}
@media(min-width:768px){.canvas-wrap{aspect-ratio:16/10}}
.canvas-wrap canvas{position:absolute;inset:0;width:100%;height:100%}
.canvas-overlay{position:absolute;inset:0;pointer-events:none;display:flex;align-items:flex-end;padding:clamp(16px,2.4vw,32px)}
.canvas-overlay .ov-label{font-size:clamp(10px,1.1vw,11px);letter-spacing:clamp(.16em,.8vw,.22em);text-transform:uppercase;color:rgba(237,231,220,.6)}
.canvas-overlay .ov-name{margin-top:4px;font-family:'Fraunces',Georgia,serif;font-size:clamp(20px,2.6vw,30px);font-weight:600;color:var(--milk)}
.compare-btn{position:absolute;top:clamp(12px,1.8vw,20px);left:clamp(12px,1.8vw,20px);border:1px solid rgba(255,255,255,.15);
  background:rgba(15,17,19,.7);border-radius:999px;padding:6px clamp(12px,1.6vw,16px);font-size:clamp(11px,1.1vw,12px);
  font-weight:500;letter-spacing:.02em;color:var(--milk);backdrop-filter:blur(8px);cursor:pointer;transition:.3s;font-family:inherit}
.compare-btn:hover{border-color:var(--accent);color:var(--accent)}
.controls{display:flex;flex-direction:column;justify-content:center}
.controls .ctrl-label{font-size:clamp(11px,1.1vw,12px);font-weight:600;letter-spacing:clamp(.16em,.8vw,.22em);text-transform:uppercase;color:var(--muted)}
.controls .ctrl-note{margin-top:8px;font-size:clamp(12px,1.2vw,13px);line-height:1.6;color:var(--muted-soft)}
.swatches{margin-top:clamp(18px,2.2vw,24px);display:grid;grid-template-columns:1fr 1fr;gap:12px}
.swatch{display:flex;align-items:center;gap:12px;border-radius:12px;border:1px solid rgba(255,255,255,.08);
  background:rgba(20,23,26,.6);padding:12px;text-align:left;cursor:pointer;transition:.3s;font-family:inherit}
.swatch:hover{border-color:rgba(255,255,255,.2)}
.swatch.active{border-color:rgba(208,154,107,.6);background:var(--bg-panel)}
.swatch .dot{width:36px;height:36px;border-radius:50%;flex-shrink:0;box-shadow:inset 0 0 0 1px rgba(255,255,255,.1);transition:transform .3s}
.swatch:hover .dot{transform:scale(1.1)}
.swatch .sw-name{display:block;font-size:clamp(12px,1.2vw,14px);font-weight:600;color:var(--milk);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.swatch .sw-code{display:block;font-size:clamp(11px,1.1vw,12px);color:var(--muted)}
.shade-desc{margin-top:clamp(16px,2vw,20px);font-size:clamp(12px,1.2vw,13px);line-height:1.6;color:var(--muted-soft)}

/* ================= Systems ================= */
.systems{position:relative;background:var(--bg);padding:clamp(72px,9vw,128px) 0}
.systems-inner,.catalog-inner,.contact-inner{max-width:1280px;margin:0 auto;padding:0 clamp(20px,5vw,40px)}
.systems-grid{margin-top:clamp(40px,5vw,56px);display:grid;gap:clamp(16px,2vw,20px)}
@media(min-width:768px){.systems-grid{grid-template-columns:1fr 1fr}}
@media(min-width:1024px){.systems-grid{grid-template-columns:repeat(3,1fr)}}
.system-card{position:relative;display:flex;flex-direction:column;border-radius:16px;border:1px solid rgba(255,255,255,.08);
  background:rgba(28,32,34,.6);padding:clamp(22px,2.6vw,28px);transition:border-color .5s}
.system-card:hover{border-color:rgba(124,85,52,.4)}
.system-card .num{font-family:'Fraunces',Georgia,serif;font-size:clamp(30px,3.4vw,40px);font-weight:700;color:rgba(255,255,255,.05);transition:color .5s}
.system-card:hover .num{color:rgba(208,154,107,.2)}
.system-card h3{margin-top:clamp(12px,1.6vw,16px);font-family:'Fraunces',Georgia,serif;font-size:clamp(16px,1.7vw,20px);font-weight:600;color:var(--milk);text-wrap:balance}
.system-card p{margin-top:10px;font-size:clamp(12px,1.3vw,14px);line-height:1.6;color:var(--muted)}
/* Слоистая визуальная демонстрация нанесения */
.layer-stack{margin-top:clamp(18px,2.2vw,24px);display:flex;flex-direction:column;gap:6px}
.lb{height:14px;border-radius:4px;opacity:.35;transform:translateX(-8px);transition:opacity .5s ease,transform .5s ease}
.lb:nth-child(1){background:linear-gradient(90deg,#3a2415,#52331F)}
.lb:nth-child(2){background:linear-gradient(90deg,#52331F,#7C5534)}
.lb:nth-child(3){background:linear-gradient(90deg,#7C5534,#C39B6F)}
.system-card.in .lb{opacity:1;transform:none}
.system-card.in .lb:nth-child(1){transition-delay:.05s}
.system-card.in .lb:nth-child(2){transition-delay:.15s}
.system-card.in .lb:nth-child(3){transition-delay:.25s}
.lb.on{opacity:1!important;box-shadow:0 0 18px -4px rgba(208,154,107,.5)}
.lb-legend{margin-top:10px;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted-soft)}
.steps{margin-top:clamp(18px,2.2vw,24px);border-top:1px solid rgba(255,255,255,.08);padding-top:clamp(14px,1.8vw,20px);display:flex;flex-direction:column;gap:12px}
.step{display:flex;gap:12px;cursor:pointer;border-radius:8px;padding:4px;transition:background .3s}
.step:hover{background:rgba(255,255,255,.03)}
.step .layer{flex-shrink:0;border-radius:8px;background:rgba(124,85,52,.15);padding:4px 8px;font-size:clamp(11px,1.1vw,12px);font-weight:600;letter-spacing:.02em;color:var(--wood-oak)}
.step .purpose{font-size:clamp(12px,1.2vw,13px);line-height:1.6;color:var(--muted-soft)}
.system-card .scene{margin-top:clamp(18px,2.2vw,24px);font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted-soft)}
.systems-note{margin-top:clamp(28px,3.5vw,40px);text-align:center;font-size:clamp(11px,1.1vw,12px);line-height:1.6;color:var(--muted-soft);max-width:720px;margin-left:auto;margin-right:auto}

/* ================= Catalog ================= */
.catalog{position:relative;background:var(--bg-deep);padding:clamp(72px,9vw,128px) 0}
.catalog-head{display:flex;flex-direction:column;gap:clamp(16px,2vw,24px)}
@media(min-width:768px){.catalog-head{flex-direction:row;align-items:flex-end;justify-content:space-between}}
.catalog-grid{margin-top:clamp(40px,5vw,56px);display:grid;gap:1px;background:rgba(255,255,255,.05);
  border:1px solid rgba(255,255,255,.08);border-radius:16px;overflow:hidden}
@media(min-width:640px){.catalog-grid{grid-template-columns:1fr 1fr}}
@media(min-width:1024px){.catalog-grid{grid-template-columns:repeat(3,1fr)}}
.cat-card{position:relative;display:flex;flex-direction:column;justify-content:space-between;
  background:rgba(20,23,26,.8);padding:clamp(24px,3vw,32px);transition:background .5s;text-decoration:none;color:inherit;overflow:hidden}
.cat-card::after{content:"";position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .5s;
  background:radial-gradient(80% 60% at 80% 0%, rgba(208,154,107,.14), transparent 70%)}
.cat-card:hover{background:var(--bg-panel)}
.cat-card:hover::after{opacity:1}
.cat-card .cat-vis{width:44px;height:5px;border-radius:999px;background:linear-gradient(90deg,var(--wood-walnut),var(--accent));opacity:.85}
.cat-card .num{margin-top:clamp(16px,2vw,20px);font-family:'Fraunces',Georgia,serif;font-size:clamp(26px,3vw,32px);font-weight:700;color:rgba(255,255,255,.1);transition:color .5s}
.cat-card:hover .num{color:rgba(208,154,107,.3)}
.cat-card h3{margin-top:clamp(14px,1.8vw,20px);font-family:'Fraunces',Georgia,serif;font-size:clamp(16px,1.6vw,18px);font-weight:600;color:var(--milk);text-wrap:balance}
.cat-card p{margin-top:8px;font-size:clamp(12px,1.2vw,13px);line-height:1.6;color:var(--muted)}
.cat-card .go{margin-top:clamp(24px,3vw,32px);display:inline-flex;align-items:center;gap:8px;font-size:clamp(13px,1.3vw,14px);font-weight:500;color:var(--wood-oak);transition:color .3s}
.cat-card:hover .go{color:var(--accent)}
.cat-card .go span{transition:transform .3s}
.cat-card:hover .go span{transform:translateX(4px)}
.catalog-example{margin-top:clamp(44px,5.5vw,64px)}
.catalog-example .ex-label{font-size:clamp(11px,1.1vw,12px);font-weight:600;letter-spacing:clamp(.16em,.8vw,.22em);text-transform:uppercase;color:var(--muted)}
.example-card{margin-top:clamp(18px,2.2vw,24px);border:1px solid rgba(255,255,255,.08);background:rgba(20,23,26,.6);
  border-radius:16px;padding:clamp(20px,2.6vw,32px);display:grid;gap:clamp(20px,2.6vw,32px)}
@media(min-width:768px){.example-card{grid-template-columns:1.2fr 1fr}}
.example-card .ex-img{position:relative;width:100%;aspect-ratio:4/3;border-radius:12px;overflow:hidden;background:rgba(82,51,31,.4)}
.example-card .ex-img img{width:100%;height:100%;object-fit:cover;opacity:.8}
.example-card .ex-tag{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--accent)}
.example-card h3{margin-top:12px;font-family:'Fraunces',Georgia,serif;font-size:clamp(18px,2vw,20px);font-weight:600;color:var(--milk)}
.example-card p{margin-top:12px;font-size:clamp(12px,1.2vw,13px);line-height:1.6;color:var(--muted)}
.ex-dl{margin-top:20px;border-top:1px solid rgba(255,255,255,.08);padding-top:20px;display:flex;flex-direction:column;gap:8px}
.ex-dl div{display:flex;justify-content:space-between;gap:16px;font-size:clamp(12px,1.2vw,13px)}
.ex-dl dt{color:var(--muted)}
.ex-dl dd{color:var(--milk);text-align:right}

/* ================= Contact ================= */
.contact{position:relative;background:var(--bg);padding:clamp(72px,9vw,128px) 0;overflow:hidden}
.contact::before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent,rgba(82,51,31,.1),transparent)}
.contact-inner{position:relative;max-width:672px;margin:0 auto;text-align:center}
.contact form{margin-top:clamp(30px,3.6vw,40px);display:flex;flex-direction:column;gap:16px;text-align:left}
.field{width:100%;border-radius:12px;border:1px solid rgba(255,255,255,.1);background:rgba(20,23,26,.8);
  padding:12px clamp(14px,2vw,16px);font-size:clamp(13px,1.3vw,14px);color:var(--milk);font-family:inherit}
.field::placeholder{color:var(--muted-soft)}
.field:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 1px var(--accent)}
textarea.field{resize:vertical;min-height:110px}
.form-row{display:grid;gap:16px}
@media(min-width:640px){.form-row{grid-template-columns:1fr 1fr}}
.submit-btn{width:100%;border:none;border-radius:999px;background:var(--milk);padding:14px;font-size:clamp(13px,1.3vw,14px);
  font-weight:600;letter-spacing:.02em;color:var(--bg);cursor:pointer;transition:.3s;font-family:inherit}
.submit-btn:hover{background:var(--accent)}
.form-success{margin-top:clamp(30px,3.6vw,40px);border:1px solid rgba(208,154,107,.4);background:rgba(28,32,34,.8);border-radius:16px;padding:clamp(22px,2.6vw,32px)}
.form-success h3{font-family:'Fraunces',Georgia,serif;font-size:clamp(18px,2vw,20px);font-weight:600;color:var(--milk)}
.form-success p{margin-top:8px;font-size:clamp(12px,1.2vw,13px);color:var(--muted)}

/* ================= Footer ================= */
footer{border-top:1px solid rgba(255,255,255,.08);background:var(--bg-deep);padding:clamp(44px,5vw,56px) 0}
.footer-inner{max-width:1280px;margin:0 auto;padding:0 clamp(20px,5vw,40px);display:flex;flex-direction:column;gap:40px}
@media(min-width:768px){.footer-inner{flex-direction:row;justify-content:space-between}}
.footer-brand{max-width:320px}
.footer-brand p.brand{font-family:'Fraunces',Georgia,serif;font-size:clamp(18px,1.8vw,20px);font-weight:700;letter-spacing:clamp(.14em,.6vw,.22em);color:var(--milk)}
.footer-brand p{margin-top:16px;font-size:clamp(12px,1.2vw,13px);line-height:1.6;color:var(--muted)}
.footer-cols{display:grid;grid-template-columns:1fr 1fr;gap:40px}
@media(min-width:640px){.footer-cols{grid-template-columns:repeat(3,1fr)}}
.footer-col h4{font-size:10px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:var(--muted-soft)}
.footer-col ul{list-style:none;margin-top:16px;display:flex;flex-direction:column;gap:8px}
.footer-col a,.footer-col li{font-size:clamp(12px,1.2vw,13px);color:var(--muted);text-decoration:none}
.footer-col a{transition:color .3s}
.footer-col a:hover{color:var(--milk)}
.footer-bottom{max-width:1280px;margin:0 auto;padding:24px clamp(20px,5vw,40px) 0;border-top:1px solid rgba(255,255,255,.08);
  display:flex;flex-direction:column;gap:8px;font-size:clamp(11px,1.1vw,12px);color:var(--muted-soft)}
@media(min-width:768px){.footer-bottom{flex-direction:row;justify-content:space-between}}

@media (prefers-reduced-motion: reduce){
  *{animation:none!important;transition:none!important}
  .anim{opacity:1;transform:none}
  .lb{opacity:1;transform:none}
}
@media(max-width:767px){
  .hero-img{animation-duration:36s}
  .hero h1::after{display:none}
}
</style>
</head>
<body>

<!-- Navbar -->
<header id="site-header">
  <div class="nav-inner">
    <a href="#top" class="brand">DEEP<span style="color:var(--accent)"> COLOR</span></a>
    <div class="nav-links">
      <a href="#systems">Системы</a>
      <a href="#shade-studio">Оттенки</a>
      <a href="#catalog">Каталог</a>
      <a href="#contact" class="nav-cta">Заявка</a>
    </div>
    <button class="burger" id="burger" aria-label="Открыть меню">
      <span></span><span></span><span></span>
    </button>
  </div>
  <div class="mobile-menu" id="mobile-menu">
    <a href="#systems">Системы</a>
    <a href="#shade-studio">Оттенки</a>
    <a href="#catalog">Каталог</a>
    <a href="#contact" class="m-cta">Заявка</a>
  </div>
</header>

<!-- Hero: кинематографическая сцена -->
<section class="hero" id="top">
  <div class="hero-bg">
    <img class="hero-img" src="${heroImg}" alt="Деревянная архитектура в глубоких тёмных тонах">
  </div>
  <div class="hero-glow"></div>
  <div class="hero-sweep"></div>
  <canvas class="hero-particles" aria-hidden="true"></canvas>
  <div class="hero-vignette"></div>
  <div class="hero-content">
    <span class="hero-badge anim" style="transition-delay:.05s"><i></i>Профессиональные покрытия для древесины</span>
    <h1 class="anim" style="transition-delay:.18s">Профессиональные покрытия<br>для совершенства древесины</h1>
    <p class="anim" style="transition-delay:.32s">Deep Color — премиальные системы защиты и отделки дерева: от глубокой пропитки до финишных покрытий. Выбор оттенка, системы покрытий и каталог решений для фасадов, окон, дверей и террас.</p>
    <div class="hero-actions anim" style="transition-delay:.46s">
      <a href="#shade-studio" class="btn-solid">Выбрать оттенок <span class="hero-arrow">→</span></a>
      <a href="#systems" class="btn-ghost">Системы покрытий</a>
    </div>
  </div>
  <div class="scroll-hint">
    <span>Прокрутите</span>
    <div class="scroll-wheel"><i></i></div>
  </div>
</section>

<!-- Shade Studio -->
<section class="studio" id="shade-studio">
  <div class="studio-bg"></div>
  <div class="grain" style="position:absolute;inset:0"></div>
  <div class="studio-inner">
    <div style="max-width:720px">
      <span class="section-label anim">Индекс оттенков</span>
      <h2 class="section-title anim">Выберите оттенок —<br>и увидите, как меняется древесина</h2>
      <p class="section-lead anim">Оттенок накладывается на натуральную текстуру древесины. Меняется цвет — сохраняется структура. Выберите вариант и наблюдайте реалистичное изменение покрытия деревянной архитектуры.</p>
    </div>
    <div class="studio-grid">
      <div class="canvas-wrap">
        <canvas id="shade-canvas"></canvas>
        <button class="compare-btn" id="compare-btn">Сравнить с натуральным</button>
        <div class="canvas-overlay">
          <div>
            <div class="ov-label" id="ov-label">Текущий оттенок</div>
            <p class="ov-name" id="ov-name">Натуральный дуб</p>
          </div>
        </div>
      </div>
      <div class="controls">
        <span class="ctrl-label">Выбор оттенка</span>
        <p class="ctrl-note">Коды оттенков подтверждены цветовыми системами производителей (Sikkens Cetol / Zobel Color-Line). Связь с конкретными продуктами — по документации производителя.</p>
        <div class="swatches" id="swatches"></div>
        <p class="shade-desc" id="shade-desc"></p>
      </div>
    </div>
  </div>
</section>

<!-- Systems -->
<section class="systems" id="systems">
  <div class="systems-inner">
    <div style="max-width:720px">
      <span class="section-label anim">Системы покрытий</span>
      <h2 class="section-title anim">Решение для конкретной задачи —<br>не просто банка материала</h2>
      <p class="section-lead anim">Каждая система — это последовательность слоёв: от защитной пропитки до финишного покрытия. Нанесение, назначение каждого слоя и совместимость компонентов — по техническим рекомендациям производителей.</p>
    </div>
    <div class="systems-grid" id="systems-grid"></div>
    <p class="systems-note">Состав систем и рекомендации по нанесению — по документации производителей Sikkens и Zobel. Доступность продуктов в вашем регионе уточняйте у авторизованного поставщика.</p>
  </div>
</section>

<!-- Catalog -->
<section class="catalog" id="catalog">
  <div class="catalog-inner">
    <div class="catalog-head">
      <div style="max-width:720px">
        <span class="section-label anim">Каталог</span>
        <h2 class="section-title anim">Направления каталога</h2>
        <p class="section-lead anim">Категория по задаче, а не по формальным признакам. К каждому направлению — системное решение и техническая документация.</p>
      </div>
      <a href="#catalog" class="btn-ghost anim" style="flex-shrink:0">Все категории</a>
    </div>
    <div class="catalog-grid" id="catalog-grid"></div>
    <div class="catalog-example">
      <span class="ex-label">Пример карточки товара</span>
      <div class="example-card anim">
        <div class="ex-img"><img src="${archImg}" alt="Архитектурная иллюстрация для карточки товара"></div>
        <div>
          <span class="ex-tag">Пример структуры</span>
          <h3>Название продукта</h3>
          <p>Краткое описание назначения продукта в рамках системы покрытий. Технические характеристики — по документации производителя.</p>
          <dl class="ex-dl">
            <div><dt>Назначение</dt><dd>По документации</dd></div>
            <div><dt>Совместимость</dt><dd>По системе</dd></div>
            <div><dt>Цена и наличие</dt><dd>Уточнить у поставщика</dd></div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Contact -->
<section class="contact" id="contact">
  <div class="contact-inner">
    <span class="section-label anim">Заявка</span>
    <h2 class="section-title anim" style="margin-top:16px">Подберём систему покрытий</h2>
    <p class="section-lead anim">Оставьте заявку — мы свяжемся и проконсультируем по выбору системы покрытий для вашего объекта в Москве и Московской области.</p>
    <div class="anim" id="contact-form-wrap">
      <form id="contact-form">
        <div class="form-row">
          <input class="field" type="text" placeholder="Имя" required>
          <input class="field" type="tel" placeholder="Телефон" required>
        </div>
        <textarea class="field" rows="4" placeholder="Объект и задача (фасад, окна, двери, терраса, внутренние работы)"></textarea>
        <button class="submit-btn" type="submit">Отправить заявку</button>
      </form>
    </div>
  </div>
</section>

<!-- Footer -->
<footer>
  <div class="footer-inner">
    <div class="footer-brand">
      <p class="brand">DEEP<span style="color:var(--accent)"> COLOR</span></p>
      <p>Профессиональные покрытия для совершенства древесины. Системы защиты и отделки дерева, подбор оттенков и каталог решений.</p>
    </div>
    <div class="footer-cols">
      <div class="footer-col">
        <h4>Навигация</h4>
        <ul>
          <li><a href="#systems">Системы покрытий</a></li>
          <li><a href="#shade-studio">Подбор оттенков</a></li>
          <li><a href="#catalog">Каталог</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>География</h4>
        <ul>
          <li>Москва</li>
          <li>Московская область</li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Бренды</h4>
        <ul>
          <li>Sikkens</li>
          <li>Zobel</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© ${new Date().getFullYear()} Deep Color. Прототип.</span>
    <span>Информация о продукции по документации производителей. Цены и наличие уточняйте у поставщика.</span>
  </div>
</footer>

<script>
// ========== Данные (оттенки, системы, категории) ==========
const SHADES = [
  { id:'natural-oak', name:'Натуральный дуб', code:'005', color:'#C39B6F', description:'Тёплый нейтральный оттенок, подчёркивающий естественную текстуру древесины.' },
  { id:'teak',        name:'Тик',             code:'085', color:'#7C5534', description:'Светло-средний коричневый оттенок с красным подтоном.' },
  { id:'dark-oak',    name:'Тёмный дуб',      code:'009', color:'#4A2E1B', description:'Насыщенный тёмный оттенок для выразительной отделки.' },
  { id:'walnut',      name:'Американский орех', code:'010', color:'#52331F', description:'Глубокий тёплый оттенок ореха, классика премиальной отделки.' },
  { id:'mahogany',    name:'Махагон',         code:'045', color:'#6E3B2A', description:'Красно-коричневый оттенок с глубоким подтоном.' },
  { id:'palisander',  name:'Палисандр',       code:'048', color:'#6B3220', description:'Насыщенный красно-коричневый оттенок древесины.' },
];

const SYSTEMS = [
  { title:'Покраска деревянного фасада', intro:'Полноценное решение для защита и отделки фасадов деревянных домов и построек.', scene:'Сцена: деревянный фасад дома', steps:[
    { layer:'Слой 1', purpose:'Глубокая защитная пропитка — биозащита и подготовка древесины' },
    { layer:'Слой 2', purpose:'Промежуточное покрытие — выравнивание и защита от влаги' },
    { layer:'Слой 3', purpose:'Финишное покрытие — цвет, UV-защита и финишная защита' } ] },
  { title:'Защита деревянных окон', intro:'Система для защиты и продления срока службы деревянных оконных конструкций.', scene:'Сцена: деревянные окна', steps:[
    { layer:'Слой 1', purpose:'Антисептическая пропитка — защита от биологических воздействий' },
    { layer:'Слой 2', purpose:'Изоляционная грунтовка — защита от выдыханий древесины' },
    { layer:'Слой 3', purpose:'Финишное покрытие — цвет и стойкость к атмосферным воздействиям' } ] },
  { title:'Покрытие деревянных дверей', intro:'Решение для отделки и защиты входных и внутренних деревянных дверей.', scene:'Сцена: деревянные двери', steps:[
    { layer:'Слой 1', purpose:'Пропитка и подготовка поверхности' },
    { layer:'Слой 2', purpose:'Грунтовка — выравнивание и адгезия' },
    { layer:'Слой 3', purpose:'Финишное покрытие — отделка и защита' } ] },
  { title:'Защита террас и конструкций', intro:'Система для защиты террас, беседок, садовой мебели и других деревянных конструкций.', scene:'Сцена: терраса и деревянные конструкции', steps:[
    { layer:'Слой 1', purpose:'Глубокая пропитка — защита от влаги и биологических воздействий' },
    { layer:'Слой 2', purpose:'Промежуточное покрытие — защита от атмосферных воздействий' },
    { layer:'Слой 3', purpose:'Финишное покрытие — цвет, стойкость и финишная защита' } ] },
  { title:'Обработка древесины внутри помещений', intro:'Система для защиты и отделки деревянных поверхностей внутри помещений.', scene:'Сцена: внутренние деревянные поверхности', steps:[
    { layer:'Слой 1', purpose:'Внутренняя пропитка — защита древесины внутри помещений' },
    { layer:'Слой 2', purpose:'Грунтовка — подготовка под финишное покрытие' },
    { layer:'Слой 3', purpose:'Финишное покрытие — отделка и защита внутренних поверхностей' } ] },
];

const CATEGORIES = [
  { name:'Пропитки и антисептики', hint:'Биозащита и глубокая пропитка древесины' },
  { name:'Грунты', hint:'Подготовка поверхности под покрытие' },
  { name:'Лазури и масла', hint:'Натуральная защита и уход за деревом' },
  { name:'Финишные лаки и покрытия', hint:'Финишные слои и финишная защита' },
  { name:'Системы покрытий', hint:'Готовые решения для конкретных задач' },
  { name:'Сопутствующие материалы', hint:'Материалы для подготовки и нанесения' },
];

// ========== Навигация ==========
const header = document.getElementById('site-header');
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  burger.classList.remove('open');
  mobileMenu.classList.remove('open');
}));

// ========== Entrance animations ==========
const animEls = document.querySelectorAll('.anim');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
animEls.forEach((el) => io.observe(el));

// ========== Hero: частицы (световые пылинки) и параллакс ==========
const heroSection = document.querySelector('.hero');
const heroBg = document.querySelector('.hero-bg');
const heroGlow = document.querySelector('.hero-glow');
const heroContent = document.querySelector('.hero-content');

const pCanvas = document.querySelector('.hero-particles');
if (pCanvas) {
  const pctx = pCanvas.getContext('2d');
  let pw = 0, ph = 0, motes = [];
  const initParticles = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    pw = pCanvas.clientWidth; ph = pCanvas.clientHeight;
    pCanvas.width = Math.max(1, pw * dpr);
    pCanvas.height = Math.max(1, ph * dpr);
    pctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = window.innerWidth < 768 ? 20 : 44;
    motes = Array.from({ length: count }, () => ({
      x: Math.random() * pw,
      y: Math.random() * ph,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.22,
      vy: -(Math.random() * 0.22 + 0.06),
      a: Math.random() * 0.45 + 0.15,
    }));
  };
  const drawMotes = () => {
    pctx.clearRect(0, 0, pw, ph);
    for (const m of motes) {
      m.x += m.vx; m.y += m.vy;
      if (m.y < -6) { m.y = ph + 6; m.x = Math.random() * pw; }
      if (m.x < -6) m.x = pw + 6;
      if (m.x > pw + 6) m.x = -6;
      pctx.beginPath();
      pctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
      pctx.fillStyle = 'rgba(237,231,220,' + m.a + ')';
      pctx.fill();
    }
    requestAnimationFrame(drawMotes);
  };
  initParticles();
  drawMotes();
  window.addEventListener('resize', initParticles);
}

// Параллакс мыши (десктоп) и лёгкое исчезновение при прокрутке
if (window.matchMedia && window.matchMedia('(pointer:fine)').matches) {
  document.addEventListener('mousemove', (e) => {
    if (!heroBg || !heroGlow) return;
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    heroBg.style.transform = 'translate(' + (x * 16) + 'px,' + (y * 12) + 'px)';
    heroGlow.style.transform = 'translate(' + (x * 34) + 'px,' + (y * 22) + 'px)';
  });
}
window.addEventListener('scroll', () => {
  if (!heroContent) return;
  const y = window.scrollY;
  if (y > window.innerHeight) return;
  heroContent.style.transform = 'translateY(' + (y * 0.28) + 'px)';
  heroContent.style.opacity = String(Math.max(0, 1 - y / (window.innerHeight * 0.85)));
}, { passive: true });

// ========== Каталог и системы ==========
document.getElementById('catalog-grid').innerHTML = CATEGORIES.map((c, i) => \`
  <a class="cat-card" href="#catalog">
    <span class="cat-vis"></span>
    <span class="num">0\${i+1}</span>
    <h3>\${c.name}</h3>
    <p>\${c.hint}</p>
    <span class="go">Перейти <span>→</span></span>
  </a>\`).join('');

document.getElementById('systems-grid').innerHTML = SYSTEMS.map((s, i) => \`
  <article class="system-card anim">
    <span class="num">0\${i+1}</span>
    <h3>\${s.title}</h3>
    <p>\${s.intro}</p>
    <div class="layer-stack" aria-hidden="true">
      <div class="lb" data-l="0"></div>
      <div class="lb" data-l="1"></div>
      <div class="lb" data-l="2"></div>
    </div>
    <div class="steps">
      \${s.steps.map((st, j) => \`<div class="step" data-l="\${j}"><span class="layer">\${st.layer}</span><span class="purpose">\${st.purpose}</span></div>\`).join('')}
    </div>
    <span class="scene">\${s.scene}</span>
  </article>\`).join('');

// Связь слоёв-лент с пунктами последовательности (подсветка при наведении/клике)
document.querySelectorAll('.system-card').forEach(card => {
  const bars = card.querySelectorAll('.lb');
  const steps = card.querySelectorAll('.step');
  const setBar = (i, on) => { if (bars[i]) bars[i].classList.toggle('on', on); };
  steps.forEach((st, i) => {
    st.addEventListener('mouseenter', () => setBar(i, true));
    st.addEventListener('mouseleave', () => setBar(i, false));
    st.addEventListener('click', () => setBar(i, !bars[i].classList.contains('on')));
  });
});

// ========== Студия оттенков: canvas ==========
const SHADE_IMG = "${shadeImg}";

const canvas = document.getElementById('shade-canvas');
const swatchesEl = document.getElementById('swatches');
const ovName = document.getElementById('ov-name');
const ovLabel = document.getElementById('ov-label');
const shadeDesc = document.getElementById('shade-desc');
const compareBtn = document.getElementById('compare-btn');

const currentShade = { color: SHADES[0].color, name: SHADES[0].name };
let targetShade = SHADES[0];
let compare = false;
let img = null;
let animId = null;

// Парсинг цвета: и hex (#C39B6F), и rgb(...)
const parseColor = (c) => {
  if (c.charAt(0) === '#') {
    const v = c.slice(1);
    return [parseInt(v.slice(0,2),16), parseInt(v.slice(2,4),16), parseInt(v.slice(4,6),16)];
  }
  const m = c.match(/\\d+/g);
  return [parseInt(m[0],10), parseInt(m[1],10), parseInt(m[2],10)];
};

swatchesEl.innerHTML = SHADES.map(s => \`
  <button class="swatch" data-id="\${s.id}">
    <span class="dot" style="background:\${s.color}"></span>
    <span><span class="sw-name">\${s.name}</span><span class="sw-code">Код \${s.code}</span></span>
  </button>\`).join('');

swatchesEl.querySelectorAll('.swatch').forEach(btn => {
  btn.addEventListener('click', () => {
    const shade = SHADES.find(s => s.id === btn.dataset.id);
    targetShade = shade;
    swatchesEl.querySelectorAll('.swatch').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    ovName.textContent = shade.name;
    shadeDesc.textContent = shade.description;
    startTransition();
  });
});

// Загрузка изображения
const imgEl = new Image();
imgEl.onload = () => { img = imgEl; draw(); startTransition(); };
imgEl.src = SHADE_IMG;

function draw() {
  if (!img) return;
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.max(1, Math.floor(rect.width * dpr));
  canvas.height = Math.max(1, Math.floor(rect.height * dpr));

  ctx.save();
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, rect.width, rect.height);

  const imgRatio = img.width / img.height;
  const canvasRatio = rect.width / rect.height;
  let dw = rect.width, dh = rect.height, ox = 0, oy = 0;
  if (imgRatio > canvasRatio) { dw = rect.height * imgRatio; ox = (rect.width - dw) / 2; }
  else { dh = rect.width / imgRatio; oy = (rect.height - dh) / 2; }

  // Отрисовка одного варианта: натуральный или с оттенком
  const drawAt = (tint, clipLeft) => {
    ctx.save();
    if (clipLeft !== null) {
      ctx.beginPath();
      ctx.rect(clipLeft, 0, rect.width - clipLeft, rect.height);
      ctx.clip();
    }
    ctx.drawImage(img, ox, oy, dw, dh);
    if (tint) {
      const [r,g,b] = parseColor(tint);
      // Multiply — настоящая перекраска, сохраняет текстуру и светлоту
      ctx.globalCompositeOperation = 'multiply';
      ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
      ctx.fillRect(0, 0, rect.width, rect.height);
      // Overlay — добавляет глубину оттенку, не утяжеляя цвет
      ctx.globalCompositeOperation = 'overlay';
      ctx.globalAlpha = 0.2;
      ctx.fillRect(0, 0, rect.width, rect.height);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    }
    ctx.restore();
  };

  if (compare) {
    const mid = rect.width / 2;
    drawAt(null, 0);
    drawAt(currentShade.color, mid);
    ctx.strokeStyle = 'rgba(237,231,220,0.75)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(mid, 0);
    ctx.lineTo(mid, rect.height);
    ctx.stroke();
  } else {
    drawAt(currentShade.color, null);
  }

  // Легкая затеняющая наслонка для читаемости оверлейя
  const grad = ctx.createLinearGradient(0, 0, 0, rect.height);
  grad.addColorStop(0, 'rgba(15,17,19,0.22)');
  grad.addColorStop(1, 'rgba(15,17,19,0.5)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, rect.width, rect.height);
  ctx.restore();
}

compareBtn.addEventListener('click', () => {
  compare = !compare;
  compareBtn.textContent = compare ? 'Сравнение: есть' : 'Сравнить с натуральным';
  ovLabel.textContent = compare ? 'Оттенок (правая часть)' : 'Текущий оттенок';
  draw();
});

// Плавный переход к новому оттенку (цикл можно повторно запускать)
function tick() {
  const from = parseColor(currentShade.color);
  const to = parseColor(targetShade.color);
  const mix = (a, b) => Math.round(a + (b - a) * 0.1);
  currentShade.color = 'rgb(' + mix(from[0],to[0]) + ',' + mix(from[1],to[1]) + ',' + mix(from[2],to[2]) + ')';
  draw();
  const done = Math.abs(from[0]-to[0]) < 3 && Math.abs(from[1]-to[1]) < 3 && Math.abs(from[2]-to[2]) < 3;
  if (!done) {
    animId = requestAnimationFrame(tick);
  } else {
    animId = null;
    currentShade.color = targetShade.color;
    draw();
  }
}
function startTransition() {
  if (animId !== null) cancelAnimationFrame(animId);
  animId = requestAnimationFrame(tick);
}

// Перевод в compare-режиме перерисовывается без перехода
// (переход остаётся за кликом по оттенку)

// Перерисовка при ресайзе
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(draw, 150);
});

// ========== Заявка ==========
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('contact-form-wrap').innerHTML = \`
    <div class="form-success">
      <h3>Заявка отправлена</h3>
      <p>Это прототип: в рабочей версии заявка будет формироваться и передаваться согласно выбранному способу связи.</p>
    </div>\`;
});
</script>
</body>
</html>
`;

const out = join(siteDir, 'index.html');
writeFileSync(out, html);
console.log('Готово: ' + out + ' | размер: ' + Math.round(Buffer.byteLength(html) / 1024) + ' KB');
