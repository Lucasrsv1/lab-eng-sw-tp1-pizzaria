"use strict";

module.exports = {
	/**
	 * Função de aplicação da migração
	 * @param {import("sequelize/types").QueryInterface} queryInterface
	 * @param {import("sequelize/types").DataTypes} Sequelize
	 */
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("clientes", {
			id_cliente: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			nome: {
				type: Sequelize.STRING(255),
				allowNull: false
			},
			cpf: {
				type: Sequelize.STRING(31),
				allowNull: false,
				unique: true
			},
			email: {
				type: Sequelize.STRING(127),
				allowNull: false,
				unique: true
			},
			senha: {
				type: Sequelize.STRING(255),
				allowNull: false
			},
			telefone: {
				type: Sequelize.STRING(31),
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
		await queryInterface.dropTable("clientes");
	}
};
