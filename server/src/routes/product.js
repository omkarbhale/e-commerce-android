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
 *               price:
 *                 type: number
 *               businessId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Product added successfully
 *       500:
 *         description: Failed to add product
 */
router.post("/", addProduct);

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of all products
 *       500:
 *         description: Failed to fetch products
 */
router.get("/", getAllProducts);

router.get("/business/:businessId", getProductsByBusinessId);

module.exports = router;
