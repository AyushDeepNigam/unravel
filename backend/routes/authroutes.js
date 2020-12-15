const passport = require("passport");
const express = require("express");
const router = express.Router();

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
      // console.log("req, res, req.session", req.session)
      if (req.session) {
        console.log(req.session.passport.user);
        res.cookie("token", req.session);
        // res.json({
        //   message: "successfully authenticated",
        //   status: 'session cookie set'
        // });
        res.redirect("http://localhost:3000/");
      } else {
        res.json({
          status: "session cookie not set"
        });
      }
    }
  );

  app.get("/current_user", (req, res) => {
    console.log(
      "req.user",
      req.user,
      req.user != undefined && req.user != null
    );

    if (req.user != undefined && req.user != null) {
      console.log("req.userreq.user");
      res.json({
        success: true,
        message: "user has successfully authenticated",
        user: req.user,
        cookies: req.cookies
      });
    } else {
      console.log("ERROR");
      res.status(404).json({
        success: false,
        message: "user has not successfully authenticated",
        user: req.user,
        cookies: req.cookies
      });
    }
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("http://localhost:3000/");
  });
  app.use("/", router);
};
