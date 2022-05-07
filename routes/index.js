var express = require('express');
var router = express.Router();
const db = require("../models");
const User = db.users;

/* GET home page. */
router.get('/', function(req, res, next) {
   User.find()
    .then(data => {
      console.log(data);
        res.render('index', {data: data });
    })

});

module.exports = router;
