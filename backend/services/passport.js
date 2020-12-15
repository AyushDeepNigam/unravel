const passport = require("passport");
const google_keys = require("../config/google_keys");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("users");
//this code gives unique code to the user logging in
passport.serializeUser((user, done) => {
  done(null, user.id);
});
//this code identifies the user using the id parameter and grants access
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});
//google authentication code using passport package
passport.use(
  new GoogleStrategy(
    {
      clientID: google_keys.client_id,
      clientSecret: google_keys.client_secret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          console.log("id saved");
          new User({
            googleId: profile.id,
            name: profile.displayName,
            thumbnail: profile._json.picture,
            email: profile._json.email
          })
            .save()
            .then(user => {
              done(null, user);
            });
        }
      });
    }
  )
);
