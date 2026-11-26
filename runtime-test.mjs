import { JSDOM, VirtualConsole } from 'jsdom';
import { readFileSync } from 'node:fs';

const html = readFileSync('/home/user/wood-coatings-store/site/index.html', 'utf8');

const errors = [];
const vc = new VirtualConsole();
vc.on('jsdomError', (e) => errors.push('jsdomError: ' + (e.message || e)));
vc.on('error', (...a) => errors.push('console.error: ' + a.join(' ')));

const dom = new JSDOM(html, {
  runScripts: 'dangerously',
  resources: 'usable',
  pretendToBeVisual: true,
  virtualConsole: vc,
  beforeParse(window) {
    class IO {
      constructor(cb) { this.cb = cb; }
      observe(el) { this.cb([{ isIntersecting: true, target: el }]); }
      unobserve() {} disconnect() {}
    }
    window.IntersectionObserver = IO;
    const calls = [];
    const ctx = {
      save: () => calls.push('save'), restore: () => calls.push('restore'),
      scale: () => calls.push('scale'), clearRect: () => calls.push('clearRect'),
      drawImage: () => calls.push('drawImage'), beginPath: () => calls.push('beginPath'),
      rect: () => calls.push('rect'), clip: () => calls.push('clip'),
      fillRect: () => calls.push('fillRect'), stroke: () => calls.push('stroke'),
      moveTo: () => calls.push('moveTo'), lineTo: () => calls.push('lineTo'),
      createLinearGradient: () => ({ addColorStop: () => {} }),
      fillStyle: '', strokeStyle: '', lineWidth: 0, globalCompositeOperation: '',
    };
    window.HTMLCanvasElement.prototype.getContext = function () { return ctx; };
    window.__calls = calls;
  },
});

const { window } = dom;
const { document } = window;
await new Promise((r) => setTimeout(r, 1500));

const swatches = document.querySelectorAll('#swatches .swatch');
console.log('swatch buttons rendered:', swatches.length);
console.log('overlay name:', document.getElementById('ov-name').textContent);

if (swatches[1]) {
  swatches[1].dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
  await new Promise((r) => setTimeout(r, 400));
  console.log('after click overlay:', document.getElementById('ov-name').textContent,
    '| desc:', document.getElementById('shade-desc').textContent.slice(0, 45));
}
const cmp = document.getElementById('compare-btn');
cmp.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
await new Promise((r) => setTimeout(r, 250));
console.log('compare label:', cmp.textContent, '| ov-label:', document.getElementById('ov-label').textContent);

const calls = window.__calls;
console.log('canvas ctx calls:', calls.length,
  '| drawImage:', calls.includes('drawImage'),
  '| fillRect:', calls.includes('fillRect'),
  '| clip:', calls.includes('clip'));
console.log('ERRORS:', errors.length ? errors : 'NONE');
