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

router.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/enterprise/login");
  }
})

router.post('/:enterprise_id/update', (req, res, next) =>{
  const update = {
    name: req.body.name,
    location: req.body.location,
    email: req.body.email
  }
  Enterprise.findByIdAndUpdate(req.params.enterprise_id, update)
    .then(responseFromDB=>{
      console.log("Sucessfully updated", responseFromDB);
      res.redirect(`/enterprise/${req.user._id}/`)
    })
    .catch(err => console.error(err));
});

router.post('/:enterprise_id/delete', (req, res, next) => {
  Enterprise.findByIdAndDelete(req.params.enterprise_id)
    .then(responseFromDB => {
      console.log("Sucessfully deleted", responseFromDB);      
      res.redirect(`/`)
    })
    .catch(err => console.error(err));
});

router.get('/:enterprise_id', (req, res, next) => {
  res.render('enterprise-views/profile');
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/')
});

module.exports = router;
