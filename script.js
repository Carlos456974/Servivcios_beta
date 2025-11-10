document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registroTecnico");

  // --- CLIENTES PREDEFINIDOS ---
  const clientes = [
    "Dacis",
    "Bakertilly",
    "Comextaa",
    "Grupo Francisco",
    "TAM",
    "Pompa y Asociados",
    "Inecex",
    "Verum",
    "GCB",
    "Comisa",
    "Sertal",
    "Otro (escribir manualmente)"
  ];

  // --- CATEGORÍAS SEGÚN TIPO ---
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

  // --- ELEMENTOS DEL FORMULARIO ---
  const clienteSelect = document.getElementById("cliente");
  const clienteManual = document.getElementById("cliente_manual");
  const tipo = document.getElementById("tipo");
  const categoria = document.getElementById("categoria");
  const otroContainer = document.getElementById("otroContainer");
  const categoriaOtro = document.getElementById("categoria_otro");

  // --- LLENAR CLIENTES ---
  clientes.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    clienteSelect.appendChild(opt);
  });

  // --- Mostrar campo manual si elige "Otro" ---
  clienteSelect.addEventListener("change", () => {
    if (clienteSelect.value.includes("Otro")) {
      clienteManual.classList.remove("hidden");
      clienteManual.required = true;
    } else {
      clienteManual.classList.add("hidden");
      clienteManual.required = false;
      clienteManual.value = "";
    }
  });

  // --- Llenar categorías ---
  function llenarCategorias(tipoSeleccionado) {
    categoria.innerHTML = "";
    categorias[tipoSeleccionado].forEach(c => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c;
      categoria.appendChild(opt);
    });
    verificarOtro();
  }

  // --- Mostrar campo si selecciona "Otros" ---
  function verificarOtro() {
    if (categoria.value && categoria.value.toLowerCase().includes("otros")) {
      otroContainer.classList.remove("hidden");
      categoriaOtro.required = true;
    } else {
      otroContainer.classList.add("hidden");
      categoriaOtro.required = false;
      categoriaOtro.value = "";
    }
  }

  tipo.addEventListener("change", () => llenarCategorias(tipo.value));
  categoria.addEventListener("change", verificarOtro);

  // Inicializar por defecto
  llenarCategorias(tipo.value || "software");

  // --- Envío del formulario ---
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      cliente: clienteSelect.value.includes("Otro") ? clienteManual.value : clienteSelect.value,
      tipo: tipo.value,
      categoria: categoria.value,
      categoria_otro: categoriaOtro.value,
      titulo: document.getElementById("titulo").value,
      detalles: document.getElementById("detalles").value,
      firma: document.getElementById("firma").value,
      fecha: new Date().toLocaleDateString()
    };

    // Guardar en localStorage temporal para pasarlo a reportes.html
    localStorage.setItem("reporteData", JSON.stringify(data));

    // Redirigir a reportes.html
    window.location.href = "reportes.html";
  });
});


