"use strict";

module.exports = {
	/**
	 * Função de aplicação da migração
	 * @param {import("sequelize/types").QueryInterface} queryInterface
	 * @param {import("sequelize/types").DataTypes} Sequelize
	 */
	up: async (queryInterface, Sequelize) => {
		await queryInterface.changeColumn("itens_pedidos", "id_pizza_complementar", {
			type: Sequelize.INTEGER,
			allowNull: true
		});
	},

	/**
	 * Função que desfaz a migração
	 * @param {import("sequelize/types").QueryInterface} queryInterface
	 * @param {import("sequelize/types").Sequelize} Sequelize
	 */
	down: async (queryInterface, Sequelize) => {
		await queryInterface.changeColumn("itens_pedidos", "id_pizza_complementar", {
			type: Sequelize.INTEGER,
			allowNull: false
		});
	}
};
