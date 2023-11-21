const { body, validationResult } = require("express-validator");
const validateWithReq = require("../validation");
const bcrypt = require("bcryptjs");
const User = require("../schemas/user");

const registerHandler = [
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
    body("name")
      .notEmpty()
      .withMessage("Imię jest wymagane")
      .isAlpha()
      .withMessage("Imię może zawierać tylko litery"),
    body("surname")
      .notEmpty()
      .withMessage("Nazwisko jest wymagane")
      .isAlpha()
      .withMessage("Nazwisko może zawierać tylko litery"),
  ]),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, surname, password, email, role } = req.body;

    // Haszowanie hasła
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Błąd podczas haszowania hasła:", err);
        return res
          .status(500)
          .json({ error: "Błąd podczas zapisywania użytkownika" });
      }

      const user = new User({
        name: name,
        surname: surname,
        password: hashedPassword,
        email: email,
        role: role,
      });

      User.findOne({ email: email })
        .then((existingUser) => {
          if (existingUser) {
            console.log("Podany email jest już przypisany do innego konta");
            return res.status(400).json({
              error: "Podany email jest już przypisany do innego konta",
            });
          } else {
            user
              .save()
              .then(() => {
                console.log("Użytkownik został zapisany w bazie danych");
                res
                  .status(200)
                  .json({ message: "Użytkownik został zarejestrowany" });
              })
              .catch((error) => {
                console.error("Błąd podczas zapisywania użytkownika:", error);
                res
                  .status(500)
                  .json({ error: "Błąd podczas zapisywania użytkownika" });
              });
          }
        })
        .catch((error) => {
          console.error("Błąd podczas wyszukiwania użytkownika:", error);
        });
    });
  },
];

module.exports = registerHandler;
