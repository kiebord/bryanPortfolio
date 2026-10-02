import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");
mkdirSync(OUT, { recursive: true });

const C = {
  bg: "#06070b",
  panel: "#0e111b",
  panel2: "#151928",
  line: "#262b3c",
  red: "#6268ff",
  red2: "#c8ff1a",
  dark: "#242861",
  white: "#f5f6fa",
  gray: "#9ca6bd",
};

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const defs = `
<defs>
  <radialGradient id="glow" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="${C.red}" stop-opacity="0.55"/>
    <stop offset="60%" stop-color="${C.red2}" stop-opacity="0.12"/>
    <stop offset="100%" stop-color="${C.red}" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="redfade" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${C.red}"/>
    <stop offset="100%" stop-color="${C.red2}"/>
  </linearGradient>
  <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${C.red}" stop-opacity="0.65"/>
    <stop offset="100%" stop-color="${C.red}" stop-opacity="0"/>
  </linearGradient>
</defs>`;

function wrap(w, h, label, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${label}">${defs}<rect width="${w}" height="${h}" fill="${C.bg}"/>${body}</svg>`;
}

function grid(w, h, step, opacity = 0.18) {
  let s = "";
  for (let x = 0; x <= w; x += step) s += `<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="${C.line}" stroke-opacity="${opacity}"/>`;
  for (let y = 0; y <= h; y += step) s += `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="${C.line}" stroke-opacity="${opacity}"/>`;
  return s;
}

function glow(cx, cy, r, o = 1) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#glow)" opacity="${o}"/>`;
}

function bars(x, y, widths, h, gap, fill, op = 1) {
  return widths
    .map((bw, i) => `<rect x="${x}" y="${y + i * (h + gap)}" width="${bw}" height="${h}" rx="${h / 2}" fill="${fill}" opacity="${op}"/>`)
    .join("");
}

function browser(x, y, w, h, inner) {
  return `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" fill="${C.panel}" stroke="${C.line}" stroke-width="2"/>
  <rect x="${x}" y="${y}" width="${w}" height="54" rx="22" fill="${C.panel2}"/>
  <rect x="${x}" y="${y + 30}" width="${w}" height="24" fill="${C.panel2}"/>
  <circle cx="${x + 34}" cy="${y + 27}" r="7" fill="${C.red}"/>
  <circle cx="${x + 58}" cy="${y + 27}" r="7" fill="${C.gray}" opacity="0.6"/>
  <circle cx="${x + 82}" cy="${y + 27}" r="7" fill="${C.gray}" opacity="0.35"/>
  <rect x="${x + 120}" y="${y + 17}" width="${Math.min(380, w - 200)}" height="20" rx="10" fill="${C.bg}" opacity="0.7"/>
  ${inner}`;
}

function phone(x, y, w, h, inner) {
  return `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="44" fill="${C.panel}" stroke="${C.line}" stroke-width="3"/>
  <rect x="${x + w / 2 - 50}" y="${y + 16}" width="100" height="14" rx="7" fill="${C.bg}"/>
  ${inner}`;
}

function save(name, content) {
  writeFileSync(join(OUT, name), content);
  console.log("wrote", name);
}

