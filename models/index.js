const mongoose = require("mongoose");
const { hashPassword } = require("../helpers/bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      trim: true,
      unique: [true, "Email already exists!"],
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      trim: true,
      minlength: [6, "Password needs to be longer!"],
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error('Password cannot contain "password"');
        }
        //password must contain lowercase uppercase, number and symbol
        if (
          !/[a-z]/.test(value) ||
          !/[A-Z]/.test(value) ||
          !/[0-9]/.test(value) ||
          !/[!@#$%^&*]/.test(value)
        ) {
          throw new Error(
            "Password must contain lowercase, uppercase, number and symbol"
          );
        }
      },
    },
    username: {
      type: String,
      required: [true, "Username is required!"],
      trim: true,
      unique: [true, "Username already exists!"],
      minlength: [5, "Username must have at least 5 characters!"],
      //validation username cannot contain space
      validate(value) {
        if (value.includes(" ")) {
          throw new Error("Username cannot contain space!");
        }
        //validate username must be alphanumeric dan dash
        if (!/^[a-zA-Z0-9-]*$/.test(value)) {
          throw new Error("Username must be alphanumeric and dash!");
        }
        //validate username must be lowercase
        if (value !== value.toLowerCase()) {
          throw new Error("Username must be lowercase!");
        }
      },
    },
    avatar: {
      type: String,
      default:
        "https://rhttps://static.vecteezy.com/system/resources/previews/016/927/996/original/captain-airplane-pilot-hat-free-vector.jpges.cloudinary.com/dx0hz2ziy/image/upload/v1606326219/avatars/default-avatar.png",
    },
    role: {
      type: String,
      enum: ["admin", "user", "guest", "superadmin"],
      default: "guest",
    },
    isActivated: {
      type: Boolean,
      default: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    province: {
      type: String,
      default: null,
    },
    regency: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    // Hash the password only if it's modified or new
    if (!this.isModified("password")) {
      return next();
    }

    // Set the hashed password
    this.password = hashPassword(this.password);

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", userSchema);
