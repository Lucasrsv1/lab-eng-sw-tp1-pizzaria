const { Model, DataTypes } = require("sequelize");

class Cliente extends Model {
	/**
	 * Cria as associações entre as tabelas do banco de dados
	 * @param {import("./index")} models Modelos das tabelas do banco de dados
	 */
	static associate (models) {
		Cliente.hasOne(models.Endereco, { as: "endereco", foreignKey: "idCliente" });
		Cliente.hasMany(models.Pedido, { as: "pedidos", foreignKey: "idCliente" });
	}
}

/**
 * Cria o modelo da tabela itens
 * @param {import("sequelize/types").Sequelize} sequelize
 */
function initCliente (sequelize) {
	Cliente.init({
		idCliente: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		nome: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		cpf: {
			type: DataTypes.STRING(31),
			allowNull: false,
			unique: true
		},
		email: {
			type: DataTypes.STRING(127),
			allowNull: false,
			unique: true
		},
		senha: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		telefone: {
			type: DataTypes.STRING(31),
			allowNull: false
		}
	}, {
		sequelize,
		paranoid: false,
		timestamps: false,
		underscored: true,
		modelName: "Cliente",
		tableName: "clientes"
	});

	return Cliente;
}

module.exports = initCliente;
