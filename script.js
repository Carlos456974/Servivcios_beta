document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("formServicio");

  // Cliente
  const clienteSelect = document.getElementById("cliente");
  const otroClienteContainer = document.getElementById("otroClienteContainer");
  const otroClienteInput = document.getElementById("otroCliente");

  // Tipo de servicio
  const tipoServicio = document.getElementById("tipo");
  const recoleccionContainer = document.getElementById("recoleccionContainer");

  // Campos de recolección
  const serieInput = document.getElementById("serie");
  const marcaModeloInput = document.getElementById("marcaModelo");
  const cargadorInputs = document.querySelectorAll('input[name="cargador"]');

  /* ===============================
     CLIENTE "OTRO"
  =============================== */
  clienteSelect.addEventListener("change", () => {
    if (clienteSelect.value === "otro") {
      otroClienteContainer.classList.remove("hidden");
      otroClienteInput.required = true;
    } else {
      otroClienteContainer.classList.add("hidden");
      otroClienteInput.required = false;
      otroClienteInput.value = "";
    }
  });

  /* ===============================
     RECOLECCIÓN DE EQUIPO
  =============================== */
  tipoServicio.addEventListener("change", () => {
    if (tipoServicio.value === "recoleccion") {
      recoleccionContainer.classList.remove("hidden");

      serieInput.required = true;
      marcaModeloInput.required = true;

    } else {
      recoleccionContainer.classList.add("hidden");

      // Limpiar y quitar validación
      serieInput.required = false;
      serieInput.value = "";

      marcaModeloInput.required = false;
      marcaModeloInput.value = "";

      cargadorInputs.forEach(input => input.checked = false);
    }
  });

  /* ===============================
     ENVÍO DEL FORMULARIO
  =============================== */
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let cargadorValor = "";
    cargadorInputs.forEach(input => {
      if (input.checked) cargadorValor = input.value;
    });

    // Validación extra para recolección
    if (tipoServicio.value === "recoleccion" && cargadorValor === "") {
      alert("Indica si el equipo incluye cargador.");
      return;
    }

    const data = {
      cliente: clienteSelect.value === "otro"
        ? otroClienteInput.value
        : clienteSelect.value,

      tipo: tipoServicio.value,
      titulo: document.getElementById("titulo").value,
      detalles: document.getElementById("detalles").value,
      firma: document.getElementById("firma").value,
      fecha: new Date().toLocaleDateString(),

      // Datos extra solo si es recolección
      recoleccion: tipoServicio.value === "recoleccion"
        ? {
            serie: serieInput.value,
            marcaModelo: marcaModeloInput.value,
            cargador: cargadorValor
          }
        : null
    };

    // Guardar en localStorage
    localStorage.setItem("reporteData", JSON.stringify(data));

    // Redirigir
    window.location.href = "reportes.html";
  });

});


