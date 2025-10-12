const router = require("express").Router();
const controller = require("./controller");

router.get("/pha", controller.get_pha);
router.get("/pha/ytd", controller.get_pha_ytd);
router.get("/pha/custom/:start/:end", controller.get_custom_dates)

module.exports = router;
