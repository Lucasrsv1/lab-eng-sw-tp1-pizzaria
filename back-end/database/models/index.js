const Sequelize = require("sequelize");

const configs = require("../config/config");
const initItem = require("./itens");

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
	Item: initItem(sequelize)
};

// Cria o relacionamento da tabelas
db.Item.associate(db);

// Testa a conexão com o banco de dados
db.sequelize.authenticate()
	.then(_ => console.log("Database connected."))
	.catch(console.error);

module.exports = db;
