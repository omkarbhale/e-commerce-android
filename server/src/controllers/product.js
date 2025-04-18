const { models } = require("../database/db");

const { Product, Business } = models;

const addProduct = async (req, res) => {
	try {
		const { name, price, businessId } = req.body;

		if (!name || !price || !businessId) {
			return res.status(400).json({ error: "All fields are required" });
		}

		const business = await Business.findByPk(businessId);
		if (!business) {
			return res.status(404).json({
				error: "Business not found",
				details: `No business exists with ID ${businessId}`,
			});
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
		const products = await Product.findAll({
			include: [
				{
					model: Business,
					attributes: ["name"],
				},
			],
		});

		const productsWithBusiness = products.map((product) => ({
			id: product.id,
			name: product.name,
			price: product.price,
			businessName: product.Business.name,
		}));

		res.status(200).json(productsWithBusiness);
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

const getProductById = async (req, res) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({ error: "Product ID is required" });
		}

		const product = await Product.findByPk(id, {
			include: [
				{
					model: Business,
					attributes: ["name", "address", "phone"],
				},
			],
		});

		if (!product) {
			return res.status(404).json({ error: "Product not found" });
		}

		const productDetails = {
			id: product.id,
			name: product.name,
			price: product.price,
			businessName: product.Business.name,
			businessAddress: product.Business.address,
			businessPhone: product.Business.phone,
		};

		res.status(200).json(productDetails);
	} catch (error) {
		res.status(500).json({
			error: "Failed to fetch product details",
			details: error.message,
		});
	}
};

const deleteProduct = async (req, res) => {
	try {
		debugger;
		const { productId } = req.params;

		if (!productId) {
			return res.status(400).json({ error: "Product ID is required" });
		}

		const product = await Product.findByPk(productId);
		if (!product) {
			return res.status(404).json({ error: "Product not found" });
		}

		await product.destroy();
		res.status(200).json({ message: "Product deleted successfully" });
	} catch (error) {
		res.status(500).json({
			error: "Failed to delete product",
			details: error.message,
		});
	}
};

module.exports = {
	addProduct,
	getAllProducts,
	getProductsByBusinessId,
	deleteProduct,
	getProductById,
};
