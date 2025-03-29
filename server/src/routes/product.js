const router = require("express").Router();
const {
	addProduct,
	getAllProducts,
	getProductsByBusinessId,
} = require("../controllers/product.js");

router.post("/", addProduct);
router.get("/", getAllProducts);
router.get("/business/:businessId", getProductsByBusinessId);

module.exports = router;
