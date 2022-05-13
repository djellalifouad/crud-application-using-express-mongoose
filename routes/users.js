var express = require('express');
const { route } = require('.');
var router = express.Router();

const db = require("../models");
const User = db.users;
const Compte = db.comptes; 

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
router.post('/addCompte',(req,res,next)=> {
   const compte = new Compte({
    nccp: req.body.nccp,
    user: req.body.idUser, 
  });
 compte
    .save(compte)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });

})

module.exports = router;
