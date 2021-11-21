"use strict";

const itens = [
	{ descricao: "Margherita", preco: 26.00, tipo: "PIZZA" },
	{ descricao: "Portuguesa", preco: 28.90, tipo: "PIZZA" },
	{ descricao: "Calabresa", preco: 28.90, tipo: "PIZZA" },
	{ descricao: "Italiana", preco: 28.90, tipo: "PIZZA" },
	{ descricao: "Frango com Catupiri", preco: 33.50, tipo: "PIZZA" },
	{ descricao: "À Moda", preco: 33.50, tipo: "PIZZA" },
	{ descricao: "Cinco Queijos", preco: 34.75, tipo: "PIZZA" },
	{ descricao: "Cinco Carnes", preco: 34.75, tipo: "PIZZA" },
	{ descricao: "Bacon", preco: 34.75, tipo: "PIZZA" },
	{ descricao: "Chocolate", preco: 36.00, tipo: "PIZZA" },

	{ descricao: "Pepsi (2 litros)", preco: 12.50, tipo: "BEBIDA" },
	{ descricao: "Mate Couro (1 litro)", preco: 7.00, tipo: "BEBIDA" },
	{ descricao: "Água (500ml)", preco: 3.50, tipo: "BEBIDA" },

	{ descricao: "2 Pizzas de Calabresa", preco: 50.00, tipo: "COMBO" },
	{ descricao: "2 Pizzas (Frango com Catupiri + À Moda)", preco: 60.50, tipo: "COMBO" },
	{ descricao: "3 Pizzas (Frango com Catupiri + Cinco Carnes + Bacon) e 1 Pepsi", preco: 105.00, tipo: "COMBO" }
];

module.exports = {
	/**
	 * Função de aplicação da semente
	 * @param {import("sequelize").QueryInterface} queryInterface
	 * @param {import("sequelize").DataTypes} Sequelize
	 */
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert("itens", itens);
	},

	/**
	 * Função que desfaz a aplicação da semente
	 * @param {import("sequelize").QueryInterface} queryInterface
	 * @param {import("sequelize").Sequelize} Sequelize
	 */
	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("itens", {
			[Sequelize.Op.or]: itens
		});
	}
};