/* ---------- hero ---------- */
function hero() {
  let rings = "";
  [150, 220, 290, 360, 430, 500].forEach((r, i) => {
    rings += `<circle cx="600" cy="560" r="${r}" fill="none" stroke="${C.red}" stroke-opacity="${(0.55 - i * 0.08).toFixed(2)}" stroke-width="${i === 0 ? 3 : 1.5}" ${i % 2 ? 'stroke-dasharray="6 14"' : ""}/>`;
  });
  const chart = [60, 110, 80, 150, 120, 190, 160]
    .map((v, i) => `<rect x="${760 + i * 46}" y="${300 - v}" width="26" height="${v}" rx="8" fill="${i === 5 ? C.red : C.white}" opacity="${i === 5 ? 1 : 0.18}"/>`)
    .join("");
  const body = `
  ${grid(1200, 1200, 60, 0.16)}
  ${glow(600, 560, 560)}
  ${rings}
  <circle cx="600" cy="560" r="150" fill="url(#redfade)"/>
  <path d="M520 620 L520 500 L600 500 Q650 500 650 540 Q650 568 622 574 Q660 580 660 612 Q660 650 612 650 L520 650 Z" fill="${C.bg}" opacity="0.92"/>
  <g transform="translate(190 700)">
    <rect width="560" height="340" rx="26" fill="${C.panel}" stroke="${C.line}" stroke-width="2"/>
    <circle cx="36" cy="36" r="7" fill="${C.red}"/><circle cx="60" cy="36" r="7" fill="${C.gray}" opacity="0.5"/><circle cx="84" cy="36" r="7" fill="${C.gray}" opacity="0.3"/>
    ${bars(40, 84, [180, 280, 230, 330, 150, 260], 14, 22, C.white, 0.22)}
    ${bars(40, 84, [60, 90, 40, 110, 50, 70], 14, 22, C.red, 1)}
  </g>
  <g transform="translate(0 0)">
    <rect x="720" y="150" width="360" height="220" rx="26" fill="${C.panel2}" stroke="${C.line}" stroke-width="2"/>
    ${chart}
  </g>
  <circle cx="980" cy="860" r="64" fill="none" stroke="${C.red}" stroke-width="10"/>
  <circle cx="980" cy="860" r="22" fill="${C.white}"/>
  <circle cx="150" cy="260" r="10" fill="${C.red}"/>
  <circle cx="1090" cy="640" r="7" fill="${C.white}" opacity="0.7"/>
  <circle cx="260" cy="560" r="6" fill="${C.white}" opacity="0.5"/>`;
  save("hero.svg", wrap(1200, 1200, "Abstract blue, lime and black hero graphic with rings, code window and chart", body));
}

/* ---------- portrait ---------- */
function portrait() {
  const body = `
  ${grid(800, 1000, 50, 0.14)}
  ${glow(400, 420, 480)}
  <circle cx="400" cy="440" r="300" fill="none" stroke="${C.red}" stroke-opacity="0.35" stroke-width="2"/>
  <path d="M120 1000 C120 730 240 640 400 640 C560 640 680 730 680 1000 Z" fill="${C.panel2}" stroke="${C.red}" stroke-opacity="0.6" stroke-width="3"/>
  <circle cx="400" cy="410" r="130" fill="${C.panel2}" stroke="${C.red}" stroke-width="4"/>
  <text x="400" y="440" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="96" fill="${C.white}" letter-spacing="-4">BA</text>
  <rect x="280" y="900" width="240" height="10" rx="5" fill="${C.red}"/>`;
  save("portrait.svg", wrap(800, 1000, "Portrait placeholder with initials BA", body));
}

/* ---------- project mockups ---------- */
function dashboard() {
  const vals = [90, 140, 110, 200, 170, 240, 190, 280];
  const chart = vals.map((v, i) => `<rect x="${340 + i * 64}" y="${660 - v}" width="38" height="${v}" rx="10" fill="${i === 7 ? C.red : C.white}" opacity="${i === 7 ? 1 : 0.16}"/>`).join("");
  const inner = `
  <rect x="80" y="170" width="190" height="570" rx="14" fill="${C.bg}" opacity="0.55"/>
  ${bars(104, 200, [120, 100, 130, 90, 110], 14, 30, C.white, 0.2)}
  <rect x="104" y="200" width="120" height="14" rx="7" fill="${C.red}"/>
  ${[0, 1, 2].map((i) => `<rect x="${300 + i * 275}" y="170" width="250" height="120" rx="16" fill="${C.panel2}" stroke="${C.line}"/><rect x="${324 + i * 275}" y="196" width="80" height="12" rx="6" fill="${C.gray}" opacity="0.6"/><rect x="${324 + i * 275}" y="228" width="${i === 0 ? 140 : 110}" height="30" rx="8" fill="${i === 0 ? C.red : C.white}" opacity="${i === 0 ? 1 : 0.85}"/>`).join("")}
  <rect x="300" y="320" width="800" height="420" rx="16" fill="${C.panel2}" stroke="${C.line}"/>
  ${chart}`;
  return wrap(1200, 800, "Dashboard mockup", `${grid(1200, 800, 50, 0.12)}${glow(900, 200, 500)}${browser(60, 90, 1080, 680, inner)}`);
}

