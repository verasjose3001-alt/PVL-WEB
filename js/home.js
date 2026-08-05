(function () {
  // ---------- Equipo ----------
  var teamGrid = document.getElementById("team-preview");
  if (teamGrid) {
    var barbersList = CATALOG.barbers.filter(function (b) { return b.id !== "cualquiera"; });
    teamGrid.innerHTML = barbersList
      .map(function (b) {
        var avatar = b.image
          ? '<img src="' + b.image + '" alt="' + b.name + '" />'
          : "<span>" + b.name.charAt(0).toUpperCase() + "</span>";
        return (
          '<div class="card barber-card" data-barber="' + b.id + '">' +
          '<div class="barber-avatar">' + avatar + "</div>" +
          "<h3>" + b.name + "</h3>" +
          '<div class="meta">' + b.specialty + "</div>" +
          "</div>"
        );
      })
      .join("");
    teamGrid.addEventListener("click", function (e) {
      var card = e.target.closest("[data-barber]");
      if (!card) return;
      window.PVLBarberModal.open(card.getAttribute("data-barber"));
    });
  }

  // ---------- Portafolio (preview) ----------
  var portfolioGrid = document.getElementById("portfolio-preview");
  if (portfolioGrid) {
    var seen = {};
    var photos = [];
    (CATALOG.portfolio || []).forEach(function (src) {
      if (src && !seen[src]) {
        seen[src] = true;
        photos.push(src);
      }
    });
    CATALOG.barbers.forEach(function (b) {
      (b.gallery || []).forEach(function (src) {
        if (src && !seen[src]) {
          seen[src] = true;
          photos.push(src);
        }
      });
    });
    photos = photos.slice(0, 6);

    if (photos.length) {
      portfolioGrid.innerHTML = photos
        .map(function (src) {
          return '<div class="portfolio-item"><img src="' + src + '" alt="Trabajo realizado en PVL Barbershop" class="lightbox-img" /></div>';
        })
        .join("");
    } else {
      portfolioGrid.innerHTML = '<p class="about-text" style="text-align:center;">Muy pronto vamos a compartir fotos de nuestros trabajos aquí.</p>';
    }
  }

  // ---------- Horario ----------
  var scheduleEl = document.getElementById("schedule-table");
  if (scheduleEl) {
    var today = new Date().getDay();
    var order = [1, 2, 3, 4, 5, 6, 0];
    scheduleEl.innerHTML = order
      .map(function (dayNum) {
        var day = CATALOG.brand.schedule[dayNum];
        var isToday = dayNum === today;
        return (
          '<div class="schedule-row' + (isToday ? " schedule-today" : "") + '">' +
          '<span class="schedule-day">' + day.label + (isToday ? " · Hoy" : "") + "</span>" +
          '<span class="schedule-hours">' + day.hours + "</span>" +
          "</div>"
        );
      })
      .join("");
  }
})();
