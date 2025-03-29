const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");
const Transaction = require("./Transaction");

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

Customer.hasMany(Transaction, {
	foreignKey: "customerId",
	onDelete: "CASCADE",
});
Transaction.belongsTo(Customer, { foreignKey: "customerId" });
Customer.hasMany(Transaction, {
	foreignKey: "customerId",
	onDelete: "CASCADE",
});

module.exports = Customer;
