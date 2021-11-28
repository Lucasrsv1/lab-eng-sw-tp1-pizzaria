const { Router } = require("express");

const bairrosRouter = require("./bairros");
const cardapioRouter = require("./cardapio");
const enderecoRouter = require("./endereco");
const pedidosRouter = require("./pedidos");
const loginRouter = require("./login");

const router = Router();

// ============= Rotas ============= //

router.use("/bairros", bairrosRouter);
router.use("/cardapio", cardapioRouter);
router.use("/endereco", enderecoRouter);
router.use("/pedidos", pedidosRouter);
router.use(loginRouter);

module.exports = router;