function mobile(seed) {
  const r = rng(seed);
  const card = (x, y, w, i) => `<rect x="${x}" y="${y}" width="${w}" height="92" rx="18" fill="${C.panel2}" stroke="${C.line}"/><circle cx="${x + 46}" cy="${y + 46}" r="22" fill="${i === 0 ? C.red : C.white}" opacity="${i === 0 ? 1 : 0.2}"/><rect x="${x + 86}" y="${y + 28}" width="${60 + Math.floor(r() * 60)}" height="12" rx="6" fill="${C.white}" opacity="0.8"/><rect x="${x + 86}" y="${y + 54}" width="${40 + Math.floor(r() * 50)}" height="10" rx="5" fill="${C.gray}" opacity="0.6"/>`;
  const p1 = phone(250, 90, 330, 640, `
    <rect x="278" y="140" width="274" height="150" rx="22" fill="url(#redfade)"/>
    <rect x="300" y="168" width="110" height="14" rx="7" fill="${C.white}" opacity="0.9"/>
    <rect x="300" y="206" width="170" height="36" rx="10" fill="${C.white}"/>
    ${[0, 1, 2, 3].map((i) => card(278, 318 + i * 104, 274, i)).join("")}`);
  const p2 = phone(640, 150, 330, 640, `
    ${[0, 1, 2, 3, 4].map((i) => `<rect x="${668}" y="${204 + i * 104}" width="274" height="86" rx="18" fill="${C.panel2}" stroke="${i === 1 ? C.red : C.line}" stroke-width="${i === 1 ? 3 : 1}"/><rect x="692" y="${228 + i * 104}" width="${90 + (i % 3) * 30}" height="12" rx="6" fill="${C.white}" opacity="0.75"/><rect x="692" y="${254 + i * 104}" width="60" height="10" rx="5" fill="${C.gray}" opacity="0.6"/><circle cx="906" cy="${247 + i * 104}" r="12" fill="${i === 1 ? C.red : C.white}" opacity="${i === 1 ? 1 : 0.18}"/>`).join("")}
    <rect x="668" y="160" width="274" height="26" rx="13" fill="${C.bg}"/>`);
  return wrap(1200, 800, "Mobile app mockup", `${grid(1200, 800, 50, 0.12)}${glow(600, 400, 520)}${p1}${p2}`);
}

function kiosk() {
  const tiles = [0, 1, 2, 3, 4, 5].map((i) => {
    const x = 420 + (i % 3) * 120;
    const y = 250 + Math.floor(i / 3) * 120;
    return `<rect x="${x}" y="${y}" width="104" height="104" rx="18" fill="${i === 1 ? C.red : C.panel2}" stroke="${C.line}"/><circle cx="${x + 52}" cy="${y + 46}" r="18" fill="${i === 1 ? C.white : C.red}" opacity="${i === 1 ? 1 : 0.8}"/><rect x="${x + 22}" y="${y + 78}" width="60" height="8" rx="4" fill="${i === 1 ? C.white : C.gray}" opacity="0.7"/>`;
  }).join("");
  const body = `
  ${grid(1200, 800, 50, 0.12)}
  ${glow(600, 380, 520)}
  <rect x="380" y="90" width="440" height="520" rx="34" fill="${C.panel}" stroke="${C.red}" stroke-opacity="0.7" stroke-width="3"/>
  <rect x="400" y="110" width="400" height="480" rx="22" fill="${C.bg}"/>
  <rect x="420" y="140" width="160" height="16" rx="8" fill="${C.white}" opacity="0.85"/>
  <rect x="420" y="172" width="240" height="10" rx="5" fill="${C.gray}" opacity="0.6"/>
  ${tiles}
  <rect x="420" y="510" width="360" height="52" rx="16" fill="url(#redfade)"/>
  <rect x="560" y="610" width="80" height="120" fill="${C.panel2}"/>
  <rect x="440" y="730" width="320" height="22" rx="11" fill="${C.panel2}" stroke="${C.line}"/>`;
  return wrap(1200, 800, "Kiosk interface mockup", body);
}

