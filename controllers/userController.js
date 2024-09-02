const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "apikey",
  key: "",
});

const getUser = (request, response) => {
  User.findById(request.params.id)
    .then((user) => {
      return response.status(200).json(user);
    })
    .catch((error) => {
      return response.status(500).json(error);
    });
};

const login = async (request, response) => {
  const { email, password } = request.body;

  try {
    // 400 -> Client Error
    if (!email || !password) {
      return response.status(400).send("Please provide Email and Password");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return response.status(404).send("User Not Found");
    }

    if (!password.trim()) {
      return response.status(400).send("Password cannot be empty");
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { userId: user._id, email },
        process.env.TOKEN_SECRET,
        { expiresIn: "2h" }
      );
      user.token = token;

      return response.status(200).json({ user, token });
    }

    return response.status(400).send("Invalid User/Password");
  } catch (error) {
    console.error("Login error:", error);
    return response.status(500).send("Internal Server Error");
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    // Validate the input data
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).send("Name, email, and password are required");
    }

    // Check if email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send("Email already exists");
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a verification code
    const verificationCode = crypto
      .randomBytes(3)
      .toString("hex")
      .toUpperCase(); // Generates a 6-character code

    try {
      await mg.messages
        .create("sandbox4b5b4b1b2f694b28b669ae444679ec75.mailgun.org", {
          from: "Medical <postmaster@sandbox4b5b4b1b2f694b28b669ae444679ec75.mailgun.org>",
          to: await email,
          subject: "Verification Email",
          text: `Welcome to Medical!\nThis is your verification code: ${verificationCode}`,
        })
        .then((msg) => console.log(msg)) // logs response data
        .catch((err) => console.log(err));
    } catch (mailgunError) {
      console.error("Error sending email with Mailgun:", mailgunError.message);
      return res.status(500).send("Failed to send verification email");
    }

    // Save user data to database with verification status
    const user = new User({
      email,
      first_name,
      last_name,
      password: hashedPassword,
      code: verificationCode, // Store the verification code
    });

    await user.save();

    // Return a success message
    return res.status(200).json({
      message:
        "Registration successful. Please check your email for the verification code.",
    });
  } catch (e) {
    console.error("Error occurred during registration:", e.message);
    return res.status(500).send("Internal Server Error");
  }
};

const verifyCodeAndLogin = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;

    // Validate the input data
    if (!email || !verificationCode) {
      return res.status(400).send("Email and verification code are required");
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if the provided verification code matches the code in the database
    if (user.code !== verificationCode) {
      return res.status(400).send("Invalid verification code");
    }

    // Code is correct, proceed with login (e.g., generate a token or session)
    // For example, you might use JWT for session management:
    const token = jwt.sign(
      { userId: user._id, email },
      process.env.TOKEN_SECRET,
      { expiresIn: "2h" }
    );
    user.token = token;

    await user.save();

    // Return a success message with the token
    return res.status(200).json({ message: "Login successful", token });
  } catch (e) {
    console.error("Error occurred during code verification:", e.message);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getUser,
  login,
  verifyEmail,
  verifyCodeAndLogin,
};
