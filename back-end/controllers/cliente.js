const { body } = require("express-validator");
const { sha512 } = require("js-sha512");
const { UniqueConstraintError } = require("sequelize");

const db = require("../database/models");
const { isRequestInvalid } = require("../utils/http-validation");

async function cadastrar (req, res) {
	if (isRequestInvalid(req, res)) return;

	const novoCliente = req.body;
	try {
		// Faz o hash da senha antes de fazer o cadastro
		novoCliente.senha = sha512(novoCliente.senha);

		const cliente = (await db.Cliente.create(novoCliente)).toJSON();
		delete cliente.senha;
		res.status(200).json(cliente);
	} catch (err) {
		if (err instanceof UniqueConstraintError) {
			res.status(400).json({ message: "Este e-mail ou CPF já está cadastrado." });
			return;
		}

		console.error(err);
		res.status(500).json(err.message);
	}
}

cadastrar.validations = [
	body("nome").isString().withMessage("Nome inválido."),
	body("email").isEmail().withMessage("E-mail inválido.").normalizeEmail(),
	body("senha").isString().isLength({ min: 127 }).withMessage("Senha inválida."),
	body("cpf").isString().isLength({ min: 14 }).withMessage("CPF inválido."),
	body("telefone").isString().isLength({ min: 8 }).withMessage("Telefone inválido.")
];

module.exports = { cadastrar };
