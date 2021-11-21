const { body } = require("express-validator");
const { UniqueConstraintError } = require("sequelize");

const db = require("../database/models");

async function cadastrar (req, res) {
	const novoCliente = req.body;
	try {
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
	body("cpf").isString().isLength({ min: 11 }).withMessage("CPF inválido."),
	body("email").isEmail().withMessage("E-mail inválido.").normalizeEmail(),
	body("senha").isString().isLength({ min: 127 }).withMessage("Senha inválida."),
	body("telefone").isString().isLength({ min: 8 }).withMessage("Telefone inválido.")
];

module.exports = { cadastrar };
