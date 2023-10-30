const { body, validationResult } = require("express-validator");
const validateWithReq = require("../validation");
const passport = require("passport");

const loginHandler = [
  validateWithReq([
    body("email")
      .notEmpty()
      .withMessage("Email jest wymagany")
      .isEmail()
      .withMessage("Niepoprawny email"),
    body("password")
      .notEmpty()
      .withMessage("Hasło jest wymagane")
      .isLength({ min: 8 })
      .withMessage(
        "Wymagania hasła: 1 Duża litera, 1 cyfra, przynajmniej 8 znaków"
      )
      .matches(/^(?=.*[A-Z])(?=.*\d)/)
      .withMessage(
        "Wymagania hasła: 1 Duża litera, 1 cyfra, przynajmniej 8 znaków"
      ),
  ]),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) {
        res.status(400).json({
          error: "Nieprawidłowy email lub hasło",
        });
      } else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.status(200).json({
            message: "Użytkownik zalogowany pomyślnie",
            user: user,
          });
          console.log(req.user);
          console.log("Użytkownik zalogowany pomyślnie");
        });
      }
    })(req, res, next);
  },
];

module.exports = loginHandler;
