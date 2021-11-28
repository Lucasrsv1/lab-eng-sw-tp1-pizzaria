const { body, check } = require("express-validator");

const db = require("../database/models");
const { isRequestInvalid } = require("../utils/http-validation");
const { ensureAuthorized } = require("./login");

async function cadastraPedido (req, res) {
	if (isRequestInvalid(req, res)) return;

	try {
		const novoPedido = {
			idCliente: res.locals.user.idCliente,
			valorTotal: req.body.valorTotal
		};

		const pedido = (await db.Pedido.create(novoPedido)).toJSON();

		const itens = req.body.itens.map(i => ({ idPedido: pedido.idPedido, ...i }));
		const itensPedidos = await db.ItemPedido.bulkCreate(itens);

		pedido.itensPedidos = itensPedidos;
		res.status(200).json(pedido);
	} catch (err) {
		console.error(err);
		res.status(500).json(err.message);
	}
}

cadastraPedido.validations = [
	ensureAuthorized,
	body("valorTotal").isNumeric().withMessage("O valor total do pedido é inválido.").toFloat(),
	check("itens.*.idItem").isNumeric().withMessage("A ID do item é inválida.").toInt(),
	check("itens.*.quantidade").isNumeric().withMessage("A quantidade de algum item é inválida.").toInt(),
	check("itens.*.meiaPizza").isBoolean({ strict: true }).withMessage("Meia pizza inválida.").toBoolean(),
	check("itens.*.idPizzaComplementar").optional().isNumeric().withMessage("A ID de alguma pizza é inválida.").toInt()
];

module.exports = { cadastraPedido };
