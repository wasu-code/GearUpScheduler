const logoutHandler = [
  (req, res) => {
    req.logout(function (err) {
      if (err) {
        console.error("Błąd podczas wylogowywania użytkownika:", err);
        res
          .status(500)
          .json({ error: req.t("Błąd podczas wylogowywania użytkownika") });
      } else {
        console.log("wylogowano");
        res.status(200).json({ message: "Użytkownik został wylogowany" });
      }
    });
  },
];

module.exports = logoutHandler;
