// site.jsx — Jordan Loewen-Colón

const { useState, useEffect, useRef } = React;

// ─────────────────────────────────────────────────────────────────────────────
// Content
// ─────────────────────────────────────────────────────────────────────────────

const TALKS = [
  { n: "01", title: "Doing AI Differently", sub: "How orgs can build with AI while staying human.", len: "45–60 min · keynote or workshop" },
  { n: "02", title: "Empire 2.0", sub: "What business leaders need to know about AI, data extraction, and digital colonialism.", len: "45 min · keynote" },
  { n: "03", title: "Many Models, One World", sub: "Why culture, context, and meaning matter in responsible AI.", len: "30–45 min · keynote" },
  { n: "04", title: "Human–AI Ensembles", sub: "The future of work beyond automation and replacement.", len: "60 min · keynote + Q&A" },
  { n: "05", title: "Artificial Opportunity", sub: "The actual promises and problems of artificial intelligence.", len: "45 min · keynote" },
];

const HOME_RECENT = [
  { kind: "Essay",   venue: "Harvard Business Review", date: "May 2025",
    title: "Research: Do LLMs Have Values?",
    href: "https://hbr.org/2025/05/research-do-llms-have-values", external: true },
  { kind: "Code",    venue: "Github", date: "2025",
    title: "BookBack: a public-domain reclamation against extractive scraping.",
    href: "https://github.com/jbloewencolon/BookBack", external: true },
  { kind: "Talk",    venue: "Syracuse University", date: "2026",
    title: "Artificial Opportunity: Universities are Doomed and the Humanities Can Save Them.",
    href: "/work/publications", page: "work/publications" },
  { kind: "Podcast", venue: "Pondering AI", date: "2025",
    title: "What Does AI Value? — with Kimberly Nevala",
    href: "https://www.youtube.com/watch?v=ZajcadLF_8I", external: true },
  { kind: "Paper",   venue: "AI & Society", date: "2026",
    title: "Preventing AI Extractivism",
    href: "https://link.springer.com/article/10.1007/s00146-026-02931-z", external: true },
];

const AFFILIATIONS_LOGOS = [
  { name: "Indigenous Values Initiative", short: "IVI",
    href: "https://indigenousvalues.org/",
    logo: "images/affil-ivi.webp", w: 250, h: 250 },
  { name: "Nera Lake", short: "NL",
    href: "https://www.neralake.com/",
    logo: "images/affil-neralake.webp", w: 162, h: 172 },
  { name: "Candidly AI", short: "CA",
    href: "https://candidly-ai.com/about/",
    logo: "images/affil-candidly.webp", w: 158, h: 225 },
  { name: "Aspen Policy Academy (Tech)", short: "APA",
    href: "https://aspenpolicyacademy.org/tech/",
    logo: "images/affil-aspen.webp", w: 417, h: 237 },
];
const AFFILIATIONS_TEXT = [
  { name: "FASPE", full: "Fellowship at Auschwitz for the Study of Professional Ethics",
    href: "https://www.faspe-ethics.org/" },
  { name: "Smith School of Business, Queen's University",
    href: "https://smith.queensu.ca/" },
  { name: "Founder Institute",
    href: "https://fi.co/" },
  { name: "TIDEL", full: "Union Theological Seminary",
    href: "https://utsnyc.edu/tidel/" },
];

const LINEAGES = [
  { name: "Édouard Glissant",        meta: "Poetics of Relation · 1990" },
  { name: "Sylvia Wynter",           meta: "On being human · 2003" },
  { name: "Katherine Hayles",        meta: "How we became Posthuman · 1999" },
  { name: "Vine Deloria",            meta: "God is Red · 1973" },
  { name: "Gilles Deleuze",          meta: "Difference and Repetition · 1968" },
  { name: "Ruha Benjamin",           meta: "Race after technology · 2019" },
];

