const Sequelize = require("sequelize");
const configs = require("../config/config");

const env = process.env.NODE_ENV || "development";
const config = configs[env];

let sequelize;
if (process.env.FLASH_DATABASE)
	sequelize = new Sequelize(process.env.FLASH_DATABASE, config);
else
	sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {
	sequelize,
	Sequelize
	// Model: initModel(sequelize)
};

// Cria o relacionamento da tabelas
// db.Model.associate(db);

// Testa a conexão com o banco de dados
db.sequelize.authenticate()
	.then(_ => console.log("Database connected."))
	.catch(console.error);

module.exports = db;
