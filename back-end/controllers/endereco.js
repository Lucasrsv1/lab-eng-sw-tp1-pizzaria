const { body } = require("express-validator");

const db = require("../database/models");
const { isRequestInvalid } = require("../utils/http-validation");
const { ensureAuthorized } = require("./login");

async function obtemEnderecoCliente (req, res) {
	try {
		const endereco = await db.Endereco.findOne({
			attributes: ["idEndereco", "idCliente", "idBairro", "cep", "rua", "numero", "apartamento"],
			include: [{
				association: "bairro",
				attributes: ["idBairro", "nome"]
			}],
			where: {
				idCliente: res.locals.user.idCliente
			}
		});

		if (!endereco)
			return res.status(404).json({ message: "Você ainda não possui endereço cadastrado!" });

		res.status(200).json(endereco);
	} catch (err) {
		console.error(err);
		res.status(500).json(err.message);
	}
}

obtemEnderecoCliente.validations = ensureAuthorized;

async function cadastraEndereco (req, res) {
	if (isRequestInvalid(req, res)) return;

	const novoEndereco = {
		idCliente: res.locals.user.idCliente,
		...req.body
	};

	try {
		const endereco = (await db.Endereco.create(novoEndereco)).toJSON();
		res.status(200).json(endereco);
	} catch (err) {
		console.error(err);
		res.status(500).json(err.message);
	}
}

cadastraEndereco.validations = [
	ensureAuthorized,
	body("idBairro").isNumeric().withMessage("A ID do bairro é inválida.").toInt(),
	body("cep").isString().isLength({ min: 9 }).withMessage("CEP inválido."),
	body("rua").isString().withMessage("Rua inválida."),
	body("numero").isNumeric().withMessage("Número inválido.").toInt(),
	body("apartamento").isBoolean({ strict: true }).withMessage("Apartamento inválido.").toBoolean()
];

module.exports = { obtemEnderecoCliente, cadastraEndereco };
