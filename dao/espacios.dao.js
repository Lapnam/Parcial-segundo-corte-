const db = require('../services/patrimonio.service');

const create = async (req, res) => {
  try {
    const { nombre, capacidad, estado, dependencia } = req.body;

    if (!nombre || !capacidad || !estado) {
      return res.status(400).json({ error: "Datos incompletos" });
    }

    const [result] = await db.query(
      'INSERT INTO espacios (nombre, capacidad, estado, dependencia) VALUES (?, ?, ?, ?)',
      [nombre, capacidad, estado, dependencia]
    );

    res.status(201).json({ id: result.insertId, nombre });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { create };