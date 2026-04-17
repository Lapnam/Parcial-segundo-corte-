const dbReservas = require('../services/reservas.service');
const dbPatrimonio = require('../services/patrimonio.service');

const create = async (req, res) => {
  try {
    const { espacio_id, fecha, hora_inicio, hora_fin, aforo } = req.body;

    // 🔹 1. Verificar espacio existe y está operativo
    const [espacio] = await dbPatrimonio.query(
      'SELECT * FROM espacios WHERE id = ? AND estado = "operativo"',
      [espacio_id]
    );

    if (espacio.length === 0) {
      return res.status(400).json({ error: "Espacio no existe o no está operativo" });
    }

    // 🔹 2. Validar capacidad
    if (aforo > espacio[0].capacidad) {
      return res.status(400).json({ error: "Aforo supera la capacidad" });
    }

    // 🔹 3. Validar solapamiento
    const [conflictos] = await dbReservas.query(
      `SELECT * FROM reservas 
       WHERE espacio_id = ?
       AND estado = 'aprobada'
       AND fecha = ?
       AND (hora_inicio < ? AND hora_fin > ?)`,
      [espacio_id, fecha, hora_fin, hora_inicio]
    );

    if (conflictos.length > 0) {
      return res.status(400).json({ error: "Ya existe una reserva en ese horario" });
    }

    // 🔹 4. Insertar reserva
    const [result] = await dbReservas.query(
      `INSERT INTO reservas (espacio_id, fecha, hora_inicio, hora_fin, aforo, estado)
       VALUES (?, ?, ?, ?, ?, 'pendiente')`,
      [espacio_id, fecha, hora_inicio, hora_fin, aforo]
    );

    res.status(201).json({ id: result.insertId, estado: "pendiente" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const [rows] = await dbReservas.query(
      'SELECT * FROM reservas WHERE id = ?',
      [req.params.id]
    );

    if (!rows[0]) return res.status(404).json({ error: "No encontrada" });

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { create, getById };