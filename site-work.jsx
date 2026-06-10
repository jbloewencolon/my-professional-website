// site-work.jsx — Work landing + Publications / Press / Projects sub-pages.
// Components are exported to window so site.jsx can use them.

const { useState: useStateW } = React;

// ─────────────────────────────────────────────────────────────────────────────
// Content
// ─────────────────────────────────────────────────────────────────────────────

const PUBLICATIONS = [
  { year: "2026", title: "AI and Personal Values: An Alignment Problem.", venue: "AI and Ethics, Springer.", status: "in preparation" },
  { year: "2026", title: "Preventing AI Extractivism: The Case for Braiding Indigenous Data Justice with ABS for Stronger AI Data Governance.", venue: "AI and Indigenous Studies, Springer Special Issue.", authors: "With M. Schulz.",
    href: "https://link.springer.com/article/10.1007/s00146-026-02931-z" },
  { year: "2024", title: "Virtual Memory, Real Power: How Memes Resist Data Colonialism.", venue: "Convergence: The International Journal of Research into New Media Technologies.", authors: "With A. Smith.",
    href: "https://journals.sagepub.com/doi/abs/10.1177/13548565241262421" },
  { year: "2023", title: "The Age of (the Algorithmic) Aquarius: How AI Meets Our Esoteric Needs.", venue: "Journal for the American Academy of Religion, Special Issue.", authors: "With S. Mosurinjohn.",
    href: "https://muse.jhu.edu/pub/3/article/916429" },
  { year: "2022", title: "Fabulation, Machine Agents, and Spiritually Authorizing Encounters.", venue: "Religions, special issue.", authors: "With S. Mosurinjohn.",
    href: "https://www.mdpi.com/2077-1444/13/4/333" },
  { year: "2021", title: "Revisiting Teaching and Games: mapping out ecosystems of learning.", venue: "Gamevironments, University of Bremen.", authors: "With B. Marklund and M. Saridaki.",
    href: "https://journals.suub.uni-bremen.de/index.php/gamevironments/article/view/144" },
  { year: "2019", title: "Death, Fabulation, and Virtual Reality Gaming.", venue: "Gamevironments, No. 9, 202–221. University of Bremen.",
    href: "https://media.suub.uni-bremen.de/handle/elib/3494" },
  { year: "2015", title: "On Being Made Stupid: Developing a Religious Ethic of Anti-Propaganda.", venue: "The Journal for the Fellowship at Auschwitz for the Study of Professional Ethics (FASPE).",
    href: "https://www.academia.edu/10269683" },
];

const BOOK_CHAPTERS = [
  { year: "2025", title: "Virtual Reality and the Vulnerability of the Self: A Critical Analysis of Self-Hacking.", venue: "In Security of the Self, a SSHRC-funded project.", authors: "With A. Amarasingam and S. Mosurinjohn.",
    href: "https://press.uottawa.ca/en/9780776645612/the-security-of-self/" },
  { year: "2024", title: "“We Will Always Burn the Man”: The Ecstatic Moment of Burning Man VR.", venue: "Bloomsbury Handbook of Ecstatic Religion. Bloomsbury Press.", authors: "With A. Amarasingam and S. Mosurinjohn.",
    href: "https://www.bloomsbury.com/ca/bloomsbury-handbook-of-religious-ecstasy-9781350346994/" },
];

const PUBLIC_WRITING = [
  { year: "2025", title: "Do LLMs Have Values?", venue: "Harvard Business Review.",
    href: "https://hbr.org/2025/05/research-do-llms-have-values" },
  { year: "2025", title: "AI tools promise efficiency at work, but they can erode trust, creativity and agency.", venue: "The Conversation.",
    href: "https://theconversation.com/ai-tools-promise-efficiency-at-work-264865" },
];

