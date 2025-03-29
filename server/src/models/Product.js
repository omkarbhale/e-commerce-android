module.exports = (sequelize, DataTypes) => {
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
				model: "Businesses", // Name of the table in the database
				key: "id",
			},
			onDelete: "CASCADE",
			allowNull: false,
		},
	});

	Product.associate = (models) => {
		Product.belongsTo(models.Business, {
			foreignKey: "businessId",
			onDelete: "CASCADE",
		});
		Product.hasMany(models.Transaction, {
			foreignKey: "productId",
			onDelete: "CASCADE",
		});
	};

	return Product;
};
