/* ===== HELPERS ===== */
const $ = (s) => document.querySelector(s);
const esc = (v) =>
  String(v).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const isUrl = (v) => /^https?:\/\//i.test(v || "");

const ph = (text, w = 640, h = 400) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
      <rect width="100%" height="100%" fill="#151d3b"/>
      <rect x="${w / 2 - 60}" y="${h / 2 - 110}" width="120" height="220" rx="18" fill="none" stroke="#38bdf8" stroke-width="4"/>
      <text x="50%" y="${h - 24}" fill="#9aa6c7" font-family="sans-serif" font-size="20" text-anchor="middle">${esc(text)}</text>
    </svg>`
  );

/* প্রজেক্টের সব স্ক্রিনশট (shots অথবা পুরনো img) */
const shotsOf = (p) => {
  const list = Array.isArray(p.shots) ? p.shots.filter(Boolean) : [];
  if (!list.length && p.img) list.push(p.img);
  return list;
};

/* ===== CONTACT LINKS ===== */
const links = [
  ["📞", "Phone", CONFIG.phone ? `tel:${CONFIG.phone}` : ""],
  ["💬", "WhatsApp", CONFIG.whatsapp ? `https://wa.me/${CONFIG.whatsapp}` : ""],
  ["📧", "Email", CONFIG.email ? `mailto:${CONFIG.email}` : ""],
  ["📘", "Facebook", CONFIG.facebook],
  ["📸", "Instagram", CONFIG.instagram],
  ["💻", "GitHub", CONFIG.github],
  ["🔗", "LinkedIn", CONFIG.linkedin]
].filter((l) => l[2] && (isUrl(l[2]) || /^(tel|mailto):/.test(l[2])));

const linkHTML = (l) =>
  `<a href="${esc(l[2])}" ${isUrl(l[2]) ? 'target="_blank" rel="noopener noreferrer"' : ""}>
     <span class="ic">${l[0]}</span>${l[1]}
   </a>`;

/* ===== PERSONAL INFO ===== */
$("#logo").textContent = CONFIG.name;
$("#heroName").textContent = CONFIG.name;
$("#fName").textContent = CONFIG.name;
$("#fName2").textContent = CONFIG.name;

/* ===== PROFILE IMAGE ===== */
const avatar = $("#avatar");
avatar.onerror = () => {
  avatar.onerror = null;
  avatar.src = ph("Your Photo", 400, 400);
};
avatar.src = CONFIG.avatar || ph("Your Photo", 400, 400);

/* ===== SKILLS ===== */
$("#skills").innerHTML = SKILLS.map(
  (s) => `<div class="card rv"><div class="ic">${s.i}</div><h3>${s.n}</h3><p>${s.d}</p></div>`
).join("");

/* ===== PROJECTS ===== */
const ghBtn = (p, cls) =>
  isUrl(p.gh) ? `<a class="btn ${cls}" href="${esc(p.gh)}" target="_blank" rel="noopener noreferrer">GitHub</a>` : "";
const demoBtn = (p, cls) =>
  isUrl(p.demo) ? `<a class="btn ${cls}" href="${esc(p.demo)}" target="_blank" rel="noopener noreferrer">Live Demo</a>` : "";
const tagsHTML = (p) => p.t.map((t) => `<span class="tag">${t}</span>`).join("");

$("#projGrid").innerHTML = PROJECTS.map(
  (p, i) => `
  <article class="card proj rv" data-i="${i}" tabindex="0" role="button" aria-label="Open ${esc(p.n)}">
    <img loading="lazy" src="${shotsOf(p)[0] || ph(p.n)}" alt="${esc(p.n)} screenshot">
    <div class="b">
      <h3 style="margin:0 0 6px">${p.n}</h3>
      <p style="color:var(--mut);margin:0">${p.d}</p>
      <div class="tags">${tagsHTML(p)}</div>
      <div class="pb">${ghBtn(p, "o")}${demoBtn(p, "")}</div>
    </div>
  </article>`
).join("");

/* ===== EDUCATION ===== */
$("#edu").innerHTML = EDUCATION.map(
  (e) => `<div class="card rv"><h3>${e.t}</h3>${e.l.map((x) => `<p>${x}</p>`).join("")}</div>`
).join("");

/* ===== COURSES ===== */
$("#courseGrid").innerHTML = COURSES.map(
  (c) => `<div class="card rv"><div class="ic">🎓</div><h3>${c}</h3></div>`
).join("");

/* ===== CONTACT ===== */
$("#contactList").innerHTML = links.map(linkHTML).join("");
$("#contactPop").innerHTML = links.map(linkHTML).join("");

/* ===== FOOTER SOCIAL ===== */
$("#fSoc").innerHTML = links
  .filter((l) => isUrl(l[2]))
  .map((l) => `<a href="${esc(l[2])}" target="_blank" rel="noopener noreferrer">${l[1]}</a>`)
  .join("");

/* ===== LIGHTBOX (ছবি বড় করে দেখা) ===== */
const lb = document.createElement("div");
lb.className = "lb";
lb.setAttribute("role", "dialog");
lb.setAttribute("aria-label", "Screenshot viewer");
lb.innerHTML = `
  <button class="lb-x" aria-label="Close">×</button>
  <button class="lb-prev" aria-label="Previous">‹</button>
  <img alt="">
  <button class="lb-next" aria-label="Next">›</button>
  <div class="lb-c"></div>`;
document.body.appendChild(lb);

const lbImg = lb.querySelector("img");
const lbCount = lb.querySelector(".lb-c");
let lbList = [];
let lbIdx = 0;
let lbAlt = "";