function shop() {
  const items = [0, 1, 2, 3, 4, 5].map((i) => {
    const x = 110 + (i % 3) * 330;
    const y = 190 + Math.floor(i / 3) * 280;
    return `<rect x="${x}" y="${y}" width="300" height="250" rx="18" fill="${C.panel2}" stroke="${C.line}"/>
    <rect x="${x + 16}" y="${y + 16}" width="268" height="140" rx="12" fill="${i === 0 ? "url(#redfade)" : C.bg}" opacity="${i === 0 ? 1 : 0.7}"/>
    <circle cx="${x + 150}" cy="${y + 86}" r="${24 + (i % 3) * 6}" fill="${i === 0 ? C.white : C.red}" opacity="${i === 0 ? 0.95 : 0.7}"/>
    <rect x="${x + 16}" y="${y + 176}" width="130" height="12" rx="6" fill="${C.white}" opacity="0.8"/>
    <rect x="${x + 16}" y="${y + 202}" width="70" height="12" rx="6" fill="${C.red}"/>`;
  }).join("");
  return wrap(1200, 800, "Online shop mockup", `${grid(1200, 800, 50, 0.12)}${glow(300, 600, 500)}${browser(60, 90, 1080, 680, items)}`);
}

function scanner() {
  const r = rng(7);
  let qr = "";
  for (let i = 0; i < 11; i++)
    for (let j = 0; j < 11; j++) {
      const corner = (i < 3 && j < 3) || (i < 3 && j > 7) || (i > 7 && j < 3);
      if (corner || r() > 0.5) qr += `<rect x="${456 + j * 26}" y="${240 + i * 26}" width="22" height="22" rx="4" fill="${corner ? C.red : C.white}" opacity="${corner ? 1 : 0.9}"/>`;
    }
  const body = `
  ${grid(1200, 800, 50, 0.12)}
  ${glow(600, 400, 520)}
  ${phone(410, 70, 380, 680, `
    <rect x="440" y="120" width="320" height="500" rx="24" fill="${C.bg}"/>
    ${qr}
    <rect x="446" y="420" width="308" height="4" fill="${C.red}"/>
    <rect x="480" y="650" width="240" height="56" rx="18" fill="url(#redfade)"/>`)}
  <path d="M320 200 L320 150 L370 150 M880 150 L930 150 L930 200 M930 600 L930 650 L880 650 M370 650 L320 650 L320 600" fill="none" stroke="${C.red}" stroke-width="6" stroke-linecap="round"/>`;
  return wrap(1200, 800, "QR scanner app mockup", body);
}

function landing() {
  const inner = `
  <rect x="110" y="140" width="940" height="46" rx="12" fill="${C.bg}" opacity="0.6"/>
  <rect x="136" y="156" width="90" height="14" rx="7" fill="${C.white}" opacity="0.85"/>
  ${[0, 1, 2].map((i) => `<rect x="${700 + i * 110}" y="158" width="80" height="12" rx="6" fill="${C.gray}" opacity="0.6"/>`).join("")}
  <rect x="110" y="260" width="520" height="70" rx="14" fill="${C.white}" opacity="0.92"/>
  <rect x="110" y="352" width="400" height="70" rx="14" fill="${C.red}"/>
  ${bars(110, 460, [440, 380, 320], 12, 16, C.gray, 0.55)}
  <rect x="110" y="580" width="170" height="52" rx="26" fill="url(#redfade)"/>
  <rect x="296" y="580" width="150" height="52" rx="26" fill="none" stroke="${C.line}" stroke-width="2"/>
  <circle cx="860" cy="430" r="190" fill="url(#redfade)" opacity="0.95"/>
  <circle cx="860" cy="430" r="120" fill="none" stroke="${C.white}" stroke-opacity="0.45" stroke-width="3"/>
  <circle cx="860" cy="430" r="50" fill="${C.bg}"/>`;
  return wrap(1200, 800, "Landing page mockup", `${grid(1200, 800, 50, 0.12)}${glow(900, 420, 520)}${browser(60, 90, 1080, 680, inner)}`);
}

