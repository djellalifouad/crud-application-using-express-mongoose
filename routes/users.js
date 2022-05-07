var express = require('express');
var router = express.Router();

const db = require("../models");
const User = db.users;

router.post('/add',(req,res,next)=> {
   const user = new User({
    username: req.body.username,
    password: req.body.password
  });
 user
    .save(user)
    .then(data => {
      res.redirect('/')
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });

})
module.exports = router;
