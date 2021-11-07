"use strict";

module.exports = {
	/**
	 * Função de aplicação da migração
	 * @param {import("sequelize/types").QueryInterface} queryInterface
	 * @param {import("sequelize/types").DataTypes} Sequelize
	 */
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("itens", {
			id_item: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			descricao: {
				type: Sequelize.STRING(255),
				allowNull: false
			},
			preco: {
				type: Sequelize.DECIMAL(5, 2),
				allowNull: false
			},
			tipo: {
				type: Sequelize.ENUM("BEBIDA", "COMBO", "PIZZA"),
				allowNull: false
			}
		});
	},

	/**
	 * Função que desfaz a migração
	 * @param {import("sequelize/types").QueryInterface} queryInterface
	 * @param {import("sequelize/types").Sequelize} Sequelize
	 */
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("itens");
	}
};
