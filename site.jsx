// site.jsx — Jordan Loewen-Colón (Direction B: Caribbean night)
// Single-file React app. Five pages. SPA hash navigation.

const { useState, useEffect, useRef } = React;

// ─────────────────────────────────────────────────────────────────────────────
// Content
// ─────────────────────────────────────────────────────────────────────────────

const TALKS = [
  { n: "01", title: "Doing AI Differently", sub: "How organizations build technology while staying human.", len: "45–60 min · keynote or workshop" },
  { n: "02", title: "Empire 2.0", sub: "What business leaders need to know about AI, data extraction, and digital colonialism.", len: "45 min · keynote" },
  { n: "03", title: "Many Models, One World", sub: "Why culture, context, and meaning matter in responsible AI.", len: "30–45 min · keynote" },
  { n: "04", title: "Human–AI Ensembles", sub: "The future of work beyond automation and replacement.", len: "60 min · keynote + Q&A" },
  { n: "05", title: "Artificial Opportunity", sub: "Maintaining ethics, identity, and power in the age of artificial intelligence.", len: "45 min · keynote" },
];

const WORK = [
  { kind: "Essay",      date: "May 2025",  venue: "Harvard Business Review", title: "Research: Do LLMs Have Values?",
    note: "A field study on the values that show up when large language models are pressed. Co-authored.",
    href: "https://hbr.org/2025/05/research-do-llms-have-values" },
  { kind: "Talk",       date: "2025",      venue: "Data Natives · Berlin",  title: "Responsible Innovation: Hopes & Fears",
    note: "A facilitated public mapping of what people actually hope from AI and what they actually fear. The whiteboard is the deliverable.",
    img: "images/talk-whiteboard.jpg" },
  { kind: "Panel",      date: "2025",      venue: "Data Natives × EIE",     title: "Ethics in Entrepreneurship",
    note: "On what changes when an ethics conversation has to survive contact with a product roadmap.",
    img: "images/talk-panel.jpg" },
  { kind: "Policy",     date: "2024",      venue: "Aspen Institute",        title: "AI in Drug Development & Indigenous Knowledge",
    note: "Tech Policy Writing Fellowship. Bringing OCAP®, CARE, and Access-and-Benefit-Sharing into the same room as the model card." },
  { kind: "Book",       date: "Forthcoming", venue: "—",                    title: "Reality Technologies",
    note: "A book on AI, VR, and what it means to mistake the model for the world." },
  { kind: "Co-author",  date: "2024",      venue: "—",                      title: "Preventing AI Extractivism",
    note: "On human-AI ensembles that preserve agency, judgment, and interpretive depth." },
  { kind: "Venture",    date: "2022–24",   venue: "Supernova Immersives",   title: "Cofounder & CEO",
    note: "AI-augmented VR for mental health, informed by Internal Family Systems. Founder Institute; $1M+ valuation." },
  { kind: "Teaching",   date: "Ongoing",   venue: "Queen's University",     title: "Professor · AI, Ethics, and Policy",
    note: "12+ courses designed, 1,000+ student projects evaluated. The workshop for the important questions." },
];

// Lineages — Pending Jordan. Placeholders that read as a real set rather than lorem.
const LINEAGES = [
  { name: "Édouard Glissant",        meta: "Relation · opacity" },
  { name: "Sylvia Wynter",           meta: "On being human · 2003" },
  { name: "Marisol de la Cadena",    meta: "Earth beings · 2015" },
  { name: "Kim TallBear",            meta: "Native DNA · 2013" },
  { name: "Max Liboiron",            meta: "Pollution is colonialism · 2021" },
  { name: "Ruha Benjamin",           meta: "Race after technology · 2019" },
];

// Amendment 03.1 — consolidated Home recent stream.
const HOME_RECENT = [
  { kind: "Essay",   venue: "Harvard Business Review", date: "May 2025",
    title: "Research: Do LLMs Have Values?",
    href: "https://hbr.org/2025/05/research-do-llms-have-values", external: true },
  { kind: "Code",    venue: "Github", date: "2025",
    title: "BookBack: a public-domain reclamation against extractive scraping.",
    href: "https://github.com/jbloewencolon/BookBack", external: true },
  { kind: "Talk",    venue: "Syracuse University", date: "2026",
    title: "Artificial Opportunity: Universities are Doomed and the Humanities Can Save Them.",
    href: "#work/publications", page: "work/publications" },
  { kind: "Podcast", venue: "Pondering AI", date: "2025",
    title: "What Does AI Value? — with Kimberly Nevala",
    href: "https://www.youtube.com/watch?v=ZajcadLF_8I", external: true },
  { kind: "Paper",   venue: "AI & Society", date: "2026",
    title: "Preventing AI Extractivism",
    href: "https://link.springer.com/article/10.1007/s00146-026-02931-z", external: true },
];

