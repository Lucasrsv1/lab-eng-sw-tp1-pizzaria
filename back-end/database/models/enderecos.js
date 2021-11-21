const { Model, DataTypes } = require("sequelize");

class Endereco extends Model {
	/**
	 * Cria as associações entre as tabelas do banco de dados
	 * @param {import("./index")} models Modelos das tabelas do banco de dados
	 */
	static associate (models) {
		Endereco.belongsTo(models.Bairro, { as: "bairro", foreignKey: "idBairro" });
		Endereco.belongsTo(models.Cliente, { as: "cliente", foreignKey: "idCliente" });
	}
}

/**
 * Cria o modelo da tabela itens
 * @param {import("sequelize/types").Sequelize} sequelize
 */
function initEndereco (sequelize) {
	Endereco.init({
		idEndereco: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		idCliente: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		idBairro: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		cep: {
			type: DataTypes.STRING(31),
			allowNull: false
		},
		rua: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		numero: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		apartamento: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
	}, {
		sequelize,
		paranoid: false,
		timestamps: false,
		underscored: true,
		modelName: "Endereco",
		tableName: "enderecos"
	});

	return Endereco;
}

module.exports = initEndereco;
