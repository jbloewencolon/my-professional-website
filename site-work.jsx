// site-work.jsx — Work landing + Publications / Press / Projects sub-pages.
// Components are exported to window so site.jsx can use them.

const { useState: useStateW } = React;
const WORK_PAGE_COPY = ((globalThis.SITE_TEXT || {}).pages || {}).work || {};

// ─────────────────────────────────────────────────────────────────────────────
// Content
// ─────────────────────────────────────────────────────────────────────────────

const WORK_CONTENT = globalThis.SITE_WORK_CONTENT || {};
const PUBLICATIONS = WORK_CONTENT.publications || [];
const BOOK_CHAPTERS = WORK_CONTENT.bookChapters || [];
const PUBLIC_WRITING = WORK_CONTENT.publicWriting || [];
const TALKS_ALL = WORK_CONTENT.talks || [];
const PRESS_ALL = WORK_CONTENT.press || [];
const PROJECTS_ALL = WORK_CONTENT.projects || [];

// ─────────────────────────────────────────────────────────────────────────────
// Secondary nav (visible on all three sub-pages)
// ─────────────────────────────────────────────────────────────────────────────

function WorkSubnav({ active, setPage }) {
  const items = [
    ["work/publications", "Publications & talks"],
    ["work/press",        "Press & media"],
    ["work/projects",     "Projects & code"],
  ];
  return (
    <nav className="work-subnav" aria-label="Work sub-sections">
      <a className="ws-back" href="/work"
         onClick={(e) => { e.preventDefault(); setPage("work"); }}>← Work</a>
      <div className="ws-sep" aria-hidden="true">/</div>
      {items.map(([k, label], i) => (
        <React.Fragment key={k}>
          {i > 0 && <span className="ws-dot" aria-hidden="true">·</span>}
          <a href={"/" + k}
             className={"ws-link " + (active === k ? "is-active" : "")}
             aria-current={active === k ? "page" : undefined}
             onClick={(e) => { e.preventDefault(); setPage(k); }}>
            {label}
          </a>
        </React.Fragment>
      ))}
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Reusable item rows
// ─────────────────────────────────────────────────────────────────────────────

function PubItem({ p, italicTitle = true }) {
  const TitleTag = "span";
  return (
    <li className="pub-item">
      <div className="pi-year">{p.year}</div>
      <div className="pi-main">
        <h4 className={"pi-title " + (italicTitle ? "is-italic" : "")}>
          {p.href
            ? <a href={p.href} target="_blank" rel="noopener noreferrer">{p.title}<span className="ext"> ↗</span></a>
            : <TitleTag>{p.title}</TitleTag>}
          {p.status && <span className="pi-status">{p.status}</span>}
        </h4>
        <div className="pi-venue">{p.venue}</div>
        {p.authors && <div className="pi-authors">{p.authors}</div>}
      </div>
    </li>
  );
}

function TalkPhotoNotes() {
  return (
    <React.Fragment>
      <div className="margin-note">
        <div className="mn-tag">Berlin · 2025</div>
        <figure className="mn-figure">
          <img src="images/talk-whiteboard.webp" alt="Jordan Loewen-Colón at the whiteboard during Responsible Innovation: Hopes &amp; Fears at Data Natives Berlin." width="1600" height="1068" loading="lazy" decoding="async" />
          <figcaption><em>Responsible Innovation: Hopes &amp; Fears.</em> Data Natives.</figcaption>
        </figure>
      </div>
      <div className="margin-note">
        <div className="mn-tag">Berlin · 2025</div>
        <figure className="mn-figure">
          <img src="images/talk-panel.webp" alt="Jordan Loewen-Colón on a panel at Ethics in Entrepreneurship, Data Natives Berlin." width="1600" height="1068" loading="lazy" decoding="async" />
          <figcaption><em>Ethics in Entrepreneurship.</em> Data Natives × EIE.</figcaption>
        </figure>
      </div>
    </React.Fragment>
  );
}

function TalkItem({ p }) {
  return (
    <li className="pub-item">
      <div className="pi-year">{p.year}</div>
      <div className="pi-main">
        <h4 className="pi-title is-italic">{p.title}</h4>
        <div className="pi-venue">{p.venue}</div>
      </div>
    </li>
  );
}

function PressItem({ p, tagColor = "sun" }) {
  return (
    <li className="press-item">
      <div className="pr-year">{p.year}</div>
      <div className={"pr-type pr-type-" + tagColor}>{p.type}</div>
      <div className="pr-main">
        <h4 className="pr-title">
          {p.href
            ? <a href={p.href} target="_blank" rel="noopener noreferrer">{p.title}<span className="ext"> ↗</span></a>
            : p.title}
        </h4>
        <div className="pr-venue">{p.venue}</div>
      </div>
    </li>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Expandable group
// ─────────────────────────────────────────────────────────────────────────────

function PubGroup({ heading, items, accent = "clay", italicTitle = true, defaultShow = 3, itemKindNoun = "publications" }) {
  const [open, setOpen] = useStateW(false);
  const visible = open ? items : items.slice(0, defaultShow);
  const canToggle = items.length > defaultShow;
  const listId = "pub-group-" + heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return (
    <section className={"pub-group accent-" + accent}>
      <header className="pg-head">
        <h3 className="pg-title">{heading}</h3>
        <span className="pg-count">— {items.length}</span>
      </header>
      <ul id={listId} className="pub-list">
        {visible.map((p, i) => (
          heading === "Selected talks"
            ? <TalkItem key={i} p={p} />
            : <PubItem key={i} p={p} italicTitle={italicTitle} />
        ))}
      </ul>
      {canToggle && (
        <button type="button"
                className="pg-toggle"
                aria-expanded={open}
                aria-controls={listId}
                onClick={() => setOpen(!open)}>
          {open
            ? <React.Fragment>Collapse <span aria-hidden="true">▴</span></React.Fragment>
            : <React.Fragment>View all {items.length} {itemKindNoun} <span aria-hidden="true">▾</span></React.Fragment>}
        </button>
      )}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Work landing — three tiles
// ─────────────────────────────────────────────────────────────────────────────

function WorkLanding({ t, setPage }) {
  const tiles = WORK_PAGE_COPY.tiles || [];
  return (
    <article className="page page-work-landing">
      <section className="band band-bohio work-title-band">
        <div className="band-inner">
          <div className="wt-kicker">{WORK_PAGE_COPY.kicker || "Body of work"}</div>
          <h1>{WORK_PAGE_COPY.title || "A stream, not three buckets."}</h1>
        </div>
      </section>

      <div className="page-inner">
        <div className="grid">
          <div className="grid-body">
            <p className="lead">
              {WORK_PAGE_COPY.lead || "Essays, talks, policy, ventures, teaching, code, press — one practice, but multiple outputs. In this lineage they answer to each other. Three categories below."}
            </p>

            <div className="work-tiles">
              {tiles.map((tile) => (
                <a key={tile.to}
                   className={"work-tile accent-" + tile.accent}
                   href={"/" + tile.to}
                   onClick={(e) => { e.preventDefault(); setPage(tile.to); }}>
                  <div className="wt-n">{tile.n}</div>
                  <h3 className="wt-title">{tile.title}</h3>
                  <p className="wt-body">{tile.body}</p>
                  <span className="wt-enter">→ Enter</span>
                </a>
              ))}
            </div>
          </div>

          {t.marginalia && (
            <aside className="grid-margin">
              <div className="margin-note">
                <div className="mn-tag">How to read this</div>
                <div className="mn-body">Items inside each room are tagged but not sorted by importance. The HBR essay, the whiteboard, the dataset — different jobs, all the work.</div>
              </div>
              <div className="margin-note">
                <div className="mn-tag">On omissions</div>
                <div className="mn-body">Conference papers and a long tail of teaching artifacts live on the CV. They are not the work; they are the receipt.</div>
              </div>
              <TalkPhotoNotes />
            </aside>
          )}
        </div>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Publications & talks sub-page
// ─────────────────────────────────────────────────────────────────────────────

function WorkPublications({ t, setPage }) {
  return (
    <article className="page page-work-sub page-publications">
      <section className="band band-bohio work-title-band">
        <div className="band-inner">
          <WorkSubnav active="work/publications" setPage={setPage} />
          <div className="wt-kicker">{WORK_PAGE_COPY.publicationsKicker || "Publications & talks"}</div>
          <h1>{WORK_PAGE_COPY.publicationsTitle || "The paper trail."}</h1>
        </div>
      </section>

      <div className="page-inner">
        <div className="grid">
          <div className="grid-body">
            <p className="lead">
              {WORK_PAGE_COPY.publicationsLead || "Peer-reviewed work, book chapters, public writing, and selected talks. Most are linked; a few are forthcoming."}
            </p>

            <PubGroup heading="Peer-reviewed publications" items={PUBLICATIONS} accent="clay" defaultShow={3} itemKindNoun="publications" />
            <PubGroup heading="Book chapters"            items={BOOK_CHAPTERS} accent="sun"  defaultShow={2} italicTitle={false} itemKindNoun="chapters" />
            <PubGroup heading="Public writing"           items={PUBLIC_WRITING} accent="clay" defaultShow={2} itemKindNoun="essays" />
            <PubGroup heading="Selected talks"           items={TALKS_ALL}      accent="bohio" defaultShow={5} itemKindNoun="talks" />
          </div>

          {t.marginalia && (
            <aside className="grid-margin">
              <div className="margin-note">
                <div className="mn-tag">By the count</div>
                <div className="mn-body">8 peer-reviewed · 2 book chapters · 2 public essays · 15 talks since 2021.</div>
              </div>
              <div className="margin-note">
                <div className="mn-tag">Citation style</div>
                <div className="mn-body">Year-first, venue-italic, co-authors named where present.</div>
              </div>
              <TalkPhotoNotes />
            </aside>
          )}
        </div>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Press & media sub-page
// ─────────────────────────────────────────────────────────────────────────────

function WorkPress({ t, setPage }) {
  return (
    <article className="page page-work-sub page-press">
      <section className="band band-sun work-title-band">
        <div className="band-inner">
          <WorkSubnav active="work/press" setPage={setPage} variant="dark" />
          <div className="wt-kicker dark">{WORK_PAGE_COPY.pressKicker || "In the conversation"}</div>
          <h1 className="dark">{WORK_PAGE_COPY.pressTitle || "Press & media."}</h1>
        </div>
      </section>

      <div className="page-inner">
        <div className="grid">
          <div className="grid-body">
            <p className="lead">
              {WORK_PAGE_COPY.pressLead || "How the work travels. Podcasts, interviews, and media appearances where the arguments meet wider audiences."}
            </p>

            <ul className="press-list">
              {PRESS_ALL.map((p, i) => <PressItem key={i} p={p} tagColor="sun" />)}
            </ul>
          </div>

          {t.marginalia && (
            <aside className="grid-margin">
              <div className="margin-note">
                <div className="mn-tag">Pitch a show</div>
                <div className="mn-body">Open to podcast, panel, and on-the-record interview requests. Write to <a className="inline-link" href="mailto:jbl6@queensu.ca">jbl6@queensu.ca</a>.</div>
              </div>
              <div className="margin-note">
                <div className="mn-tag">Quoting</div>
                <div className="mn-body">Bio &amp; headshot pack on the Contact page. Press inquiries get a 24-hour response, weekdays.</div>
              </div>
              <TalkPhotoNotes />
            </aside>
          )}
        </div>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Projects & code sub-page
// ─────────────────────────────────────────────────────────────────────────────

function WorkProjects({ t, setPage }) {
  return (
    <article className="page page-work-sub page-projects">
      <section className="band band-shell work-title-band">
        <div className="band-inner">
          <WorkSubnav active="work/projects" setPage={setPage} variant="dark" />
          <div className="wt-kicker dark">{WORK_PAGE_COPY.projectsKicker || "Built in public"}</div>
          <h1 className="dark">{WORK_PAGE_COPY.projectsTitle || "Projects & code."}</h1>
        </div>
      </section>

      <div className="page-inner">
        <div className="grid">
          <div className="grid-body">
            <p className="lead">
              {WORK_PAGE_COPY.projectsLead || "Working models, datasets, and tools. Most are in public; all are open to fork, critique, and conversation."}
            </p>

            <ol className="project-list">
              {PROJECTS_ALL.map((proj, i) => (
                <li key={i} className="project-card">
                  <div className="pc-n">{String(proj.n).padStart(2, "0")}</div>
                  <div className="pc-main">
                    <h3 className="pc-title">{proj.title}</h3>
                    <div className="pc-kind">{proj.kind}</div>
                    <ul className="pc-tags">
                      {proj.tags.map((tag) => <li key={tag} className="pc-tag">{tag}</li>)}
                    </ul>
                    <p className="pc-body">{proj.body}</p>
                    <a className="pc-link" href={proj.href} target="_blank" rel="noopener noreferrer">
                      View on GitHub <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </li>
              ))}
            </ol>

            <div className="github-foot">
              <a className="inline-link" href="https://github.com/jbloewencolon" target="_blank" rel="noopener noreferrer">
                View full profile on GitHub ↗
              </a>
            </div>
          </div>

          {t.marginalia && (
            <aside className="grid-margin">
              <div className="margin-note">
                <div className="mn-tag">A note on what's missing</div>
                <div className="mn-body">Internal client work and student projects are not listed; some live on private repos.</div>
              </div>
              <div className="margin-note">
                <div className="mn-tag">Collaborate</div>
                <div className="mn-body">Open to research partnerships on data justice, NLP, and humanities-of-AI projects. Reach out.</div>
              </div>
              <TalkPhotoNotes />
            </aside>
          )}
        </div>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Export to window
// ─────────────────────────────────────────────────────────────────────────────

Object.assign(window, {
  WorkLanding, WorkPublications, WorkPress, WorkProjects,
  TalkPhotoNotes,
});
