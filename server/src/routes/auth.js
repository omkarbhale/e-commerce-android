const router = require("express").Router();

const {
	businessSignup,
	businessLogin,
	customerSignup,
	customerLogin,
} = require("../controllers/auth");

router.post("/business/signup", businessSignup);
router.post("/business/login", businessLogin);
router.post("/customer/signup", customerSignup);
router.post("/customer/login", customerLogin);

module.exports = router;
