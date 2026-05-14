// site-print.jsx — render every page of the site stacked into one document,
// for printing to PDF.

(function () {
  const t = Object.assign({}, window.TWEAK_DEFAULTS, {
    marginalia: false,   // collapses to below content in print anyway; suppressing keeps each page tighter
  });
  const noop = () => {};

  const pages = [
    { id: "home",            section: "home",     label: "Home",                       el: <Home setPage={noop} t={t} /> },
    { id: "work-landing",    section: "work",     label: "Work",                       el: <WorkLanding t={t} setPage={noop} /> },
    { id: "work-pubs",       section: "work",     label: "Publications & Talks",       el: <WorkPublications t={t} setPage={noop} /> },
    { id: "work-press",      section: "work",     label: "Press & Media",              el: <WorkPress t={t} setPage={noop} /> },
    { id: "work-projects",   section: "work",     label: "Projects & Code",            el: <WorkProjects t={t} setPage={noop} /> },
    { id: "about",           section: "about",    label: "About",                      el: <About t={t} /> },
    { id: "speaking",        section: "speaking", label: "Speaking & Consulting",      el: <Speaking t={t} /> },
    { id: "contact",         section: "contact",  label: "Contact",                    el: <Contact t={t} /> },
  ];

  function PrintDocument() {
    return (
      <React.Fragment>
        {pages.map((p, i) => (
          <div key={p.id}
               className="site print-section"
               data-page={p.section}
               data-print-index={i + 1}>
            <main className="site-main">{p.el}</main>
          </div>
        ))}
        {/* One footer at the very end, like a colophon page */}
        <div className="site print-section print-footer-wrap" data-page="contact">
          <Footer />
        </div>
      </React.Fragment>
    );
  }

  // Render
  ReactDOM.createRoot(document.getElementById("print-root")).render(<PrintDocument />);

  // Auto-print once fonts are ready and React has finished mounting.
  Promise.all([
    document.fonts ? document.fonts.ready : Promise.resolve(),
    new Promise((r) => setTimeout(r, 1500)),
  ]).then(() => {
    window.print();
  });
})();
