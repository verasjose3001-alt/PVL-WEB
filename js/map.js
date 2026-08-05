(function () {
  var iframe = document.getElementById("map-embed");
  var addressEl = document.getElementById("map-address");
  var directionsEl = document.getElementById("map-directions");
  if (!iframe) return;

  iframe.src = CATALOG.brand.mapEmbedUrl;
  if (addressEl) addressEl.textContent = CATALOG.brand.address;
  if (directionsEl) {
    directionsEl.href = CATALOG.brand.mapsShareUrl;
    directionsEl.innerHTML = (window.PVL_ICONS && window.PVL_ICONS.location || "") + "Cómo Llegar";
  }
})();
