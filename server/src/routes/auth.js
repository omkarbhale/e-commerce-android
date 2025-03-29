const router = require("express").Router();

const {
	businessSignup,
	businessLogin,
	customerSignup,
	customerLogin,
} = require("../controllers/auth");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
 */

/**
 * @swagger
 * /auth/business/signup:
 *   post:
 *     summary: Register a new business
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Tech Corp"
 *               email:
 *                 type: string
 *                 example: "business@example.com"
 *               password:
 *                 type: string
 *                 example: "securepassword"
 *     responses:
 *       201:
 *         description: Business registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Business registered successfully"
 *                 business:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 201
 *                     name:
 *                       type: string
 *                       example: "Tech Corp"
 *                     email:
 *                       type: string
 *                       example: "business@example.com"
 *       500:
 *         description: Failed to register business
 */

/**
 * @swagger
 * /auth/business/login:
 *   post:
 *     summary: Login for businesses
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "business@example.com"
 *               password:
 *                 type: string
 *                 example: "securepassword"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Login failed
 */

/**
 * @swagger
 * /auth/customer/signup:
 *   post:
 *     summary: Register a new customer
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "customer@example.com"
 *               password:
 *                 type: string
 *                 example: "securepassword"
 *     responses:
 *       201:
 *         description: Customer registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Customer registered successfully"
 *                 customer:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 101
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "customer@example.com"
 *       500:
 *         description: Failed to register customer
 */

/**
 * @swagger
 * /auth/customer/login:
 *   post:
 *     summary: Login for customers
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "customer@example.com"
 *               password:
 *                 type: string
 *                 example: "securepassword"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Login failed
 */
router.post("/business/signup", businessSignup);
router.post("/business/login", businessLogin);
router.post("/customer/signup", customerSignup);
router.post("/customer/login", customerLogin);

module.exports = router;
