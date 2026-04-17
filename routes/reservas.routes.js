const express = require("express");
const router = express.Router();
const reservasDao = require("../dao/reservas.dao");

router.post('/', reservasDao.create);
router.get('/:id', reservasDao.getById);

module.exports = router;