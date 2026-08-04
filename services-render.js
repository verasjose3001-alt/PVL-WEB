(function () {
  var grid = document.getElementById("services-grid");
  if (!grid) return;

  function cardImageHTML(image, label) {
    if (image) {
      return '<div class="card-image"><img src="' + image + '" alt="' + label + '" /></div>';
    }
    return '<div class="card-image card-image-placeholder">Foto próximamente</div>';
  }

  CATALOG.services.forEach(function (s) {
    var card = document.createElement("div");
    card.className = "card";
    card.innerHTML =
      cardImageHTML(s.image, s.name) +
      '<h3>' + s.name + '</h3>' +
      '<div class="price">RD$' + s.price + '</div>' +
      '<div class="meta">' + s.duration + ' min</div>' +
      '<div class="desc">' + s.description + '</div>' +
      '<a class="btn btn-outline" href="reserva.html?service=' + s.id + '">Reservar</a>';
    grid.appendChild(card);
  });
})();
