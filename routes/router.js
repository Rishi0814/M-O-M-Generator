const express = require("express");
const router = express.Router();
const controller = require("../controller/controller");
router.post("/getMOM", controller.getMOM);
router.post("/newMOM", controller.newMOM);
module.exports = router;
