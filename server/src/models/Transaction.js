const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");
const Product = require("./Product");
const Customer = require("./Customer");

const Transaction = sequelize.define("Transaction", {
	productId: {
		type: DataTypes.INTEGER,
		references: {
			model: Product,
			key: "id",
		},
		allowNull: false,
	},
	customerId: {
		type: DataTypes.INTEGER,
		references: {
			model: Customer,
			key: "id",
		},
		allowNull: false,
	},
	quantity: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	totalPrice: {
		type: DataTypes.BIGINT,
		allowNull: false,
	},
});

Transaction.belongsTo(Product, { foreignKey: "productId" });
Transaction.belongsTo(Customer, { foreignKey: "customerId" });

module.exports = Transaction;
