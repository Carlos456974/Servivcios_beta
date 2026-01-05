document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("formServicio");

  const clienteSelect = document.getElementById("cliente");
  const otroClienteContainer = document.getElementById("otroClienteContainer");
  const otroClienteInput = document.getElementById("otroCliente");

  const tipoServicio = document.getElementById("tipo");
  const recoleccionContainer = document.getElementById("recoleccionContainer");

  const tituloContainer = document.getElementById("tituloContainer");
  const tituloInput = document.getElementById("titulo");

  const serieInput = document.getElementById("serie");
  const marcaModeloInput = document.getElementById("marcaModelo");
  const cargadorInputs = document.querySelectorAll('input[name="cargador"]');

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

  tipoServicio.addEventListener("change", () => {
    if (tipoServicio.value === "recoleccion") {
      recoleccionContainer.classList.remove("hidden");

      tituloContainer.classList.add("hidden");
      tituloInput.required = false;
      tituloInput.value = "";

      serieInput.required = true;
      marcaModeloInput.required = true;

    } else {
      recoleccionContainer.classList.add("hidden");

      tituloContainer.classList.remove("hidden");
      tituloInput.required = true;

      serieInput.value = "";
      marcaModeloInput.value = "";
      cargadorInputs.forEach(i => i.checked = false);
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let cargador = "";
    cargadorInputs.forEach(i => { if (i.checked) cargador = i.value; });

    if (tipoServicio.value === "recoleccion" && !cargador) {
      alert("Indica si el equipo incluye cargador.");
      return;
    }

    const data = {
      cliente: clienteSelect.value === "otro" ? otroClienteInput.value : clienteSelect.value,
      tipo: tipoServicio.value,
      titulo: tituloInput.value || null,
      detalles: document.getElementById("detalles").value,
      firma: document.getElementById("firma").value,
      fecha: new Date().toLocaleDateString(),
      recoleccion: tipoServicio.value === "recoleccion" ? {
        serie: serieInput.value,
        marcaModelo: marcaModeloInput.value,
        cargador
      } : null
    };

    localStorage.setItem("reporteData", JSON.stringify(data));
    window.location.href = "reportes.html";
  });

});



