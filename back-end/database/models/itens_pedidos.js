const { Model, DataTypes } = require("sequelize");

class ItemPedido extends Model {
	/**
	 * Cria as associações entre as tabelas do banco de dados
	 * @param {import("./index")} models Modelos das tabelas do banco de dados
	 */
	static associate (models) {
		ItemPedido.belongsTo(models.Item, { as: "item", foreignKey: "idItem" });
		ItemPedido.belongsTo(models.Pedido, { as: "pedido", foreignKey: "idPedido" });
		ItemPedido.belongsTo(models.Item, { as: "pizzaComplementar", foreignKey: "idPizzaComplementar" });
	}
}

/**
 * Cria o modelo da tabela itens
 * @param {import("sequelize/types").Sequelize} sequelize
 */
function initItemPedido (sequelize) {
	ItemPedido.init({
		idItemPedido: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		idItem: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		idPedido: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		quantidade: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 1
		},
		meiaPizza: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		idPizzaComplementar: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, {
		sequelize,
		paranoid: false,
		timestamps: false,
		underscored: true,
		modelName: "ItemPedido",
		tableName: "itens_pedidos"
	});

	return ItemPedido;
}

module.exports = initItemPedido;
