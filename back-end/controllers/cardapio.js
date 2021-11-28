const db = require("../database/models");

async function obtemCardapio (req, res) {
	try {
		const cardapio = await db.Item.findAll({
			attributes: ["idItem", "descricao", "preco", "tipo"],
			order: [["preco", "ASC"], ["descricao", "ASC"]],
			raw: true
		});

		for (const item of cardapio)
			item.preco = parseFloat(item.preco);

		res.status(200).json(cardapio);
	} catch (err) {
		console.error(err);
		res.status(500).json(err.message);
	}
}

module.exports = { obtemCardapio };