function projects() {
  const makers = [dashboard, () => mobile(3), kiosk, shop, scanner, landing];
  makers.forEach((fn, i) => save(`project-${i + 1}.svg`, fn()));
}

/* ---------- gallery scenes (1200 x 900) ---------- */
const GW = 1200;
const GH = 900;

function g1() {
  return wrap(GW, GH, "Dark desk with glowing monitor", `
  ${glow(600, 380, 560)}
  <rect x="270" y="170" width="660" height="400" rx="22" fill="${C.panel}" stroke="${C.red}" stroke-width="3"/>
  <rect x="294" y="194" width="612" height="352" rx="10" fill="${C.bg}"/>
  ${bars(330, 230, [200, 320, 260, 380, 180, 300, 240], 14, 26, C.white, 0.22)}
  ${bars(330, 230, [70, 100, 50, 130, 40, 90, 60], 14, 26, C.red, 1)}
  <rect x="560" y="570" width="80" height="90" fill="${C.panel2}"/>
  <rect x="470" y="655" width="260" height="18" rx="9" fill="${C.panel2}"/>
  <rect x="120" y="720" width="960" height="14" rx="7" fill="${C.line}"/>
  <rect x="380" y="690" width="440" height="22" rx="8" fill="${C.panel2}" stroke="${C.line}"/>
  <path d="M1000 720 L1040 520 L1090 520" stroke="${C.gray}" stroke-width="8" fill="none" stroke-linecap="round"/>
  <circle cx="1100" cy="520" r="26" fill="${C.red}"/>`);
}

function g2() {
  const r = rng(21);
  let rows = "";
  for (let i = 0; i < 18; i++) {
    const indent = Math.floor(r() * 3) * 40;
    const w = 120 + Math.floor(r() * 520);
    rows += `<rect x="${120 + indent}" y="${100 + i * 40}" width="${w}" height="14" rx="7" fill="${r() > 0.82 ? C.red : C.white}" opacity="${r() > 0.82 ? 1 : 0.2}"/>`;
  }
  return wrap(GW, GH, "Lines of code in a terminal", `${grid(GW, GH, 60, 0.1)}${glow(900, 700, 480)}${rows}<rect x="120" y="${100 + 18 * 40}" width="18" height="26" fill="${C.red}"/>`);
}

function g3() {
  return wrap(GW, GH, "Two abstract posters", `
  ${glow(300, 450, 520, 0.8)}
  <g transform="rotate(-6 400 450)">
    <rect x="170" y="110" width="440" height="640" rx="14" fill="${C.panel}" stroke="${C.line}" stroke-width="2"/>
    <circle cx="390" cy="360" r="140" fill="url(#redfade)"/>
    <rect x="220" y="560" width="300" height="30" rx="6" fill="${C.white}"/>
    <rect x="220" y="610" width="200" height="16" rx="8" fill="${C.gray}" opacity="0.6"/>
  </g>
  <g transform="rotate(5 840 470)">
    <rect x="640" y="190" width="380" height="560" rx="14" fill="${C.white}"/>
    <rect x="680" y="240" width="300" height="220" fill="${C.red}"/>
    <rect x="680" y="490" width="220" height="26" rx="4" fill="${C.bg}"/>
    <rect x="680" y="536" width="300" height="12" rx="6" fill="${C.bg}" opacity="0.4"/>
    <rect x="680" y="562" width="260" height="12" rx="6" fill="${C.bg}" opacity="0.4"/>
  </g>`);
}

