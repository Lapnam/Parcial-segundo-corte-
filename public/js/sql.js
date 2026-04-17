/// 🔹 ===== REGISTRAR ESPACIO =====
const btnEspacio = document.getElementById("crearEspacioBtn");

btnEspacio.addEventListener('click', async function () {
    const data = {
        nombre: document.getElementById("nombre").value,
        capacidad: document.getElementById("capacidad").value,
        estado: document.getElementById("estado").value,
        dependencia: document.getElementById("dependencia").value
    };

    try {
        const response = await fetch('/espacios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        document.getElementById('resultadoEspacio').innerText = JSON.stringify(result);

    } catch (error) {
        console.error(error);
    }
});


// 🔹 ===== CREAR RESERVA =====
const btnReserva = document.getElementById("crearReservaBtn");

btnReserva.addEventListener('click', async function () {
    const data = {
        espacio_id: document.getElementById("espacio_id").value,
        fecha: document.getElementById("fecha").value,
        hora_inicio: document.getElementById("hora_inicio").value,
        hora_fin: document.getElementById("hora_fin").value,
        aforo: document.getElementById("aforo").value
    };

    try {
        const response = await fetch('/reservas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        document.getElementById('resultadoReserva').innerText = JSON.stringify(result);

    } catch (error) {
        console.error(error);
    }
});


// 🔹 ===== CONSULTAR RESERVA =====
const btnConsultar = document.getElementById("consultarReservaBtn");

btnConsultar.addEventListener('click', async function () {
    const id = document.getElementById("reserva_id").value;

    try {
        const response = await fetch(`/reservas/${id}`);
        const data = await response.json();

        const container = document.getElementById("resultadoConsulta");
        container.innerHTML = "";

        if (!data || data.error) {
            container.innerHTML = "<li>No encontrada</li>";
            return;
        }

        Object.entries(data).forEach(([key, value]) => {
            const li = document.createElement("li");
            li.textContent = `${key}: ${value}`;
            container.appendChild(li);
        });

    } catch (error) {
        console.error(error);
    }
});