// Página Reserva: elegir barbero (grid + modal tipo perfil) y confirmar en el formulario.
(function () {
  function waLink(message) {
    return "https://wa.me/" + CATALOG.whatsappNumber + "?text=" + encodeURIComponent(message);
  }

  // ---------- Formulario ----------
  var form = document.getElementById("booking-form");
  var serviceSelect = document.getElementById("bf-service");
  var barberSelect = document.getElementById("bf-barber");

  CATALOG.services.forEach(function (s) {
    var opt = document.createElement("option");
    opt.value = s.id;
    opt.textContent = s.name + " — RD$" + s.price;
    serviceSelect.appendChild(opt);
  });

  CATALOG.barbers.forEach(function (b) {
    var opt = document.createElement("option");
    opt.value = b.id;
    opt.textContent = b.name;
    barberSelect.appendChild(opt);
  });

  var params = new URLSearchParams(window.location.search);
  var preService = params.get("service");
  var preBarber = params.get("barber");
  if (preService && CATALOG.services.some(function (s) { return s.id === preService; })) {
    serviceSelect.value = preService;
  }
  if (preBarber && CATALOG.barbers.some(function (b) { return b.id === preBarber; })) {
    barberSelect.value = preBarber;
  }
  if (preService || preBarber) {
    setTimeout(function () {
      var target = document.getElementById("reservar-formulario");
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }, 350);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var service = CATALOG.services.find(function (s) { return s.id === serviceSelect.value; });
    var barber = CATALOG.barbers.find(function (b) { return b.id === barberSelect.value; });
    var date = document.getElementById("bf-date").value;
    var time = document.getElementById("bf-time").value;
    var name = document.getElementById("bf-name").value;

    var msg = "Hola, soy " + name + ". Quiero reservar " + (service ? service.name : "") +
      (barber && barber.id !== "cualquiera" ? " con " + barber.name : "") +
      " el " + date + " a las " + time + ".";

    window.open(waLink(msg), "_blank");
  });

  // ---------- Grid de barberos ----------
  var grid = document.getElementById("barbers-grid");
  var overlay = document.getElementById("barber-modal-overlay");
  if (!grid || !overlay) return;

  var barbersList = CATALOG.barbers.filter(function (b) {
    return b.id !== "cualquiera";
  });

  function initials(name) {
    return name.charAt(0).toUpperCase();
  }

  function avatarHTML(barber) {
    if (barber.image) {
      return '<img src="' + barber.image + '" alt="' + barber.name + '" />';
    }
    return "<span>" + initials(barber.name) + "</span>";
  }

  barbersList.forEach(function (b) {
    var card = document.createElement("div");
    card.className = "card barber-card";
    card.setAttribute("data-barber", b.id);
    card.innerHTML =
      '<div class="barber-avatar barber-avatar-clickable">' + avatarHTML(b) + "</div>" +
      "<h3>" + b.name + "</h3>" +
      '<div class="meta">' + b.specialty + "</div>";
    grid.appendChild(card);
  });

  grid.addEventListener("click", function (e) {
    var card = e.target.closest("[data-barber]");
    if (!card) return;
    openModal(card.getAttribute("data-barber"));
  });

  // ---------- Modal ----------
  var modalAvatar = document.getElementById("modal-avatar");
  var modalName = document.getElementById("modal-name");
  var modalTagline = document.getElementById("modal-tagline");
  var modalVideo = document.getElementById("modal-video");
  var modalGallery = document.getElementById("modal-gallery");
  var modalBookBtn = document.getElementById("modal-book-btn");
  var modalClose = document.getElementById("modal-close");
  var currentBarberId = null;

  function openModal(barberId) {
    var b = barbersList.filter(function (x) { return x.id === barberId; })[0];
    if (!b) return;
    currentBarberId = b.id;

    modalAvatar.innerHTML = avatarHTML(b);
    modalName.textContent = b.name;
    modalTagline.textContent = b.tagline || b.specialty;

    modalVideo.innerHTML = b.video
      ? '<video src="' + b.video + '" muted loop autoplay playsinline></video>'
      : '<div class="modal-video-placeholder">Video próximamente</div>';

    var slots = b.gallery && b.gallery.length ? b.gallery : ["", "", "", "", "", ""];
    modalGallery.innerHTML = slots
      .map(function (img) {
        return img
          ? '<div class="modal-gallery-item"><img src="' + img + '" alt="Trabajo de ' + b.name + '" /></div>'
          : '<div class="modal-gallery-item modal-gallery-placeholder"></div>';
      })
      .join("");

    overlay.classList.add("open");
    document.body.classList.add("modal-open");
  }

  function closeModal() {
    overlay.classList.remove("open");
    document.body.classList.remove("modal-open");
  }

  modalClose.addEventListener("click", closeModal);
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });

  modalBookBtn.addEventListener("click", function () {
    if (currentBarberId) barberSelect.value = currentBarberId;
    closeModal();
    document.getElementById("reservar-formulario").scrollIntoView({ behavior: "smooth" });
  });
})();
