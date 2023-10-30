const User = require("./schemas/user");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      (username, password, done) => {
        User.findOne({ email: username })
          .then((user) => {
            if (!user) return done(null, false);
            bcrypt.compare(password, user.password || "", (err, result) => {
              if (err) throw err;
              if (result === true) {
                return done(null, user);
              } else {
                return done(null, false);
              }
            });
          })
          .catch((err) => {
            throw err;
          });
      }
    )
  );

  passport.serializeUser((user, cb) => {
    cb(null, user._id);
  });

  passport.deserializeUser((id, cb) => {
    User.findById(id)
      .then((user) => {
        cb(null, user);
      })
      .catch((err) => {
        cb(err, null);
      });
  });
};
