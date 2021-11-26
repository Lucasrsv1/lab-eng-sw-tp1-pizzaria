const { body } = require("express-validator");
const { sign, verify } = require("jsonwebtoken");

const { isRequestInvalid } = require("../utils/http-validation");
const db = require("../database/models");
const { sha512 } = require("js-sha512");

const KEY_TOKEN = "j2*pA73sGZ%8XWSdhVmoW28zeg^Qu@9X";
const EXPIRATION_TIME = 3 * 24 * 60 * 60;

function ensureAuthorized (req, res, next) {
	const token = req.headers["x-access-token"];
	if (!token) {
		res.status(403).json({ message: "Acesso não autorizado. A sessão do usuário é inválida." });
		return res.end();
	}

	verify(token, KEY_TOKEN, (error, user) => {
		if (error) {
			res.status(403).json({
				message: "Acesso não autorizado. A sessão do usuário é inválida.",
				expired: error.name === "TokenExpiredError",
				error
			});
			return res.end();
		}

		res.locals.user = user;
		next(null);
	});
}

async function login (req, res) {
	if (isRequestInvalid(req, res)) return;

	try {
		// Faz o hash da senha antes de fazer o login
		const password = sha512(req.body.password);

		const user = await db.Cliente.findOne({
			attributes: ["idCliente", "nome", "cpf", "email", "telefone"],
			where: {
				email: req.body.email,
				senha: password
			}
		});

		if (!user) {
			res.status(403).json({ message: "E-mail ou senha incorretos." });
			return;
		}

		const plainUser = user.toJSON();
		const token = sign(plainUser, KEY_TOKEN, { expiresIn: EXPIRATION_TIME });
		res.status(200).json({ token });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Erro ao fazer login.", error });
	}
}

login.validations = [
	body("email").isEmail().withMessage("E-mail inválido.").normalizeEmail(),
	body("password").isString().withMessage("Senha inválida.")
];

module.exports = {
	ensureAuthorized,
	login
};
