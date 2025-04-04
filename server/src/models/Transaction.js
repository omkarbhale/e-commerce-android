module.exports = (sequelize, DataTypes) => {
	const Transaction = sequelize.define("Transaction", {
		productId: {
			type: DataTypes.INTEGER,
			references: {
				model: sequelize.models.Product,
				key: "id",
			},
			allowNull: false,
		},
		customerId: {
			type: DataTypes.INTEGER,
			references: {
				model: sequelize.models.Customer, // Updated to use sequelize.models
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

	Transaction.associate = (models) => {
		Transaction.belongsTo(models.Product, { foreignKey: "productId" });
		Transaction.belongsTo(models.Customer, { foreignKey: "customerId" });
	};

	return Transaction;
};
