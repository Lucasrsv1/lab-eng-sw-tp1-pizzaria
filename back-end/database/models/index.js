const Sequelize = require("sequelize");

const configs = require("../config/config");
const initBairro = require("./bairros");
const initCliente = require("./clientes");
const initEndereco = require("./enderecos");
const initItem = require("./itens");
const initItemPedido = require("./itens_pedidos");
const initPedido = require("./pedidos");

const env = process.env.NODE_ENV || "development";
const config = configs[env];

let sequelize;
if (config.use_env_variable)
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
else
	sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {
	sequelize,
	Sequelize,
	Bairro: initBairro(sequelize),
	Cliente: initCliente(sequelize),
	Endereco: initEndereco(sequelize),
	Item: initItem(sequelize),
	ItemPedido: initItemPedido(sequelize),
	Pedido: initPedido(sequelize)
};

// Cria o relacionamento da tabelas
db.Bairro.associate(db);
db.Cliente.associate(db);
db.Endereco.associate(db);
db.Item.associate(db);
db.ItemPedido.associate(db);
db.Pedido.associate(db);

// Testa a conexão com o banco de dados
db.sequelize.authenticate()
	.then(_ => console.log("Database connected."))
	.catch(console.error);

module.exports = db;
