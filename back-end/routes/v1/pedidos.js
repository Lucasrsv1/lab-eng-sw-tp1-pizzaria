const { Router } = require("express");

const PedidosController = require("../../controllers/pedidos");

const router = Router();

router.post("/", PedidosController.cadastraPedido.validations, PedidosController.cadastraPedido);

module.exports = router;
