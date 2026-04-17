const express = require("express");
const espaciosRoutes = require("./routes/espacios.routes");
const reservasRoutes = require("./routes/reservas.routes");

const PORT = 5000;
const api = express();

api.use(express.json());
api.use(express.static("public"));

api.use("/espacios", espaciosRoutes);
api.use("/reservas", reservasRoutes);

api.listen(PORT, () => {
    console.log("Server running in http://localhost:5000");
});

const db1 = require('./services/patrimonio.service');
const db2 = require('./services/reservas.service');

(async () => {
    try {
        await db1.query("SELECT 1");
        console.log(" Conectado a patrimonio");

        await db2.query("SELECT 1");
        console.log(" Conectado a reservas");

    } catch (err) {
        console.error(" Error de conexión:", err.message);
    }
})();