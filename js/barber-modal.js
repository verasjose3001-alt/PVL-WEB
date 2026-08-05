// Modal de perfil de barbero — compartido entre Inicio y Reserva.
// Expone window.PVLBarberModal = { open(barberId), close(), onBook(barberId, serviceId) }
// onBook por defecto navega a reserva.html con el barbero/servicio en la URL;
// una página con formulario propio (reserva.html) puede reemplazar onBook.
(function () {
  var overlay = document.getElementById("barber-modal-overlay");
  if (!overlay) return;

  var modalAvatar = document.getElementById("modal-avatar");
  var modalName = document.getElementById("modal-name");
  var modalTagline = document.getElementById("modal-tagline");
  var modalServices = document.getElementById("modal-services");
  var modalVideo = document.getElementById("modal-video");
  var modalGallery = document.getElementById("modal-gallery");
  var modalBookBtn = document.getElementById("modal-book-btn");
  var modalClose = document.getElementById("modal-close");
  var modalTabs = document.getElementById("modal-tabs");
  var modalTabCount = document.getElementById("modal-tab-count");
  var currentBarberId = null;

  function switchTab(tabName) {
    modalTabs.querySelectorAll(".modal-tab").forEach(function (tab) {
      tab.classList.toggle("active", tab.getAttribute("data-tab") === tabName);
    });
    document.querySelectorAll(".modal-tab-panel").forEach(function (panel) {
      panel.hidden = panel.getAttribute("data-panel") !== tabName;
    });
  }
  modalTabs.addEventListener("click", function (e) {
    var tab = e.target.closest(".modal-tab");
    if (!tab) return;
    switchTab(tab.getAttribute("data-tab"));
  });

  function initials(name) {
    return name.charAt(0).toUpperCase();
  }
  function avatarHTML(barber) {
    if (barber.image) return '<img src="' + barber.image + '" alt="' + barber.name + '" />';
    return "<span>" + initials(barber.name) + "</span>";
  }

  function open(barberId) {
    var b = CATALOG.barbers.find(function (x) { return x.id === barberId; });
    if (!b) return;
    currentBarberId = b.id;

    modalAvatar.innerHTML = avatarHTML(b);
    modalName.textContent = b.name;
    modalTagline.textContent = b.tagline || b.specialty;

    var offeredServices = (b.services || [])
      .map(function (id) { return CATALOG.services.find(function (s) { return s.id === id; }); })
      .filter(Boolean);
    modalServices.innerHTML = offeredServices
      .map(function (s) {
        var thumb = s.image
          ? '<img src="' + s.image + '" alt="' + s.name + '" class="lightbox-img" />'
          : '<div class="modal-service-thumb-placeholder"></div>';
        return (
          '<div class="modal-service-row">' +
          '<div class="modal-service-thumb">' + thumb + "</div>" +
          '<span class="modal-service-name">' + s.name + "</span>" +
          '<button class="btn btn-outline btn-sm" data-book-service="' + s.id + '">Reservar</button>' +
          "</div>"
        );
      })
      .join("");

    modalVideo.innerHTML = b.video
      ? '<video src="' + b.video + '" muted loop autoplay playsinline></video>'
      : '<div class="modal-video-placeholder">Video próximamente</div>';

    var photos = (b.gallery || []).filter(Boolean);
    modalGallery.innerHTML = photos.length
      ? photos
          .map(function (img) {
            return '<div class="modal-gallery-item"><img src="' + img + '" alt="Trabajo de ' + b.name + '" class="lightbox-img" /></div>';
          })
          .join("")
      : '<p class="about-text modal-gallery-empty">Muy pronto vamos a compartir fotos de trabajos de ' + b.name + ' aquí.</p>';
    modalTabCount.textContent = photos.length || "";
    modalTabCount.style.display = photos.length ? "" : "none";

    switchTab("perfil");
    overlay.classList.add("open");
    document.body.classList.add("modal-open");
  }

  function close() {
    overlay.classList.remove("open");
    document.body.classList.remove("modal-open");
  }

  modalClose.addEventListener("click", close);
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) close();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });

  modalBookBtn.addEventListener("click", function () {
    window.PVLBarberModal.onBook(currentBarberId, null);
  });
  modalServices.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-book-service]");
    if (!btn) return;
    window.PVLBarberModal.onBook(currentBarberId, btn.getAttribute("data-book-service"));
  });

  window.PVLBarberModal = {
    open: open,
    close: close,
    onBook: function (barberId, serviceId) {
      var params = [];
      if (serviceId) params.push("service=" + serviceId);
      if (barberId) params.push("barber=" + barberId);
      window.location.href = "reserva.html" + (params.length ? "?" + params.join("&") : "");
    }
  };
})();
