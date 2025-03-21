const { Sequelize } = require("sequelize");

module.exports = {
    sequelize: new Sequelize({
        dialect: "sqlite",
        storage: "./db.sqlite"
    })
}