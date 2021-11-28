const { Router } = require("express");

const EnderecoController = require("../../controllers/endereco");

const router = Router();

router.get("/", EnderecoController.obtemEnderecoCliente.validations, EnderecoController.obtemEnderecoCliente);

router.post("/", EnderecoController.cadastraEndereco.validations, EnderecoController.cadastraEndereco);

module.exports = router;
