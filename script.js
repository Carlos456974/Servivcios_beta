document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formServicio");
  const clienteSelect = document.getElementById("cliente");
  const otroClienteContainer = document.getElementById("otroClienteContainer");
  const otroClienteInput = document.getElementById("otroCliente");

  // Mostrar campo "otroCliente" si elige "Otro"
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

  // Manejar envío del formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      cliente: clienteSelect.value === "otro" ? otroClienteInput.value : clienteSelect.value,
      tipo: document.getElementById("tipo").value,
      titulo: document.getElementById("titulo").value,
      detalles: document.getElementById("detalles").value,
      firma: document.getElementById("firma").value,
      fecha: new Date().toLocaleDateString()
    };

    // Guardar en localStorage
    localStorage.setItem("reporteData", JSON.stringify(data));

    // Redirigir a la página de reportes
    window.location.href = "reportes.html";
  });
});

