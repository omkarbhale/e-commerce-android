// TODO: remove testing user and implement other models
const {DataTypes} = require("sequelize");
const { sequelize } = require("../database/db");

const User = sequelize.define(
    'User',
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
        },
    },
);

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

module.exports = User;