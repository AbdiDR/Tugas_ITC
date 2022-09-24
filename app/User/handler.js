const User = require("../../models");
const bcrypt = require("bcrypt");
const { validateUserCreatePayload, validateUserUpdatePayload } = require("../../validator/user");
module.exports = {
  handlerGetUsers: async (req, res, next) => {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json({
        status: "success",
        message: "Successfully get all users",
        data: users,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetUserByFullName: async (req, res, next) => {
    try {
      const { name } = req.query;
      const user = await UserService.getUserByFullName(name);
      res.status(200).json({
        status: "success",
        message: "Successfully get user by name",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetUserById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(id);
      res.status(200).json({
        status: "success",
        message: "Successfully get user by id",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerPostUser: async (req, res) => {
    try {
      const { email, password, fullName, shortName, biodata, angkatan, jabatan } = req.body;
      validateUserCreatePayload(req.body);
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        password: hashPassword,
        fullName,
        shortName,
        biodata,
        angkatan,
        jabatan,
      });
      res.status(200).json({
        status: "success",
        message: "User created",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerPutUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { fullName, shortName, biodata, angkatan, jabatan } = req.body;
      validateUserUpdatePayload({ id, fullName, shortName, biodata, angkatan, jabatan });
      const user = await User.findByPk(id);
      if (!user) {
        req.status(404).json({
          message: "User not found",
        });
      } else {
        await user.update({
          fullName,
          shortName,
          biodata,
          angkatan,
          jabatan,
        });
        res.status(200).json(user);
      }
    } catch (error) {
      next(error);
    }
  },
  handlerDeleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        req.status(404).json({
          message: "User not found",
        });
      } else {
        await user.destroy();
        req.status(200).json({
          message: "User Deleted",
        });
      }
    } catch (error) {
      next(error);
    }
  },
  handlerLoginUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      validateUserUpdatePayload({ email, password });

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const passwordValid = bcrypt.compareSync(password, user.password);
      if (!passwordValid) {
        throw new Error("Invalid password");
      }

      const accessToken = generateAccessToken({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      });

      res.status(200).json({
        status: "success",
        message: "Login success",
        data: {
          user,
          accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
