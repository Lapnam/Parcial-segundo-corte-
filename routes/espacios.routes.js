const express = require("express");
const router = express.Router();
const espaciosDao = require("../dao/espacios.dao");

router.post('/', espaciosDao.create);

module.exports = router;