document.addEventListener("DOMContentLoaded", () => {

  const tipo = document.getElementById("tipo");
  const cliente = document.getElementById("cliente");

  const otroContainer = document.getElementById("otroClienteContainer");
  const otroInput = document.getElementById("otroCliente");

  const recoleccion = document.getElementById("recoleccionContainer");
  const ticket = document.getElementById("ticketContainer");
  const entrega = document.getElementById("entregaContainer");

  const cambioPiezas = document.getElementById("cambioPiezas");
  const piezasContainer = document.getElementById("piezasContainer");

  const marcaEntrega = document.getElementById("marcaEntrega");
  const marcaOtroContainer = document.getElementById("marcaOtroContainer");
  const marcaOtra = document.getElementById("marcaOtra");

  const titulo = document.getElementById("titulo");

  // CLIENTE
  cliente.addEventListener("change", () => {
    if (cliente.value === "otro") {
      otroContainer.classList.remove("hidden");
    } else {
      otroContainer.classList.add("hidden");
    }
  });

  // MARCA OTRO
  marcaEntrega.addEventListener("change", () => {
    if (marcaEntrega.value === "otro") {
      marcaOtroContainer.classList.remove("hidden");
    } else {
      marcaOtroContainer.classList.add("hidden");
      marcaOtra.value = "";
    }
  });

  // TIPO
  tipo.addEventListener("change", () => {

    recoleccion.classList.add("hidden");
    ticket.classList.add("hidden");
    entrega.classList.add("hidden");

    titulo.style.display = "block";

    if (tipo.value === "recoleccion") {
      recoleccion.classList.remove("hidden");
    }

    if (tipo.value === "ticket") {
      ticket.classList.remove("hidden");
    }

    if (tipo.value === "entrega") {
      entrega.classList.remove("hidden");
      titulo.style.display = "none";
      titulo.value = "";
    }

  });

  // PIEZAS
  cambioPiezas.addEventListener("change", () => {
    if (cambioPiezas.value === "si") {
      piezasContainer.classList.remove("hidden");
    } else {
      piezasContainer.classList.add("hidden");
    }
  });

  document.getElementById("formServicio").addEventListener("submit", e => {
    e.preventDefault();

    const data = {
      cliente: cliente.value === "otro" ? otroInput.value : cliente.value,
      tipo: tipo.value,
      titulo: titulo.value,
      detalles: document.getElementById("detalles").value,
      firma: document.getElementById("firma").value,
      tecnico: document.getElementById("tecnico").value,
      fecha: new Date().toLocaleDateString(),

      entrega: tipo.value === "entrega"
        ? {
            marca: marcaEntrega.value === "otro" ? marcaOtra.value : marcaEntrega.value,
            modelo: document.getElementById("modeloEntrega").value,
            serie: document.getElementById("serieEntrega").value,
            cambio: cambioPiezas.value,
            pieza: cambioPiezas.value === "si"
              ? {
                  tipo: document.getElementById("tipoPieza").value,
                  vieja: document.getElementById("serieVieja").value,
                  nueva: document.getElementById("serieNueva").value
                }
              : null
          }
        : null
    };

    localStorage.setItem("reporteData", JSON.stringify(data));
    window.location.href = "reportes.html";

  });

});
