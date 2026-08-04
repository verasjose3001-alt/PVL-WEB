// Datos de ejemplo — reemplaza esto con la información real de la barbería.
const CATALOG = {
  brand: {
    name: "PVL BARBERSHOP",
    tagline: "Since 2013",
    address: "Calle Principal #123, Santo Domingo",
    hours: "Lun - Sáb: 9:00am - 7:00pm",
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
      image: "assets/barba2.jpg"
    },
    {
      id: "corte-barba",
      name: "Corte + Barba",
      price: 800,
      duration: 50,
      description: "Corte completo más perfilado de barba con navaja.",
      image: ""
    },
    {
      id: "afeitado",
      name: "Afeitado Clásico",
      price: 400,
      duration: 25,
      description: "Afeitado tradicional con toalla caliente y navaja.",
      image: ""
    },
    {
      id: "diseno",
      name: "Diseño / Línea de Cejas",
      price: 200,
      duration: 15,
      description: "Diseño de líneas y detalles a máquina o navaja.",
      image: ""
    }
  ],

  // image: ruta dentro de assets/products/ — deja "" si todavía no hay foto (se muestra un placeholder).
  products: [
    { id: "cera-mate", name: "Cera Mate", price: 450, image: "" },
    { id: "aceite-barba", name: "Aceite para Barba", price: 550, image: "" },
    { id: "shampoo-carbon", name: "Shampoo de Carbón", price: 600, image: "" },
    { id: "pomada-classic", name: "Pomada Classic Hold", price: 500, image: "" }
  ],

  // image: foto de perfil. tagline: frase corta para el modal.
  // gallery: rutas de fotos de trabajos (deja "" en los slots sin foto todavía).
  // video: ruta de un video corto de su trabajo (deja "" si todavía no hay).
  barbers: [
    { id: "cualquiera", name: "Cualquiera disponible", specialty: "", image: "", tagline: "", gallery: [], video: "" },
    {
      id: "junior",
      name: "Junior",
      specialty: "Fades y diseños",
      image: "",
      tagline: "Especialista en fades y diseños de líneas",
      gallery: ["", "", "", "", "", ""],
      video: ""
    },
    {
      id: "manny",
      name: "Manny",
      specialty: "Barbas y afeitado clásico",
      image: "",
      tagline: "Afeitado a navaja y perfilado de barba",
      gallery: ["", "", "", "", "", ""],
      video: ""
    },
    {
      id: "leo",
      name: "Leo",
      specialty: "Cortes clásicos",
      image: "",
      tagline: "Cortes clásicos con acabado impecable",
      gallery: ["", "", "", "", "", ""],
      video: ""
    }
  ]
};
