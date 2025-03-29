const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");
const Business = require("./Business");
const Transaction = require("./Transaction");

const Product = sequelize.define("Product", {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	price: {
		type: DataTypes.BIGINT,
		allowNull: false,
	},
	businessId: {
		type: DataTypes.INTEGER,
		references: {
			model: Business,
			key: "id",
		},
		onDelete: "CASCADE", // Ensures related products are deleted if the business is deleted
		allowNull: false,
	},
});

Product.hasMany(Transaction, { foreignKey: "productId", onDelete: "CASCADE" });
Transaction.belongsTo(Product, { foreignKey: "productId" });
Product.hasMany(Transaction, { foreignKey: "productId", onDelete: "CASCADE" });

module.exports = Product;
