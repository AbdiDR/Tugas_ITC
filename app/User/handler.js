const User = require("../../models");
module.exports = {
  handlerGetAllUser: async (req, res) => {
    const Users = await User.findAll();
    res.status(200).json(users);
  },
  handlerPostUser: async (req, res) => {
    const { email, password, fullName, shortName, biodata, angkatan, jabatan } = req.body;
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
    res.status(200).json(user);
  },
  handlerPutUser: async (req, res) => {
    const { id } = req.params;
    const { fullName, shortName, biodata, angkatan, jabatan } = req.body;
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
  },
  handlerDeleteUser: async (req, res) => {
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
  },
};