// Affiliations — featured (with logos / monogram placeholders) + named text list.
const AFFILIATIONS_LOGOS = [
  { name: "Indigenous Values Initiative", short: "IVI",
    href: "https://indigenousvalues.org/",
    logo: "images/affil-ivi.webp",
  { name: "Nera Lake", short: "NL",
    href: "https://www.neralake.com/",
    logo: "images/affil-neralake.png",
  { name: "Candidly AI", short: "CA",
    href: "https://candidly-ai.com/about/",
    logo: "images/affil-candidly.png",
  { name: "Aspen Policy Academy (Tech)", short: "APA",
    href: "https://aspenpolicyacademy.org/tech/",
    logo: "images/affil-aspen.png",
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
            <a href={a.href} target="_blank" rel="noopener">
              <div className={"affil-logo" + (a.logo ? " has-img" : "")} aria-hidden="true">
                {a.logo
                  ? <img src={a.logo} alt="" loading="lazy" />
                  : <span className="affil-logo-placeholder">{a.short || a.name.split(" ").map((w) => w[0]).join("").slice(0, 3)}</span>}
              </div>
              <div className="affil-name">{a.name}</div>
              <div className="affil-descriptor">{a.descriptor}</div>
            </a>
          </li>
        ))}
      </ul>

      <p className="affil-also-label">Also affiliated with</p>
      <ul className="affil-text-list">
        {AFFILIATIONS_TEXT.map((a, i) => (
          <li key={a.name}>
            <a className="inline-link" href={a.href} target="_blank" rel="noopener">{a.name}</a>
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
  // variant: clay | bohio | sun | ink-lifted
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
      <header className="site-header">
        <a className="wordmark" href="#home" onClick={(e) => { e.preventDefault(); setPage("home"); }}>
          <span className="wm-first">Jordan</span>
          <span className="wm-second">Loewen-Colón</span>
        </a>
        <nav className="site-nav">
          {pages.map(([k, label]) => (
            <a key={k} href={"#" + k}
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
      {/* Huge wordmark — Brief 02 item 06 */}
      <header className="home-hero">
        <h1 className="home-name"><span className="wm-line">Jordan</span><span className="wm-line">Loewen-Colón</span></h1>
        <div className="home-subtitle">
          Indigenous Taíno technologist<br/>
          Responsible AI strategist
        </div>
      </header>

      {/* Clay epigraph band — Brief 02 item 05 */}
      <Band variant="clay" className="epigraph-band">
        <blockquote>
          <p ref={epigraphRef}>The task of perception entails pulverizing the world, but also one of spiritualizing its dust.</p>
          <cite>— Gilles Deleuze</cite>
        </blockquote>
      </Band>

      <Inner>
        <Grid>
          <Body>
            {t.homerecent === "separate" ? (
              <React.Fragment>
                <section className="home-section">
                  <h2 className="section-head"><span className="sh-num">01</span> Talks, this season</h2>
                  <ul className="talk-list">
                    {TALKS.slice(0, 3).map((talk) => (
                      <li key={talk.n} className="talk-item">
                        <a href="#speaking" onClick={(e) => { e.preventDefault(); setPage("speaking"); }}>
                          <span className="talk-num">{talk.n}</span>
                          <span className="talk-title">{talk.title}</span>
                          <span className="talk-sub">{talk.sub}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                  <a className="quiet-link" href="#speaking" onClick={(e) => { e.preventDefault(); setPage("speaking"); }}>
                    All five topics &nbsp;→
                  </a>
                </section>

                <section className="home-section">
                  <h2 className="section-head"><span className="sh-num">02</span> Recently</h2>
                  <ul className="recent-list">
                    <li>
                      <a href="https://hbr.org/2025/05/research-do-llms-have-values" target="_blank" rel="noopener">
                        <span className="r-kind">Essay · HBR ·</span> <span className="r-date">May 2025</span>
                        <span className="r-title">Research: Do LLMs Have Values?</span>
                      </a>
                    </li>
                    <li>
                      <a href="#work" onClick={(e) => { e.preventDefault(); setPage("work"); }}>
                        <span className="r-kind">Talk ·</span> <span className="r-date">2025</span>
                        <span className="r-title">Artificial Opportunity: Universities are Doomed and the Humanities Can Save Them.</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://link.springer.com/article/10.1007/s00146-026-02931-z" target="_blank" rel="noopener">
                        <span className="r-kind">Paper · AI & Society ·</span> <span className="r-date">2026</span>
                        <span className="r-title">Preventing AI Extractivism</span>
                      </a>
                    </li>
                  </ul>
                </section>

                <HomeRecentlyBuilt setPage={setPage} />
                <HomeInConversation setPage={setPage} />
              </React.Fragment>
            ) : (
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
                  <a className="quiet-link" href="#work/publications"
                     onClick={(e) => { e.preventDefault(); setPage("work/publications"); }}>
                    All writing &amp; talks →
                  </a>
                  <a className="quiet-link" href="#work/projects"
                     onClick={(e) => { e.preventDefault(); setPage("work/projects"); }}>
                    All projects →
                  </a>
                  <a className="quiet-link" href="#work/press"
                     onClick={(e) => { e.preventDefault(); setPage("work/press"); }}>
                    All press →
                  </a>
                </nav>
              </section>
            )}

            <HomeAffiliations n={t.homerecent === "separate" ? "05" : "02"} />

            <section className="home-section">
              <h2 className="section-head">
                <span className="sh-num">{t.homerecent === "separate" ? "06" : "03"}</span> Start a conversation
              </h2>
              <p className="lead">
                Booking, consulting, press, advisory. The fastest way is to{" "}
                <a className="inline-link" href="https://calendly.com/j-l-c" target="_blank" rel="noopener">put fifteen minutes on the calendar</a>{" "}
                or write to <a className="inline-link" href="mailto:jbl6@queensu.ca">jbl6@queensu.ca</a>.
              </p>
            </section>
          </Body>

          <Margin hidden={!t.marginalia}>
            <MarginNote tag="Upcoming · April 22">
              <figure className="mn-figure">
                <img src="images/talk-artificial-opportunity-flyer.png" alt="Artificial Opportunity — Tolley Professor keynote flyer." loading="lazy" />
                <figcaption><em>Artificial Opportunity</em> — William P. Tolley Distinguished Teaching Professor keynote. 4 pm, 204 Maxwell Hall, Syracuse.</figcaption>
              </figure>
            </MarginNote>
            <MarginNote tag="On view">
              Available for keynotes, workshops, advisory seats, and select consulting engagements through 2026.
            </MarginNote>
            <MarginNote tag="Based in">
              Toronto, Ontario · traveling for talks.
            </MarginNote>
            <MarginNote tag="Currently">
              Writing <em>Reality Technologies</em>. Teaching at Queen's. Developong tools for governance and standard setting.
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
// Work
// ─────────────────────────────────────────────────────────────────────────────

function Work({ t }) {
  return (
    <article className="page page-work">
      <Band variant="bohio" className="work-title-band">
        <div className="wt-kicker">Work</div>
        <h1>A stream, not three buckets.</h1>
      </Band>

      <Inner>
        <Grid>
          <Body>
            <p className="lead">
              Essays, talks, policy, ventures, teaching. Human Alignment Work.
            </p>

            <ol className="work-stream">
              {WORK.map((w, i) => (
                <li key={i} className="work-item">
                  <div className="wi-meta">
                    <span className="wi-kind">{w.kind}</span>
                    <span className="wi-date">{w.date}</span>
                  </div>
                  <div className="wi-main">
                    <div className="wi-venue">{w.venue}</div>
                    <h3 className="wi-title">
                      {w.href
                        ? <a href={w.href} target="_blank" rel="noopener">{w.title} <span className="ext">↗</span></a>
                        : w.title}
                    </h3>
                    <p className="wi-note">{w.note}</p>
                  </div>
                  {w.img && (
                    <div className="wi-figure">
                      <img src={w.img} alt="" loading="lazy" />
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </Body>

          <Margin hidden={!t.marginalia}>
            <MarginNote tag="How to read this">
              Items are tagged but not sorted by importance. The HBR essay and the whiteboard are doing
              different jobs; both jobs matter.
            </MarginNote>
            <MarginNote tag="On omissions">
              Conference papers, book chapters, and podcast appearances.
            </MarginNote>
            <TalkPhotoNotes />
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
      {/* Portrait band — ink-lifted ground; portrait left, title block right.
          Brief 02 items 11, 12. */}
      <Band variant="ink-lifted" className="about-portrait-band">
        <div className="apb-grid">
          <figure className="apb-figure">
            <img src="images/portrait-window.jpg" alt="Jordan Loewen-Colón, seated at a wooden table in front of a large industrial window." />
            <figcaption>Toronto, 2025. Photograph by Dan Campo.</figcaption>
          </figure>
          <div className="apb-text">
            <p className="kicker-double">Taíno · in the present tense <span className="pending" title="Pending Jordan sign-off">Pending</span></p>
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
              and open data. He has worked as a Tech Polic Fellow at the Aspen Institute, and drafted
              recommendations bringing OCAP® and the CARE Principles into conversation with
              Access-and-Benefit-Sharing protocols.
            </p>

            <p>
              At Queen's University he teaches AI, Ethics, and policy at the Smith School of Business and Department of Computing,
              designing more than twelve courses and evaluating over a thousand student projects.
              He recently is currently drafting the manuscript the for the forthcoming book <em>Reality Tecnologies</em>.
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
              <span className="pending" title="Pending Jordan sign-off">Pending</span>
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
            <h1 className="page-title">Five topics. One conversation.</h1>
            <p className="lead">
              What follows are not paper abstracts. They are the talks a booker can actually put on a
              program — workshopped on stages from Berlin to Toronto, calibrated for rooms that
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

      {/* Rates band — Brief 02 item 14 Option A: clay ground, huge Fraunces numbers */}
      <Band variant="clay" className="rates-band">
        <div className="rb-head">Rates <span className="pending" title="Pending Jordan sign-off">Pending</span></div>
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
                  rel="noopener"
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
            <p className="lead">
              Forms are how you tell serious people you do not want their email.
            </p>

            <dl className="contact-dl">
              <div>
                <dt>Email</dt>
                <dd><a className="inline-link" href="mailto:jbl6@queensu.ca">jbl6@queensu.ca</a></dd>
              </div>
              <div>
                <dt>LinkedIn</dt>
                <dd><a className="inline-link" href="https://www.linkedin.com/in/jordanloewencolon/" target="_blank" rel="noopener">/in/jordanloewencolon</a></dd>
              </div>
              <div>
                <dt>Calendar</dt>
                <dd><a className="inline-link" href="https://calendly.com/j-l-c" target="_blank" rel="noopener">calendly.com/j-l-c — fifteen-minute intro</a></dd>
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
// Footer — adds land acknowledgment + Taíno colophon word (Pending Jordan)
// ─────────────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="f-col">
          <div className="f-label">Land acknowledgment <span className="pending">Pending</span></div>
          <p className="land-ack">
            This site is maintained from Tkaronto (Toronto), Ontario, on the traditional territory of the
            Anishinaabe and Haudenosaunee peoples, and from across the Caribbean diaspora.
            Jordan writes as Taíno — a continuing people, not a closed chapter.
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
          <div><a href="https://www.linkedin.com/in/jordanloewencolon/" target="_blank" rel="noopener">LinkedIn</a></div>
          <div><a href="https://calendly.com/j-l-c" target="_blank" rel="noopener">Calendar</a></div>
        </div>
        <div className="f-col">
          <div className="f-label">Colophon <span className="pending">Pending</span></div>
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
  "workarch": "landing",
  "homeextras": "on",
  "navstyle": "grouped"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const VALID_PAGES = [
    "home", "work", "work/publications", "work/press", "work/projects",
    "about", "speaking", "contact"
  ];
  const [page, setPage] = useState(() => {
    const h = (window.location.hash || "").replace("#", "");
    return VALID_PAGES.includes(h) ? h : "home";
  });

  useEffect(() => {
    const onHash = () => {
      const h = (window.location.hash || "").replace("#", "");
      if (VALID_PAGES.includes(h)) setPage(h);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (window.location.hash !== "#" + page) {
      history.replaceState(null, "", "#" + page);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
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
    r.dataset.workarch = t.workarch;
    r.dataset.homeextras = t.homeextras;
    r.dataset.navstyle = t.navstyle;
  }, [t.mode, t.palette, t.stripe, t.display, t.namestyle, t.jstyle, t.uifont, t.bodyfont, t.workarch, t.homeextras, t.navstyle]);

  // Top-level section (for data-page on .site, which drives header stripe + margin-note colors)
  const section = page.split("/")[0];

  let pageEl = null;
  if (page === "home")                pageEl = <Home setPage={setPage} t={t} />;
  else if (page === "work")            pageEl = t.workarch === "flat" ? <WorkFlat t={t} /> : <WorkLanding t={t} setPage={setPage} />;
  else if (page === "work/publications") pageEl = <WorkPublications t={t} setPage={setPage} />;
  else if (page === "work/press")        pageEl = <WorkPress t={t} setPage={setPage} />;
  else if (page === "work/projects")     pageEl = <WorkProjects t={t} setPage={setPage} />;
  else if (page === "about")            pageEl = <About t={t} />;
  else if (page === "speaking")         pageEl = <Speaking t={t} />;
  else if (page === "contact")          pageEl = <Contact t={t} />;

  return (
    <div className="site" data-page={section} data-subpage={page}>
      <Header page={page} setPage={setPage} t={t} />
      <main key={page} className="site-main">{pageEl}</main>
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
        <TweakRadio label="Work" value={t.workarch}
                    options={["landing", "flat"]}
                    onChange={(v) => setTweak("workarch", v)} />
        <TweakRadio label="Nav" value={t.navstyle}
                    options={["grouped", "flat"]}
                    onChange={(v) => setTweak("navstyle", v)} />
        <TweakRadio label="Home extras" value={t.homeextras}
                    options={["on", "off"]}
                    onChange={(v) => setTweak("homeextras", v)} />
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
