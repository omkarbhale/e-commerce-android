const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { models } = require("../database/db");
const { Business, Customer } = models;

/**
 * Generates a JWT token for the given user and role.
 *
 * @param {{ id: number }} user - The user object containing at least an `id` property.
 * @param {"business" | "customer"} role - The role of the user (either "business" or "customer").
 * @returns {string} - The generated JWT token.
 */
const generateToken = (user, role) => {
	return jwt.sign({ id: user.id, role }, process.env.JWT_SECRET, {
		expiresIn: "1h",
	});
};

const businessSignup = async (req, res) => {
	const { name, email, password, address, phone } = req.body;

	try {
		if (!name || !email || !password || !address || !phone) {
			throw new Error("Missing details");
		}
		const hashedPassword = await bcrypt.hash(password, 10);

		const existingBusiness = await Business.findOne({ where: { email } });
		if (existingBusiness) {
			throw new Error("Business already exists!");
		}

		const business = await Business.create({
			name,
			email,
			password: hashedPassword,
			address,
			phone,
		});
		const token = generateToken(business, "business");
		res.status(201).json({
			message: "Business registered successfully",
			business: {
				id: business.id,
				name: business.name,
				email: business.email,
				address: business.address,
				phone: business.phone,
			},
			token,
		});
	} catch (error) {
		res.status(500).json({
			error: "Failed to register business",
			details: error.message,
		});
	}
};

const businessLogin = async (req, res) => {
	const { email, password } = req.body;
	try {
		if (!email || !password) {
			throw new Error("Missing details");
		}
		console.log(email);
		console.log(password);
		const business = await Business.findOne({ where: { email } });
		if (!business || !(await bcrypt.compare(password, business.password))) {
			return res.status(401).json({ error: "Invalid credentials" });
		}
		const token = generateToken(business, "business");
		res.status(200).json({
			message: "Login successful",
			token,
			business: {
				id: business.id,
				name: business.name,
				email: business.email,
			},
		});
	} catch (error) {
		res.status(500).json({ error: "Login failed", details: error.message });
	}
};

const customerSignup = async (req, res) => {
	const { name, email, password } = req.body;
	try {
		if (!name || !email || !password) {
			throw new Error("Missing details");
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const customer = await Customer.create({
			name,
			email,
			password: hashedPassword,
		});
		const token = generateToken(customer, "customer");
		res.status(201).json({
			message: "Customer registered successfully",
			customer: {
				id: customer.id,
				name: customer.name,
				email: customer.email,
			},
			token,
		});
	} catch (error) {
		res.status(500).json({
			error: "Failed to register customer",
			details: error.message,
		});
	}
};

const customerLogin = async (req, res) => {
	const { email, password } = req.body;
	try {
		const customer = await Customer.findOne({ where: { email } });
		if (!customer || !(await bcrypt.compare(password, customer.password))) {
			return res.status(401).json({ error: "Invalid credentials" });
		}
		const token = generateToken(customer, "customer");
		res.status(200).json({
			message: "Login successful",
			token,
			customer: {
				id: customer.id,
				name: customer.name,
				email: customer.email,
			},
		});
	} catch (error) {
		res.status(500).json({ error: "Login failed", details: error.message });
	}
};

module.exports = {
	businessSignup,
	businessLogin,
	customerSignup,
	customerLogin,
};
