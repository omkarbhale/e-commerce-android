console.log("Main.js");
require("dotenv").config();
const express = require("express");

const {sequelize} = require("./src/database/db");
const User = require("./src/models/User");

// TODO remove testing code
(async () => {
    await sequelize.sync();
    const jane = await User.create({
        firstName: "ok",
        lastName: "bye"
    });
    const users = await User.findAll();
    console.log(users);
})();


const app = express();
app.listen(process.env.PORT, () => console.log(`Listening on PORT ${process.env.PORT}`));