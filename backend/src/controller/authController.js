const bcyrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcyrpt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
      code: 201,
    });
  } catch (error) {
    console.error("Error registering user:", error);

    if (error instanceof Sequelize.ValidationError) {
      const errorMessages = error.errors.map((err) => {
        if (err.type === "notNull Violation") {
          return `${err.path} tidak boleh kosong`;
        }
        return err.message;
      });

      return res.status(400).json({
        success: false,
        message: "Validasi gagal",
        errors: errorMessages,
        code: 400,
      });
    }
    res.status(500).json({
      success: false,
      message: "Internal server error",
      code: 500,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
        code: 404,
      });

    const isMatch = await bcyrpt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({
        success: false,
        message: "Password Salah",
        code: 401,
      });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: user,
      code: 200,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      code: 500,
    });
  }
};