function g4() {
  let tiles = "";
  for (let i = 0; i < 12; i++) {
    const x = 90 + (i % 4) * 255;
    const y = 90 + Math.floor(i / 4) * 255;
    const cx = x + 100;
    const cy = y + 100;
    const hot = i % 5 === 0;
    let shape;
    if (i % 3 === 0) shape = `<circle cx="${cx}" cy="${cy}" r="56" fill="${hot ? C.red : C.white}" opacity="${hot ? 1 : 0.85}"/>`;
    else if (i % 3 === 1) shape = `<rect x="${cx - 52}" y="${cy - 52}" width="104" height="104" rx="14" fill="${hot ? C.red : C.red2}"/>`;
    else shape = `<path d="M${cx} ${cy - 60} L${cx + 56} ${cy + 46} L${cx - 56} ${cy + 46} Z" fill="${hot ? C.red : C.white}" opacity="${hot ? 1 : 0.2}"/>`;
    tiles += `<rect x="${x}" y="${y}" width="230" height="230" rx="22" fill="${C.panel}" stroke="${C.line}"/>${shape}`;
  }
  return wrap(GW, GH, "Grid of brand shapes", tiles);
}

function g5() {
  const r = rng(5);
  let b = "";
  let x = 0;
  while (x < GW) {
    const w = 60 + Math.floor(r() * 90);
    const h = 180 + Math.floor(r() * 380);
    b += `<rect x="${x}" y="${GH - h}" width="${w - 6}" height="${h}" fill="${C.panel}" stroke="${C.line}"/>`;
    for (let wy = GH - h + 24; wy < GH - 24; wy += 34)
      for (let wx = x + 14; wx < x + w - 24; wx += 24)
        if (r() > 0.62) b += `<rect x="${wx}" y="${wy}" width="10" height="16" rx="2" fill="${r() > 0.5 ? C.red : C.white}" opacity="0.8"/>`;
    x += w;
  }
  return wrap(GW, GH, "Night skyline under a glowing blue sun", `${glow(780, 330, 460)}<circle cx="780" cy="330" r="130" fill="url(#redfade)"/>${b}`);
}

function g6() {
  let lines = "";
  for (let i = -6; i <= 6; i++) {
    lines += `<line x1="600" y1="380" x2="${600 + i * 220}" y2="${GH}" stroke="${C.line}" stroke-width="2"/>`;
  }
  return wrap(GW, GH, "Hallway in perspective", `
  ${glow(600, 380, 420)}
  ${lines}
  <rect x="520" y="320" width="160" height="120" fill="${C.bg}" stroke="${C.red}" stroke-width="3"/>
  <path d="M0 0 L520 320 L520 440 L0 900 Z" fill="${C.panel}" opacity="0.9"/>
  <path d="M1200 0 L680 320 L680 440 L1200 900 Z" fill="${C.panel}" opacity="0.9"/>
  ${[0, 1, 2].map((i) => `<rect x="${120 + i * 110}" y="${300 + i * 40}" width="${70 - i * 14}" height="${300 - i * 60}" fill="${C.panel2}" stroke="${C.red}" stroke-opacity="0.6"/>`).join("")}
  ${[0, 1, 2].map((i) => `<rect x="${1010 - i * 110}" y="${300 + i * 40}" width="${70 - i * 14}" height="${300 - i * 60}" fill="${C.panel2}" stroke="${C.red}" stroke-opacity="0.6"/>`).join("")}
  <circle cx="600" cy="380" r="24" fill="${C.red}" opacity="0.9"/>`);
}

function g7() {
  const beams = [220, 460, 740, 980]
    .map((x, i) => `<polygon points="${x - 14},0 ${x + 14},0 ${x + (i % 2 ? 150 : -150) + 120},640 ${x + (i % 2 ? 150 : -150) - 120},640" fill="url(#beam)"/>`)
    .join("");
  const people = Array.from({ length: 14 }, (_, i) => {
    const x = 70 + i * 82;
    return `<circle cx="${x}" cy="${760 + (i % 3) * 14}" r="22" fill="${C.panel2}"/><rect x="${x - 30}" y="${782 + (i % 3) * 14}" width="60" height="120" rx="26" fill="${C.panel2}"/>`;
  }).join("");
  return wrap(GW, GH, "Stage lights over an audience", `${glow(600, 80, 600, 0.7)}${beams}<rect x="150" y="620" width="900" height="40" rx="8" fill="${C.panel}" stroke="${C.red}" stroke-opacity="0.7"/><rect x="450" y="330" width="300" height="190" rx="12" fill="${C.bg}" stroke="${C.red}" stroke-width="3"/>${bars(480, 365, [180, 240, 140], 14, 30, C.white, 0.25)}${people}`);
}

