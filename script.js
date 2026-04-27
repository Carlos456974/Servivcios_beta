document.addEventListener("DOMContentLoaded", () => {

  const tipo = document.getElementById("tipo");

  const recoleccion = document.getElementById("recoleccionContainer");
  const ticket = document.getElementById("ticketContainer");

  const tituloContainer = document.getElementById("tituloContainer");
  const detallesContainer = document.getElementById("detallesContainer");

  const titulo = document.getElementById("titulo");
  const detalles = document.getElementById("detalles");

  const serie = document.getElementById("serie");
  const marca = document.getElementById("marcaModelo");

  const numeroTicket = document.getElementById("numeroTicket");
  const comentariosTicket = document.getElementById("comentariosTicket");

  tipo.addEventListener("change", () => {

    // RESET
    recoleccion.classList.add("hidden");
    ticket.classList.add("hidden");

    detallesContainer.classList.remove("hidden");
    detalles.required = true;

    tituloContainer.classList.remove("hidden");
    titulo.required = true;

    // RECOLECCION
    if (tipo.value === "recoleccion") {
      recoleccion.classList.remove("hidden");
      tituloContainer.classList.add("hidden");
      titulo.required = false;
      detalles.value = "";
    }

    // TICKET
    if (tipo.value === "ticket") {
      ticket.classList.remove("hidden");

      detallesContainer.classList.add("hidden");
      detalles.required = false;
      detalles.value = "";
    }

  });

  document.getElementById("formServicio").addEventListener("submit", e => {
    e.preventDefault();

    const data = {
      cliente: document.getElementById("cliente").value,
      tipo: tipo.value,
      titulo: titulo.value,
      detalles: detalles.value,
      firma: document.getElementById("firma").value,
      fecha: new Date().toLocaleDateString(),

      recoleccion: tipo.value === "recoleccion"
        ? {
            serie: serie.value,
            marca: marca.value
          }
        : null,

      ticket: tipo.value === "ticket"
        ? {
            numero: numeroTicket.value,
            comentarios: comentariosTicket.value
          }
        : null
    };

    localStorage.setItem("reporteData", JSON.stringify(data));
    window.location.href = "reportes.html";

  });

});
