const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { models } = require("../database/db");
const { Business, Customer } = models;

const generateToken = (user, role) => {
	return jwt.sign({ id: user.id, role }, process.env.JWT_SECRET, {
		expiresIn: "1h",
	});
};

const businessSignup = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		if (!name || !email || !password) {
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
		});
		res.status(201).json({
			message: "Business registered successfully",
			business,
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
		const token = generateToken(business.email, "business");
		res.status(200).json({ message: "Login successful", token });
	} catch (error) {
		res.status(500).json({ error: "Login failed", details: error.message });
	}
};

const customerSignup = async (req, res) => {
	const { name, email, password } = req.body;
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const customer = await Customer.create({
			name,
			email,
			password: hashedPassword,
		});
		res.status(201).json({
			message: "Customer registered successfully",
			customer,
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
		const token = generateToken(customer.email, "customer");
		res.status(200).json({ message: "Login successful", token });
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
