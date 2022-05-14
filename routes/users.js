var express = require('express');
const { route } = require('.');
var router = express.Router();

const db = require("../models");
const User = db.users;
const Compte = db.comptes; 

module.exports = router;
