//import user dari model

const { decrypt } = require("../helpers");
const User = require("../models");

const isLoggedIn = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) throw { name: "TokenInvalid" };
    const payload = decrypt(access_token);
    const user = await User.findById(payload.id);
    if (!user) throw { name: "TokenInvalid" };
    req.user = payload;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = isLoggedIn;
