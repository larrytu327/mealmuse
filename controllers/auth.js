const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { createUserToken } = require("../middleware/auth");

const router = express.Router();

router.post("/register", async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(req.body.password, salt);

        //store this temporarirly so origin plain text password can be parsed by the createUserToken();
        const pwStore = req.body.password;

        req.body.password = passwordHash;

        const newUser = await User.create(req.body);

        if (newUser) {
            req.body.password = pwStore;
            const authenticatedUserToken = createUserToken(req, newUser);
            res.status(201).json({
                user: newUser,
                isLoggedIn: true,
                token: authenticatedUserToken,
            });
        } else {
            res.status(400).json({error: "Something went wrong"})
        }
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
});

router.post("/login", async (req, res, next) => {
    try {
        const loggingUser = req.body.username;
        const foundUser = await User.findOne({ username: loggingUser });
        const token = await createUserToken(req, foundUser);
        res.status(200).json({
            user: foundUser,
            isLoggedIn: true,
            token,
        });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
});

router.get( "/logout", requireToken, async (req, res, next) => {
    try {
      const currentUser = req.user.username
      delete req.user
      res.status(200).json({
        message: `${currentUser} currently logged out`,
        isLoggedIn: false,
        token: "",
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

module.exports = router;