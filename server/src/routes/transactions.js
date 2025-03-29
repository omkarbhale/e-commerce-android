const router = require("express").Router();
const {
	buyProduct,
	getCustomerTransactions,
} = require("../controllers/transactions");

router.post("/buy", buyProduct);
router.get("/customer/:customerId", getCustomerTransactions);

module.exports = router;
