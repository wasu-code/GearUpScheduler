const User = require("../schemas/user");

const getUserByUserIdHandler = [
  async (req, res) => {
    try {
      const user_id = req.query.user_id;

      const user = await User.findOne({ _id: user_id });

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({
        message: "Wystąpił błąd podczas pobierania użytkownika",
        error: error.message,
      });
    }
  },
];

module.exports = getUserByUserIdHandler;
