// site.jsx — Jordan Loewen-Colón

const { useState, useEffect, useRef } = React;
const COLIBRI_URL = "https://alcolibri.com/";
const BIO_PACK_URL = "/bio-and-headshot-pack-jordan-loewen-colon.md";
const ROUTES = globalThis.SITE_ROUTES || [];
const VALID_PAGES = globalThis.SITE_VALID_PAGES || [];
const PAGE_TITLES = globalThis.SITE_PAGE_TITLES || {};
const SITE_TEXT = globalThis.SITE_TEXT || { main: {}, pages: {} };
const MAIN_TEXT = SITE_TEXT.main;
const PAGE_COPY = SITE_TEXT.pages;

// ─────────────────────────────────────────────────────────────────────────────
// Content
// ─────────────────────────────────────────────────────────────────────────────

const TALKS = MAIN_TEXT.talks || [];
const HOME_RECENT = MAIN_TEXT.homeRecent || [];
const AFFILIATIONS_LOGOS = MAIN_TEXT.affiliationsLogos || [];
const AFFILIATIONS_TEXT = MAIN_TEXT.affiliationsText || [];
const LINEAGES = MAIN_TEXT.lineages || [];

function HomeAffiliations({ n = "02" }) {
  const copy = PAGE_COPY.home || {};
  return (
    <section className="home-section home-affiliations">
      <h2 className="section-head">
        <span className="sh-num">{n}</span> {copy.affiliationsHeading || "The Where and What of my Work"}
      </h2>
      <p className="lead-mute">
        {copy.affiliationsLead || "Indigenous sovereignty, applied AI, policy training, universities, humanities ethics. Even though the rooms are different, some questions stay the same."}
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
  const [navOpen, setNavOpen] = useState(false);

  const groupedPages = ROUTES
    .filter((route) => route.primaryNav)
    .map((route) => [route.key, route.navLabel]);
  const flatPages = ROUTES
    .filter((route) => route.flatNav)
    .map((route) => [route.key, route.flatNavLabel || route.navLabel]);
  const pages = t.navstyle === "flat" ? flatPages : groupedPages;
  const sectionMatch = (k) => {
    if (k === page) return true;
    if (k === "work" && page.startsWith("work")) return true;
    return false;
  };
  const go = (k, e) => { e.preventDefault(); setPage(k); setNavOpen(false); };
  return (
    <React.Fragment>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <header className="site-header">
        <a className="wordmark" href="/" aria-label="Jordan Loewen-Colón home" onClick={(e) => go("home", e)}>
          <span className="wm-first">JLC</span>
        </a>
        <button type="button"
                className="nav-toggle"
                aria-label={navOpen ? "Close navigation" : "Open navigation"}
                aria-expanded={navOpen}
                onClick={() => setNavOpen(!navOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <nav className={"site-nav" + (navOpen ? " is-open" : "")} aria-label="Main navigation">
          {pages.map(([k, label]) => (
            <a key={k} href={k === "home" ? "/" : "/" + k}
               className={"nav-link " + (sectionMatch(k) ? "is-active" : "")}
               aria-current={sectionMatch(k) ? "page" : undefined}
               onClick={(e) => go(k, e)}>
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
  const copy = PAGE_COPY.home || {};
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
        <h1 className="home-name">
          {(copy.nameLines || ["Jordan", "Loewen-Colón"]).map((line) => (
            <span key={line} className="wm-line">{line}</span>
          ))}
        </h1>
        <div className="home-subtitle">
          {(copy.subtitleLines || ["Indigenous Taíno technologist", "Responsible AI strategist"]).map((line, i, lines) => (
            <React.Fragment key={line}>{line}{i < lines.length - 1 && <br/>}</React.Fragment>
          ))}
        </div>
      </header>

      <Band variant="clay" className="epigraph-band">
        <blockquote>
          <p ref={epigraphRef}>{copy.epigraph || "The task of perception entails pulverizing the world, but also one of spiritualizing its dust."}</p>
          <cite>{copy.epigraphCite || "— Gilles Deleuze"}</cite>
        </blockquote>
      </Band>
      <Band variant="ink-lifted" className="home-portrait-band">
        <picture>
          <source srcSet="images/portrait-window.webp" type="image/webp" />
          <img
            src="images/portrait-window.jpg"
            alt=""
            className="home-pb-img"
            width="1272"
            height="1272"
            loading="lazy"
            decoding="async"
          />
        </picture>
      </Band>

      <Inner>
        <Grid>
          <Body>
            <section className="home-section">
              <h2 className="section-head"><span className="sh-num">01</span> {copy.recentHeading || "Recently"}</h2>
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
                <span className="sh-num">03</span> {copy.startHeading || "Start a conversation"}
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
                Writes poetry as <a className="colibri-link" href={COLIBRI_URL} target="_blank" rel="noopener noreferrer">al colibrí</a> — separate site, on purpose.
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
  const copy = PAGE_COPY.about || {};
  return (
    <article className="page page-about">
      <Band variant="ink-lifted" className="about-portrait-band">
        <div className="apb-grid">
          <figure className="apb-figure">
            <img src="images/portrait-window.webp" alt="Jordan Loewen-Colón, seated at a wooden table in front of a large industrial window." width="1272" height="1272" decoding="async" fetchpriority="high" />
            <figcaption>Toronto, 2025. Photograph by Dan Campo.</figcaption>
          </figure>
          <div className="apb-text">
            <p className="kicker-double">{copy.kicker || "Taíno · in the present tense"}</p>
            <h1>{copy.title || "The model is not the world."}</h1>
            <p className="lead apb-lead">
              {copy.heroLead || "Jordan Loewen-Colón is an Indigenous Taíno technologist, Responsible AI strategist, scholar, educator, and organizational transformation consultant working at the intersection of artificial intelligence, culture, new media, and data justice."}
            </p>
          </div>
        </div>
      </Band>

      <Inner>
        <Grid>
          <Body>
            <p className="lead">
              {copy.intro || "The work moves across the lab, the classroom, the startup floor, and the policy arena, bringing technical fluency together with humanistic depth and a clear commitment to communities too often flattened by emerging technologies."}
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
                <span> He also writes poetry as <a className="colibri-link" href={COLIBRI_URL} target="_blank" rel="noopener noreferrer">al colibrí</a>.</span>
              )}
            </p>

            <h2 className="section-head section-head-spaced">
              <span className="sh-num">·</span> {copy.thinkingHeading || "Currently thinking about"}
            </h2>
            <ul className="thinking-list">
              <li>The difference between an AI <em>model</em> and an AI <em>system</em>, and why bookers keep using one word when they mean the other.</li>
              <li>What an "ensemble" of human and machine judgment looks like in a workflow that has to ship next quarter.</li>
              <li>Whether <em>opacity</em> can be a design constraint and not just a value statement.</li>
              <li>Glissant on relation and the Right to opacity.</li>
            </ul>

            <h2 className="section-head section-head-spaced">
              <span className="sh-num">·</span> {copy.lineagesHeading || "Lineages"}
            </h2>
            <p>
              {copy.lineagesIntro || "Names and texts my work answers to. Neither exhaustive nor ranked. The list updates when the reading list does."}
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
                Writes poetry as <a className="colibri-link" href={COLIBRI_URL} target="_blank" rel="noopener noreferrer">al colibrí</a>. The art does not need to explain itself.
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
  const copy = PAGE_COPY.speaking || {};
  return (
    <article className="page page-speaking">
      <Inner first>
        <Grid>
          <Body>
            <p className="kicker">{copy.kicker || "Speaking & Consulting"}</p>
            <h1 className="page-title">{copy.title || "The conversations that need to happen."}</h1>
            <p className="lead">
              {copy.lead || "What follows are not paper abstracts. They are the talks a booker can actually put on a program. They have been workshopped on stages from Berlin to Toronto, and calibrated for rooms that contain both engineers and the people who pay them."}
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
              <span className="sh-num">·</span> {copy.workingTogetherHeading || "What working together looks like"}
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
        <div className="rb-head">{copy.ratesLabel || "Rates"}</div>
        <h2 className="rb-title">{copy.ratesTitle || "Listed, because guessing wastes everyone's time."}</h2>
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
              <span className="sh-num">·</span> {copy.calendarHeading || "Start a conversation"}
            </h2>
            <div className="cal-embed" aria-label="Calendar booking">
              <div className="cal-inner">
                <div className="cal-h">{copy.calendarTitle || "Book a 15-minute call"}</div>
                <p className="cal-lead">
                  {copy.calendarLead || "Pick a time that works — Calendly handles the rest. No back-and-forth."}
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
  const copy = PAGE_COPY.contact || {};
  return (
    <article className="page page-contact">
      <Inner first>
        <Grid>
          <Body>
            <p className="kicker">{copy.kicker || "Contact"}</p>
            <h1 className="page-title">{copy.title || "The shortest page."}</h1>

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
                  <a className="inline-link" href={BIO_PACK_URL}>Download bio &amp; headshot pack</a><br/>
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
  const shouldPushPath = useRef(false);

  const [page, setPage] = useState(() => {
    if (typeof window === "undefined") return "home";
    const pre = window.__INITIAL_PAGE__;
    if (pre && VALID_PAGES.includes(pre)) return pre;
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

  const goToPage = (nextPage) => {
    shouldPushPath.current = true;
    setPage(nextPage);
  };

  useEffect(() => {
    const newPath = page === "home" ? "/" : "/" + page;
    if (window.location.pathname !== newPath) {
      const method = shouldPushPath.current ? "pushState" : "replaceState";
      window.history[method](null, "", newPath);
    }
    shouldPushPath.current = false;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
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
  if (page === "home")                  pageEl = <Home setPage={goToPage} t={t} />;
  else if (page === "work")              pageEl = <WorkLanding t={t} setPage={goToPage} />;
  else if (page === "work/publications") pageEl = <WorkPublications t={t} setPage={goToPage} />;
  else if (page === "work/press")        pageEl = <WorkPress t={t} setPage={goToPage} />;
  else if (page === "work/projects")     pageEl = <WorkProjects t={t} setPage={goToPage} />;
  else if (page === "about")             pageEl = <About t={t} />;
  else if (page === "speaking")          pageEl = <Speaking t={t} />;
  else if (page === "contact")           pageEl = <Contact t={t} />;

  return (
    <div className="site" data-page={section} data-subpage={page}>
      <Header page={page} setPage={goToPage} t={t} />
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
