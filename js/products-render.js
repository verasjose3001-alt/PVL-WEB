(function () {
  var grid = document.getElementById("products-grid");
  if (!grid) return;

  function cardImageHTML(image, label) {
    if (image) {
      return '<div class="card-image"><img src="' + image + '" alt="' + label + '" /></div>';
    }
    return '<div class="card-image card-image-placeholder">Foto próximamente</div>';
  }

  function waLink(message) {
    return "https://wa.me/" + CATALOG.whatsappNumber + "?text=" + encodeURIComponent(message);
  }

  CATALOG.products.forEach(function (p) {
    var card = document.createElement("div");
    card.className = "card";
    card.innerHTML =
      cardImageHTML(p.image, p.name) +
      '<h3>' + p.name + '</h3>' +
      '<div class="price">RD$' + p.price + '</div>' +
      '<button class="btn btn-outline" data-product="' + p.name + '">Preguntar por WhatsApp</button>';
    grid.appendChild(card);
  });

  grid.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-product]");
    if (!btn) return;
    var msg = "Hola, quisiera saber la disponibilidad de: " + btn.getAttribute("data-product");
    window.open(waLink(msg), "_blank");
  });
})();
