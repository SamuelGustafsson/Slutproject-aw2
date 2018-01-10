const passport = require("passport");
const authController = require("../controllers/userController");

module.exports = function(app) {
  // ************ LOGIN ENDPOINTS *************

  // Get all users.
  app.get("/api/users", authController.getAllUsers);

  // Login with google
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  // Ta koden vi fick av google och skicka tillbaka den för att få informationen vi önskar.
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
      res.redirect("/");
    }
  );

  app.post("/api/register", authController.RegisterUserLocalStrategy);

  app.post(
    "/api/login",
    function(req, res) {
      console.log("/api/login", req.body);
    },
    passport.authenticate("local", {
      successRedirect: "/api/current_user",
      failureRedirect: "/api/login/fail"
    })
  );

  app.get("/api/current_user", (req, res) => {
    res.send();
  });

  app.get("/api/login/fail", (req, res) => {
    res.send("fail");
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/login");
  });
};
