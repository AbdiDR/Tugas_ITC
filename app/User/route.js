const express = require("express");
const { handlerGetAllUser, handlerPostUser, handlerPutUser, handlerDeleteUser } = require("./handler");
const router = express.Router();

//api 1 get all users
router.get("/", handlerGetAllUser);

//api 3 create users
router.post("/", handlerPostUser);

//api 4 update users
router.put("/:id", handlerPutUser);

//api 5 delete users
router.delete("/:id", handlerDeleteUser);

module.exports = router;
