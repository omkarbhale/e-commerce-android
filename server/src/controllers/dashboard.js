const { Op, fn, col, literal } = require("sequelize");
const { models } = require("../database/db");

const { Product, Transaction } = models;

const getBusinessDashboard = async (req, res) => {
	try {
		const { businessId } = req.params;

		if (!businessId) {
			return res.status(400).json({ error: "Business ID is required" });
		}

		const totalProductsSold = await Transaction.sum("quantity", {
			where: {
				"$Product.businessId$": businessId,
			},
			include: [
				{
					model: Product,
					attributes: [],
				},
			],
		});

		const totalRevenue = await Transaction.sum("totalPrice", {
			where: {
				"$Product.businessId$": businessId,
			},
			include: [
				{
					model: Product,
					attributes: [],
				},
			],
		});

		const oneMonthAgo = new Date();
		oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

		const revenuePastMonth = await Transaction.sum("totalPrice", {
			where: {
				"$Product.businessId$": businessId,
				createdAt: { [Op.gte]: oneMonthAgo },
			},
			include: [
				{
					model: Product,
					attributes: [],
				},
			],
		});

		const topProducts = await Transaction.findAll({
			attributes: [
				"productId",
				[fn("SUM", col("quantity")), "totalSold"],
			],
			where: {
				"$Product.businessId$": businessId,
			},
			include: [
				{
					model: Product,
					attributes: ["name"],
				},
			],
			group: ["productId", "Product.id"],
			order: [[literal("totalSold"), "DESC"]],
			limit: 3,
		});

		res.status(200).json({
			totalProductsSold: totalProductsSold || 0,
			totalRevenue: totalRevenue || 0,
			revenuePastMonth: revenuePastMonth || 0,
			topProducts: topProducts.map((item) => ({
				productId: item.productId,
				productName: item.Product.name,
				totalSold: item.dataValues.totalSold,
			})),
		});
	} catch (error) {
		res.status(500).json({
			error: "Failed to fetch dashboard data",
			details: error.message,
		});
	}
};

module.exports = { getBusinessDashboard };
