javascript
/* 
   HELPER FUNCTIONS
   */

// Select element
const $ = (selector) => document.querySelector(selector);


// Escape HTML characters
const esc = (value) =>
    String(value).replace(
        /[&<>"]/g,
        (char) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;"
        }[char])
    );


// Placeholder image
const ph = (text, width = 640, height = 400) =>
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="${width}"
            height="${height}"
        >

            <rect
                width="100%"
                height="100%"
                fill="#151d3b"
            />

            <rect
                x="${width / 2 - 60}"
                y="${height / 2 - 110}"
                width="120"
                height="220"
                rx="18"
                fill="none"
                stroke="#38bdf8"
                stroke-width="4"
            />

            <text
                x="50%"
                y="${height - 24}"
                fill="#9aa6c7"
                font-family="sans-serif"
                font-size="20"
                text-anchor="middle"
            >
                ${text}
            </text>

        </svg>
    `);


/* 
   CONTACT LINKS
   */

const links = [

    [
        "📞",
        "Phone",
        `tel:${CONFIG.phone}`
    ],

    [
        "💬",
        "WhatsApp",
        `https://wa.me/${CONFIG.whatsapp}`
    ],

    [
        "📧",
        "Email",
        `mailto:${CONFIG.email}`
    ],

    [
        "📘",
        "Facebook",
        CONFIG.facebook
    ],

    [
        "📸",
        "Instagram",
        CONFIG.instagram
    ],

    [
        "💻",
        "GitHub",
        CONFIG.github
    ]

];


// Generate contact link HTML
const linkHTML = (link) => `
    <a
        href="${esc(link[2])}"
        ${
            link[2].startsWith("http")
                ? 'target="_blank" rel="noopener noreferrer"'
                : ""
        }
    >
        <span class="ic">
            ${link[0]}
        </span>

        ${link[1]}
    </a>
`;


/* 
   PERSONAL INFORMATION
    */

$("#logo").textContent = CONFIG.name;

$("#heroName").textContent = CONFIG.name;

$("#fName").textContent = CONFIG.name;

$("#fName2").textContent = CONFIG.name;


/* 
   PROFILE IMAGE
    */

$("#avatar").src =
    CONFIG.avatar || ph("Your Photo", 400, 400);


/* 
   SKILLS
    */

$("#skills").innerHTML = SKILLS
    .map(
        (skill) => `
            <div class="card rv">

                <div class="ic">
                    ${skill.i}
                </div>

                <h3>
                    ${skill.n}
                </h3>

                <p>
                    ${skill.d}
                </p>

            </div>
        `
    )
    .join("");


/* 
   PROJECTS
    */

$("#projGrid").innerHTML = PROJECTS
    .map(
        (project, index) => `
            <article
                class="card proj rv"
                data-i="${index}"
                tabindex="0"
                role="button"
                aria-label="Open ${esc(project.n)}"
            >

                <!-- Project Image -->
                <img
                    loading="lazy"
                    src="${project.img || ph(project.n)}"
                    alt="${esc(project.n)} screenshot"
                >


                <!-- Project Information -->
                <div class="b">

                    <h3 style="margin: 0 0 6px">
                        ${project.n}
                    </h3>

                    <p
                        style="
                            color: var(--mut);
                            margin: 0;
                        "
                    >
                        ${project.d}
                    </p>


                    <!-- Technologies -->
                    <div class="tags">

                        ${project.t
                            .map(
                                (technology) => `
                                    <span class="tag">
                                        ${technology}
                                    </span>
                                `
                            )
                            .join("")}

                    </div>


                    <!-- Project Buttons -->
                    <div class="pb">

                        <a
                            class="btn o"
                            href="${esc(project.gh)}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub
                        </a>

                        ${
                            project.demo
                                ? `
                                    <a
                                        class="btn"
                                        href="${esc(project.demo)}"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Live Demo
                                    </a>
                                `
                                : ""
                        }

                    </div>

                </div>

            </article>
        `
    )
    .join("");


/* 
   EDUCATION
    */

$("#edu").innerHTML = EDUCATION
    .map(
        (education) => `
            <div class="card rv">

                <h3>
                    ${education.t}
                </h3>

                ${education.l
                    .map(
                        (item) => `
                            <p>
                                ${item}
                            </p>
                        `
                    )
                    .join("")}

            </div>
        `
    )
    .join("");


/* 
   COURSES & LEARNING
    */

$("#courseGrid").innerHTML = COURSES
    .map(
        (course) => `
            <div class="card rv">

                <div class="ic">
                    🎓
                </div>

                <h3>
                    ${course}
                </h3>

            </div>
        `
    )
    .join("");


/* 
   CONTACT SECTION
    */

$("#contactList").innerHTML =
    links.map(linkHTML).join("");


