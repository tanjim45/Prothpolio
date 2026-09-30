const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const ph=(txt,w=640,h=400)=>"data:image/svg+xml;utf8,"+encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><rect width='100%' height='100%' fill='#151d3b'/><rect x='${w/2-60}' y='${h/2-110}' width='120' height='220' rx='18' fill='none' stroke='#38bdf8' stroke-width='4'/><text x='50%' y='${h-24}' fill='#9aa6c7' font-family='sans-serif' font-size='20' text-anchor='middle'>${txt}</text></svg>`);
const links=[
 ["📞","Phone",`tel:${CONFIG.phone}`],
 ["💬","WhatsApp",`https://wa.me/${CONFIG.whatsapp}`],
 ["📧","Email",`mailto:${CONFIG.email}`],
 ["📘","Facebook",CONFIG.facebook],
 ["📸","Instagram",CONFIG.instagram],
 ["💻","GitHub",CONFIG.github]
];
const linkHTML=l=>`<a href="${esc(l[2])}" ${l[2].startsWith("http")?'target="_blank" rel="noopener noreferrer"':""}><span class="ic">${l[0]}</span>${l[1]}</a>`;

$("#logo").textContent=$("#heroName").textContent=$("#fName").textContent=$("#fName2").textContent=CONFIG.name;
$("#avatar").src=CONFIG.avatar||ph("Your Photo",400,400);
$("#skills").innerHTML=SKILLS.map(s=>`<div class="card rv"><div class="ic">${s.i}</div><h3>${s.n}</h3><p>${s.d}</p></div>`).join("");
$("#projGrid").innerHTML=PROJECTS.map((p,i)=>`<article class="card proj rv" data-i="${i}" tabindex="0" role="button" aria-label="Open ${esc(p.n)}"><img loading="lazy" src="${p.img||ph(p.n)}" alt="${esc(p.n)} screenshot"><div class="b"><h3 style="margin:0 0 6px">${p.n}</h3><p style="color:var(--mut);margin:0">${p.d}</p><div class="tags">${p.t.map(x=>`<span class="tag">${x}</span>`).join("")}</div><div class="pb"><a class="btn o" href="${esc(p.gh)}" target="_blank" rel="noopener noreferrer">GitHub</a>${p.demo?`<a class="btn" href="${esc(p.demo)}" target="_blank" rel="noopener noreferrer">Live Demo</a>`:""}</div></div></article>`).join("");
$("#edu").innerHTML=EDUCATION.map(e=>`<div class="card rv"><h3>${e.t}</h3>${e.l.map(x=>`<p>${x}</p>`).join("")}</div>`).join("");
$("#courseGrid").innerHTML=COURSES.map(c=>`<div class="card rv"><div class="ic">🎓</div><h3>${c}</h3></div>`).join("");
$("#contactList").innerHTML=links.map(linkHTML).join("");
$("#contactPop").innerHTML=links.slice(0,5).map(linkHTML).join("");
$("#fSoc").innerHTML=[["GitHub",CONFIG.github],["Facebook",CONFIG.facebook],["Instagram",CONFIG.instagram],["WhatsApp","https://wa.me/"+CONFIG.whatsapp],["LinkedIn",CONFIG.linkedin]].map(s=>`<a href="${esc(s[1])}" target="_blank" rel="noopener noreferrer">${s[0]}</a>`).join("");

function openProj(i){const p=PROJECTS[i];
 $("#projBody").innerHTML=`<img src="${p.img||ph(p.n)}" alt="${esc(p.n)} screenshot" style="border-radius:12px;width:100%"><div><h3>${p.n}</h3><p style="color:var(--mut)">${p.d}</p><h4>Features</h4><ul style="color:var(--mut);padding-left:20px">${p.f.map(x=>`<li>${x}</li>`).join("")}</ul><h4>Technologies Used</h4><div class="tags">${p.t.map(x=>`<span class="tag">${x}</span>`).join("")}</div><h4>GitHub Repository</h4><div class="pb"><a class="btn" href="${esc(p.gh)}" target="_blank" rel="noopener noreferrer">GitHub</a>${p.demo?`<a class="btn o" href="${esc(p.demo)}" target="_blank" rel="noopener noreferrer">Live Demo</a>`:""}</div></div>`;
 $("#projModal").classList.add("open");}
$("#projGrid").addEventListener("click",e=>{if(e.target.closest("a"))return;const c=e.target.closest(".proj");if(c)openProj(c.dataset.i)});
$("#projGrid").addEventListener("keydown",e=>{if(e.key==="Enter"&&e.target.classList.contains("proj"))openProj(e.target.dataset.i)});
$("#contactBtn").onclick=()=>{$("#contactModal").classList.add("open");$("#links").classList.remove("open")};
document.querySelectorAll(".modal").forEach(m=>m.addEventListener("click",e=>{if(e.target===m||e.target.hasAttribute("data-close"))m.classList.remove("open")}));
addEventListener("keydown",e=>{if(e.key==="Escape")document.querySelectorAll(".modal").forEach(m=>m.classList.remove("open"))});
$("#burger").onclick=()=>{const o=$("#links").classList.toggle("open");$("#burger").setAttribute("aria-expanded",o)};
$("#links").addEventListener("click",e=>{if(e.target.matches("a"))$("#links").classList.remove("open")});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".rv").forEach(el=>io.observe(el));
