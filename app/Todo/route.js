const express = require("express");
const router = express.Router();
const handler = require("./handler");

router.post("/", handler.getTodo);

module.exports = router;
