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
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Business registered successfully
 *       500:
 *         description: Failed to register business
 */
router.post("/business/signup", businessSignup);

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
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Login failed
 */
router.post("/business/login", businessLogin);

router.post("/customer/signup", customerSignup);
router.post("/customer/login", customerLogin);

module.exports = router;
