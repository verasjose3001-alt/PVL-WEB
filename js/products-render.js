(function () {
  var grid = document.getElementById("products-grid");
  if (!grid) return;

  function cardImageHTML(images, label) {
    images = (images || []).filter(Boolean);
    if (!images.length) {
      return '<div class="card-image card-image-placeholder">Foto próximamente</div>';
    }
    if (images.length === 1) {
      return '<div class="card-image"><img src="' + images[0] + '" alt="' + label + '" /></div>';
    }
    var slides = images
      .map(function (src) { return '<img src="' + src + '" alt="' + label + '" />'; })
      .join("");
    var dots = images.map(function (_, i) { return '<span class="dot' + (i === 0 ? " active" : "") + '"></span>'; }).join("");
    return (
      '<div class="card-image product-slider" data-index="0">' +
      '<div class="product-slider-track">' + slides + "</div>" +
      '<button class="slider-arrow slider-prev" aria-label="Foto anterior">&#8249;</button>' +
      '<button class="slider-arrow slider-next" aria-label="Foto siguiente">&#8250;</button>' +
      '<div class="slider-dots">' + dots + "</div>" +
      "</div>"
    );
  }

  function waLink(message) {
    return "https://wa.me/" + CATALOG.whatsappNumber + "?text=" + encodeURIComponent(message);
  }

  CATALOG.products.forEach(function (p) {
    var card = document.createElement("div");
    card.className = "card";
    card.innerHTML =
      cardImageHTML(p.images, p.name) +
      '<h3>' + p.name + '</h3>' +
      '<div class="price">RD$' + p.price + '</div>' +
      '<button class="btn btn-outline" data-product="' + p.name + '">Preguntar por WhatsApp</button>';
    grid.appendChild(card);
  });

  // ---------- Deslizador de fotos por producto ----------
  function goToSlide(slider, index) {
    var track = slider.querySelector(".product-slider-track");
    var dots = slider.querySelectorAll(".dot");
    var total = track.children.length;
    index = (index + total) % total;
    track.style.transform = "translateX(-" + index * 100 + "%)";
    dots.forEach(function (d, i) { d.classList.toggle("active", i === index); });
    slider.setAttribute("data-index", index);
  }

  grid.querySelectorAll(".product-slider").forEach(function (slider) {
    var startX = null;

    slider.querySelector(".slider-prev").addEventListener("click", function (e) {
      e.stopPropagation();
      goToSlide(slider, parseInt(slider.getAttribute("data-index"), 10) - 1);
    });
    slider.querySelector(".slider-next").addEventListener("click", function (e) {
      e.stopPropagation();
      goToSlide(slider, parseInt(slider.getAttribute("data-index"), 10) + 1);
    });

    slider.addEventListener("touchstart", function (e) {
      startX = e.touches[0].clientX;
    }, { passive: true });
    slider.addEventListener("touchend", function (e) {
      if (startX === null) return;
      var delta = e.changedTouches[0].clientX - startX;
      if (Math.abs(delta) > 35) {
        goToSlide(slider, parseInt(slider.getAttribute("data-index"), 10) + (delta < 0 ? 1 : -1));
      }
      startX = null;
    });
  });

  grid.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-product]");
    if (!btn) return;
    var msg = "Hola, quisiera saber la disponibilidad de: " + btn.getAttribute("data-product");
    window.open(waLink(msg), "_blank");
  });
})();
