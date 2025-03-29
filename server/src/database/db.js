const { Sequelize, DataTypes } = require("sequelize");
const fs = require("fs");
const path = require("path");

const DATABASE_PATH = "./db.sqlite";

const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: DATABASE_PATH,
});

const models = {
	Customer: require("../models/Customer")(sequelize, DataTypes),
	Product: require("../models/Product")(sequelize, DataTypes),
	Transaction: require("../models/Transaction")(sequelize, DataTypes),
	Business: require("../models/Business")(sequelize, DataTypes),
};

// Call associate methods
Object.keys(models).forEach((modelName) => {
	if (models[modelName].associate) {
		models[modelName].associate(models);
	}
});

module.exports = { sequelize, models };
