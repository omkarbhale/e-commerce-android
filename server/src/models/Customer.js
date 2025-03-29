const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");

const Customer = sequelize.define("Customer", {
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

module.exports = Customer;
