const { tokenKey, comparePassword, encrypt, sendEmail } = require("../helpers");
const User = require("../models");
class Controller {
  //static to get all users
  static async index(req, res, next) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
  //static to register new user
  static async register(req, res, next) {
    try {
      const { name, email, password, username } = req.body;

      const newUser = new User({
        name,
        email,
        password,
        token: tokenKey(),
        username,
      });
      // Save the user to the database
      await newUser.save();

      // Send email to the user
      await sendEmail(newUser.email, newUser.token);

      res.status(201).json({
        message: "User registered successfully, please check your email",
      });
    } catch (error) {
      next(error);
    }
  }

  //check duplicate username
  static async checkDuplicateUsername(req, res, next) {
    try {
      const { username } = req.body;
      //check duplicate username
      const isDuplicate = await User.findOne({ username });
      if (isDuplicate) {
        throw new Error("Username already exists");
      }
    } catch (error) {
      next(error);
    }
  }

  //static confirmation email
  static async confirmationEmail(req, res, next) {
    try {
      const { token, email } = req.body;
      if (!token || !email) {
        throw new Error("Token and email are required");
      }
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }
      if (user.token !== token) {
        throw new Error("Confirmation key is invalid");
      }
      user.role = "user";
      await user.save();
      res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
      next(error);
    }
  }

  //static to get user by id
  static async getUserById(req, res, next) {
    try {
      const { id } = req.user;

      const user = await User.findById(id);

      if (!user) {
        throw new Error("User not found");
      }

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  //static change password
  static async changePassword(req, res, next) {
    try {
      const { id } = req.user;
      const { oldPassword, password } = req.body;

      //if empty throw error
      if (!oldPassword || !password)
        throw new Error("Old password and new password are required");

      //if old password and new password are same throw error
      if (oldPassword === password) {
        throw new Error("New password cannot be the same as old password");
      }

      //find user by id
      const user = await User.findById(id);

      //if old password is incorrect throw error
      const isMatch = await comparePassword(oldPassword, user.password);
      if (!isMatch) throw new Error("Old password is incorrect");

      //update password
      await User.findOneAndUpdate({
        _id: id,
        password,
      });

      res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      next(error);
    }
  }

  //static update user
  static async updateUser(req, res, next) {
    try {
      const { id } = req.user;
      const { name, email, username, address, province, regency, phone } =
        req.body;

      await User.findOneAndUpdate({
        _id: id,
        name,
        email,
        username,
        address,
        province,
        regency,
        phone,
      });

      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      next(error);
    }
  }

  //change role
  static async changeRole(req, res, next) {
    try {
      const { id } = req.params;
      const { role } = req.body;

      const user = await User.findOneAndUpdate({
        _id: id,
        role,
      });

      res
        .status(200)
        .json({ message: "Role changed successfully", role: user.role });
    } catch (error) {
      next(error);
    }
  }

  //change status active
  static async changeStatusActive(req, res, next) {
    try {
      const { id } = req.params;
      const status = await user.findById(id);
      const isActived = status.isActived === true ? false : true;
      const user = await User.findOneAndUpdate({
        _id: id,
        isActived,
      });

      res.status(200).json({
        message: "Status active changed successfully",
        isActived: user.isActived,
      });
    } catch (error) {
      next(error);
    }
  }

  //change status verified
  static async changeStatusVerified(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (user.isVerified === true) {
        user.isVerified = false;
      } else {
        user.isVerified = true;
      }

      await user.updateOne({
        isVerified: user.isVerified,
      });
      res.status(200).json({
        message: "Status verified changed successfully",
        isVerified: user.isVerified,
      });
    } catch (error) {
      next(error);
    }
  }

  //static delete user
  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      await User.findByIdAndRemove(id);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  }

  //static to find or create user
  static async findOrCreateUser(req, res, next) {
    try {
      const { name, email, username } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        const newUser = new User({
          name,
          email,
          username,
        });
        // Save the user to the database
        await newUser.save();

        res
          .status(201)
          .json({ message: "User registered successfully", user: user });
      } else {
        res
          .status(200)
          .json({ message: "User already registered", user: user });
      }
    } catch (error) {
      next(error);
    }
  }

  //static to login user
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("Invalid email or password");
      }
      const isValidPassword = await comparePassword(password, user.password);
      if (!isValidPassword) {
        throw new Error("Invalid email or password");
      }
      const access_token = encrypt({
        id: user._id,
      });
      res.status(200).json({ access_token: access_token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
