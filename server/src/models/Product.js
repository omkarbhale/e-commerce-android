module.exports = (sequelize, DataTypes) => {
	const Business = require("./Business");

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
			onDelete: "CASCADE",
			allowNull: false,
		},
	});

	Product.associate = (models) => {
		Product.hasMany(models.Transaction, {
			foreignKey: "productId",
			onDelete: "CASCADE",
		});
	};

	return Product;
};
