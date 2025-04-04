const { models } = require("../database/db");
const { Product, Transaction } = models;

const buyProduct = async (req, res) => {
	try {
		const { productId, customerId, quantity } = req.body;

		if (!productId || !customerId || !quantity) {
			return res.status(400).json({ error: "All fields are required" });
		}

		const product = await Product.findByPk(productId);
		if (!product) {
			return res.status(404).json({ error: "Product not found" });
		}

		const totalPrice = product.price * quantity;

		const transaction = await Transaction.create({
			productId,
			customerId,
			quantity,
			totalPrice,
		});

		res.status(201).json(transaction);
	} catch (error) {
		res.status(500).json({
			error: "Failed to complete transaction",
			details: error.message,
		});
	}
};

const getCustomerTransactions = async (req, res) => {
	try {
		const { customerId } = req.params;

		if (!customerId) {
			return res.status(400).json({ error: "Customer ID is required" });
		}

		const transactions = await Transaction.findAll({
			where: { customerId },
			include: [{ model: Product, attributes: ["name", "price"] }],
			attributes: [
				"id",
				"productId",
				"quantity",
				"totalPrice",
				"createdAt",
			],
		});

		const formattedTransactions = transactions.map((transaction) => ({
			title: `${transaction.Product.name}`,
			quantity: transaction.quantity,
			totalPrice: transaction.totalPrice,
			date: transaction.createdAt.toISOString(), // Ensure full datetime precision
			productName: transaction.Product.name,
			productPrice: transaction.Product.price,
		}));

		res.status(200).json(formattedTransactions);
	} catch (error) {
		res.status(500).json({
			error: "Failed to fetch transactions",
			details: error.message,
		});
	}
};

module.exports = {
	buyProduct,
	getCustomerTransactions,
};
