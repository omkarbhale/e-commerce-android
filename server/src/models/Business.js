// TODO: remove testing user and implement other models
const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");

const Business = sequelize.define("Business", {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	/* Can add more fields such as address, category, etc. */
});

module.exports = Business;
