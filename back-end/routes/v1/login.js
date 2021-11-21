const { Router } = require("express");

const LoginController = require("../../controllers/login");
const ClienteController = require("../../controllers/cliente");

const router = Router();

router.post("/login", LoginController.login.validations, LoginController.login);

router.post("/cadastrar", ClienteController.cadastrar.validations, ClienteController.cadastrar);

module.exports = router;
