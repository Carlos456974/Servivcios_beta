document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("formServicio");

  /* ===============================
     CLIENTE
  =============================== */
  const clienteSelect = document.getElementById("cliente");
  const otroClienteContainer = document.getElementById("otroClienteContainer");
  const otroClienteInput = document.getElementById("otroCliente");

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
     TIPO DE SERVICIO
  =============================== */
  const tipoServicio = document.getElementById("tipo");
  const recoleccionContainer = document.getElementById("recoleccionContainer");

  const tituloContainer = document.getElementById("tituloContainer");
  const tituloInput = document.getElementById("titulo");

  const serieInput = document.getElementById("serie");
  const marcaModeloInput = document.getElementById("marcaModelo");
  const cargadorInputs = document.querySelectorAll('input[name="cargador"]');

  tipoServicio.addEventListener("change", () => {

    if (tipoServicio.value === "recoleccion") {

      // Mostrar datos de recolección
      recoleccionContainer.classList.remove("hidden");

      // Ocultar SOLO el título
      tituloContainer.classList.add("hidden");
      tituloInput.required = false;
      tituloInput.value = "";

      // Requeridos para recolección
      serieInput.required = true;
      marcaModeloInput.required = true;

    } else {

      // Ocultar datos de recolección
      recoleccionContainer.classList.add("hidden");

      // Mostrar título nuevamente
      tituloContainer.classList.remove("hidden");
      tituloInput.required = true;

      // Limpiar campos de recolección
      serieInput.required = false;
      marcaModeloInput.required = false;

      serieInput.value = "";
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

    // Validación extra solo para recolección
    if (tipoServicio.value === "recoleccion" && cargadorValor === "") {
      alert("Indica si el equipo incluye cargador.");
      return;
    }

    const data = {
      cliente: clienteSelect.value === "otro"
        ? otroClienteInput.value
        : clienteSelect.value,

      tipo: tipoServicio.value,
      titulo: tituloInput.value || null,
      detalles: document.getElementById("detalles").value,
      firma: document.getElementById("firma").value,
      fecha: new Date().toLocaleDateString(),

      recoleccion: tipoServicio.value === "recoleccion"
        ? {
            serie: serieInput.value,
            marcaModelo: marcaModeloInput.value,
            cargador: cargadorValor
          }
        : null
    };

    // Guardar información
    localStorage.setItem("reporteData", JSON.stringify(data));

    // 🔴 REDIRECCIÓN CORRECTA (ESTE ERA EL ERROR)
    window.location.href = "reportes.html";
  });

});



