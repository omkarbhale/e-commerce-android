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
 *                 example: 1
 *               customerId:
 *                 type: integer
 *                 example: 101
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Transaction completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 productId:
 *                   type: integer
 *                   example: 1
 *                 customerId:
 *                   type: integer
 *                   example: 101
 *                 quantity:
 *                   type: integer
 *                   example: 2
 *                 totalPrice:
 *                   type: number
 *                   example: 200.0
 *       400:
 *         description: Bad request
 *       500:
 *         description: Failed to complete transaction
 */

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
 *           example: 101
 *     responses:
 *       200:
 *         description: List of transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   productId:
 *                     type: integer
 *                     example: 1
 *                   productName:
 *                     type: string
 *                     example: "Wireless Headphones"
 *                   quantity:
 *                     type: integer
 *                     example: 2
 *                   totalPrice:
 *                     type: number
 *                     example: 200.0
 *       400:
 *         description: Bad request
 *       500:
 *         description: Failed to fetch transactions
 */
router.post("/buy", buyProduct);
router.get("/customer/:customerId", getCustomerTransactions);

module.exports = router;
