const db = require("../database/models");

async function obtemBairros (req, res) {
	try {
		const bairros = await db.Bairro.findAll({
			attributes: ["idBairro", "nome"]
		});

		res.status(200).json(bairros);
	} catch (err) {
		console.error(err);
		res.status(500).json(err.message);
	}
}

module.exports = { obtemBairros };
