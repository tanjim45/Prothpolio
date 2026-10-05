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

/* ===== CONTACT LINKS (faka/invalid link auto hide hobe) ===== */
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

/* ===== PROFILE IMAGE (photo na paile placeholder) ===== */
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
    <img loading="lazy" src="${p.img || ph(p.n)}" alt="${esc(p.n)} screenshot">
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

/* ===== PROJECT MODAL ===== */
function openProj(i) {
  const p = PROJECTS[i];
  if (!p) return;
  const hasBtns = isUrl(p.gh) || isUrl(p.demo);
  $("#projBody").innerHTML = `
    <img src="${p.img || ph(p.n)}" alt="${esc(p.n)} screenshot" style="border-radius:12px;width:100%">
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
/* ===== PRELOADER ===== */
(() => {
  const pl = document.getElementById("preloader");
  if (!pl) return;

  const minTime = 2400; // animation sesh howar somoy (ms), shob device e same
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