const { Model, DataTypes } = require("sequelize");

class Bairro extends Model {
	/**
	 * Cria as associações entre as tabelas do banco de dados
	 * @param {import("./index")} models Modelos das tabelas do banco de dados
	 */
	static associate (models) {
		Bairro.hasMany(models.Endereco, { as: "enderecos", foreignKey: "idBairro" });
	}
}

/**
 * Cria o modelo da tabela itens
 * @param {import("sequelize/types").Sequelize} sequelize
 */
function initBairro (sequelize) {
	Bairro.init({
		idBairro: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		nome: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: true
		}
	}, {
		sequelize,
		paranoid: false,
		timestamps: false,
		underscored: true,
		modelName: "Bairro",
		tableName: "bairros"
	});

	return Bairro;
}

module.exports = initBairro;
