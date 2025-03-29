const router = require("express").Router();
const {
	addProduct,
	getAllProducts,
	getProductsByBusinessId,
} = require("../controllers/product.js");

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management routes
 */

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Add a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Wireless Headphones"
 *               price:
 *                 type: number
 *                 example: 59.99
 *               businessId:
 *                 type: integer
 *                 example: 201
 *     responses:
 *       201:
 *         description: Product added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Wireless Headphones"
 *                 price:
 *                   type: number
 *                   example: 59.99
 *                 businessId:
 *                   type: integer
 *                   example: 201
 *       400:
 *         description: Bad request
 *       500:
 *         description: Failed to add product
 */

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of all products
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
 *                   name:
 *                     type: string
 *                     example: "Wireless Headphones"
 *                   price:
 *                     type: number
 *                     example: 59.99
 *                   businessId:
 *                     type: integer
 *                     example: 201
 *       500:
 *         description: Failed to fetch products
 */

/**
 * @swagger
 * /product/business/{businessId}:
 *   get:
 *     summary: Get products by business ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: businessId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 201
 *     responses:
 *       200:
 *         description: List of products for the business
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
 *                   name:
 *                     type: string
 *                     example: "Wireless Headphones"
 *                   price:
 *                     type: number
 *                     example: 59.99
 *                   businessId:
 *                     type: integer
 *                     example: 201
 *       400:
 *         description: Bad request
 *       500:
 *         description: Failed to fetch products
 */
router.post("/", addProduct);
router.get("/", getAllProducts);
router.get("/business/:businessId", getProductsByBusinessId);

module.exports = router;
