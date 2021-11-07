const { Model, DataTypes } = require("sequelize");

class Item extends Model {
	/**
	 * Cria as associações entre as tabelas do banco de dados
	 * @param {import("./index")} models Modelos das tabelas do banco de dados
	 */
	static associate (models) {
		// Item.hasMany(models.ItemPedido, { as: "itensPedidos", foreignKey: "idItem" });
		// Item.hasMany(models.ItemPedido, { as: "pizzasComplementares", foreignKey: "idPizzaComplementar" });
		// Item.belongsToMany(models.Pedido, { as: "pedidos", foreignKey: "idItem", through: models.ItemPedido });
	}
}

/**
 * Cria o modelo da tabela itens
 * @param {import("sequelize/types").Sequelize} sequelize
 */
function initItem (sequelize) {
	Item.init({
		idItem: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		descricao: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		preco: {
			type: DataTypes.DECIMAL(5, 2),
			allowNull: false
		},
		tipo: {
			type: DataTypes.ENUM("BEBIDA", "COMBO", "PIZZA"),
			allowNull: false
		}
	}, {
		sequelize,
		paranoid: false,
		timestamps: false,
		underscored: true,
		modelName: "Item",
		tableName: "itens"
	});

	return Item;
}

module.exports = initItem;
