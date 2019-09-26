const express = require('express');
const router = express.Router();

const Enterprise = require('../models/Enterprise');
const bcrypt = require("bcryptjs");
const passport = require("passport");

/* GET home page */
router.get('/sign-up', (req, res, next) => {
  res.render('enterprise-views/sign-up');
});

router.post('/sign-up', (req, res, next) => {
  let name = req.body.name
  let email = req.body.email
  let username = req.body.username
  let password = req.body.password
  const saltRounds = 10;

  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  Enterprise.create({
    name: name,
    email: email,
    username: username,
    password: hash,
  }).then(data => {
    res.redirect("/enterprise/login")

  }).catch(err => next(err))
});

router.get('/login', (req, res, next) => {
  res.render('enterprise-views/login');
});

router.post('/login', passport.authenticate("enterprise", {
  successRedirect: "/",
  failureRedirect: "/enterprise/login",
  failureFlash: true,
  passReqToCallback: true
}));

// router.use();

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/')
});

module.exports = router;
