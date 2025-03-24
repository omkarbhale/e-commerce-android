const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const DATABASE_PATH = "./db.sqlite";
try {
	fs.rmSync(path.join(__filename, "..", "..", "..", DATABASE_PATH));
} catch (e) {}

module.exports = {
	sequelize: new Sequelize({
		dialect: "sqlite",
		storage: DATABASE_PATH,
	}),
};
