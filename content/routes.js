(function () {
  const routes = [
    {
      key: "home",
      path: "/",
      title: "Jordan Loewen-Colón — Responsible AI Strategist",
      browserTitle: "Jordan Loewen-Colón",
      desc: "Indigenous Taíno technologist and Responsible AI strategist. Available for keynotes, workshops, and advisory on AI ethics and data justice.",
      portrait: true,
      navLabel: "Home",
      primaryNav: true,
      flatNav: true,
    },
    {
      key: "work",
      path: "/work",
      title: "Work — Jordan Loewen-Colón",
      desc: "Publications, talks, press, and projects on AI ethics, Indigenous data sovereignty, and responsible technology.",
      portrait: false,
      navLabel: "Work",
      primaryNav: true,
    },
    {
      key: "work/publications",
      path: "/work/publications",
      title: "Publications & Talks — Jordan Loewen-Colón",
      desc: "Peer-reviewed essays, book chapters, public writing, and conference talks on AI ethics, Indigenous data justice, and technology.",
      portrait: false,
      navLabel: "Writing",
      flatNav: true,
    },
    {
      key: "work/press",
      path: "/work/press",
      title: "Press & Media — Jordan Loewen-Colón",
      desc: "Podcast appearances, journalist interviews, and media coverage of Jordan Loewen-Colón's work in responsible AI and Indigenous data sovereignty.",
      portrait: false,
      navLabel: "Press",
      flatNav: true,
    },
    {
      key: "work/projects",
      path: "/work/projects",
      title: "Projects & Code — Jordan Loewen-Colón",
      desc: "Technical AI and data-science projects including BookBack, psychedelic health research tools, and educational datasets.",
      portrait: false,
      navLabel: "Projects",
      flatNav: true,
    },
    {
      key: "about",
      path: "/about",
      title: "About — Jordan Loewen-Colón",
      desc: "Jordan Loewen-Colón is an Indigenous Taíno technologist and Responsible AI strategist teaching AI ethics and policy at Queen's University.",
      portrait: true,
      navLabel: "About",
      primaryNav: true,
      flatNav: true,
    },
    {
      key: "speaking",
      path: "/speaking",
      title: "Speaking & Consulting — Jordan Loewen-Colón",
      desc: "Keynotes, workshops, advisory, and consulting on responsible AI, Indigenous data justice, and AI ethics. Rates listed.",
      portrait: false,
      navLabel: "Speaking & Consulting",
      flatNavLabel: "Speaking",
      primaryNav: true,
      flatNav: true,
    },
    {
      key: "contact",
      path: "/contact",
      title: "Contact — Jordan Loewen-Colón",
      desc: "Book a keynote, start a consulting engagement, or reach out for press and advisory inquiries.",
      portrait: false,
      navLabel: "Contact",
      primaryNav: true,
      flatNav: true,
    },
  ];

  globalThis.SITE_ROUTES = routes;
  globalThis.SITE_ROUTE_BY_KEY = Object.fromEntries(routes.map((route) => [route.key, route]));
  globalThis.SITE_VALID_PAGES = routes.map((route) => route.key);
  globalThis.SITE_PAGE_TITLES = Object.fromEntries(
    routes.map((route) => [route.key, route.browserTitle || route.title])
  );
})();
