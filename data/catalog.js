// Datos de ejemplo — reemplaza esto con la información real de la barbería.
const CATALOG = {
  brand: {
    name: "PVL BARBERSHOP",
    tagline: "Since 2013",
    address: "C. José de Jesús Ravelo 29, Santo Domingo 10413",
    hours: "Lun - Sáb: 9:00am - 7:00pm",
    // Horario completo de la semana — se usa en la tabla de horarios de Inicio.
    schedule: {
      0: { label: "Domingo", hours: "Cerrado" },
      1: { label: "Lunes", hours: "9:00am - 7:00pm" },
      2: { label: "Martes", hours: "9:00am - 7:00pm" },
      3: { label: "Miércoles", hours: "9:00am - 7:00pm" },
      4: { label: "Jueves", hours: "9:00am - 7:00pm" },
      5: { label: "Viernes", hours: "9:00am - 7:00pm" },
      6: { label: "Sábado", hours: "9:00am - 7:00pm" }
    },
    // Iframe de Google Maps (Compartir > Insertar un mapa) con la ubicación real.
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.0076543444793!2d-69.90846102617375!3d18.48331248260304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaf89c624c70031%3A0xc6e2fa2f4410d42d!2sPVL%20Barbershop!5e0!3m2!1ses-419!2sdo!4v1785950158575!5m2!1ses-419!2sdo",
    // Link corto de Google Maps (Compartir > Copiar enlace) — se usa en todos los botones "Cómo Llegar".
    mapsShareUrl: "https://maps.app.goo.gl/EDV1rDz12UCftHYy8",
    // Deja "" en las que todavía no tengas para que no se muestren en el footer.
    social: {
      instagram: "https://instagram.com/pvlbarbershop",
      facebook: "",
      tiktok: ""
    }
  },

  // Número de WhatsApp en formato internacional (sin +, sin espacios).
  // Tomado del rótulo de la barbería: 829.215.6020 (República Dominicana, +1).
  whatsappNumber: "18292156020",

  // image: ruta dentro de assets/services/ — deja "" si todavía no hay foto (se muestra un placeholder).
  services: [
    {
      id: "corte-clasico",
      name: "Corte Clásico",
      price: 500,
      duration: 30,
      description: "Corte a tijera y máquina, incluye lavado.",
      image: "assets/fade3.jpg"
    },
    {
      id: "corte-barba",
      name: "Corte + Barba",
      price: 800,
      duration: 50,
      description: "Corte completo más perfilado de barba con navaja.",
      image: "assets/d4f24d15-69ff-431e-869d-14bd4a8e2135.jpg"
    },
    {
      id: "afeitado",
      name: "Afeitado Clásico",
      price: 400,
      duration: 25,
      description: "Afeitado tradicional con toalla caliente y navaja.",
      image: "assets/fade1.jpg"
    },
    {
      id: "diseno",
      name: "Diseño ",
      price: 800,
      duration: 45,
      description: "Diseño de líneas y detalles a máquina o navaja.",
      image: "assets/269adce5-f5b1-4b54-b1c4-7b1e3aaf5fc4.jpg"
    }
  ],

  // images: hasta 2 fotos por producto (se muestran con deslizador). Deja [] si todavía no hay foto.
  products: [
    {
      id: "pomada-negro",
      name: "Pomade Black — Rolda",
      price: 650,
      images: ["assets/pomada para pelo negro.webp", "assets/pomada para pelo negro 2.webp"]
    },
    {
      id: "pomada-pelo",
      name: "Pomada para el Pelo — Rolda",
      price: 650,
      images: ["assets/pomada para el pelo.webp", "assets/pomada para el pelo 2.webp"]
    },
    {
      id: "crema-moldeadora",
      name: "Crema Moldeadora Capilar — Rolda",
      price: 900,
      images: ["assets/crema moldeadora capilar rolda.webp", "assets/crema moldeadora capilar rolda 2.webp"]
    },
    {
      id: "crema-rizos",
      name: "Crema para Rizos — Rolda",
      price: 900,
      images: ["assets/crema para rizos rolda.webp", "assets/crema para rizos rolda 2.webp"]
    }
  ],

  // image: foto de perfil. tagline: frase corta para el modal.
  // services: ids de CATALOG.services que ofrece este barbero (se muestran como chips en su perfil).
  // gallery: rutas de fotos de trabajos (deja "" en los slots sin foto todavía).
  // video: ruta de un video corto de su trabajo (deja "" si todavía no hay).
  barbers: [
    { id: "cualquiera", name: "Cualquiera disponible", specialty: "", image: "", tagline: "", services: [], gallery: [], video: "" },
    {
      id: "junior",
      name: "Pavel",
      specialty: "Fades y diseños",
      image: "assets/pavel.jpg",
      tagline: "Especialista en fades y diseños de líneas",
      services: ["corte-clasico", "diseno"],
      gallery: ["assets/barba1.jpg", "assets/barba2.jpg", "assets/barba3.jpg", "assets/barba5.jpg", "", ""],
      video: "assets/video project 1.mp4"
    },
    {
      id: "pepin",
      name: "Pepín",
      specialty: "Barbero",
      image: "assets/pepin.jpg",
      tagline: "",
      services: [],
      gallery: ["assets/fade5.jpg", "assets/fade4.jpg", "assets/fade3.jpg", "assets/fade2.jpg", "assets/fade1.jpg", ""],
      video: ""
    }
    // Falta un tercer barbero real — agrégalo aquí cuando tengas su nombre.
  ],

  // Fotos de trabajos sin atribuir a un barbero específico — aparecen en el Portafolio general
  // (página Portafolio y preview en Inicio), pero no en el perfil de ningún barbero en particular.
  portfolio: [
    "assets/055bce9e-58ee-4f64-8627-acbe59deeb00.jpg",
    "assets/269adce5-f5b1-4b54-b1c4-7b1e3aaf5fc4.jpg",
    "assets/08ad711b-3a0a-474e-9781-9b5448abdb23.jpg",
    "assets/69d7505c-088a-4eb4-ad12-f5e0013fbd01.jpg",
    "assets/d4f24d15-69ff-431e-869d-14bd4a8e2135.jpg"
  ]
};
