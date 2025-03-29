console.log("Main.js");
require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.urlencoded());
app.use(express.json());

const authRouter = require("./src/routes/auth");
const productRouter = require("./src/routes/product");
const transactionsRouter = require("./src/routes/transactions");
app.use("/auth", authRouter);
app.use("/product", productRouter);
app.use("/transactions", transactionsRouter);

const run = async () => {
	await require("./src/database/db").sequelize.sync();
	app.listen(process.env.PORT, () =>
		console.log(`Listening on PORT ${process.env.PORT}`),
	);
};

run();
