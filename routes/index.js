var express = require('express');
var router = express.Router();
const db = require("../models");
const { route } = require('./users');

const Enseignant = db.Enseignant;
const Cour = db.Cour;
const Enseigne = db.Enseigne;
 // ajouter un cour 
router.post('/cour', (req,res)=> {
  console.log(Cour)
  const cour  = new Cour({
    titre:req.body.titre, 
    description: req.body.description, 
  }
  )
  cour.save(cour).then(cour => res.json(cour))
})
router.get('/cour', (req,res)=> {
 Cour.find().then((cour)=> res.json(cour))
})
// ajouter un enseignant
router.post('/enseignant', (req,res)=> {
  const enseignant  = new Enseignant({
    nom:req.body.nom, 
    prenom: req.body.prenom, 
  })
  enseignant.save(enseignant).then(enseignant => res.json(enseignant))
})
router.get('/enseignant', (req,res)=> {
 Enseignant.find().then((enseignants)=> res.json(enseignants))
})
// ajouter un cour a un enseignant
router.post('/enseignant/:idEnseignant/cour/:idCour',(req,res)=> {
Enseignant.findByIdAndUpdate(
  req.params.idEnseignant,
      { $push: { cours:   req.params.idCour } },
    { new: true, useFindAndModify: true }
).then(enseignant => {
Cour.findByIdAndUpdate(
  req.params.idCour,
      { $push: { enseignants:   req.params.idEnseignant } },
    { new: true, useFindAndModify: true }
).then(enseignant => {
  return res.json('linked')

})
})
})
router.get('/enseignant/:nom',(req,res)=> {
  Enseignant.find({nom: req.params.nom}).populate({path: "cours",select : 'titre'}).then(e=>res.json(e));
})
router.get('/enseignants',(req,res)=> {
  Enseignant.find().populate("cours").then(e=>res.json(e));
})
router.get('/cours/:titre',(req,res)=> {
  Cour.find({titre: req.params.titre}).populate({path: "enseignants",select : 'nom'}).then(e=>res.json(e));
})
router.get('/cours2/:titre',(req,res)=> {
   Cour.aggregate([{
    $lookup: {
      from :"enseignants", 
      localField: "enseignants",
      foreignField: "_id",
      as : "liste ce enseignant"
    }
  },
  {
  $match : {
    titre: req.params.titre, 
  }
},
{ "$project": { "liste ce enseignant": { "nom": 1 },"titre" : 1,"description": 1 }}
]
).exec(function( err,l) {
  res.json(l)
})
})
router.get('/enseignant2/:nom',(req,res)=> {
  Enseignant.aggregate([{
    $lookup: {
      from :"cours", 
      localField: "cours",
      foreignField: "_id",
      as : "liste de cour"
    }
  },
  {
  $match : {
    nom: req.params.nom, 
  }
},
{ "$project": { "liste de cour": { "titre": 1 },"nom" : 1,"prenom": 1 }}
]
).exec(function( err,l) {
  res.json(l)
})
})

router.post('/enseigne',(req,res)=> {
  const enseigne  = new Enseigne({
    ensignant:req.body.ensignant, 
    cour: req.body.cour, 
    date : req.body.date
  })
  enseigne.save().then(e=>res.json(e))
})
router.get('/enseigne',(req,res)=> {
   Enseigne.find().then((enseigne)=> res.json(enseigne))
})
router.get('/enseignelook',(req,res)=> {

 Enseigne.aggregate([{
    $lookup: {
      from :"cours", 
      localField: "cour",
      foreignField: "_id",
      as : "courdetail"
    },
  },
  
  {
    $lookup: {
      from :"enseignants", 
      localField: "enseignant",
      foreignField: "_id",
      as : "detaile"
    }
  },
  {
    $match: {
     date: req.body.date,
"enseignant.nom" : req.body.nom,
     
     
    }, 

      

  },
  
]
).exec(function( err,l) {
  res.json(l)
})
})

 
module.exports = router;
