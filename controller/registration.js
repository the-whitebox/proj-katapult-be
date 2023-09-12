const Users = require("../models/users");
const jwt = require("jsonwebtoken");

const Registration = async (req, res) => {
  try {
    const { fullname, email, company, role, score } = req.body;
    if (!fullname) {
      return res.status(400).json({ message: "fullname is required" });
    }
    if (!email) {
      return res.status(400).json({ message: "email is required" });
    }
    if (!company) {
      return res.status(400).json({ message: "company is required" });
    }
    if (!role) {
      return res.status(400).json({ message: "role is required" });
    }
    const existingUser = await Users.findOne({ email }).maxTimeMS(20000);
    const access_tokenDuration = 24 * 60 * 60;
    const refresh_tokenDuration = 30 * 24 * 60 * 60;
    const accessToken = jwt.sign(
      { userId: existingUser?._id },
      process.env.ACCESS_SECRET_KEY,
      {
        expiresIn: access_tokenDuration,
      }
    );
    const refreshToken = jwt.sign(
      { userId: existingUser?._id },
      process.env.REFRESH_SECRET_KEY,
      {
        expiresIn: refresh_tokenDuration,
      }
    );
    const access_tokenExpiration = new Date(
      Date.now() + access_tokenDuration * 1000
    );
    const refresh_tokenExpiration = new Date(
      Date.now() + refresh_tokenDuration * 1000
    );

    if (existingUser) {
      return res.status(200).json({
        message: "Successfully LoggedIn",
        data: {
          pk: existingUser._id,
          access_token: accessToken,
          refresh_token: refreshToken,
          access_expiresAt: access_tokenExpiration,
          refresh_expiresAt: refresh_tokenExpiration,
        },
      });
    }

    const newUser = new Users({
      fullname,
      email,
      company,
      role,
      score,
    });
    await newUser.save();

    res.status(201).json({
      message: "Successfully Registered",
      data: {
        pk: newUser._id,
        access_token: accessToken,
        refresh_token: refreshToken,
        access_expiresAt: access_tokenExpiration,
        refresh_expiresAt: refresh_tokenExpiration,
      },
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = {
  Registration,
};
