const Users = require("../models/users");

const GetUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await Users.findById(userId);
    if (user) {
      res.status(200).json({
        data: user,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: "Internal server error", error });
  }
};

const UpdateUser = async (req, res) => {
  const { userId } = req.params;
  const { score } = req.body;

  await Users.findByIdAndUpdate(userId, { score }, { new: true })
    .then((updatedUser) => {
      res
        .status(200)
        .json({ data: updatedUser, message: "Score successfully updated!" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to update user's score" });
    });
};

module.exports = { GetUser, UpdateUser };
