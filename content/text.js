(function () {
  const main = {
    talks: [
      { n: "01", title: "Doing AI Differently", sub: "How orgs can build with AI while staying human.", len: "45-60 min · keynote or workshop" },
      { n: "02", title: "Empire 2.0", sub: "What business leaders need to know about AI, data extraction, and digital colonialism.", len: "45 min · keynote" },
      { n: "03", title: "Many Models, One World", sub: "Why culture, context, and meaning matter in responsible AI.", len: "30-45 min · keynote" },
      { n: "04", title: "Human-AI Ensembles", sub: "The future of work beyond automation and replacement.", len: "60 min · keynote + Q&A" },
      { n: "05", title: "Artificial Opportunity", sub: "The actual promises and problems of artificial intelligence.", len: "45 min · keynote" },
    ],
    homeRecent: [
      { kind: "Essay", venue: "Harvard Business Review", date: "May 2025", title: "Research: Do LLMs Have Values?", href: "https://hbr.org/2025/05/research-do-llms-have-values", external: true },
      { kind: "Code", venue: "Github", date: "2025", title: "BookBack: a public-domain reclamation against extractive scraping.", href: "https://github.com/jbloewencolon/BookBack", external: true },
      { kind: "Talk", venue: "Syracuse University", date: "2026", title: "Artificial Opportunity: Universities are Doomed and the Humanities Can Save Them.", href: "/work/publications", page: "work/publications" },
      { kind: "Podcast", venue: "Pondering AI", date: "2025", title: "What Does AI Value? — with Kimberly Nevala", href: "https://www.youtube.com/watch?v=ZajcadLF_8I", external: true },
      { kind: "Paper", venue: "AI & Society", date: "2026", title: "Preventing AI Extractivism", href: "https://link.springer.com/article/10.1007/s00146-026-02931-z", external: true },
    ],
    affiliationsLogos: [
      { name: "Indigenous Values Initiative", short: "IVI", href: "https://indigenousvalues.org/", logo: "images/affil-ivi.webp", w: 250, h: 250 },
      { name: "Nera Lake", short: "NL", href: "https://www.neralake.com/", logo: "images/affil-neralake.webp", w: 162, h: 172 },
      { name: "Candidly AI", short: "CA", href: "https://candidly-ai.com/about/", logo: "images/affil-candidly.webp", w: 158, h: 225 },
      { name: "Aspen Policy Academy (Tech)", short: "APA", href: "https://aspenpolicyacademy.org/tech/", logo: "images/affil-aspen.webp", w: 417, h: 237 },
    ],
    affiliationsText: [
      { name: "FASPE", full: "Fellowship at Auschwitz for the Study of Professional Ethics", href: "https://www.faspe-ethics.org/" },
      { name: "Smith School of Business, Queen's University", href: "https://smith.queensu.ca/" },
      { name: "Founder Institute", href: "https://fi.co/" },
      { name: "TIDEL", full: "Union Theological Seminary", href: "https://utsnyc.edu/tidel/" },
    ],
    lineages: [
      { name: "Édouard Glissant", meta: "Poetics of Relation · 1990" },
      { name: "Sylvia Wynter", meta: "On being human · 2003" },
      { name: "Katherine Hayles", meta: "How we became Posthuman · 1999" },
      { name: "Vine Deloria", meta: "God is Red · 1973" },
      { name: "Gilles Deleuze", meta: "Difference and Repetition · 1968" },
      { name: "Ruha Benjamin", meta: "Race after technology · 2019" },
    ],
  };

  const pages = {
    home: {
      nameLines: ["Jordan", "Loewen-Colón"],
      subtitleLines: ["Indigenous Taíno technologist", "Responsible AI strategist"],
      tagline: "I help organizations build AI practices they can stand behind — and make the hard trade-offs concrete enough to decide.",
      aiAltLabIntro: "Through the AI Alt Lab, I help governments, AI startups, and health teams get their data and AI governance ready for generative AI — before they ship, not after. Recent partners include the State of Utah and the City of Berkeley.",
      epigraph: "The task of perception entails pulverizing the world, but also one of spiritualizing its dust.",
      epigraphCite: "— Gilles Deleuze",
      recentHeading: "Recently",
      affiliationsHeading: "The Where and What of my Work",
      affiliationsLead: "Indigenous sovereignty, applied AI, policy training, universities, humanities ethics. Even though the rooms are different, some questions stay the same.",
      startHeading: "Start a conversation",
    },
    about: {
      kicker: "Taíno · in the present tense",
      title: "New worlds require new ways of seeing.",
      heroLead: "Jordan Loewen-Colón is an Indigenous Taíno technologist, Responsible AI strategist, scholar, educator, and organizational transformation consultant working at the intersection of artificial intelligence, culture, new media, and data justice.",
      intro: "The work moves across the lab, the classroom, the startup floor, and the policy arena, bringing technical fluency together with humanistic depth and a clear commitment to communities too often flattened by emerging technologies.",
      thinkingHeading: "Currently thinking about",
      lineagesHeading: "Lineages",
      lineagesIntro: "Names and texts my work answers to. Neither exhaustive nor ranked. The list updates when the reading list does.",
    },
    speaking: {
      kicker: "Speaking & Consulting",
      title: "The conversations that need to happen.",
      lead: "What follows are not paper abstracts. They are the talks a booker can actually put on a program. They have been workshopped on stages from Berlin to Toronto, and calibrated for rooms that contain both engineers and the people who pay them.",
      engagementHeading: "One practice, four ways in",
      engagementIntro: "A talk for the room that needs to think differently. A workshop for the team about to ship. An advisory retainer for the group governing AI over time. A scoped project for the single hard question — 'should we build this,' 'what do we owe the community whose data we use,' 'what policy survives the next model.'",
      workingTogetherHeading: "What working together looks like",
      ratesLabel: "Rates",
      ratesTitle: "Listed, because guessing wastes everyone's time.",
      calendarHeading: "Start a conversation",
      calendarTitle: "Book a 15-minute call",
      calendarLead: "Pick a time that works — Calendly handles the rest. No back-and-forth.",
    },
    contact: {
      kicker: "Contact",
      title: "The shortest page.",
    },
    work: {
      kicker: "Body of work",
      title: "A stream, not three buckets.",
      lead: "Essays, talks, policy, ventures, teaching, code, press — one practice, not seven buckets. In this lineage they answer to each other. Three doorways below.",
      publicationsKicker: "Publications & talks",
      publicationsTitle: "The paper trail.",
      publicationsLead: "Peer-reviewed work, book chapters, public writing, and selected talks. Most are linked; a few are forthcoming.",
      pressKicker: "In the conversation",
      pressTitle: "Press & media.",
      pressLead: "How the work travels. Podcasts, interviews, and media appearances where the arguments meet wider audiences.",
      projectsKicker: "Built in public",
      projectsTitle: "Projects & code.",
      projectsLead: "Working models, datasets, and tools. Most are in public; all are open to fork, critique, and conversation.",
      tiles: [
        { n: "01", to: "work/publications", title: "Publications & talks", accent: "clay", body: "Peer-reviewed essays, conference keynotes, invited panels. Twelve years of writing and speaking on AI ethics, Indigenous data justice, and the religious dimensions of technology." },
        { n: "02", to: "work/press", title: "Press & media", accent: "sun", body: "Podcast appearances, journalist interviews, op-eds. The work as it lands outside the academy." },
        { n: "03", to: "work/projects", title: "Projects & code", accent: "shell", body: "Technical AI and data-science projects. Tools, datasets, and working models built in public." },
      ],
    },
  };

  globalThis.SITE_TEXT = { main, pages };
})();
