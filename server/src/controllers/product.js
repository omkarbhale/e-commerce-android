const { models } = require("../database/db");

const { Product } = models;

const addProduct = async (req, res) => {
	try {
		const { name, price, businessId } = req.body;

		if (!name || !price || !businessId) {
			return res.status(400).json({ error: "All fields are required" });
		}

		const product = await Product.create({ name, price, businessId });
		res.status(201).json(product);
	} catch (error) {
		res.status(500).json({
			error: "Failed to add product",
			details: error.message,
		});
	}
};

const getAllProducts = async (req, res) => {
	try {
		const products = await Product.findAll();
		res.status(200).json(products);
	} catch (error) {
		res.status(500).json({
			error: "Failed to fetch products",
			details: error.message,
		});
	}
};

const getProductsByBusinessId = async (req, res) => {
	try {
		const { businessId } = req.params;

		if (!businessId) {
			return res.status(400).json({ error: "Business ID is required" });
		}

		const products = await Product.findAll({ where: { businessId } });
		res.status(200).json(products);
	} catch (error) {
		res.status(500).json({
			error: "Failed to fetch products",
			details: error.message,
		});
	}
};

module.exports = {
	addProduct,
	getAllProducts,
	getProductsByBusinessId,
};
