var express = require("express");

var router = express.Router();

// Requiring our models
var db = require("../models");



router.get("/", function (req, res) {
    db.User.findAll({}).then(function (data) {
      var hbsObject = {
        userData: "data"
      };
      console.log(hbsObject);
      res.render("users", hbsObject);
    });
  });
  router.get("/expenses/", function (req, res) {
    var hbsObject = {
      userData: "data"
    };
      res.render("expenses", hbsObject);
  });
 
  module.exports = router;