const express = require("express");
const AuthenticationToken = require("../../middleware/AuthenticationToken");
const { handlerGetAllUser, handlerPostUser, handlerPutUser, handlerDeleteUser } = require("./handler");
const router = express.Router();

//api 1 get all users
router.get("/", handlerGetAllUser);

//api 2 get by fullname
router.get("/search", handlerGetUserByFullName);

//api 3 get by id
router.get("/:id", handlerGetUserById);

//api 4 create users
router.post("/", AuthenticationToken, handlerPostUser);

//api 5 update users
router.put("/:id", AuthenticationToken, handlerPutUser);

//api 6 delete users
router.delete("/:id", AuthenticationToken, handlerDeleteUser);

//api 7 login user
router.post("/login", handlerLoginUser);

module.exports = router;