const TALKS_ALL = [
  { year: "2026", title: "Artificial Opportunity: Universities are Doomed and the Humanities Can Save Them.", venue: "Syracuse Humanities Tolley Professor Keynote. Syracuse, NY." },
  { year: "2026", title: "Data Res Nullius: The Doctrine of Discovery in the Age of AI.", venue: "US Indigenous Data Sovereignty and Governance Summit. Tucson, AZ." },
  { year: "2025", title: "Responsible Innovation: Hopes & Fears.", venue: "Data Natives. Berlin.", img: "images/talk-whiteboard.webp" },
  { year: "2025", title: "Ethics in Entrepreneurship.", venue: "Data Natives × EIE. Berlin.", img: "images/talk-panel.webp" },
  { year: "2025", title: "Decolonizing AI: Nesting Access Benefit Sharing and Indigenous Data Justice.", venue: "Sustainable AI Conference. University of Bonn, Germany." },
  { year: "2025", title: "Working Across Sectors: Film, Gaming, and AI.", venue: "The Latin Forum, Listo Calisto. Toronto." },
  { year: "2025", title: "Let's Explore the Alignment Problem — What Do AIs Value?", venue: "Techqueria. New York." },
  { year: "2025", title: "Data Leadership and Ethics Amidst Uncertainty: Navigating Governance, Innovation, and Responsibility.", venue: "Big Data & Analytics Summit. Toronto." },
  { year: "2023", title: "Welcomed with Open Arms: A Data Justice Warning from Taíno History.", venue: "The Religious Origins of White Supremacy: Doctrine of Christian Discovery conference. Syracuse University." },
  { year: "2023", title: "AI and Psychedelic Health Sciences: Designing a Data-Augmented Trip Report Generator.", venue: "Practical Big Data Workshop. University of Michigan, Ann Arbor." },
  { year: "2022", title: "Decolonizing Design with New Media Art: The Doctrine of Discovery Podcast and VR Game.", venue: "Indigenous Religious Traditions Unit, American Academy of Religion. Denver." },
  { year: "2022", title: "How, Why, Should We Digital Twin?: Experiencing AI in Healthcare.", venue: "Center for Health and Innovation Symposium, Queen's University. Kingston." },
  { year: "2022", title: "“We Will Always Burn the Man”: Taking the Ecstatic Moment of Burning Man into VR.", venue: "American Academy of Religion. Denver." },
  { year: "2022", title: "Simulating Empathy with Spiritual AI.", venue: "Society for Literature, Science and the Arts. Purdue University." },
  { year: "2021", title: "Robot Priests, Virtual Freuds, and Technodelics: A Theoretical Framework for Coupling AI and VR.", venue: "Artificial Intelligence and Religion Seminar, American Academy of Religion. San Antonio." },
];

const PRESS_ALL = [
  { year: "2025", type: "PODCAST", title: "What Does AI Value?", venue: "Pondering AI Podcast, hosted by Kimberly Nevala.",
    href: "https://www.youtube.com/watch?v=ZajcadLF_8I" },
  { year: "2025", type: "FEATURE", title: "The Culture Clash with AI Bots.", venue: "Smith Business Insight, Queen's University.",
    href: "https://smith.queensu.ca/insight/content/the-culture-clash-with-AI-bots.php" },
  { year: "2025", type: "FEATURE", title: "Utah Partnered with a Nonprofit to Boost Its AI Governance.", venue: "StateScoop.",
    href: "https://statescoop.com/utah-aspen-institute-policy-academy-ai-governance/" },
  { year: "2024", type: "INTERVIEW", title: "Data Ethics, Religion, and Gaming: Meet Jordan Loewen-Colón.", venue: "Queen's University Graduate Research Spotlight.",
    href: "https://www.queensu.ca/grad-postdoc/research/research-spotlights/data-ethics-religion-and-gaming-meet-jordan-loewen-colon" },
  { year: "2024", type: "INTERVIEW", title: "Innovation in Motion: The AI Revolution — Transforming Health.", venue: "Centre for Entrepreneurship, Innovation & Social Impact, Smith School of Business.",
    href: "https://www.investkingston.ca/event/innovation-in-motion-the-ai-revolution-transforming-health/" },
  { year: "2023", type: "PODCAST", title: "The Responsible Use of AI Podcast.", venue: "Queen's University Centre for Health Innovation.",
    href: "https://open.spotify.com/show/5DIpaizqQEtr1GHpaaHmZz" },
  { year: "2023", type: "PROJECT", title: "The Digital Cancer Twin Project — Podcast and Digital Humanities Archive.", venue: "Queen's University, Center for Health Innovation. Writer & producer.",
    href: "https://www.queensu.ca/health-innovation/digital-cancer-twin-project/" },
  { year: "2022", type: "PODCAST", title: "“Realities (Altered & Virtual) | Discourse!”", venue: "The Religious Studies Project. Guest scholar.",
    href: "https://www.religiousstudiesproject.com/podcast/discourse-november-2022/" },
];

