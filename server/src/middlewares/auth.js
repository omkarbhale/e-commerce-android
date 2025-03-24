const jwt = require("jsonwebtoken");

/**
 *
 * @param {"business" | "customer"} role
 * @returns
 */
const authenticateUser = (role) => {
	return (req, res, next) => {
		const token = req.headers.authorization?.split(" ")[1];
		if (!token) {
			return res
				.status(401)
				.json({ error: "Access denied. No token provided." });
		}
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			if (decoded.role !== role) {
				return res
					.status(403)
					.json({ error: "Forbidden. Invalid role." });
			}
			req.user = decoded;
			next();
		} catch (error) {
			res.status(400).json({ error: "Invalid token." });
		}
	};
};

module.exports = {
	customerAuth: authenticateUser("customer"),
	businessAuth: authenticateUser("business"),
};
