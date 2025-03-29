const Transaction = require("../models/Transaction");
const Product = require("../models/Product");

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
		});

		res.status(200).json(transactions);
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
