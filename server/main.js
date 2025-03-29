console.log("Main.js");
require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.urlencoded());
app.use(express.json());

const authRouter = require("./src/routes/auth");
const productRouter = require("./src/routes/product");
const transactionsRouter = require("./src/routes/transactions");
const dashboardRouter = require("./src/routes/dashboard");
app.use("/auth", authRouter);
app.use("/product", productRouter);
app.use("/transactions", transactionsRouter);
app.use("/dashboard", dashboardRouter);

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

// Swagger configuration
const swaggerOptions = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "API Documentation",
			version: "1.0.0",
		},
	},
	apis: ["./src/routes/*.js"], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const run = async () => {
	await require("./src/database/db").sequelize.sync();
	app.listen(process.env.PORT, () =>
		console.log(`Listening on PORT ${process.env.PORT}`),
	);
};

run();
