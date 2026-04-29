document.addEventListener("DOMContentLoaded", () => {

  const marcaEntrega = document.getElementById("marcaEntrega");
  const marcaOtroContainer = document.getElementById("marcaOtroContainer");
  const marcaOtra = document.getElementById("marcaOtra");

  const cambioPiezas = document.getElementById("cambioPiezas");
  const piezasContainer = document.getElementById("piezasContainer");

  // MARCA OTRO
  marcaEntrega.addEventListener("change", () => {
    if (marcaEntrega.value === "otro") {
      marcaOtroContainer.classList.remove("hidden");
      marcaOtra.required = true;
    } else {
      marcaOtroContainer.classList.add("hidden");
      marcaOtra.required = false;
      marcaOtra.value = "";
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

    if (marcaEntrega.value === "otro" && marcaOtra.value.trim() === "") {
      alert("Debes especificar la marca.");
      return;
    }

    const data = {
      cliente: document.getElementById("cliente").value,
      tipo: "entrega",
      detalles: document.getElementById("detalles").value,
      firma: document.getElementById("firma").value,
      tecnico: document.getElementById("tecnico").value,
      fecha: new Date().toLocaleDateString(),

      entrega: {
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
    };

    localStorage.setItem("reporteData", JSON.stringify(data));
    window.location.href = "reportes.html";

  });

});
