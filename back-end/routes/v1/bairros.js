const { Router } = require("express");

const BairrosController = require("../../controllers/bairros");

const router = Router();

router.get("/", BairrosController.obtemBairros);

module.exports = router;
