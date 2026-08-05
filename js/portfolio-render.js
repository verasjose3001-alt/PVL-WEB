// Portafolio: junta las fotos de trabajos de todos los barberos en una sola galería.
(function () {
  var grid = document.getElementById("portfolio-grid");
  if (!grid) return;

  var seen = {};
  var photos = [];
  (CATALOG.portfolio || []).forEach(function (src) {
    if (src && !seen[src]) {
      seen[src] = true;
      photos.push({ src: src, barber: CATALOG.brand.name });
    }
  });
  CATALOG.barbers.forEach(function (b) {
    (b.gallery || []).forEach(function (src) {
      if (src && !seen[src]) {
        seen[src] = true;
        photos.push({ src: src, barber: b.name });
      }
    });
  });

  if (!photos.length) {
    grid.innerHTML = '<p class="about-text" style="text-align:center;">Muy pronto vamos a compartir fotos de nuestros trabajos aquí.</p>';
    return;
  }

  grid.innerHTML = photos
    .map(function (p) {
      return (
        '<div class="portfolio-item">' +
        '<img src="' + p.src + '" alt="Trabajo realizado por ' + p.barber + '" class="lightbox-img" />' +
        "</div>"
      );
    })
    .join("");
})();
