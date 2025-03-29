const { Op } = require("sequelize");
const Product = require("../models/Product");
const Transaction = require("../models/Transaction");

const getBusinessDashboard = async (req, res) => {
	try {
		const { businessId } = req.params;

		if (!businessId) {
			return res.status(400).json({ error: "Business ID is required" });
		}

		const totalProductsSold = await Transaction.sum("quantity", {
			include: {
				model: Product,
				where: { businessId },
			},
		});

		const totalRevenue = await Transaction.sum("totalPrice", {
			include: {
				model: Product,
				where: { businessId },
			},
		});

		const oneMonthAgo = new Date();
		oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

		const revenuePastMonth = await Transaction.sum("totalPrice", {
			include: {
				model: Product,
				where: { businessId },
			},
			where: {
				createdAt: { [Op.gte]: oneMonthAgo },
			},
		});

		const topProducts = await Transaction.findAll({
			attributes: [
				"productId",
				[sequelize.fn("SUM", sequelize.col("quantity")), "totalSold"],
			],
			include: {
				model: Product,
				where: { businessId },
				attributes: ["name"],
			},
			group: ["productId", "Product.id"],
			order: [[sequelize.literal("totalSold"), "DESC"]],
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
