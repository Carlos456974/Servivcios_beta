document.addEventListener("DOMContentLoaded", () => {

  const tipo = document.getElementById("tipo");
  const cliente = document.getElementById("cliente");

  const otroContainer = document.getElementById("otroClienteContainer");
  const otroInput = document.getElementById("otroCliente");

  const recoleccion = document.getElementById("recoleccionContainer");
  const ticket = document.getElementById("ticketContainer");

  const detallesContainer = document.getElementById("detallesContainer");

  // CLIENTE "OTRO"
  cliente.addEventListener("change", () => {
    if (cliente.value === "otro") {
      otroContainer.classList.remove("hidden");
      otroInput.required = true;
    } else {
      otroContainer.classList.add("hidden");
      otroInput.required = false;
      otroInput.value = "";
    }
  });

  // TIPO
  tipo.addEventListener("change", () => {

    recoleccion.classList.add("hidden");
    ticket.classList.add("hidden");
    detallesContainer.classList.remove("hidden");

    if (tipo.value === "recoleccion") {
      recoleccion.classList.remove("hidden");
    }

    if (tipo.value === "ticket") {
      ticket.classList.remove("hidden");
      detallesContainer.classList.add("hidden");
    }

  });

  document.getElementById("formServicio").addEventListener("submit", e => {
    e.preventDefault();

    const data = {
      cliente: cliente.value === "otro" ? otroInput.value : cliente.value,
      tipo: tipo.value,
      titulo: document.getElementById("titulo").value,
      detalles: document.getElementById("detalles").value,
      firma: document.getElementById("firma").value,
      tecnico: document.getElementById("tecnico").value,
      fecha: new Date().toLocaleDateString(),

      recoleccion: tipo.value === "recoleccion"
        ? {
            serie: document.getElementById("serie").value,
            marca: document.getElementById("marcaModelo").value
          }
        : null,

      ticket: tipo.value === "ticket"
        ? {
            numero: document.getElementById("numeroTicket").value,
            comentarios: document.getElementById("comentariosTicket").value
          }
        : null
    };

    localStorage.setItem("reporteData", JSON.stringify(data));
    window.location.href = "reportes.html";

  });

});