const PROJECTS_ALL = [
  { n: 1, title: "BookBack — Reclaim the Commons", kind: "Public-domain reclamation project",
    tags: ["Indigenous Data", "Data Justice", "Provenance"],
    body: "A project for restoring public-domain works to public access in the face of extractive scraping. Built around the principle that AI training data should honor provenance, not erase it.",
    href: "https://github.com/jbloewencolon/BookBack" },
  { n: 2, title: "The Demographics of Faerûn", kind: "D&D dataset for data-science education",
    tags: ["Data Science Education", "Tabletop Gaming", "Synthetic Data"],
    body: "A dynamic fictional dataset built on the Forgotten Realms setting, designed to make data-science pedagogy more engaging and immersive. Used in classroom contexts to teach analysis, visualization, and modeling.",
    href: "https://github.com/jbloewencolon/Creating-Dataset-for-The-Demographics-of-Faerun/" },
  { n: 3, title: "Psychedelic Trip Report LLM", kind: "Large-language-model research tool",
    tags: ["NLP", "LLM", "Health Research"],
    body: "Built on 70,000 entries from the Erowid dataset, this tool uses large language models to assess subjective elements in psychedelic experiences. Designed with applications in synthetic drug discovery and qualitative health research.",
    href: "https://github.com/jbloewencolon/Psychedelic-Trip-Report-Text-Generator" },
  { n: 4, title: "Video Game Review Analysis Tool", kind: "Sentiment analysis & classification",
    tags: ["NLP", "Sentiment Analysis", "Gaming"],
    body: "A sentiment-analysis tool trained on 30,000 Steam reviews for Hades by Supergiant Games. Combines unsupervised learning and multi-class classification to surface patterns in player feedback.",
    href: "https://github.com/jbloewencolon/Steam-Game-Review-Sentiment-Analysis" },
  { n: 5, title: "Personality & Psychedelic Use Analysis", kind: "Behavioral data analysis",
    tags: ["Statistics", "Psychology", "Drug Research"],
    body: "An analysis of the correlation between the 'Openness to experience' personality factor and psychedelic drug use. Designed to aid researchers and companies in identifying participants for research studies.",
    href: "https://github.com/jbloewencolon/Predicting-Personality-and-Psychedelic-Experience" },
];

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
  return (
    <section className={"pub-group accent-" + accent}>
      <header className="pg-head">
        <h3 className="pg-title">{heading}</h3>
        <span className="pg-count">— {items.length}</span>
      </header>
      <ul className="pub-list">
        {visible.map((p, i) => (
          heading === "Selected talks"
            ? <TalkItem key={i} p={p} />
            : <PubItem key={i} p={p} italicTitle={italicTitle} />
        ))}
      </ul>
      {canToggle && (
        <button className="pg-toggle" onClick={() => setOpen(!open)}>
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
  const tiles = [
    { n: "01", to: "work/publications", title: "Publications & talks", accent: "clay",
      body: "Peer-reviewed essays, conference keynotes, invited panels. Twelve years of writing and speaking on AI ethics, Indigenous data justice, and the religious dimensions of technology." },
    { n: "02", to: "work/press", title: "Press & media", accent: "sun",
      body: "Podcast appearances, journalist interviews, op-eds. The work as it lands outside the academy." },
    { n: "03", to: "work/projects", title: "Projects & code", accent: "shell",
      body: "Technical AI and data-science projects. Tools, datasets, and working models built in public." },
  ];
  return (
    <article className="page page-work-landing">
      <section className="band band-bohio work-title-band">
        <div className="band-inner">
          <div className="wt-kicker">Body of work</div>
          <h1>A stream, not three buckets.</h1>
        </div>
      </section>

      <div className="page-inner">
        <div className="grid">
          <div className="grid-body">
            <p className="lead">
              Essays, talks, policy, ventures, teaching, code, press — one practice, not seven
              buckets. In this lineage they answer to each other. Three doorways below.
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
          <div className="wt-kicker">Publications &amp; talks</div>
          <h1>The paper trail.</h1>
        </div>
      </section>

      <div className="page-inner">
        <div className="grid">
          <div className="grid-body">
            <p className="lead">
              Peer-reviewed work, book chapters, public writing, and selected talks. Most are linked;
              a few are forthcoming.
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
          <div className="wt-kicker dark">In the conversation</div>
          <h1 className="dark">Press &amp; media.</h1>
        </div>
      </section>

      <div className="page-inner">
        <div className="grid">
          <div className="grid-body">
            <p className="lead">
              How the work travels. Podcasts, interviews, and media appearances where the arguments
              meet wider audiences.
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
          <div className="wt-kicker dark">Built in public</div>
          <h1 className="dark">Projects &amp; code.</h1>
        </div>
      </section>

      <div className="page-inner">
        <div className="grid">
          <div className="grid-body">
            <p className="lead">
              Working models, datasets, and tools. Most are in public; all are open to fork,
              critique, and conversation.
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
