const router = require("express").Router();
const { getBusinessDashboard } = require("../controllers/dashboard");

router.get("/business/:businessId", getBusinessDashboard);

module.exports = router;
