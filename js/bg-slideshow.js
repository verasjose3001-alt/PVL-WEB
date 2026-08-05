// Fondo de página con transición entre imágenes (usa fotos de producto si existen,
// y mientras tanto usa fotos reales del local como relleno).
(function () {
  var container = document.getElementById("bg-slideshow");
  if (!container) return;

  var images = CATALOG.products.reduce(function (acc, p) { return acc.concat(p.images || []); }, []).filter(Boolean);
  if (!images.length) {
    images = ["assets/fondo.jpg", "assets/puerta.jpg", "assets/foto.jpg"];
  }

  images.forEach(function (src, i) {
    var slide = document.createElement("div");
    slide.className = "bg-slide" + (i === 0 ? " active" : "");
    slide.style.backgroundImage = "url('" + src + "')";
    container.appendChild(slide);
  });

  if (images.length > 1) {
    var slides = container.querySelectorAll(".bg-slide");
    var idx = 0;
    setInterval(function () {
      slides[idx].classList.remove("active");
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add("active");
    }, 4500);
  }
})();
