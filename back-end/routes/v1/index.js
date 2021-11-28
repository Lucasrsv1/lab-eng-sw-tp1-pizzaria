const { Router } = require("express");

const bairrosRouter = require("./bairros");
const enderecoRouter = require("./endereco");
const loginRouter = require("./login");

const router = Router();

// ============= Rotas ============= //

router.use("/bairros", bairrosRouter);
router.use("/endereco", enderecoRouter);
router.use(loginRouter);

module.exports = router;
