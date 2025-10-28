// Registro simulado
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registroTecnico");
    if(form){
        form.addEventListener("submit", function(e){
            e.preventDefault();
            alert("Registro simulado (aún no conectado a la base de datos)");
            form.reset();
        });
    }
});