function renderLb() {
  lbImg.src = lbList[lbIdx];
  lbImg.alt = `${lbAlt} screenshot ${lbIdx + 1}`;
  lbCount.textContent = `${lbIdx + 1} / ${lbList.length}`;
  lb.classList.toggle("single", lbList.length < 2);
}
function openLb(list, i, alt) {
  if (!list.length) return;
  lbList = list; lbIdx = i; lbAlt = alt;
  renderLb();
  lb.classList.add("open");
}
function closeLb() { lb.classList.remove("open"); }
function stepLb(d) {
  if (lbList.length < 2) return;
  lbIdx = (lbIdx + d + lbList.length) % lbList.length;
  renderLb();
}

lb.addEventListener("click", (e) => {
  if (e.target.closest(".lb-prev")) return stepLb(-1);
  if (e.target.closest(".lb-next")) return stepLb(1);
  if (e.target !== lbImg) closeLb();   // ছবির বাইরে বা × এ ক্লিক করলে বন্ধ
});

/* কিবোর্ড: Esc বন্ধ, ← → পরিবর্তন (lightbox খোলা থাকলে modal আগে বন্ধ হবে না) */
addEventListener("keydown", (e) => {
  if (!lb.classList.contains("open")) return;
  if (e.key === "Escape") { closeLb(); e.stopImmediatePropagation(); }
  if (e.key === "ArrowLeft") stepLb(-1);
  if (e.key === "ArrowRight") stepLb(1);
}, true);

/* মোবাইলে swipe */
let tx = 0;
lb.addEventListener("touchstart", (e) => { tx = e.touches[0].clientX; }, { passive: true });
lb.addEventListener("touchend", (e) => {
  const dx = e.changedTouches[0].clientX - tx;
  if (Math.abs(dx) > 50) stepLb(dx < 0 ? 1 : -1);
});

/* ===== PROJECT MODAL ===== */
let curProj = null;

function openProj(i) {
  const p = PROJECTS[i];
  if (!p) return;
  curProj = p;
  const shots = shotsOf(p);
  const hasBtns = isUrl(p.gh) || isUrl(p.demo);

  const media = shots.length
    ? `<div>
         <div class="shot-wrap">
           <img class="shot-main zoomable" data-shot="0" src="${esc(shots[0])}" alt="${esc(p.n)} screenshot" title="Click to enlarge">
           <span class="zoom-hint">🔍 Click to enlarge</span>
         </div>
         ${shots.length > 1
           ? `<div class="thumbs">${shots.map((s, k) =>
               `<img data-shot="${k}" src="${esc(s)}" alt="${esc(p.n)} screenshot ${k + 1}">`).join("")}</div>`
           : ""}
       </div>`
    : `<img src="${ph(p.n)}" alt="${esc(p.n)} screenshot" style="border-radius:12px;width:100%">`;

  $("#projBody").innerHTML = `
    ${media}
    <div>
      <h3>${p.n}</h3>
      <p style="color:var(--mut)">${p.d}</p>
      <h4>Features</h4>
      <ul style="color:var(--mut);padding-left:20px">${p.f.map((f) => `<li>${f}</li>`).join("")}</ul>
      <h4>Technologies Used</h4>
      <div class="tags">${tagsHTML(p)}</div>
      ${hasBtns ? `<h4>Links</h4><div class="pb">${ghBtn(p, "")}${demoBtn(p, "o")}</div>` : ""}
    </div>`;
  $("#projModal").classList.add("open");
}

/* modal এর ভিতরে ছবিতে ক্লিক → lightbox */
$("#projBody").addEventListener("click", (e) => {
  const img = e.target.closest("[data-shot]");
  if (img && curProj) openLb(shotsOf(curProj), Number(img.dataset.shot), curProj.n);
});

$("#projGrid").addEventListener("click", (e) => {
  if (e.target.closest("a")) return;
  const card = e.target.closest(".proj");
  if (card) openProj(card.dataset.i);
});

$("#projGrid").addEventListener("keydown", (e) => {
  if (e.key === "Enter" && e.target.classList.contains("proj")) openProj(e.target.dataset.i);
});

/* ===== CONTACT MODAL ===== */
$("#contactBtn").onclick = () => {
  $("#contactModal").classList.add("open");
  $("#links").classList.remove("open");
  $("#burger").setAttribute("aria-expanded", "false");
};

/* ===== MODAL CLOSE ===== */
document.querySelectorAll(".modal").forEach((m) => {
  m.addEventListener("click", (e) => {
    if (e.target === m || e.target.hasAttribute("data-close")) m.classList.remove("open");
  });
});

addEventListener("keydown", (e) => {
  if (e.key === "Escape") document.querySelectorAll(".modal").forEach((m) => m.classList.remove("open"));
});

/* ===== MOBILE MENU ===== */
$("#burger").onclick = () => {
  const open = $("#links").classList.toggle("open");
  $("#burger").setAttribute("aria-expanded", String(open));
};

$("#links").addEventListener("click", (e) => {
  if (e.target.matches("a")) {
    $("#links").classList.remove("open");
    $("#burger").setAttribute("aria-expanded", "false");
  }
});

/* ===== SCROLL ANIMATION ===== */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add("in");
        io.unobserve(en.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".rv").forEach((el) => io.observe(el));

/* ===== PRELOADER ===== */
(() => {
  const pl = document.getElementById("preloader");
  if (!pl) return;

  const minTime = 2400;
  const start = performance.now();

  const finish = () => {
    pl.classList.add("done");
    document.body.classList.remove("loading");
    setTimeout(() => pl.remove(), 700);
  };
  const go = () => setTimeout(finish, Math.max(0, minTime - (performance.now() - start)));

  if (document.readyState === "complete") go();
  else addEventListener("load", go);
})();