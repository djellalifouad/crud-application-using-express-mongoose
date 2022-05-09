var express = require('express');
var router = express.Router();
const db = require("../models");
const { route } = require('./users');
const User = db.users;

/* GET home page. */
router.get('/', function(req, res, next) {
   User.find()
    .then(data => {
      console.log(data);
        res.render('index', {data: data });
    })

});
router.delete('/delete/:id',(req,res)=> {
  console.log('here');
   User.deleteOne({id:req.params.id})
    .then(data => {
      console.log(data);
        res.json(data)
    })
})
router.put('/put/:username',(req,res)=> {
  console.log('here');
   User.updateOne({username:req.params.username},{password: req.body.password})
    .then(data => {
      console.log(data);
        res.json(data)
    })
})
router.get('/getuseerjosn', function(req, res, next) {
   User.find()
    .then(data => {
      console.log(data);
        res.json(data)
    })
});




module.exports = router;
