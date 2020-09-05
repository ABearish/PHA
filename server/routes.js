const router = require("express").Router();
const controller = require("./controller");

router.get("/pha", controller.getPha);
router.get("/pha/ytd", controller.getPhaYTD);
router.get("/pha/custom/:start/:end", controller.getCustom)
module.exports = router;