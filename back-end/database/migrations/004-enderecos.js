"use strict";

module.exports = {
	/**
	 * Função de aplicação da migração
	 * @param {import("sequelize/types").QueryInterface} queryInterface
	 * @param {import("sequelize/types").DataTypes} Sequelize
	 */
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("enderecos", {
			id_endereco: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			id_cliente: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: "clientes", key: "id_cliente" }
			},
			id_bairro: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: "bairros", key: "id_bairro" }
			},
			cep: {
				type: Sequelize.STRING(31),
				allowNull: false
			},
			rua: {
				type: Sequelize.STRING(255),
				allowNull: false
			},
			numero: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			apartamento: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false
			}
		});
	},

	/**
	 * Função que desfaz a migração
	 * @param {import("sequelize/types").QueryInterface} queryInterface
	 * @param {import("sequelize/types").Sequelize} Sequelize
	 */
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("enderecos");
	}
};
