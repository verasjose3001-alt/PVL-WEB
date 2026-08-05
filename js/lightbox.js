// Lightbox genérico: clic en cualquier <img class="lightbox-img"> la amplía en pantalla completa.
(function () {
  var overlay = document.createElement("div");
  overlay.className = "lightbox-overlay";
  overlay.innerHTML = '<button class="lightbox-close" aria-label="Cerrar">&times;</button><img alt="" />';
  document.body.appendChild(overlay);

  var img = overlay.querySelector("img");
  var closeBtn = overlay.querySelector(".lightbox-close");

  function open(src, alt) {
    img.src = src;
    img.alt = alt || "";
    overlay.classList.add("open");
  }
  function close() {
    overlay.classList.remove("open");
  }

  document.addEventListener("click", function (e) {
    var target = e.target.closest(".modal-gallery-item img, .lightbox-img");
    if (target) {
      open(target.src, target.alt);
      return;
    }
    if (e.target === overlay || e.target === closeBtn) close();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });
})();
