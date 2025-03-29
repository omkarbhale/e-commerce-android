const router = require("express").Router();
const { getBusinessDashboard } = require("../controllers/dashboard");

/**
 * @swagger
 * /dashboard/business/{businessId}:
 *   get:
 *     summary: Get business dashboard metrics
 *     description: Fetch metrics such as total products sold, total revenue, revenue in the past month, and top products for a specific business.
 *     parameters:
 *       - in: path
 *         name: businessId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the business
 *     responses:
 *       200:
 *         description: Successfully fetched dashboard metrics
 *         content:
 *           application/json:
 *             example:
 *               totalProductsSold: 150
 *               totalRevenue: 5000.75
 *               revenuePastMonth: 1200.50
 *               topProducts:
 *                 - productId: "1"
 *                   productName: "Product A"
 *                   totalSold: 50
 *                 - productId: "2"
 *                   productName: "Product B"
 *                   totalSold: 30
 *                 - productId: "3"
 *                   productName: "Product C"
 *                   totalSold: 20
 *       400:
 *         description: Business ID is required
 *         content:
 *           application/json:
 *             example:
 *               error: "Business ID is required"
 *       404:
 *         description: Business ID does not exist
 *         content:
 *           application/json:
 *             example:
 *               error: "Business ID does not exist"
 *       500:
 *         description: Failed to fetch dashboard data
 *         content:
 *           application/json:
 *             example:
 *               error: "Failed to fetch dashboard data"
 *               details: "Error details here"
 */
router.get("/business/:businessId", getBusinessDashboard);

module.exports = router;
