
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = "mongodb+srv://djellali:12345678esi@cluster0.rrjvt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
db.Cour = require("./model.cours")(mongoose);
db.Enseignant = require('./model.enseignant.js')(mongoose) 
module.exports = db;