// Header, footer y transición entre páginas — compartido por todas las páginas.
(function () {
  var NAV_ITEMS = [
    { href: "index.html", label: "Inicio", key: "inicio" },
    { href: "servicios.html", label: "Servicios", key: "servicios" },
    { href: "reserva.html", label: "Reserva", key: "reserva", cta: true },
    { href: "productos.html", label: "Productos", key: "productos" },
    { href: "nosotros.html", label: "Nosotros", key: "nosotros" }
  ];

  function buildHeader() {
    var activeKey = document.body.getAttribute("data-page");
    var links = NAV_ITEMS.map(function (item) {
      var classes = [];
      if (item.key === activeKey) classes.push("active");
      if (item.cta) classes.push("nav-cta");
      var cls = classes.length ? ' class="' + classes.join(" ") + '"' : "";
      return '<a href="' + item.href + '"' + cls + ">" + item.label + "</a>";
    }).join("");
    return (
      '<div class="container header-inner">' +
      '<a href="index.html" class="brand">' +
      '<span class="brand-name">PVL</span>' +
      '<span class="brand-name-sub">BARBERSHOP</span>' +
      "</a>" +
      '<button id="nav-toggle" class="nav-toggle" aria-label="Abrir menú" aria-expanded="false">' +
      "<span></span><span></span><span></span>" +
      "</button>" +
      '<nav class="main-nav">' +
      links +
      "</nav>" +
      "</div>"
    );
  }

  function buildFooter() {
    var wa =
      "https://wa.me/" + CATALOG.whatsappNumber + "?text=" + encodeURIComponent("Hola, quisiera más información.");
    var social = CATALOG.brand.social || {};
    var socialLabels = { instagram: "Instagram", facebook: "Facebook", tiktok: "TikTok" };
    var socialLinks = Object.keys(socialLabels)
      .filter(function (key) { return social[key]; })
      .map(function (key) {
        return '<a href="' + social[key] + '" target="_blank" rel="noopener">' + socialLabels[key] + "</a>";
      })
      .join("");

    return (
      '<div class="container footer-inner">' +
      "<div>" +
      '<p class="brand-name-sub">' + CATALOG.brand.name + "</p>" +
      "<p>" + CATALOG.brand.address + "</p>" +
      "<p>" + CATALOG.brand.hours + "</p>" +
      (socialLinks ? '<div class="footer-social">' + socialLinks + "</div>" : "") +
      "</div>" +
      '<a class="btn btn-outline" href="' + wa + '" target="_blank" rel="noopener">Escribir por WhatsApp</a>' +
      "</div>"
    );
  }

  var headerEl = document.getElementById("site-header");
  var footerEl = document.getElementById("site-footer");
  if (headerEl) headerEl.innerHTML = buildHeader();
  if (footerEl) footerEl.innerHTML = buildFooter();

  var navToggle = document.getElementById("nav-toggle");
  var mainNav = document.getElementById("main-nav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("nav-open");
      navToggle.classList.toggle("nav-toggle-open", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    document.addEventListener("click", function (e) {
      if (!mainNav.classList.contains("nav-open")) return;
      if (mainNav.contains(e.target) || navToggle.contains(e.target)) return;
      mainNav.classList.remove("nav-open");
      navToggle.classList.remove("nav-toggle-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  }


  // ---------- Transición entre páginas ----------
  requestAnimationFrame(function () {
    document.body.classList.add("page-loaded");
  });

  document.addEventListener("click", function (e) {
    var link = e.target.closest("a[href]");
    if (!link) return;
    var href = link.getAttribute("href");
    if (!href || href.charAt(0) === "#" || link.target === "_blank") return;
    if (href.indexOf("http") === 0 || href.indexOf("wa.me") !== -1) return;
    if (href.slice(-5) !== ".html" && href.indexOf(".html?") === -1) return;

    e.preventDefault();
    document.body.classList.remove("page-loaded");
    document.body.classList.add("page-leaving");
    setTimeout(function () {
      window.location.href = href;
    }, 220);
  });
})();
