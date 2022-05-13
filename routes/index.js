var express = require('express');
var router = express.Router();
const db = require("../models");

const User = db.users;
const Compte = db.comptes;
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
router.get('/getuseerjosn2', function(req, res, next) {
   User.find().populate("compte")
    .then(data => {
      console.log(data);
        res.json(data)
    })
});
router.get('/getjoin',(req,res,next)=> {
  User.aggregate([{
    $lookup: {
      from :"comptes", 
      localField: "_id",
      foreignField: "user",
      as : "listecompte"
    }
  },
  {
  $match : {
    username: "username1", 
  }
}
]
).exec(function( err,l) {
  res.json(l)
})
})
router.get('/getjoin2',async (req,res,next)=> {
    let authors = await Compte.find({user: "6278ef29e78094ad3a7475bf"}).populate('user').lean();
  res.send(authors);
   // ; 


})




module.exports = router;
