const { Router } = require("express");

const CardapioController = require("../../controllers/cardapio");

const router = Router();

router.get("/", CardapioController.obtemCardapio);

module.exports = router;
