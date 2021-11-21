"use strict";

module.exports = {
	/**
	 * Função de aplicação da migração
	 * @param {import("sequelize/types").QueryInterface} queryInterface
	 * @param {import("sequelize/types").DataTypes} Sequelize
	 */
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("itens_pedidos", {
			id_item_pedido: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			id_item: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: "itens", key: "id_item" }
			},
			id_pedido: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: "pedidos", key: "id_pedido" }
			},
			quantidade: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 1
			},
			meia_pizza: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			id_pizza_complementar: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: "itens", key: "id_item" }
			}
		});
	},

	/**
	 * Função que desfaz a migração
	 * @param {import("sequelize/types").QueryInterface} queryInterface
	 * @param {import("sequelize/types").Sequelize} Sequelize
	 */
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("itens_pedidos");
	}
};
