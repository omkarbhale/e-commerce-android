module.exports = (sequelize, DataTypes) => {
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

	Customer.associate = (models) => {
		Customer.hasMany(models.Transaction, {
			foreignKey: "customerId",
			onDelete: "CASCADE",
		});
	};

	return Customer;
};
