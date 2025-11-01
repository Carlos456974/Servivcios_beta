document.addEventListener("DOMContentLoaded", () => {
  const tipo = document.getElementById("tipo");
  const categoria = document.getElementById("categoria");
  const form = document.getElementById("registroTecnico");
  const otroContainer = document.getElementById("otroContainer");
  const categoriaOtro = document.getElementById("categoria_otro");

  const categorias = {
    software: [
      "Office",
      "Sistema de pedimentos",
      "Validador",
      "Problemas con actualizaciones",
      "Problemas con páginas",
      "Otros (escribir cuál)"
    ],
    hardware: [
      "Problemas con periféricos",
      "Equipo no enciende",
      "Equipo no da imagen",
      "Otros (escribir cuál)"
    ]
  };

  function llenarCategorias(t) {
    categoria.innerHTML = "";
    categorias[t].forEach(c => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c;
      categoria.appendChild(opt);
    });
    // si el primero es "Otros..." ocultar el campo hasta seleccionar
    verificarOtro();
  }

  function verificarOtro() {
    if (categoria.value && categoria.value.toLowerCase().includes("otros")) {
      otroContainer.classList.remove("hidden");
      categoriaOtro.required = true;
    } else {
      otroContainer.classList.add("hidden");
      if (categoriaOtro) categoriaOtro.required = false;
      if (categoriaOtro) categoriaOtro.value = "";
    }
  }

  // eventos
  if (tipo) {
    tipo.addEventListener("change", () => llenarCategorias(tipo.value));
  }
  if (categoria) {
    categoria.addEventListener("change", verificarOtro);
  }

  // inicializar
  if (tipo) llenarCategorias(tipo.value || "software");

  // submit demo
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      // recolectar datos básicos para demo
      const data = {
        empresa: form.empresa?.value || "",
        tipo: form.tipo?.value || "",
        categoria: form.categoria?.value || "",
        categoria_otro: form.categoria_otro?.value || "",
        detalle: form.detalle?.value || ""
      };
      // mostrar confirmación visual (puedes reemplazar por envio XHR/PHP)
      alert("Reporte guardado (modo demo):\n\n" +
            "Empresa: " + data.empresa + "\n" +
            "Tipo: " + data.tipo + "\n" +
            "Categoría: " + (data.categoria_otro || data.categoria) + "\n\n" +
            "Detalle: " + data.detalle.slice(0,120) + (data.detalle.length>120?"...":""));
      form.reset();
      llenarCategorias("software");
    });
  }
});
