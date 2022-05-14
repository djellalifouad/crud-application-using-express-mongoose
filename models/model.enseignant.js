module.exports = mongoose => {
  var schemaEnsignant = mongoose.Schema(
    {
        cours: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cour"
      }
    ],
      nom: String,
      prenom: String,
    
    },
    { timestamps: true }
  );
  const Enseignant = mongoose.model("enseignant", schemaEnsignant);
  return Enseignant;
};