function HomeAffiliations({ n = "02" }) {
  return (
    <section className="home-section home-affiliations">
      <h2 className="section-head">
        <span className="sh-num">{n}</span> The Where and What of my Work
      </h2>
      <p className="lead-mute">
        Indigenous sovereignty, applied AI, policy training, universities,
        humanities ethics. Even though the rooms are different, some questions stay the same.
      </p>

      <ul className="affil-logo-grid">
        {AFFILIATIONS_LOGOS.map((a) => (
          <li key={a.name} className="affil-logo-item">
            <a href={a.href} target="_blank" rel="noopener noreferrer">
              <div className={"affil-logo" + (a.logo ? " has-img" : "")} aria-hidden="true">
                {a.logo
                  ? <img src={a.logo} alt="" width={a.w} height={a.h} loading="lazy" decoding="async" />
                  : <span className="affil-logo-placeholder">{a.short || a.name.split(" ").map((w) => w[0]).join("").slice(0, 3)}</span>}
              </div>
              <div className="affil-name">{a.name}</div>
            </a>
          </li>
        ))}
      </ul>

      <p className="affil-also-label">Also affiliated with</p>
      <ul className="affil-text-list">
        {AFFILIATIONS_TEXT.map((a, i) => (
          <li key={a.name}>
            <a className="inline-link" href={a.href} target="_blank" rel="noopener noreferrer">{a.name}</a>
            {a.full && <span className="affil-full"> — {a.full}</span>}
            {i < AFFILIATIONS_TEXT.length - 1 && <span aria-hidden="true"> · </span>}
          </li>
        ))}
      </ul>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Layout primitives
// ─────────────────────────────────────────────────────────────────────────────

function Inner({ children, className = "", first = false, tight = false }) {
  return (
    <div className={`page-inner ${first ? "first" : ""} ${tight ? "tight" : ""} ${className}`}>
      {children}
    </div>
  );
}

function Band({ variant, children, className = "" }) {
  return (
    <section className={`band band-${variant} ${className}`}>
      <div className="band-inner">{children}</div>
    </section>
  );
}

function Grid({ children }) {
  return <div className="grid">{children}</div>;
}
function Body({ children }) {
  return <div className="grid-body">{children}</div>;
}
function Margin({ children, hidden }) {
  if (hidden) return null;
  return <aside className="grid-margin">{children}</aside>;
}
function MarginNote({ tag, children }) {
  return (
    <div className="margin-note">
      <div className="mn-tag">{tag}</div>
      <div className="mn-body">{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Header / Nav
// ─────────────────────────────────────────────────────────────────────────────

function Header({ page, setPage, t }) {
  const groupedPages = [
    ["home", "Home"],
    ["work", "Work"],
    ["about", "About"],
    ["speaking", "Speaking & Consulting"],
    ["contact", "Contact"],
  ];
  const flatPages = [
    ["home", "Home"],
    ["work/publications", "Writing"],
    ["work/press", "Press"],
    ["work/projects", "Projects"],
    ["about", "About"],
    ["speaking", "Speaking"],
    ["contact", "Contact"],
  ];
  const pages = t.navstyle === "flat" ? flatPages : groupedPages;
  const sectionMatch = (k) => {
    if (k === page) return true;
    if (k === "work" && page.startsWith("work")) return true;
    return false;
  };
  return (
    <React.Fragment>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <header className="site-header">
        <a className="wordmark" href="/" onClick={(e) => { e.preventDefault(); setPage("home"); }}>
          <span className="wm-first">Jordan</span>
          <span className="wm-second">Loewen-Colón</span>
        </a>
        <nav className="site-nav">
          {pages.map(([k, label]) => (
            <a key={k} href={k === "home" ? "/" : "/" + k}
               className={"nav-link " + (sectionMatch(k) ? "is-active" : "")}
               onClick={(e) => { e.preventDefault(); setPage(k); }}>
              {label}
            </a>
          ))}
        </nav>
      </header>
      <div className="header-stripe" aria-hidden="true"></div>
    </React.Fragment>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Home
// ─────────────────────────────────────────────────────────────────────────────

function Home({ setPage, t }) {
  const epigraphRef = useRef(null);
  useEffect(() => {
    const el = epigraphRef.current;
    if (!el || el.dataset.animated) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.dataset.animated = "1";
    const words = el.textContent.split(/(\s+)/);
    el.textContent = "";
    words.forEach((w, i) => {
      const span = document.createElement("span");
      span.textContent = w;
      span.style.opacity = "0";
      span.style.transition = "opacity 700ms ease";
      span.style.transitionDelay = (50 * i) + "ms";
      el.appendChild(span);
      requestAnimationFrame(() => requestAnimationFrame(() => { span.style.opacity = "1"; }));
    });
  }, []);

  return (
    <article className="page page-home">
      <header className="home-hero">
        <h1 className="home-name"><span className="wm-line">Jordan</span><span className="wm-line">Loewen-Colón</span></h1>
        <div className="home-subtitle">
          Indigenous Taíno technologist<br/>
          Responsible AI strategist
        </div>
      </header>

      <Band variant="clay" className="epigraph-band">
        <blockquote>
          <p ref={epigraphRef}>The task of perception entails pulverizing the world, but also one of spiritualizing its dust.</p>
          <cite>— Gilles Deleuze</cite>
        </blockquote>
      </Band>

      <Inner>
        <Grid>
          <Body>
            <section className="home-section">
              <h2 className="section-head"><span className="sh-num">01</span> Recently</h2>
              <ul className="home-recent-list">
                {HOME_RECENT.map((item, i) => (
                  <li key={i} className="hr-item">
                    <a href={item.href}
                       target={item.external ? "_blank" : undefined}
                       rel={item.external ? "noopener" : undefined}
                       onClick={item.page ? (e) => { e.preventDefault(); setPage(item.page); } : undefined}>
                      <span className="hr-kind">{item.kind}</span>
                      <span className="hr-venue">· {item.venue}</span>
                      <span className="hr-date">{item.date}</span>
                      <span className="hr-title">{item.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <nav className="hr-deeper" aria-label="Deeper into the work">
                <a className="quiet-link" href="/work/publications"
                   onClick={(e) => { e.preventDefault(); setPage("work/publications"); }}>
                  All writing &amp; talks →
                </a>
                <a className="quiet-link" href="/work/projects"
                   onClick={(e) => { e.preventDefault(); setPage("work/projects"); }}>
                  All projects →
                </a>
                <a className="quiet-link" href="/work/press"
                   onClick={(e) => { e.preventDefault(); setPage("work/press"); }}>
                  All press →
                </a>
              </nav>
            </section>

            <HomeAffiliations n="02" />

            <section className="home-section">
              <h2 className="section-head">
                <span className="sh-num">03</span> Start a conversation
              </h2>
              <p className="lead">
                Booking, consulting, press, advisory. The fastest way is to{" "}
                <a className="inline-link" href="https://calendly.com/j-l-c" target="_blank" rel="noopener noreferrer">put fifteen minutes on the calendar</a>{" "}
                or write to <a className="inline-link" href="mailto:jbl6@queensu.ca">jbl6@queensu.ca</a>.
              </p>
            </section>
          </Body>

          <Margin hidden={!t.marginalia}>
            <MarginNote tag="Berlin · 2025">
              <figure className="mn-figure">
                <img src="images/talk-whiteboard.webp" alt="Jordan Loewen-Colón at the whiteboard during Responsible Innovation: Hopes &amp; Fears at Data Natives Berlin." width="1600" height="1068" loading="lazy" decoding="async" />
                <figcaption><em>Responsible Innovation: Hopes &amp; Fears</em> — Data Natives, Berlin.</figcaption>
              </figure>
            </MarginNote>
            <MarginNote tag="On view">
              Available for keynotes, workshops, advisory seats, and select consulting engagements through 2026.
            </MarginNote>
            <MarginNote tag="Based in">
              Toronto, Ontario · traveling for talks.
            </MarginNote>
            <MarginNote tag="Currently">
              Writing <em>Reality Technologies</em>. Teaching at Queen's. Developing tools for governance and standard setting.
            </MarginNote>
            {t.colibri === "surfaced" && (
              <MarginNote tag="Also">
                Writes poetry as <a className="colibri-link" href="#" onClick={(e)=>e.preventDefault()}>al colibrí</a> — separate site, on purpose.
              </MarginNote>
            )}
          </Margin>
        </Grid>
      </Inner>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// About
// ─────────────────────────────────────────────────────────────────────────────

function About({ t }) {
  return (
    <article className="page page-about">
      <Band variant="ink-lifted" className="about-portrait-band">
        <div className="apb-grid">
          <figure className="apb-figure">
            <img src="images/portrait-window.webp" alt="Jordan Loewen-Colón, seated at a wooden table in front of a large industrial window." width="1272" height="1272" decoding="async" fetchpriority="high" />
            <figcaption>Toronto, 2025. Photograph by Dan Campo.</figcaption>
          </figure>
          <div className="apb-text">
            <p className="kicker-double">Taíno · in the present tense</p>
            <h1>The model is not the world.</h1>
            <p className="lead apb-lead">
              Jordan Loewen-Colón is an Indigenous Taíno technologist, Responsible AI strategist,
              scholar, educator, and organizational transformation consultant working at the
              intersection of artificial intelligence, culture, new media, and data
              justice.
            </p>
          </div>
        </div>
      </Band>

      <Inner>
        <Grid>
          <Body>
            <p className="lead">
              The work moves across the lab, the classroom, the startup floor, and the
              policy arena, bringing technical fluency together with humanistic depth and a clear
              commitment to communities too often flattened by emerging technologies.
            </p>

            <p>
              He earned a Ph.D. in the study of Religion from Syracuse University and an M.Div. from
              Princeton Theological Seminary in philosophy and theology. The intellectual path began with philosophy, then moved into the cultural and ethical consequences of AI, virtual
              reality, machine learning, and reality technologies. Drawing on critical theory,
              Indigenous data sovereignty, and thinkers such as Édouard Glissant, he defends the
              <em> Right to Opacity</em>: the principle that people, cultures, and knowledge
              systems should not be rendered fully transparent, extractable, or machine-readable
              simply because technology makes it possible.
            </p>

            <p>
              As Cofounder and CEO of Supernova Immersives, he led a cross-functional team of
              engineers, scientists, and therapists in developing AI-augmented virtual reality for
              mental health. The company built a therapeutic VR experience informed by Internal
              Family Systems Therapy, entered the Founder Institute accelerator in Silicon Valley.
            </p>

            <p>
              His policy work confronts what he calls <em>Empire 2.0</em> — the new wave of digital
              extraction in which Indigenous languages, biometric data, cultural knowledge, and
              territorial information are absorbed into AI systems under the language of innovation
              and open data. He has worked as a Tech Policy Fellow at the Aspen Institute, drafting
              recommendations bringing OCAP® and the CARE Principles into conversation with
              Access-and-Benefit-Sharing protocols.
            </p>

            <p>
              At Queen's University he teaches AI, Ethics, and policy at the Smith School of Business and Department of Computing,
              designing more than twelve courses and evaluating over a thousand student projects.
              He is currently drafting the manuscript for the forthcoming book <em>Reality Technologies</em>.
              {t.colibri === "footnote" && (
                <span> He also writes poetry as <a className="colibri-link" href="#" onClick={(e)=>e.preventDefault()}>al colibrí</a>.</span>
              )}
            </p>

            <h2 className="section-head section-head-spaced">
              <span className="sh-num">·</span> Currently thinking about
            </h2>
            <ul className="thinking-list">
              <li>The difference between an AI <em>model</em> and an AI <em>system</em>, and why bookers keep using one word when they mean the other.</li>
              <li>What an "ensemble" of human and machine judgment looks like in a workflow that has to ship next quarter.</li>
              <li>Whether <em>opacity</em> can be a design constraint and not just a value statement.</li>
              <li>Glissant on relation and the Right to opacity.</li>
            </ul>

            <h2 className="section-head section-head-spaced">
              <span className="sh-num">·</span> Lineages
            </h2>
            <p>
              Names and texts my work answers to. Neither exhaustive nor ranked. The list updates when the
              reading list does.
            </p>
            <ul className="lineages">
              {LINEAGES.map((l, i) => (
                <li key={i}>
                  <span className="lin-name">{l.name}</span>
                  <span className="lin-meta">{l.meta}</span>
                </li>
              ))}
            </ul>

            <p className="updated">Updated May 2026.</p>
          </Body>

          <Margin hidden={!t.marginalia}>
            <MarginNote tag="Degrees">
              Ph.D., Religion · Syracuse University<br/>
              M.Div. · Princeton Theological Seminary
            </MarginNote>
            <MarginNote tag="By the numbers">
              $2M+ supported in grant-funded research · 10,000+ downloads of Responsible AI media · 35+ public and academic presentations · 1,000+ student projects evaluated
            </MarginNote>
            {t.colibri === "surfaced" && (
              <MarginNote tag="Other practice">
                Writes poetry as <a className="colibri-link" href="#" onClick={(e)=>e.preventDefault()}>al colibrí</a>. The art does not need to explain itself.
              </MarginNote>
            )}
          </Margin>
        </Grid>
      </Inner>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Speaking
// ─────────────────────────────────────────────────────────────────────────────

function Speaking({ t }) {
  return (
    <article className="page page-speaking">
      <Inner first>
        <Grid>
          <Body>
            <p className="kicker">Speaking &amp; Consulting</p>
            <h1 className="page-title">The conversations that need to happen.</h1>
            <p className="lead">
              What follows are not paper abstracts. They are the talks a booker can actually put on a
              program. They have been workshopped on stages from Berlin to Toronto, and calibrated for rooms that
              contain both engineers and the people who pay them.
            </p>

            <ol className="topics">
              {TALKS.map((talk) => (
                <li key={talk.n} className="topic">
                  <div className="topic-num">{talk.n}</div>
                  <div className="topic-body">
                    <h3 className="topic-title">{talk.title}</h3>
                    <p className="topic-sub">{talk.sub}</p>
                    <p className="topic-len">{talk.len}</p>
                  </div>
                </li>
              ))}
            </ol>

            <h2 className="section-head section-head-spaced">
              <span className="sh-num">·</span> What working together looks like
            </h2>
            <p>
              <strong>Keynotes &amp; panels.</strong> 30–60 minutes, with or without Q&amp;A.
              Custom framing for the room — a corporate offsite is not a university seminar and
              should not be billed as one.
            </p>
            <p>
              <strong>Workshops.</strong> Half-day to two-day formats for product, policy, and
              leadership teams. Useful when an organization already knows what it wants to ship and
              needs help thinking about what shipping it will do.
            </p>
            <p>
              <strong>Advisory.</strong> Quarterly retainer. For teams building or governing AI
              systems who want a standing voice in the room that is neither the optimist nor the
              doomer.
            </p>
            <p>
              <strong>Consulting projects.</strong> 4–12 weeks. Scoped to a specific question:
              "should we build this," "what frameworks do we owe the community we are drawing data
              from," "how do we write a policy that survives the next model."
            </p>
          </Body>

          <Margin hidden={!t.marginalia}>
            <MarginNote tag="On rates">
              Listed because guessing wastes everyone's time. If your budget is real and falls outside, write anyway.
            </MarginNote>
            <MarginNote tag="What I am useful for">
              Rooms where the technical and the humanistic have to share a microphone. Decisions that have not yet been made.
            </MarginNote>
            <MarginNote tag="What I am not">
              A hype keynote. A doom keynote. A vendor for ethics-washing.
            </MarginNote>
          </Margin>
        </Grid>
      </Inner>

      <Band variant="clay" className="rates-band">
        <div className="rb-head">Rates</div>
        <h2 className="rb-title">Listed, because guessing wastes everyone's time.</h2>
        <div className="rates-grid">
          <div className="rate-card">
            <div className="rate-label">Keynote</div>
            <div className="rate-amount">$5–15k</div>
            <div className="rate-note">Domestic. International negotiated per travel.</div>
          </div>
          <div className="rate-card">
            <div className="rate-label">Workshop · per day</div>
            <div className="rate-amount">$4–12k</div>
            <div className="rate-note">Scope varies with prep and team size.</div>
          </div>
          <div className="rate-card">
            <div className="rate-label">Advisory</div>
            <div className="rate-amount">Quarterly</div>
            <div className="rate-note">Retainer. Start with a fifteen-minute call.</div>
          </div>
        </div>
        <p className="rb-foot">
          Honoraria for universities, public-interest organizations, and Indigenous-led work are
          negotiated separately and gladly.
        </p>
      </Band>

      <Inner tight>
        <Grid>
          <Body>
            <h2 className="section-head">
              <span className="sh-num">·</span> Start a conversation
            </h2>
            <div className="cal-embed" aria-label="Calendar booking">
              <div className="cal-inner">
                <div className="cal-h">Book a 15-minute call</div>
                <p className="cal-lead">
                  Pick a time that works — Calendly handles the rest. No back-and-forth.
                </p>
                <a
                  className="cal-cta"
                  href="https://calendly.com/j-l-c"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Calendly <span className="ext">↗</span>
                </a>
                <div className="cal-foot">calendly.com/j-l-c</div>
              </div>
            </div>
          </Body>
        </Grid>
      </Inner>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Contact
// ─────────────────────────────────────────────────────────────────────────────

function Contact({ t }) {
  return (
    <article className="page page-contact">
      <Inner first>
        <Grid>
          <Body>
            <p className="kicker">Contact</p>
            <h1 className="page-title">The shortest page.</h1>

            <dl className="contact-dl">
              <div>
                <dt>Email</dt>
                <dd><a className="inline-link" href="mailto:jbl6@queensu.ca">jbl6@queensu.ca</a></dd>
              </div>
              <div>
                <dt>LinkedIn</dt>
                <dd><a className="inline-link" href="https://www.linkedin.com/in/jordanloewencolon/" target="_blank" rel="noopener noreferrer">/in/jordanloewencolon</a></dd>
              </div>
              <div>
                <dt>Calendar</dt>
                <dd><a className="inline-link" href="https://calendly.com/j-l-c" target="_blank" rel="noopener noreferrer">calendly.com/j-l-c — fifteen-minute intro</a></dd>
              </div>
              <div>
                <dt>Press</dt>
                <dd>
                  <a className="inline-link" href="#">Download bio &amp; headshot pack</a><br/>
                  <span className="quiet">Includes 50 / 150 / 400 word bios and a usable portrait.</span>
                </dd>
              </div>
            </dl>
          </Body>
          <Margin hidden={!t.marginalia}>
            <MarginNote tag="Response time">
              48 hours, weekdays. Slower in August.
            </MarginNote>
          </Margin>
        </Grid>
      </Inner>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="f-col">
          <div className="f-label">Land acknowledgment</div>
          <p className="land-ack">
            This site is maintained from Tkaronto (Toronto), Ontario, on the traditional territory of the
            Anishinaabe and Haudenosaunee peoples, and from across the Caribbean diaspora.
            Jordan writes as Taíno: wo m'adan tokodo'aki ibakuaiba'ni.
          </p>
        </div>
        <div className="f-col">
          <div className="f-label">© 2026</div>
          <div>Jordan Loewen-Colón</div>
          <div style={{marginTop:"6px"}}>All rights reserved.</div>
        </div>
        <div className="f-col">
          <div className="f-label">Elsewhere</div>
          <div><a href="mailto:jbl6@queensu.ca">Email</a></div>
          <div><a href="https://www.linkedin.com/in/jordanloewencolon/" target="_blank" rel="noopener noreferrer">LinkedIn</a></div>
          <div><a href="https://calendly.com/j-l-c" target="_blank" rel="noopener noreferrer">Calendar</a></div>
        </div>
        <div className="f-col">
          <div className="f-label">Colophon</div>
          <span className="colophon-word">guakía</span>
          <span className="colophon-gloss">Taíno · "we, ours"</span>
          <div style={{marginTop:"14px"}}>Set in Fraunces &amp; Source Serif 4.<br/>Monospace: JetBrains Mono.</div>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// App
// ─────────────────────────────────────────────────────────────────────────────

const PAGE_TITLES = {
  "home":             "Jordan Loewen-Colón",
  "work":             "Work — Jordan Loewen-Colón",
  "work/publications":"Publications & Talks — Jordan Loewen-Colón",
  "work/press":       "Press & Media — Jordan Loewen-Colón",
  "work/projects":    "Projects & Code — Jordan Loewen-Colón",
  "about":            "About — Jordan Loewen-Colón",
  "speaking":         "Speaking & Consulting — Jordan Loewen-Colón",
  "contact":          "Contact — Jordan Loewen-Colón",
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "mode": "dark",
  "palette": "warm",
  "stripe": "on",
  "display": "fraunces",
  "marginalia": true,
  "colibri": "footnote",
  "namestyle": "letterpress",
  "jstyle": "fix1",
  "uifont": "jetbrains",
  "bodyfont": "source-serif",
  "navstyle": "grouped"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const VALID_PAGES = [
    "home", "work", "work/publications", "work/press", "work/projects",
    "about", "speaking", "contact"
  ];
  const [page, setPage] = useState(() => {
    const p = window.location.pathname.replace(/^\//, "") || "home";
    return VALID_PAGES.includes(p) ? p : "home";
  });

  useEffect(() => {
    const onPop = () => {
      const p = window.location.pathname.replace(/^\//, "") || "home";
      if (VALID_PAGES.includes(p)) setPage(p);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    const newPath = page === "home" ? "/" : "/" + page;
    if (window.location.pathname !== newPath) {
      history.replaceState(null, "", newPath);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [page]);

  useEffect(() => {
    document.title = PAGE_TITLES[page] || "Jordan Loewen-Colón";
  }, [page]);

  // Apply tweak attributes/vars at root
  useEffect(() => {
    const r = document.documentElement;
    r.dataset.mode = t.mode;
    r.dataset.palette = t.palette;
    r.dataset.stripe = t.stripe;
    r.dataset.display = t.display;
    r.dataset.namestyle = t.namestyle;
    r.dataset.jstyle = t.jstyle;
    r.dataset.uifont = t.uifont;
    r.dataset.bodyfont = t.bodyfont;
    r.dataset.navstyle = t.navstyle;
  }, [t.mode, t.palette, t.stripe, t.display, t.namestyle, t.jstyle, t.uifont, t.bodyfont, t.navstyle]);

  const section = page.split("/")[0];

  let pageEl = null;
  if (page === "home")                  pageEl = <Home setPage={setPage} t={t} />;
  else if (page === "work")              pageEl = <WorkLanding t={t} setPage={setPage} />;
  else if (page === "work/publications") pageEl = <WorkPublications t={t} setPage={setPage} />;
  else if (page === "work/press")        pageEl = <WorkPress t={t} setPage={setPage} />;
  else if (page === "work/projects")     pageEl = <WorkProjects t={t} setPage={setPage} />;
  else if (page === "about")             pageEl = <About t={t} />;
  else if (page === "speaking")          pageEl = <Speaking t={t} />;
  else if (page === "contact")           pageEl = <Contact t={t} />;

  return (
    <div className="site" data-page={section} data-subpage={page}>
      <Header page={page} setPage={setPage} t={t} />
      <main id="main-content" key={page} className="site-main">{pageEl}</main>
      <Footer />

      <TweaksPanel>
        <TweakSection label="Mode" />
        <TweakRadio label="Ground" value={t.mode}
                    options={["dark", "paper"]}
                    onChange={(v) => setTweak("mode", v)} />
        <TweakRadio label="Palette" value={t.palette}
                    options={["warm", "cool"]}
                    onChange={(v) => setTweak("palette", v)} />
        <TweakSection label="Architecture" />
        <TweakRadio label="Nav" value={t.navstyle}
                    options={["grouped", "flat"]}
                    onChange={(v) => setTweak("navstyle", v)} />
        <TweakSection label="Shell" />
        <TweakRadio label="Header stripe" value={t.stripe}
                    options={["on", "off"]}
                    onChange={(v) => setTweak("stripe", v)} />
        <TweakSection label="Typography — the J" />
        <TweakSelect label="J treatment" value={t.jstyle}
                     options={[
                       {value: "fix1", label: "Fix 1 — WONK off (default)"},
                       {value: "fix2", label: "Fix 2 — SOFT 30, crisper"},
                       {value: "fix3", label: "Fix 3 — roman, upright J"}
                     ]}
                     onChange={(v) => setTweak("jstyle", v)} />
        <TweakSection label="Type system" />
        <TweakRadio label="UI font" value={t.uifont}
                    options={["jetbrains", "bricolage"]}
                    onChange={(v) => setTweak("uifont", v)} />
        <TweakRadio label="Body serif" value={t.bodyfont}
                    options={["source-serif", "newsreader"]}
                    onChange={(v) => setTweak("bodyfont", v)} />
        <TweakRadio label="Display face" value={t.display}
                    options={["fraunces", "modern", "humanist"]}
                    onChange={(v) => setTweak("display", v)} />
        <TweakRadio label="Name style" value={t.namestyle}
                    options={["letterpress", "clean"]}
                    onChange={(v) => setTweak("namestyle", v)} />
        <TweakSection label="Layout" />
        <TweakToggle label="Marginalia" value={t.marginalia}
                     onChange={(v) => setTweak("marginalia", v)} />
        <TweakSection label="al colibrí link" />
        <TweakRadio label="Prominence" value={t.colibri}
                    options={["footnote", "surfaced", "off"]}
                    onChange={(v) => setTweak("colibri", v)} />
      </TweaksPanel>
    </div>
  );
}

// Export components so the print build can render them stacked.
Object.assign(window, { App, Home, About, Speaking, Contact, Footer, Header, TWEAK_DEFAULTS });

if (!window.__PRINT_MODE) {
  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
}
