console.log("Main.js");
require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.urlencoded());
app.use(express.json());

const authRouter = require("./src/routes/auth");
app.use("/auth", authRouter);

const run = async () => {
	await require("./src/database/db").sequelize.sync();
	app.listen(process.env.PORT, () =>
		console.log(`Listening on PORT ${process.env.PORT}`),
	);
};

run();
