document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("formServicio");

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

  const tipoServicio = document.getElementById("tipo");

  const recoleccionContainer = document.getElementById("recoleccionContainer");
  const ticketContainer = document.getElementById("ticketContainer");

  const tituloContainer = document.getElementById("tituloContainer");
  const tituloInput = document.getElementById("titulo");

  const serieInput = document.getElementById("serie");
  const marcaModeloInput = document.getElementById("marcaModelo");

  const numeroTicketInput = document.getElementById("numeroTicket");
  const comentariosTicketInput = document.getElementById("comentariosTicket");

  const cargadorInputs = document.querySelectorAll('input[name="cargador"]');

  tipoServicio.addEventListener("change", () => {

    // RESET
    recoleccionContainer.classList.add("hidden");
    ticketContainer.classList.add("hidden");

    serieInput.required = false;
    marcaModeloInput.required = false;
    numeroTicketInput.required = false;
    comentariosTicketInput.required = false;

    serieInput.value = "";
    marcaModeloInput.value = "";
    numeroTicketInput.value = "";
    comentariosTicketInput.value = "";

    cargadorInputs.forEach(input => input.checked = false);

    tituloContainer.classList.remove("hidden");
    tituloInput.required = true;

    // RECOLECCIÓN
    if (tipoServicio.value === "recoleccion") {

      recoleccionContainer.classList.remove("hidden");

      tituloContainer.classList.add("hidden");
      tituloInput.required = false;
      tituloInput.value = "";

      serieInput.required = true;
      marcaModeloInput.required = true;
    }

    // TICKET
    if (tipoServicio.value === "ticket") {

      ticketContainer.classList.remove("hidden");

      numeroTicketInput.required = true;
      comentariosTicketInput.required = true;
    }

  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let cargadorValor = "";
    cargadorInputs.forEach(input => {
      if (input.checked) cargadorValor = input.value;
    });

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
        : null,

      ticket: tipoServicio.value === "ticket"
        ? {
            numero: numeroTicketInput.value,
            comentarios: comentariosTicketInput.value
          }
        : null
    };

    localStorage.setItem("reporteData", JSON.stringify(data));

    window.location.href = "reportes.html";
  });

});