function g8() {
  const r = rng(88);
  let dots = "";
  for (let i = 0; i < 26; i++)
    dots += `<circle cx="${Math.floor(r() * GW)}" cy="${Math.floor(r() * GH)}" r="${10 + Math.floor(r() * 46)}" fill="${r() > 0.5 ? C.red : C.white}" opacity="${(0.05 + r() * 0.14).toFixed(2)}"/>`;
  const chart = [80, 130, 100, 190, 150, 240]
    .map((v, i) => `<rect x="${360 + i * 80}" y="${560 - v}" width="48" height="${v}" rx="10" fill="${i === 5 ? C.red : C.white}" opacity="${i === 5 ? 1 : 0.18}"/>`)
    .join("");
  return wrap(GW, GH, "Demo day screen with bokeh lights", `${dots}<rect x="280" y="190" width="640" height="420" rx="24" fill="${C.panel}" stroke="${C.line}" stroke-width="2"/>${chart}<rect x="320" y="226" width="160" height="14" rx="7" fill="${C.white}" opacity="0.8"/><rect x="540" y="640" width="120" height="70" fill="${C.panel2}"/><rect x="450" y="700" width="300" height="16" rx="8" fill="${C.panel2}"/>`);
}

function g9() {
  const r = rng(99);
  let traces = "";
  let nodes = "";
  for (let i = 0; i < 14; i++) {
    const y = 80 + i * 56;
    const x1 = 80 + Math.floor(r() * 300);
    const x2 = x1 + 160 + Math.floor(r() * 400);
    const y2 = y + (r() > 0.5 ? 56 : -56);
    traces += `<path d="M${x1} ${y} L${x2} ${y} L${x2 + 70} ${y2} L${x2 + 70 + Math.floor(r() * 260)} ${y2}" fill="none" stroke="${i % 4 === 0 ? C.red : C.white}" stroke-opacity="${i % 4 === 0 ? 1 : 0.22}" stroke-width="${i % 4 === 0 ? 4 : 2}"/>`;
    nodes += `<circle cx="${x1}" cy="${y}" r="9" fill="${C.bg}" stroke="${C.red}" stroke-width="3"/>`;
  }
  return wrap(GW, GH, "Circuit board traces", `${grid(GW, GH, 40, 0.08)}${glow(600, 450, 520, 0.6)}${traces}${nodes}<rect x="500" y="330" width="200" height="200" rx="20" fill="${C.panel}" stroke="${C.red}" stroke-width="3"/><rect x="540" y="370" width="120" height="120" rx="10" fill="${C.bg}"/><circle cx="600" cy="430" r="26" fill="${C.red}"/>`);
}

function g10() {
  let waves = "";
  for (let i = 0; i < 9; i++) {
    const y = 250 + i * 55;
    const amp = 40 + i * 6;
    waves += `<path d="M0 ${y} C 200 ${y - amp}, 400 ${y + amp}, 600 ${y} S 1000 ${y - amp}, 1200 ${y} L1200 ${GH} L0 ${GH} Z" fill="${i % 3 === 0 ? C.red : C.panel}" fill-opacity="${i % 3 === 0 ? 0.5 - i * 0.03 : 0.85}" stroke="${C.red}" stroke-opacity="${(0.9 - i * 0.09).toFixed(2)}" stroke-width="2"/>`;
  }
  return wrap(GW, GH, "Layered electric blue waves", `${glow(600, 300, 560, 0.7)}${waves}`);
}

hero();
portrait();
projects();
[g1, g2, g3, g4, g5, g6, g7, g8, g9, g10].forEach((fn, i) => save(`gallery-${i + 1}.svg`, fn()));
console.log("done");
