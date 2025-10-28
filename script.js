document.addEventListener("DOMContentLoaded", () => {
    const tipoServicio = document.getElementById("tipo");
    const categoriaSelect = document.getElementById("categoria");
    const form = document.getElementById("registroTecnico");

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

    // Cargar categorías por defecto (software)
    function cargarCategorias(tipo) {
        categoriaSelect.innerHTML = "";
        categorias[tipo].forEach(cat => {
            const option = document.createElement("option");
            option.value = cat;
            option.textContent = cat;
            categoriaSelect.appendChild(option);
        });
    }

    tipoServicio.addEventListener("change", () => {
        cargarCategorias(tipoServicio.value);
    });

    // Inicialización
    cargarCategorias("software");

    // Simulación de guardado
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Reporte guardado (modo demo, sin base de datos aún)");
        form.reset();
        cargarCategorias("software");
    });
});