/* 
   CONTACT POPUP
   */

$("#contactPop").innerHTML =
    links
        .slice(0, 5)
        .map(linkHTML)
        .join("");


/* 
   FOOTER SOCIAL LINKS
    */

$("#fSoc").innerHTML = [

    [
        "GitHub",
        CONFIG.github
    ],

    [
        "Facebook",
        CONFIG.facebook
    ],

    [
        "Instagram",
        CONFIG.instagram
    ],

    [
        "WhatsApp",
        `https://wa.me/${CONFIG.whatsapp}`
    ],

    [
        "LinkedIn",
        CONFIG.linkedin
    ]

]
    .map(
        (social) => `
            <a
                href="${esc(social[1])}"
                target="_blank"
                rel="noopener noreferrer"
            >
                ${social[0]}
            </a>
        `
    )
    .join("");


/* 
   OPEN PROJECT MODAL
    */

function openProj(index) {

    const project = PROJECTS[index];

    $("#projBody").innerHTML = `

        <!-- Project Image -->
        <img
            src="${project.img || ph(project.n)}"
            alt="${esc(project.n)} screenshot"
            style="
                border-radius: 12px;
                width: 100%;
            "
        >


        <!-- Project Details -->
        <div>

            <h3>
                ${project.n}
            </h3>

            <p style="color: var(--mut)">
                ${project.d}
            </p>


            <!-- Features -->
            <h4>
                Features
            </h4>

            <ul
                style="
                    color: var(--mut);
                    padding-left: 20px;
                "
            >

                ${project.f
                    .map(
                        (feature) => `
                            <li>
                                ${feature}
                            </li>
                        `
                    )
                    .join("")}

            </ul>


            <!-- Technologies -->
            <h4>
                Technologies Used
            </h4>

            <div class="tags">

                ${project.t
                    .map(
                        (technology) => `
                            <span class="tag">
                                ${technology}
                            </span>
                        `
                    )
                    .join("")}

            </div>


            <!-- GitHub Repository -->
            <h4>
                GitHub Repository
            </h4>

            <div class="pb">

                <a
                    class="btn"
                    href="${esc(project.gh)}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub
                </a>

                ${
                    project.demo
                        ? `
                            <a
                                class="btn o"
                                href="${esc(project.demo)}"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Live Demo
                            </a>
                        `
                        : ""
                }

            </div>

        </div>
    `;


    // Open project modal
    $("#projModal").classList.add("open");
}


/* 
   PROJECT CLICK EVENT
    */

$("#projGrid").addEventListener(
    "click",
    (event) => {

        // Don't open modal when clicking GitHub / Demo button
        if (event.target.closest("a")) {
            return;
        }


        const card =
            event.target.closest(".proj");


        if (card) {
            openProj(card.dataset.i);
        }

    }
);


/* 
   PROJECT KEYBOARD EVENT
    */

$("#projGrid").addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Enter" &&
            event.target.classList.contains("proj")
        ) {
            openProj(
                event.target.dataset.i
            );
        }

    }
);


/* 
   CONTACT MODAL
    */

$("#contactBtn").onclick = () => {

    $("#contactModal").classList.add("open");

    // Close mobile navigation
    $("#links").classList.remove("open");
};


/*
   MODAL CLOSE
 */

document
    .querySelectorAll(".modal")
    .forEach((modal) => {

        modal.addEventListener(
            "click",
            (event) => {

                // Close when clicking outside modal
                // or clicking close button
                if (
                    event.target === modal ||
                    event.target.hasAttribute("data-close")
                ) {
                    modal.classList.remove("open");
                }

            }
        );

    });


/* 
   ESCAPE KEY → CLOSE MODAL
    */

addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {

            document
                .querySelectorAll(".modal")
                .forEach(
                    (modal) =>
                        modal.classList.remove("open")
                );

        }

    }
);


/* 
   MOBILE MENU
    */

$("#burger").onclick = () => {

    const isOpen =
        $("#links").classList.toggle("open");


    $("#burger").setAttribute(
        "aria-expanded",
        isOpen
    );

};


/* 
   CLOSE MOBILE MENU AFTER CLICKING LINK
    */

$("#links").addEventListener(
    "click",
    (event) => {

        if (event.target.matches("a")) {
            $("#links").classList.remove("open");
        }

    }
);


/* 
   SCROLL ANIMATION
    */

const io = new IntersectionObserver(

    (entries) => {

        entries.forEach(
            (entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("in");

                    // Observe only once
                    io.unobserve(entry.target);
                }

            }
        );

    },

    {
        threshold: 0.12
    }

);


// Observe all elements with .rv
document
    .querySelectorAll(".rv")
    .forEach(
        (element) => io.observe(element)
    );


/* 
   END OF SCRIPT
    */

