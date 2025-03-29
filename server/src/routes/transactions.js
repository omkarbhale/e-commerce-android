const router = require("express").Router();
const {
	buyProduct,
	getCustomerTransactions,
} = require("../controllers/transactions");

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Transaction management routes
 */

/**
 * @swagger
 * /transactions/buy:
 *   post:
 *     summary: Buy a product
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *               customerId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Transaction completed successfully
 *       500:
 *         description: Failed to complete transaction
 */
router.post("/buy", buyProduct);

/**
 * @swagger
 * /transactions/customer/{customerId}:
 *   get:
 *     summary: Get transactions for a customer
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of transactions
 *       500:
 *         description: Failed to fetch transactions
 */
router.get("/customer/:customerId", getCustomerTransactions);

module.exports = router;
