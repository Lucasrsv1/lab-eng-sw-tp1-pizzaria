const { Model, DataTypes, Sequelize } = require("sequelize");

class Pedido extends Model {
	/**
	 * Cria as associações entre as tabelas do banco de dados
	 * @param {import("./index")} models Modelos das tabelas do banco de dados
	 */
	static associate (models) {
		Pedido.belongsTo(models.Cliente, { as: "cliente", foreignKey: "idCliente" });
		Pedido.hasMany(models.ItemPedido, { as: "itensPedidos", foreignKey: "idPedido" });
		Pedido.belongsToMany(models.Item, { as: "itens", foreignKey: "idPedido", through: models.ItemPedido });
	}
}

/**
 * Cria o modelo da tabela itens
 * @param {import("sequelize/types").Sequelize} sequelize
 */
function initPedido (sequelize) {
	Pedido.init({
		idPedido: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		idCliente: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		dataHora: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: Sequelize.fn("NOW")
		},
		valorTotal:{
			type: DataTypes.DECIMAL(7, 2),
			allowNull: false
		}
	}, {
		sequelize,
		paranoid: false,
		timestamps: false,
		underscored: true,
		modelName: "Pedido",
		tableName: "pedidos"
	});

	return Pedido;
}

module.exports = initPedido;
