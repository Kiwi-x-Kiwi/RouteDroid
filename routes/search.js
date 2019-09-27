const express = require('express');
const router = express.Router();
const axios = require("axios");

const Enterprise = require('../models/Enterprise');

router.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/enterprise/login");
  }
})

/* GET home page */
router.get('/', (req, res, next) => {
  let prefilled = false;

  if(Object.keys(req.query).length ==2){
    console.log("req.query: ", req.query)
    prefilled = {
      origins: req.query.origins,
      waypoints: typeof (req.query.waypoints) == String ? [req.query.waypoints] : req.query.waypoints 
    }
    
  }
  let origins = [req.query.origins];
  let waypoints = typeof(req.query.waypoints) == String ? [req.query.waypoints] : req.query.waypoints;

  console.log("origins ", origins)
  console.log("waypoints ", waypoints)

  const originsAndDestinations = origins.concat(waypoints).join("|").split(" ").join("+");
  const origin = origins.join("").split(" ").join("+");

  // const originsAndDestinations = origins.concat(waypoints).concat(origins).join("|").split(" ").join("+");

  // waypoints = typeof (req.query.waypoints) == String ? [req.query.waypoints] : req.query.waypoints;

  waypoints = [].concat(waypoints).join("|").split(" ").join("+");

  // console.log(typeof(waypoints));

  // console.log("both ", originsAndDestinations);
  // console.log("new waypoints ", waypoints);

  // axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${originsAndDestinations}&destinations=${waypoints}&key=${process.env.GOOGLE_MAPS_KEY}`)
  //   .then(responseFromAPI =>{
  //     res.send(responseFromAPI.data);
  //     console.log(responseFromAPI.data)  
  //   })
  //   .catch(err => console.error(err))

  res.render('search-views/search', {
    origin: origin,
    waypoints: waypoints,
    key: process.env.GOOGLE_MAPS_KEY,
    prefilled: prefilled
  });
});

module.exports = router;