module.exports = (sequelize, DataTypes) => {
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
		address: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		/* Can add more fields such as address, category, etc. */
	});

	Business.associate = (models) => {
		Business.hasMany(models.Product, {
			foreignKey: "businessId",
			onDelete: "CASCADE",
		});
	};

	return Business;
};
